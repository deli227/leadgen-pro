import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Loader2 } from "lucide-react"
import { SearchInput } from "./filters/SearchInput"
import { LocationFilters } from "./filters/LocationFilters"
import { IndustrySelect } from "./filters/IndustrySelect"
import { LeadCountSlider } from "./filters/LeadCountSlider"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useState } from "react"

interface LeadsFiltersProps {
  filters: {
    search: string
    leadCount: number
    industry: string
    country: string
    city: string
  }
  setFilters: (filters: any) => void
}

export function LeadsFilters({ filters, setFilters }: LeadsFiltersProps) {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateLeads = async () => {
    try {
      setIsGenerating(true)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Non authentifié')

      const response = await supabase.functions.invoke('generate-leads', {
        body: { filters }
      })

      if (response.error) throw response.error

      toast({
        title: "Génération réussie",
        description: "Les leads ont été générés avec succès.",
      })
    } catch (error) {
      console.error('Erreur:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de générer les leads. Veuillez réessayer.",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Tabs defaultValue="filters" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-black border border-primary-light rounded-t-lg overflow-hidden">
        <TabsTrigger 
          value="filters" 
          className="relative text-primary-light data-[state=active]:bg-secondary-dark data-[state=active]:text-primary-light group transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            Générer des leads
            <ChevronRight className="h-4 w-4 transition-transform group-data-[state=active]:rotate-90" />
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-light scale-x-0 group-data-[state=active]:scale-x-100 transition-transform" />
        </TabsTrigger>
        <TabsTrigger 
          value="analytics" 
          className="relative text-primary-light data-[state=active]:bg-secondary-dark data-[state=active]:text-primary-light group transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            Analytiques
            <ChevronRight className="h-4 w-4 transition-transform group-data-[state=active]:rotate-90" />
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-light scale-x-0 group-data-[state=active]:scale-x-100 transition-transform" />
        </TabsTrigger>
        <TabsTrigger 
          value="export" 
          className="relative text-primary-light data-[state=active]:bg-secondary-dark data-[state=active]:text-primary-light group transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            Export
            <ChevronRight className="h-4 w-4 transition-transform group-data-[state=active]:rotate-90" />
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-light scale-x-0 group-data-[state=active]:scale-x-100 transition-transform" />
        </TabsTrigger>
      </TabsList>

      <TabsContent value="filters" className="space-y-4 bg-black p-4 rounded-lg">
        <div className="flex flex-wrap gap-4">
          <SearchInput 
            value={filters.search}
            onChange={(value) => setFilters({ ...filters, search: value })}
          />
          
          <LocationFilters 
            country={filters.country}
            city={filters.city}
            onCountryChange={(value) => setFilters({ ...filters, country: value })}
            onCityChange={(value) => setFilters({ ...filters, city: value })}
          />
          
          <IndustrySelect 
            value={filters.industry}
            onChange={(value) => setFilters({ ...filters, industry: value })}
          />

          <Button
            onClick={handleGenerateLeads}
            disabled={isGenerating}
            className="ml-auto bg-primary hover:bg-primary-dark text-white"
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
        </div>

        <LeadCountSlider 
          value={filters.leadCount}
          onChange={(value) => setFilters({ ...filters, leadCount: value })}
        />
      </TabsContent>

      <TabsContent value="analytics" className="space-y-4 bg-black p-4 rounded-lg">
        <div className="p-4 border border-primary-light rounded-lg">
          <h3 className="text-lg font-semibold text-primary-light mb-2">Analytiques</h3>
          <p className="text-primary-light/70">
            Les analyses détaillées seront disponibles prochainement.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="export" className="space-y-4 bg-black p-4 rounded-lg">
        <div className="p-4 border border-primary-light rounded-lg">
          <h3 className="text-lg font-semibold text-primary-light mb-2">Export des données</h3>
          <p className="text-primary-light/70">
            Les options d'export seront disponibles prochainement.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}