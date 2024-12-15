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

  const fetchStats = async () => {
    try {
      // Récupérer le nombre total d'utilisateurs
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })

      // Récupérer les nouveaux utilisateurs d'aujourd'hui
      const today = new Date().toISOString().split('T')[0]
      const { count: newUsersToday } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .gte('created_at', today)

      // Récupérer le nombre total de leads
      const { count: totalLeads } = await supabase
        .from('leads')
        .select('*', { count: 'exact' })

      // Récupérer les utilisateurs actifs
      const { count: activeUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .gt('leads_generated_this_month', 0)

      // Calculer le revenu total
      const { count: proUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .eq('subscription_type', 'pro')

      const monthlyRevenue = proUsers ? proUsers * 14.99 : 0

      // Récupérer le nombre total de vues
      const { count: totalViews } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })

      // Récupérer le nombre d'inscrits sur la waitlist
      const { count: waitlistCount } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact' })

      setStats({
        totalUsers: totalUsers || 0,
        newUsersToday: newUsersToday || 0,
        totalLeads: totalLeads || 0,
        activeUsers: activeUsers || 0,
        totalRevenue: monthlyRevenue,
        totalViews: (totalViews || 0) * 3,
        waitlistCount: waitlistCount || 0
      })

      // Données pour le graphique
      const { data: userData } = await supabase
        .from('profiles')
        .select('created_at')
        .order('created_at')

      const { data: waitlistData } = await supabase
        .from('waitlist')
        .select('created_at')
        .order('created_at')

      if (userData && waitlistData) {
        const groupedData: Record<string, { users: number; waitlist: number }> = {}

        // Regrouper les données des utilisateurs par date
        userData.forEach(user => {
          const date = new Date(user.created_at).toISOString().split('T')[0]
          if (!groupedData[date]) {
            groupedData[date] = { users: 0, waitlist: 0 }
          }
          groupedData[date].users++
        })

        // Regrouper les données de la waitlist par date
        waitlistData.forEach(entry => {
          const date = new Date(entry.created_at).toISOString().split('T')[0]
          if (!groupedData[date]) {
            groupedData[date] = { users: 0, waitlist: 0 }
          }
          groupedData[date].waitlist++
        })

        const chartData = Object.entries(groupedData).map(([date, data]) => ({
          date,
          users: data.users,
          waitlist: data.waitlist
        }))

        setChartData(chartData)
      }

      setIsLoading(false)
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error)
      toast.error("Erreur lors du chargement des statistiques")
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 24 * 60 * 60 * 1000)
    return () => clearInterval(interval)
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
            <p className="text-sm text-primary-light/70">Dernière mise à jour: {new Date().toLocaleString()}</p>
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