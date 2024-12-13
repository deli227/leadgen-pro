import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowUpCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { plans } from "../pricing/pricingData"

interface LeadsStatsProps {
  dailyLeadsLeft: number
  monthlyLeadsLeft: number
  totalDailyLeads: number
  totalMonthlyLeads: number
  subscriptionType?: 'free' | 'pro' | 'enterprise'
}

export function LeadsStats({ 
  dailyLeadsLeft, 
  monthlyLeadsLeft, 
  totalDailyLeads, 
  totalMonthlyLeads,
  subscriptionType = 'free'
}: LeadsStatsProps) {
  const { toast } = useToast()

  const handleUpgrade = async (priceId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId },
      })

      if (error) throw error
      if (data?.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Erreur:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de créer la session de paiement. Veuillez réessayer.",
      })
    }
  }

  const upgradeOptions = plans.filter(plan => plan.type !== 'free')

  return (
    <div className="grid gap-4 md:grid-cols-2 mb-8">
      <Card className="p-4 bg-black/40 backdrop-blur-sm border-primary/10">
        <div className="flex flex-col space-y-3">
          <h3 className="text-sm font-medium text-primary-light/70">Leads quotidiens</h3>
          <div className="flex items-center justify-between text-xs text-primary-light/70">
            <span>Restants aujourd'hui</span>
            <span>{dailyLeadsLeft} / {totalDailyLeads}</span>
          </div>
          <Progress value={(dailyLeadsLeft / totalDailyLeads) * 100} className="h-1.5 bg-primary/10" />
        </div>
      </Card>

      <Card className="p-4 bg-black/40 backdrop-blur-sm border-primary/10">
        <div className="flex flex-col space-y-3">
          <h3 className="text-sm font-medium text-primary-light/70">Leads mensuels</h3>
          <div className="flex items-center justify-between text-xs text-primary-light/70">
            <span>Restants ce mois</span>
            <span>{monthlyLeadsLeft} / {totalMonthlyLeads}</span>
          </div>
          <Progress value={(monthlyLeadsLeft / totalMonthlyLeads) * 100} className="h-1.5 bg-primary/10" />
        </div>
      </Card>

      {subscriptionType === 'free' && (
        <Card className="md:col-span-2 p-4 bg-black/40 backdrop-blur-sm border-primary/10">
          <div className="flex flex-col space-y-4">
            <div className="text-center">
              <h3 className="text-sm font-medium text-primary-light/70">Passez à un plan supérieur</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {upgradeOptions.map((plan) => (
                <div key={plan.type} className="flex items-center justify-between p-3 rounded-lg bg-black/20 space-x-4">
                  <div>
                    <h4 className="text-sm font-medium text-primary-light">{plan.name}</h4>
                    <p className="text-xs text-primary-light/70">{plan.price}</p>
                  </div>
                  <Button
                    onClick={() => handleUpgrade(plan.priceId!)}
                    className="bg-primary/20 hover:bg-primary/30 text-primary-light text-xs px-3 py-1 h-auto"
                  >
                    <ArrowUpCircle className="mr-1 h-3 w-3" />
                    Upgrade
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}