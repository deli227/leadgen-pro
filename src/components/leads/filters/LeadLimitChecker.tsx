import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"

interface LeadLimitCheckerProps {
  requestedLeadCount: number
  onValidation: () => void
}

export async function checkLeadLimit(userId: string, requestedLeadCount: number): Promise<{
  isAllowed: boolean
  limit: number
}> {
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_type')
    .eq('id', userId)
    .single()

  if (!profile) {
    throw new Error("Impossible de récupérer votre profil.")
  }

  const { data: limits } = await supabase
    .from('subscription_limits')
    .select('monthly_leads_limit')
    .eq('subscription_type', profile.subscription_type)
    .single()

  if (!limits) {
    throw new Error("Impossible de récupérer vos limites.")
  }

  return {
    isAllowed: requestedLeadCount <= limits.monthly_leads_limit,
    limit: limits.monthly_leads_limit
  }
}

export function LeadLimitChecker({ requestedLeadCount, onValidation }: LeadLimitCheckerProps) {
  const [showLimitDialog, setShowLimitDialog] = useState(false)
  const [userLimit, setUserLimit] = useState(0)

  const handleGenerateClick = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        toast.error("Erreur d'authentification")
        return
      }

      const { isAllowed, limit } = await checkLeadLimit(session.user.id, requestedLeadCount)

      if (!isAllowed) {
        setUserLimit(limit)
        setShowLimitDialog(true)
        return
      }

      onValidation()
    } catch (error: any) {
      toast.error("Erreur", {
        description: error.message
      })
    }
  }

  return (
    <>
      <button
        onClick={handleGenerateClick}
        className="ml-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Générer les leads
      </button>

      <AlertDialog open={showLimitDialog} onOpenChange={setShowLimitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Limite de leads dépassée</AlertDialogTitle>
            <AlertDialogDescription>
              Votre abonnement actuel vous permet de générer uniquement {userLimit} leads.
              Veuillez ajuster le nombre de leads ou passer à un plan supérieur pour en générer davantage.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowLimitDialog(false)}>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              window.location.href = "/#pricing-section"
            }}>
              Passer au premium
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}