import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Loader2, Globe, MapPin, Building } from "lucide-react"
import { SearchInput } from "./filters/SearchInput"
import { LocationFilters } from "./filters/LocationFilters"
import { IndustrySelect } from "./filters/IndustrySelect"
import { LeadCountSlider } from "./filters/LeadCountSlider"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useState } from "react"
import { LeadsAnalytics } from "./LeadsAnalytics"
import { LeadsList } from "./filters/LeadsList"
import { motion } from "framer-motion"

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
      <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-black to-secondary-dark border border-primary-light/20 rounded-t-xl overflow-hidden shadow-lg">
        <TabsTrigger 
          value="filters" 
          className="relative text-primary-light data-[state=active]:bg-black/60 data-[state=active]:text-primary-light group transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            Filtres
            <ChevronRight className="h-4 w-4 transition-transform group-data-[state=active]:rotate-90" />
          </span>
          <motion.span 
            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
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

      <TabsContent value="filters" className="space-y-6 bg-gradient-to-br from-black/80 to-secondary-dark/80 p-8 rounded-b-xl border border-primary/10 shadow-xl">
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

        <LeadsList leads={leads} onAddToAnalytics={onAddToAnalytics} />
      </TabsContent>

      <TabsContent value="analytics" className="space-y-4 bg-gradient-to-br from-black/80 to-secondary-dark/80 p-8 rounded-b-xl border border-primary/10 shadow-xl">
        <LeadsAnalytics leads={analyticsLeads} onAddToExport={onAddToExport} />
      </TabsContent>

      <TabsContent value="search" className="space-y-4 bg-gradient-to-br from-black/80 to-secondary-dark/80 p-8 rounded-b-xl border border-primary/10 shadow-xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2 text-primary-light">
            <Building className="h-5 w-5" />
            <h3 className="text-xl font-semibold">Rechercher une entreprise</h3>
          </div>
          
          <div className="p-4 rounded-lg bg-black/40 border border-primary/20">
            <p className="text-primary-light/70 mb-4">
              Entrez le nom de l'entreprise pour obtenir toutes les informations détaillées la concernant.
            </p>
            <SearchInput 
              value={filters.search}
              onChange={(value) => setFilters({ ...filters, search: value })}
            />
          </div>

          <div className="flex items-center gap-2 text-primary-light mt-8">
            <Globe className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Filtrer par localisation</h3>
          </div>

          <LocationFilters 
            country={filters.country}
            city={filters.city}
            onCountryChange={(value) => setFilters({ ...filters, country: value, city: "all" })}
            onCityChange={(value) => setFilters({ ...filters, city: value })}
          />
        </motion.div>
      </TabsContent>

      <TabsContent value="export" className="space-y-4 bg-gradient-to-br from-black/80 to-secondary-dark/80 p-8 rounded-b-xl border border-primary/10 shadow-xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 border border-primary/20 rounded-xl bg-black/40"
        >
          <h3 className="text-xl font-semibold text-primary-light mb-2">Export des données</h3>
          <p className="text-primary-light/70">
            Les options d'export seront disponibles prochainement.
          </p>
        </motion.div>
      </TabsContent>
    </Tabs>
  )
}