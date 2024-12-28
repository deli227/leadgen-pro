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

interface FiltersTabContentProps {
  filters: LeadFilters
  setFilters: (filters: LeadFilters) => void
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

  const handleGenerateLeads = async () => {
    try {
      setIsGenerating(true)

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        toast.error("Erreur d'authentification", {
          description: "Veuillez vous reconnecter pour générer des leads."
        })
        return
      }

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

      if (!data?.success) {
        toast.error("Erreur de génération", {
          description: "La réponse de l'API est invalide. Veuillez réessayer."
        })
        return
      }

      toast.success("Génération réussie", {
        description: "Les leads ont été générés avec succès."
      })

      window.location.reload()
    } catch (error: any) {
      console.error('Erreur complète:', error)
      toast.error("Erreur système", {
        description: "Une erreur inattendue est survenue. Veuillez réessayer plus tard."
      })
    } finally {
      setIsGenerating(false)
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
        showActions={true}
        filterView={true}
      />
    </div>
  )
}