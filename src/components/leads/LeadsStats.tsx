import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LeadsStatsProps {
  dailyLeadsLeft: number
  monthlyLeadsLeft: number
  totalDailyLeads: number
  totalMonthlyLeads: number
}

export function LeadsStats({ 
  dailyLeadsLeft, 
  monthlyLeadsLeft,
  totalDailyLeads,
  totalMonthlyLeads 
}: LeadsStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-black/40 backdrop-blur-sm border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary-light">
            Leads quotidiens restants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary-light">{dailyLeadsLeft}</div>
          <p className="text-xs text-primary-light/70">
            sur {totalDailyLeads} leads quotidiens
          </p>
        </CardContent>
      </Card>
      <Card className="bg-black/40 backdrop-blur-sm border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary-light">
            Leads mensuels restants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary-light">{monthlyLeadsLeft}</div>
          <p className="text-xs text-primary-light/70">
            sur {totalMonthlyLeads} leads mensuels
          </p>
        </CardContent>
      </Card>
    </div>
  )
}