import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LeadsList } from "./LeadsList"
import { LocationFilters } from "./LocationFilters"
import { IndustrySelect } from "./IndustrySelect"
import { LeadCountSlider } from "./LeadCountSlider"
import { SearchInput } from "./SearchInput"
import { useSessionData } from "@/hooks/useSessionData"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { Lead } from "@/types/leads"

interface FiltersTabContentProps {
  filters: {
    search: string
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
  const { data: session } = useSessionData()
  const queryClient = useQueryClient()
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateLeads = async () => {
    if (!session?.user) {
      toast.error("Vous devez être connecté pour générer des leads")
      return
    }

    setIsGenerating(true)
    
    try {
      toast.error("Fonctionnalité temporairement désactivée")
    } catch (error: any) {
      console.error("Erreur lors de la génération des leads:", error)
      toast.error(error.message || "Erreur lors de la génération des leads")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-black/80 to-secondary-dark/80 p-8 rounded-b-xl border border-primary/10 shadow-xl">
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-black/40 border border-primary/20">
          <p className="text-primary-light/70 mb-4">
            Recherchez une entreprise par son nom ou son secteur d'activité.
          </p>
          <SearchInput 
            value={filters.search} 
            onChange={(value) => setFilters({ ...filters, search: value })} 
          />
        </div>
        
        <div className="p-4 rounded-lg bg-black/40 border border-primary/20">
          <p className="text-primary-light/70 mb-4">
            Ajustez le nombre de leads à générer.
          </p>
          <LeadCountSlider 
            value={filters.leadCount} 
            onChange={(value) => setFilters({ ...filters, leadCount: value })} 
          />
        </div>
        
        <div className="p-4 rounded-lg bg-black/40 border border-primary/20">
          <p className="text-primary-light/70 mb-4">
            Sélectionnez le secteur d'activité pour affiner votre recherche.
          </p>
          <IndustrySelect 
            value={filters.industry} 
            onChange={(value) => setFilters({ ...filters, industry: value })} 
          />
        </div>
        
        <div className="p-4 rounded-lg bg-black/40 border border-primary/20">
          <p className="text-primary-light/70 mb-4">
            Filtrez par localisation.
          </p>
          <LocationFilters 
            country={filters.country}
            city={filters.city}
            onCountryChange={(value) => setFilters({ ...filters, country: value })}
            onCityChange={(value) => setFilters({ ...filters, city: value })}
          />
        </div>

        <Button 
          onClick={handleGenerateLeads} 
          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          disabled={isGenerating}
        >
          {isGenerating ? "Génération en cours..." : "Générer des leads"}
        </Button>
      </div>

      <LeadsList 
        leads={leads} 
        onAddToAnalytics={onAddToAnalytics} 
      />
    </div>
  )
}