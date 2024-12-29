import { LocationFilters } from "./LocationFilters"
import { IndustrySelect } from "./IndustrySelect"
import { LeadCountSlider } from "./LeadCountSlider"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { LeadsList } from "../shared/LeadsList"
import { motion } from "framer-motion"
import { useState } from "react"
import { Lead } from "@/types/leads"
import { LeadFilters } from "@/types/filters"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
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

interface FiltersTabContentProps {
  filters: LeadFilters
  setFilters: (filters: LeadFilters) => void
  leads: Lead[]
  onAddToAnalytics: (lead: Lead) => void
  onLocalRemove?: (leadId: string) => void
}

export function FiltersTabContent({ 
  filters, 
  setFilters, 
  leads, 
  onAddToAnalytics,
  onLocalRemove
}: FiltersTabContentProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [showLimitDialog, setShowLimitDialog] = useState(false)
  const [userLimit, setUserLimit] = useState(0)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const handleGenerateLeads = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        toast.error("Erreur d'authentification", {
          description: "Veuillez vous reconnecter pour générer des leads."
        })
        navigate('/auth')
        return
      }

      // Vérifier la limite de l'utilisateur
      const { data: profile } = await supabase
        .from('profiles')
        .select('subscription_type')
        .eq('id', session.user.id)
        .single()

      if (!profile) {
        toast.error("Erreur de profil", {
          description: "Impossible de récupérer votre profil."
        })
        return
      }

      const { data: limits } = await supabase
        .from('subscription_limits')
        .select('monthly_leads_limit')
        .eq('subscription_type', profile.subscription_type)
        .single()

      if (!limits) {
        toast.error("Erreur de limites", {
          description: "Impossible de récupérer vos limites."
        })
        return
      }

      if (filters.leadCount > limits.monthly_leads_limit) {
        setUserLimit(limits.monthly_leads_limit)
        setShowLimitDialog(true)
        return
      }

      setIsGenerating(true)

      const { data, error } = await supabase.functions.invoke('generate-leads-with-ai', {
        body: { 
          filters,
          userId: session.user.id 
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      })

      if (error) {
        console.error('Erreur détaillée:', error)
        toast.error("Erreur de génération", {
          description: error.message || "Une erreur est survenue lors de la génération des leads."
        })
        return
      }

      if (data?.limitReached) {
        toast.error("Limite de leads atteinte", {
          description: "Vous avez atteint votre limite de leads pour ce mois. Passez à un plan supérieur pour générer plus de leads.",
          action: {
            label: "Passer au premium",
            onClick: () => window.location.href = "/#pricing-section"
          },
          duration: 10000
        })
        return
      }

      if (!data?.success) {
        toast.error("Erreur de génération", {
          description: "La réponse de l'API est invalide. Veuillez réessayer."
        })
        return
      }

      // Forcer une mise à jour immédiate des données
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['leads', session.user.id] }),
        queryClient.invalidateQueries({ queryKey: ['profile', session.user.id] })
      ])

      toast.success("Génération réussie", {
        description: "Les leads ont été générés avec succès."
      })

    } catch (error: any) {
      console.error('Erreur complète:', error)
      toast.error("Erreur système", {
        description: "Une erreur inattendue est survenue. Veuillez réessayer plus tard."
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDelete = async (lead: Lead) => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        toast.error("Erreur d'authentification", {
          description: "Veuillez vous reconnecter pour supprimer des leads."
        })
        navigate('/auth')
        return
      }

      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', lead.id)

      if (error) {
        console.error('Erreur lors de la suppression:', error)
        toast.error("Erreur lors de la suppression du lead")
        return
      }

      await queryClient.invalidateQueries({ queryKey: ['leads'] })
      
      toast.success("Lead supprimé avec succès")
      
      if (onLocalRemove) {
        onLocalRemove(lead.id)
      }
    } catch (error) {
      console.error('Erreur système lors de la suppression:', error)
      toast.error("Une erreur est survenue lors de la suppression")
    }
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-black/80 to-secondary-dark/80 p-8 rounded-b-xl border border-primary/10 shadow-xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-wrap gap-4"
      >
        <LocationFilters 
          country={filters.country}
          city={filters.city}
          onCountryChange={(value) => {
            setFilters({ ...filters, country: value, city: "all" })
          }}
          onCityChange={(value) => setFilters({ ...filters, city: value })}
        />
        
        <IndustrySelect 
          value={filters.industry}
          onChange={(value) => setFilters({ ...filters, industry: value })}
        />

        <Button
          onClick={handleGenerateLeads}
          disabled={isGenerating}
          className="ml-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Génération...
            </>
          ) : (
            'Générer les leads'
          )}
        </Button>
      </motion.div>

      <LeadCountSlider 
        value={filters.leadCount}
        onChange={(value) => setFilters({ ...filters, leadCount: value })}
      />

      <LeadsList 
        leads={leads} 
        onAddToAnalytics={onAddToAnalytics}
        onDelete={handleDelete}
        showActions={true}
        filterView={true}
      />

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
    </div>
  )
}