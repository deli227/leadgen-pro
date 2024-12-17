import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { supabase } from "@/integrations/supabase/client"
import { StatsGrid } from "@/components/admin/StatsGrid"
import { UsersChart } from "@/components/admin/UsersChart"
import { useAdminCheck } from "@/hooks/useAdminCheck"
import { Navigate } from "react-router-dom"
import { toast } from "sonner"

interface ChartData {
  date: string
  users: number
  waitlist: number
}

export function AdminDashboard() {
  const { data: isAdmin, isLoading: isCheckingAdmin } = useAdminCheck();
  const [stats, setStats] = useState({
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
      const todayISOString = today.toISOString()

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

  // Configuration des mises à jour en temps réel
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

  if (isCheckingAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAdmin) {
    toast.error("Accès non autorisé")
    return <Navigate to="/" replace />
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-dark via-[#1A1F2C] to-black">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-primary-light">Tableau de bord administrateur</h1>
            <p className="text-sm text-primary-light/70">
              Dernière mise à jour: {lastUpdate.toLocaleString()}
            </p>
          </div>
          
          <StatsGrid stats={stats} />

          <Card className="p-6 bg-black/40 border-primary/20">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-primary-light">Évolution des inscriptions</h2>
              <UsersChart data={chartData} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}