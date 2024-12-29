import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Database } from "@/integrations/supabase/types"
import { UpgradeButton } from "../buttons/UpgradeButton"
import { AlertTriangle } from "lucide-react"

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
  const isExhausted = monthlyLeadsLeft <= 0

  return (
    <div className="grid gap-4 px-2 sm:px-0">
      <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg p-4 sm:p-6 bg-gradient-to-br from-secondary-dark via-secondary-dark/95 to-secondary-dark/90 border border-primary/20 rounded-xl backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent animate-gradient opacity-50" />
        <div className="relative space-y-3 sm:space-y-4 z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent">
              Leads mensuels restants
            </h3>
            <span className={`text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full ${
              isExhausted ? 'bg-red-500/10 text-red-400' : 
              isLow ? 'bg-yellow-500/10 text-yellow-400' : 
              'bg-primary/10 text-primary-light'
            }`}>
              {Math.round(percentage)}%
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm text-primary-light/80 gap-2">
            <span className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                isExhausted ? 'bg-red-500' : 
                isLow ? 'bg-yellow-500' : 
                'bg-primary'
              } animate-pulse`} />
              <span>{monthlyLeadsLeft} leads restants</span>
            </span>
            <span>{totalMonthlyLeads} leads au total</span>
          </div>
          
          <Progress
            value={percentage}
            className={`h-1.5 sm:h-2 transition-all duration-300 ${
              isExhausted ? 'bg-red-500/20' :
              isLow ? 'bg-yellow-500/20' : 
              'bg-primary/20'
            }`}
          />
          
          {isExhausted && (
            <div className="flex items-center gap-2 p-2 sm:p-3 bg-red-500/10 rounded-lg border border-red-500/20 text-red-400 text-xs sm:text-sm">
              <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Vous avez atteint votre limite de leads pour ce mois</span>
            </div>
          )}
          
          {(subscriptionType === "free" || isLow || isExhausted) && (
            <div className="flex justify-center pt-2">
              <UpgradeButton 
                className="transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:max-w-[200px]" 
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}