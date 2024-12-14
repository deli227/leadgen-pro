import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Database } from "@/integrations/supabase/types"
import { UpgradeButton } from "../buttons/UpgradeButton"

type SubscriptionType = Database["public"]["Enums"]["subscription_type"]

interface LeadsStatsProps {
  dailyLeadsLeft: number
  monthlyLeadsLeft: number
  totalDailyLeads: number
  totalMonthlyLeads: number
  subscriptionType: SubscriptionType
}

export function LeadsStats({
  dailyLeadsLeft,
  monthlyLeadsLeft,
  totalDailyLeads,
  totalMonthlyLeads,
  subscriptionType,
}: LeadsStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-4 md:p-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Leads quotidiens restants</h3>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{dailyLeadsLeft} leads restants</span>
            <span>{totalDailyLeads} leads au total</span>
          </div>
          <Progress
            value={(dailyLeadsLeft / totalDailyLeads) * 100}
            className="h-2"
          />
          {subscriptionType === "free" && (
            <UpgradeButton className="w-full mt-4" />
          )}
        </div>
      </Card>
      <Card className="p-4 md:p-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Leads mensuels restants</h3>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{monthlyLeadsLeft} leads restants</span>
            <span>{totalMonthlyLeads} leads au total</span>
          </div>
          <Progress
            value={(monthlyLeadsLeft / totalMonthlyLeads) * 100}
            className="h-2"
          />
          {subscriptionType === "free" && (
            <UpgradeButton className="w-full mt-4" />
          )}
        </div>
      </Card>
    </div>
  )
}