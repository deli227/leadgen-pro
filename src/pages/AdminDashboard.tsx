import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Users, UserPlus, Database, TrendingUp } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

interface UserStats {
  totalUsers: number
  newUsersToday: number
  totalLeads: number
  activeUsers: number
}

interface ChartData {
  date: string
  users: number
}

export function AdminDashboard() {
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    newUsersToday: 0,
    totalLeads: 0,
    activeUsers: 0
  })
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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

        // Récupérer les utilisateurs actifs (ceux qui ont généré des leads ce mois-ci)
        const { count: activeUsers } = await supabase
          .from('profiles')
          .select('*', { count: 'exact' })
          .gt('leads_generated_this_month', 0)

        setStats({
          totalUsers: totalUsers || 0,
          newUsersToday: newUsersToday || 0,
          totalLeads: totalLeads || 0,
          activeUsers: activeUsers || 0
        })

        // Données pour le graphique
        const { data: userData } = await supabase
          .from('profiles')
          .select('created_at')
          .order('created_at')

        if (userData) {
          const groupedData = userData.reduce((acc: Record<string, number>, user) => {
            const date = new Date(user.created_at).toISOString().split('T')[0]
            acc[date] = (acc[date] || 0) + 1
            return acc
          }, {})

          const chartData = Object.entries(groupedData).map(([date, users]) => ({
            date,
            users
          }))

          setChartData(chartData)
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error)
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

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
        <h1 className="text-2xl font-bold mb-8 text-primary-light">Tableau de bord administrateur</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-black/40 border-primary/20">
            <div className="flex items-center space-x-4">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-primary-light/70">Utilisateurs totaux</p>
                <p className="text-2xl font-bold text-primary-light">{stats.totalUsers}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-black/40 border-primary/20">
            <div className="flex items-center space-x-4">
              <UserPlus className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-primary-light/70">Nouveaux aujourd'hui</p>
                <p className="text-2xl font-bold text-primary-light">{stats.newUsersToday}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-black/40 border-primary/20">
            <div className="flex items-center space-x-4">
              <Database className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-primary-light/70">Leads générés</p>
                <p className="text-2xl font-bold text-primary-light">{stats.totalLeads}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-black/40 border-primary/20">
            <div className="flex items-center space-x-4">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-primary-light/70">Utilisateurs actifs</p>
                <p className="text-2xl font-bold text-primary-light">{stats.activeUsers}</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-black/40 border-primary/20">
          <h2 className="text-xl font-semibold mb-4 text-primary-light">Évolution des inscriptions</h2>
          <div className="h-[400px]">
            <ChartContainer
              config={{
                users: {
                  theme: {
                    light: "hsl(var(--primary))",
                    dark: "hsl(var(--primary))",
                  },
                },
              }}
            >
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary) / 0.1)" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--primary-light) / 0.5)"
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis stroke="hsl(var(--primary-light) / 0.5)" />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null
                    return (
                      <ChartTooltipContent
                        payload={payload}
                        nameKey="name"
                        labelKey="date"
                        labelFormatter={(value) => new Date(value as string).toLocaleDateString()}
                      />
                    )
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  name="Utilisateurs"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary) / 0.2)"
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}