import { Users, UserPlus, Database, TrendingUp, DollarSign, Eye } from "lucide-react"
import { StatsCard } from "./StatsCard"

interface StatsGridProps {
  stats: {
    totalUsers: number
    newUsersToday: number
    totalLeads: number
    activeUsers: number
    totalRevenue: number
    totalViews: number
    waitlistCount: number
  }
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-7 gap-4 mb-8">
      <StatsCard
        icon={Users}
        label="Utilisateurs totaux"
        value={stats.totalUsers}
        className="sm:col-span-2 lg:col-span-1"
      />
      <StatsCard
        icon={UserPlus}
        label="Nouveaux aujourd'hui"
        value={stats.newUsersToday}
      />
      <StatsCard
        icon={Database}
        label="Leads générés"
        value={stats.totalLeads}
      />
      <StatsCard
        icon={TrendingUp}
        label="Utilisateurs actifs"
        value={stats.activeUsers}
      />
      <StatsCard
        icon={DollarSign}
        label="Revenu total"
        value={stats.totalRevenue}
        formatter={(value) => `${value.toFixed(2)}€`}
      />
      <StatsCard
        icon={Eye}
        label="Vues totales"
        value={stats.totalViews}
      />
      <StatsCard
        icon={UserPlus}
        label="Inscrits Waitlist"
        value={stats.waitlistCount}
      />
    </div>
  )
}