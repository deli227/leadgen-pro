import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowUpCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"

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

  const handleUpgrade = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId: 'price_1QV8EyB0B6nBBCbUWZIuAQ8q' },
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-medium text-primary-light">Passez au plan Pro</h3>
              <p className="text-sm text-primary-light/70">
                Obtenez plus de leads et des fonctionnalités avancées
              </p>
            </div>
            <Button
              onClick={handleUpgrade}
              className="bg-gradient-to-r from-primary to-primary-dark text-white border-none hover:opacity-90"
            >
              <ArrowUpCircle className="mr-2 h-4 w-4" />
              Upgrader maintenant
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}