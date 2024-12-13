import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Loader2, Mail, MapPin, Phone } from "lucide-react"
import { SearchInput } from "./filters/SearchInput"
import { LocationFilters } from "./filters/LocationFilters"
import { IndustrySelect } from "./filters/IndustrySelect"
import { LeadCountSlider } from "./filters/LeadCountSlider"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useState } from "react"
import { LeadsAnalytics } from "./LeadsAnalytics"
import { ScrollArea } from "@/components/ui/scroll-area"

interface LeadsFiltersProps {
  filters: {
    search: string
    leadCount: number
    industry: string
    country: string
    city: string
  }
  setFilters: (filters: any) => void
  leads: any[]
  analyticsLeads: any[]
  onAddToAnalytics: (lead: any) => void
  onAddToExport: (lead: any) => void
}

export function LeadsFilters({ 
  filters, 
  setFilters, 
  leads,
  analyticsLeads,
  onAddToAnalytics,
  onAddToExport
}: LeadsFiltersProps) {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateLeads = async () => {
    try {
      setIsGenerating(true)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Non authentifié')

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) throw new Error('Session non trouvée')

      const response = await supabase.functions.invoke('generate-leads', {
        body: { filters },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      })

      if (response.error) throw response.error

      toast({
        title: "Génération réussie",
        description: "Les leads ont été générés avec succès.",
      })

      window.location.reload()
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
      <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-black to-secondary-dark border border-primary-light/20 rounded-t-lg overflow-hidden">
        <TabsTrigger 
          value="filters" 
          className="relative text-primary-light data-[state=active]:bg-black/60 data-[state=active]:text-primary-light group transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            Filtres
            <ChevronRight className="h-4 w-4 transition-transform group-data-[state=active]:rotate-90" />
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-data-[state=active]:scale-x-100 transition-transform" />
        </TabsTrigger>
        <TabsTrigger 
          value="analytics" 
          className="relative text-primary-light data-[state=active]:bg-black/60 data-[state=active]:text-primary-light group transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            Analytiques
            <ChevronRight className="h-4 w-4 transition-transform group-data-[state=active]:rotate-90" />
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-data-[state=active]:scale-x-100 transition-transform" />
        </TabsTrigger>
        <TabsTrigger 
          value="search" 
          className="relative text-primary-light data-[state=active]:bg-black/60 data-[state=active]:text-primary-light group transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            Recherche
            <ChevronRight className="h-4 w-4 transition-transform group-data-[state=active]:rotate-90" />
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-data-[state=active]:scale-x-100 transition-transform" />
        </TabsTrigger>
        <TabsTrigger 
          value="export" 
          className="relative text-primary-light data-[state=active]:bg-black/60 data-[state=active]:text-primary-light group transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            Export
            <ChevronRight className="h-4 w-4 transition-transform group-data-[state=active]:rotate-90" />
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-data-[state=active]:scale-x-100 transition-transform" />
        </TabsTrigger>
      </TabsList>

      <TabsContent value="filters" className="space-y-6 bg-gradient-to-br from-black/80 to-secondary-dark/80 p-6 rounded-lg border border-primary/10">
        <div className="flex flex-wrap gap-4">
          <LocationFilters 
            country={filters.country}
            city={filters.city}
            onCountryChange={(value) => {
              console.log("Changement de pays dans LeadsFilters:", value)
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
            className="ml-auto bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark text-white shadow-lg shadow-primary/20 transition-all duration-300"
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

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-primary-light mb-4">Leads générés</h3>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {leads.map(lead => (
                <div key={lead.id} className="p-4 border border-primary/20 rounded-lg bg-black/40">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-primary-light font-medium">{lead.company}</h4>
                      <p className="text-sm text-primary-light/70">{lead.industry}</p>
                    </div>
                    <Button
                      onClick={() => onAddToAnalytics(lead)}
                      variant="outline"
                      size="sm"
                      className="bg-gradient-to-r from-primary to-primary-dark text-white border-none hover:opacity-90"
                    >
                      Ajouter aux analytiques
                    </Button>
                  </div>
                  
                  <div className="space-y-2 text-sm text-primary-light/80">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {lead.email}
                    </div>
                    {lead.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {lead.phone}
                      </div>
                    )}
                    {lead.address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {lead.address}
                      </div>
                    )}
                  </div>

                  {(lead.socialMedia?.linkedin || lead.socialMedia?.twitter) && (
                    <div className="mt-3 flex gap-3">
                      {lead.socialMedia.linkedin && (
                        <a 
                          href={lead.socialMedia.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary-light/70 hover:text-primary-light"
                        >
                          LinkedIn
                        </a>
                      )}
                      {lead.socialMedia.twitter && (
                        <a 
                          href={lead.socialMedia.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary-light/70 hover:text-primary-light"
                        >
                          Twitter
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </TabsContent>

      <TabsContent value="analytics" className="space-y-4 bg-gradient-to-br from-black/80 to-secondary-dark/80 p-6 rounded-lg border border-primary/10">
        <LeadsAnalytics leads={analyticsLeads} onAddToExport={onAddToExport} />
      </TabsContent>

      <TabsContent value="search" className="space-y-4 bg-gradient-to-br from-black/80 to-secondary-dark/80 p-6 rounded-lg border border-primary/10">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary-light">Rechercher une entreprise</h3>
          <SearchInput 
            value={filters.search}
            onChange={(value) => setFilters({ ...filters, search: value })}
          />
        </div>
      </TabsContent>

      <TabsContent value="export" className="space-y-4 bg-gradient-to-br from-black/80 to-secondary-dark/80 p-6 rounded-lg border border-primary/10">
        <div className="p-6 border border-primary/20 rounded-lg bg-black/40">
          <h3 className="text-lg font-semibold text-primary-light mb-2">Export des données</h3>
          <p className="text-primary-light/70">
            Les options d'export seront disponibles prochainement.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}