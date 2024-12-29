import { Card } from "@/components/ui/card"
import { Crown } from "lucide-react"
import { UpgradeButton } from "../buttons/UpgradeButton"

interface SubscriptionInfoProps {
  profile: any
  limits: any
}

export function SubscriptionInfo({ profile, limits }: SubscriptionInfoProps) {
  const getSubscriptionName = (type: string) => {
    switch (type) {
      case 'free':
        return 'Gratuit'
      case 'pro':
        return 'Pro'
      case 'enterprise':
        return 'Enterprise'
      default:
        return 'Inconnu'
    }
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-secondary-dark via-secondary-dark/95 to-secondary-dark/90 border border-primary/20 rounded-xl backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Crown className="w-6 h-6 text-primary" />
        </div>
        <div className="space-y-4 flex-1">
          <div>
            <h2 className="text-lg font-semibold text-primary-light">Abonnement actuel</h2>
            <p className="text-2xl font-bold mt-1 bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
              {getSubscriptionName(profile?.subscription_type)}
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-primary-light/70">Limite mensuelle de leads</span>
              <span className="text-primary-light">{limits?.monthly_leads_limit || 0}</span>
            </div>
          </div>

          {profile?.subscription_type === 'free' && (
            <div className="mt-6">
              <UpgradeButton className="w-full" />
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}