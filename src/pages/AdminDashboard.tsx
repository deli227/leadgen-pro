import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { StatsGrid } from "@/components/admin/StatsGrid"
import { UsersChart } from "@/components/admin/UsersChart"
import { useAdminCheck } from "@/hooks/useAdminCheck"
import { Navigate } from "react-router-dom"
import { toast } from "sonner"
import { useStats } from "@/hooks/useStats"
import { DateRangeSelector } from "@/components/admin/DateRangeSelector"

export function AdminDashboard() {
  const { data: isAdmin, isLoading: isCheckingAdmin } = useAdminCheck()
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: new Date(),
    end: new Date()
  })
  
  const { stats, chartData, isLoading, lastUpdate } = useStats(dateRange)

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
            <div className="flex flex-col md:flex-row items-center gap-4">
              <DateRangeSelector 
                onRangeChange={setDateRange}
                onPeriodChange={(period) => {
                  // La période est déjà gérée dans le composant DateRangeSelector
                  console.log("Période sélectionnée:", period)
                }}
              />
              <p className="text-sm text-primary-light/70">
                Dernière mise à jour: {lastUpdate.toLocaleString()}
              </p>
            </div>
          </div>
          
          <StatsGrid stats={stats} />

          <div className="p-6 bg-black/40 rounded-lg border border-primary/20">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-primary-light">Évolution des inscriptions</h2>
              <UsersChart data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}