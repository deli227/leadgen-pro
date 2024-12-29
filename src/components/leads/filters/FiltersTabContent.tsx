import { Button } from "@/components/ui/button"
import { LeadCountSlider } from "./LeadCountSlider"
import { IndustrySelect } from "./IndustrySelect"
import { LocationFilters } from "./LocationFilters"
import { LeadsList } from "../shared/LeadsList"
import { Lead } from "@/types/leads"
import { useQuery } from "@tanstack/react-query"
import { useSessionData } from "@/hooks/useSessionData"
import { useProfileData } from "@/hooks/useProfileData"
import { useSubscriptionLimits } from "@/hooks/useSubscriptionLimits"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useState } from "react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"

interface FiltersTabContentProps {
  filters: {
    leadCount: number
    industry: string
    country: string
    city: string
  }
  setFilters: (filters: any) => void
  leads: Lead[]
  onAddToAnalytics: (lead: Lead) => void
}

export function FiltersTabContent({ 
  filters, 
  setFilters, 
  leads,
  onAddToAnalytics 
}: FiltersTabContentProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [showLimitDialog, setShowLimitDialog] = useState(false)
  const session = useSessionData()
  const { data: profile } = useProfileData(session.data)
  const { data: limits } = useSubscriptionLimits(profile?.subscription_type)

  const remainingLeads = limits?.monthly_leads_limit 
    ? limits.monthly_leads_limit - (profile?.leads_generated_this_month || 0)
    : 0

  const handleGenerateLeads = async () => {
    if (!session.data?.user?.id) {
      toast.error("Vous devez être connecté pour générer des leads")
      return
    }

    // Vérification si l'utilisateur a dépassé sa limite
    if (remainingLeads <= 0) {
      setShowLimitDialog(true)
      return
    }

    setIsGenerating(true)
    console.log("Envoi de la requête avec les filtres:", filters)

    try {
      const { data: functionData, error: functionError } = await supabase.functions.invoke('generate-leads-with-ai', {
        body: { 
          filters,
          userId: session.data.user.id,
          remainingLeads
        }
      })

      if (functionError) {
        throw new Error(`Erreur lors de la génération: ${functionError.message}`)
      }

      if (!functionData.success) {
        throw new Error("Échec de la génération des leads")
      }

      toast.success(`${filters.leadCount} leads générés avec succès`)

    } catch (error: any) {
      console.error("Erreur lors de la génération:", error)
      toast.error("Une erreur est survenue lors de la génération des leads")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4 bg-gradient-to-br from-black/80 to-secondary-dark/80 p-8 rounded-xl border border-primary/10 shadow-xl">
        <LeadCountSlider 
          value={filters.leadCount} 
          onChange={(value) => setFilters({ ...filters, leadCount: value })}
          maxValue={remainingLeads}
        />
        
        <IndustrySelect
          value={filters.industry}
          onChange={(value) => setFilters({ ...filters, industry: value })}
        />
        
        <LocationFilters
          country={filters.country}
          city={filters.city}
          onCountryChange={(value) => setFilters({ ...filters, country: value, city: "all" })}
          onCityChange={(value) => setFilters({ ...filters, city: value })}
        />

        <Button 
          onClick={handleGenerateLeads}
          disabled={isGenerating || filters.leadCount === 0}
          className="w-full bg-primary hover:bg-primary/90"
        >
          {isGenerating ? "Génération en cours..." : "Générer les leads"}
        </Button>

        {remainingLeads > 0 && (
          <p className="text-sm text-primary-light/70 text-center">
            Il vous reste {remainingLeads} leads à générer ce mois-ci
          </p>
        )}
      </div>

      <LeadsList 
        leads={leads}
        onAddToAnalytics={onAddToAnalytics}
        filterView
      />

      <AlertDialog open={showLimitDialog} onOpenChange={setShowLimitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Limite de génération atteinte</AlertDialogTitle>
            <AlertDialogDescription>
              Votre abonnement actuel vous permet de générer {limits?.monthly_leads_limit} leads par mois.
              Vous avez atteint votre limite mensuelle.
              Pour générer plus de leads, passez à un abonnement supérieur.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Fermer</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              window.location.href = '/pricing'
            }}>
              Voir les abonnements
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}