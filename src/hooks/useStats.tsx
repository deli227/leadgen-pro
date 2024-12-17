import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"

interface ChartData {
  date: string
  users: number
  waitlist: number
}

interface Stats {
  totalUsers: number
  newUsersToday: number
  totalLeads: number
  activeUsers: number
  totalRevenue: number
  totalViews: number
  waitlistCount: number
}

export function useStats() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    newUsersToday: 0,
    totalLeads: 0,
    activeUsers: 0,
    totalRevenue: 0,
    totalViews: 0,
    waitlistCount: 0
  })
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchStats = async () => {
    try {
      console.log("Fetching admin dashboard stats...")
      
      // Récupérer le nombre total d'utilisateurs
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')

      if (profilesError) throw profilesError

      // Récupérer les nouveaux utilisateurs d'aujourd'hui
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const newUsers = profilesData.filter(profile => 
        new Date(profile.created_at) >= today
      )

      // Récupérer le nombre total de leads
      const { count: totalLeads } = await supabase
        .from('leads')
        .select('*', { count: 'exact' })

      // Récupérer les utilisateurs actifs (ceux qui ont généré des leads ce mois)
      const activeUsers = profilesData.filter(profile => 
        profile.leads_generated_this_month > 0
      )

      // Calculer le revenu total (utilisateurs pro)
      const proUsers = profilesData.filter(profile => 
        profile.subscription_type === 'pro'
      )
      const monthlyRevenue = proUsers.length * 14.99

      // Récupérer la liste d'attente
      const { data: waitlistData, error: waitlistError } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false })

      if (waitlistError) throw waitlistError

      // Mettre à jour les stats
      setStats({
        totalUsers: profilesData.length,
        newUsersToday: newUsers.length,
        totalLeads: totalLeads || 0,
        activeUsers: activeUsers.length,
        totalRevenue: monthlyRevenue,
        totalViews: profilesData.length * 3, // Estimation basée sur les profils
        waitlistCount: waitlistData?.length || 0
      })

      // Préparer les données pour le graphique
      const groupedData: Record<string, { users: number; waitlist: number }> = {}

      // Grouper les données des utilisateurs par date
      profilesData.forEach(profile => {
        const date = new Date(profile.created_at).toISOString().split('T')[0]
        if (!groupedData[date]) {
          groupedData[date] = { users: 0, waitlist: 0 }
        }
        groupedData[date].users++
      })

      // Grouper les données de la waitlist par date
      waitlistData?.forEach(entry => {
        const date = new Date(entry.created_at).toISOString().split('T')[0]
        if (!groupedData[date]) {
          groupedData[date] = { users: 0, waitlist: 0 }
        }
        groupedData[date].waitlist++
      })

      // Convertir en format pour le graphique et trier par date
      const chartData = Object.entries(groupedData)
        .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
        .map(([date, data]) => ({
          date,
          users: data.users,
          waitlist: data.waitlist
        }))

      setChartData(chartData)
      setLastUpdate(new Date())
      console.log("Admin dashboard stats updated successfully")
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error)
      toast.error("Erreur lors du chargement des statistiques")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()

    // Écouter les changements sur la table waitlist
    const waitlistChannel = supabase
      .channel('public:waitlist')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'waitlist' }, 
        () => {
          console.log('Waitlist updated, refreshing stats...')
          fetchStats()
        }
      )
      .subscribe()

    // Écouter les changements sur la table profiles
    const profilesChannel = supabase
      .channel('public:profiles')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'profiles' }, 
        () => {
          console.log('Profiles updated, refreshing stats...')
          fetchStats()
        }
      )
      .subscribe()

    // Mettre à jour toutes les minutes pour les vues
    const interval = setInterval(fetchStats, 60000)

    return () => {
      clearInterval(interval)
      supabase.removeChannel(waitlistChannel)
      supabase.removeChannel(profilesChannel)
    }
  }, [])

  return { stats, chartData, isLoading, lastUpdate }
}