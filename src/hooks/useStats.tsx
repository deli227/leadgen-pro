import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "@/hooks/use-toast"
import { startOfDay, endOfDay, format } from "date-fns"

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

interface DateRange {
  start: Date
  end: Date
}

export function useStats(dateRange?: DateRange) {
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
      
      const start = dateRange ? startOfDay(dateRange.start) : startOfDay(new Date())
      const end = dateRange ? endOfDay(dateRange.end) : endOfDay(new Date())
      
      // Récupérer le nombre total d'utilisateurs
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')

      if (profilesError) throw profilesError

      // Récupérer les nouveaux utilisateurs sur la période
      const newUsers = profilesData.filter(profile => {
        const createdAt = new Date(profile.created_at)
        return createdAt >= start && createdAt <= end
      })

      // Récupérer les paiements sur la période
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('payments')
        .select('*')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString())
        .eq('status', 'succeeded')

      if (paymentsError) throw paymentsError

      // Calculer le revenu total sur la période
      const periodRevenue = paymentsData?.reduce((sum, payment) => sum + Number(payment.amount), 0) || 0

      // Récupérer le nombre total de leads
      const { data: leadsData, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString())

      if (leadsError) throw leadsError

      // Récupérer les utilisateurs actifs (ceux qui ont généré des leads sur la période)
      const activeUsers = new Set(leadsData?.map(lead => lead.user_id))

      // Récupérer la liste d'attente
      const { data: waitlistData, error: waitlistError } = await supabase
        .from('waitlist')
        .select('*')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString())

      if (waitlistError) throw waitlistError

      // Mettre à jour les stats
      setStats({
        totalUsers: profilesData.length,
        newUsersToday: newUsers.length,
        totalLeads: leadsData?.length || 0,
        activeUsers: activeUsers.size,
        totalRevenue: periodRevenue,
        totalViews: (leadsData?.length || 0) * 3, // Estimation basée sur les leads
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
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Erreur lors du chargement des statistiques"
      })
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

    // Écouter les changements sur la table payments
    const paymentsChannel = supabase
      .channel('public:payments')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'payments' },
        () => {
          console.log('Payments updated, refreshing stats...')
          fetchStats()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(waitlistChannel)
      supabase.removeChannel(profilesChannel)
      supabase.removeChannel(paymentsChannel)
    }
  }, [dateRange])

  return { stats, chartData, isLoading, lastUpdate }
}