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
    console.info("Session trouvée:", session)

    try {
      const params = {
        search: filters.search,
        leadCount: filters.leadCount,
        industry: filters.industry,
        country: filters.country,
        city: filters.city,
        userId: session.user.id
      }

      console.info("Envoi des paramètres à generate-leads:", params)

      const { data, error } = await supabase.functions.invoke('generate-leads-with-ai', {
        body: params
      })

      console.info("Réponse de generate-leads:", { data, error })

      if (error) {
        console.error("Erreur détaillée:", error)
        throw error
      }

      if (!data?.leads || !Array.isArray(data.leads)) {
        throw new Error("Format de réponse invalide")
      }

      // Invalidate the leads query to trigger a refresh
      await queryClient.invalidateQueries({ queryKey: ['leads'] })
      
      toast.success(`${data.leads.length} leads ont été générés avec succès`)
    } catch (error: any) {
      console.error("Erreur lors de la génération des leads:", error)
      toast.error(error.message || "Erreur lors de la génération des leads")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <SearchInput 
          value={filters.search} 
          onChange={(value) => setFilters({ ...filters, search: value })} 
        />
        
        <LeadCountSlider 
          value={filters.leadCount} 
          onChange={(value) => setFilters({ ...filters, leadCount: value })} 
        />
        
        <IndustrySelect 
          value={filters.industry} 
          onChange={(value) => setFilters({ ...filters, industry: value })} 
        />
        
        <LocationFilters 
          country={filters.country}
          city={filters.city}
          onCountryChange={(value) => setFilters({ ...filters, country: value })}
          onCityChange={(value) => setFilters({ ...filters, city: value })}
        />

        <Button 
          onClick={handleGenerateLeads} 
          className="w-full"
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