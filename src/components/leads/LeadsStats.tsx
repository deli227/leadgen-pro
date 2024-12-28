import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Database } from "@/integrations/supabase/types"
import { UpgradeButton } from "../buttons/UpgradeButton"

type SubscriptionType = Database["public"]["Enums"]["subscription_type"]

interface LeadsStatsProps {
  monthlyLeadsLeft: number
  totalMonthlyLeads: number
  subscriptionType: SubscriptionType
}

export function LeadsStats({
  monthlyLeadsLeft,
  totalMonthlyLeads,
  subscriptionType,
}: LeadsStatsProps) {
  return (
    <div className="grid gap-4">
      <Card className="p-4 md:p-6 bg-secondary-dark/80 border-primary/10">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-primary-light">Leads mensuels restants</h3>
          <div className="flex items-center justify-between text-sm text-primary-light/70">
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