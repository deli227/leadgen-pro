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

  // Filter out the free plan and get upgrade options
  const upgradeOptions = plans.filter(plan => plan.type !== 'free')

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-6 bg-black/40 backdrop-blur-sm border-primary/20">
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-medium text-primary-light">Leads quotidiens</h3>
          <div className="flex items-center justify-between text-sm text-primary-light/70">
            <span>Restants aujourd'hui</span>
            <span>{dailyLeadsLeft} / {totalDailyLeads}</span>
          </div>
          <Progress value={(dailyLeadsLeft / totalDailyLeads) * 100} className="bg-primary/20" />
        </div>
      </Card>

      <Card className="p-6 bg-black/40 backdrop-blur-sm border-primary/20">
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-medium text-primary-light">Leads mensuels</h3>
          <div className="flex items-center justify-between text-sm text-primary-light/70">
            <span>Restants ce mois</span>
            <span>{monthlyLeadsLeft} / {totalMonthlyLeads}</span>
          </div>
          <Progress value={(monthlyLeadsLeft / totalMonthlyLeads) * 100} className="bg-primary/20" />
        </div>
      </Card>

      {subscriptionType === 'free' && (
        <Card className="md:col-span-2 p-6 bg-gradient-to-r from-primary/10 to-primary-dark/10 backdrop-blur-sm border-primary/20">
          <div className="flex flex-col space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-primary-light">Passez à un plan supérieur</h3>
              <p className="text-sm text-primary-light/70">
                Choisissez le plan qui correspond le mieux à vos besoins
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {upgradeOptions.map((plan) => (
                <div key={plan.type} className="flex flex-col items-center p-4 rounded-lg bg-black/20 space-y-3">
                  <h4 className="text-lg font-medium text-primary-light">{plan.name}</h4>
                  <p className="text-2xl font-bold text-primary">{plan.price}</p>
                  <p className="text-sm text-primary-light/70 text-center">{plan.description}</p>
                  <Button
                    onClick={() => handleUpgrade(plan.priceId!)}
                    className="w-full bg-gradient-to-r from-primary to-primary-dark text-white border-none hover:opacity-90"
                  >
                    <ArrowUpCircle className="mr-2 h-4 w-4" />
                    Choisir {plan.name}
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