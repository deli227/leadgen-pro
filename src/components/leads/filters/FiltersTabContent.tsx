import { Lead } from "@/types/leads"
import { LeadFilters } from "@/types/filters"
import { LeadCountSlider } from "./LeadCountSlider"
import { IndustrySelect } from "./IndustrySelect"
import { LocationFilters } from "./LocationFilters"
import { FilterLeadActions } from "./FilterLeadActions"
import { LeadsList } from "./LeadsList"
import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface FiltersTabContentProps {
  filters: LeadFilters
  setFilters: (filters: LeadFilters) => void
  leads: Lead[]
  onAddToAnalytics: (lead: Lead) => void
  onAddToExport: (lead: Lead) => void
  onLocalRemove: (leadId: string) => void
  onError: (error: any) => void
}

export function FiltersTabContent({
  filters,
  setFilters,
  leads,
  onAddToAnalytics,
  onAddToExport,
  onLocalRemove,
  onError
}: FiltersTabContentProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    try {
      setIsGenerating(true)

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) throw new Error('Non authentifié')

      const response = await supabase.functions.invoke('generate-leads-with-ai', {
        body: { filters, userId: session.user.id }
      })

      if (!response.data.success) {
        onError(response.data)
        return
      }

      toast({
        title: "Succès",
        description: "Les leads ont été générés avec succès.",
      })

    } catch (error) {
      console.error('Erreur lors de la génération:', error)
      onError(error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6">
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

        <FilterLeadActions
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />
      </div>

      <LeadsList
        leads={leads}
        onAddToAnalytics={onAddToAnalytics}
        onAddToExport={onAddToExport}
        onLocalRemove={onLocalRemove}
      />
    </div>
  )
}