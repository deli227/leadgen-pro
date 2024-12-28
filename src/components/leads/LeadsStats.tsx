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
  const percentage = (monthlyLeadsLeft / totalMonthlyLeads) * 100
  const isLow = percentage < 20

  return (
    <div className="grid gap-4">
      <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg p-6 bg-gradient-to-br from-secondary-dark via-secondary-dark/95 to-secondary-dark/90 border border-primary/20 rounded-xl backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent animate-gradient opacity-50" />
        <div className="relative space-y-4 z-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent">
              Leads mensuels restants
            </h3>
            <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary-light">
              {Math.round(percentage)}%
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm text-primary-light/80">
            <span className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>{monthlyLeadsLeft} leads restants</span>
            </span>
            <span>{totalMonthlyLeads} leads au total</span>
          </div>
          
          <Progress
            value={percentage}
            className={`h-2 transition-all duration-300 ${
              isLow ? "bg-accent-dark/20" : "bg-primary/20"
            }`}
          />
          
          {subscriptionType === "free" && (
            <div className="flex justify-center pt-2">
              <UpgradeButton 
                className="transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] max-w-[200px]" 
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}