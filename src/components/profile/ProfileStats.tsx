import { Card } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

interface ProfileStatsProps {
  profile: any
  limits: any
}

export function ProfileStats({ profile, limits }: ProfileStatsProps) {
  const monthlyPercentage = profile ? 
    (profile.leads_generated_this_month / (limits?.monthly_leads_limit || 1)) * 100 : 0

  return (
    <Card className="p-6 bg-gradient-to-br from-secondary-dark via-secondary-dark/95 to-secondary-dark/90 border border-primary/20 rounded-xl backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <BarChart3 className="w-6 h-6 text-primary" />
        </div>
        <div className="space-y-3 w-full">
          <h2 className="text-lg font-semibold text-primary-light">Statistiques</h2>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-primary-light/70">Leads générés aujourd'hui</span>
              <span className="text-primary-light">{profile?.leads_generated_today || 0}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-primary-light/70">Leads générés ce mois</span>
              <span className="text-primary-light">
                {profile?.leads_generated_this_month || 0} / {limits?.monthly_leads_limit || 0}
                <span className="text-xs ml-1 text-primary-light/50">
                  ({Math.round(monthlyPercentage)}%)
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}