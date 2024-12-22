import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { LeadsAnalytics } from "./LeadsAnalytics"
import { FiltersTabContent } from "./filters/FiltersTabContent"
import { ExportTabContent } from "./filters/ExportTabContent"
import { SearchInput } from "./filters/SearchInput"
import { LocationFilters } from "./filters/LocationFilters"
import { IconButton } from "../buttons/IconButton"
import { Search } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { IndustrySelect } from "./filters/IndustrySelect"

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
  exportLeads: any[]
  onRemoveFromExport: (leadId: number) => void
}

export function LeadsFilters({ 
  filters, 
  setFilters, 
  leads,
  analyticsLeads,
  onAddToAnalytics,
  onAddToExport,
  exportLeads,
  onRemoveFromExport
}: LeadsFiltersProps) {
  const handleSearch = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        toast.error("Erreur d'authentification", {
          description: "Veuillez vous connecter pour générer des leads"
        })
        return
      }

      console.log('Génération de leads pour utilisateur:', session.user.id, 'avec filtres:', filters)

      const response = await supabase.functions.invoke('generate-leads', {
        body: { 
          ...filters,
          userId: session.user.id  // Ensure user ID is included
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      })

      if (response.error) {
        console.error('Erreur lors de la génération:', response.error)
        throw response.error
      }

      console.log('Leads générés avec succès')
      toast.success("Recherche lancée avec succès")
      window.location.reload()
    } catch (error) {
      console.error('Erreur:', error)
      toast.error("Impossible de lancer la recherche. Veuillez réessayer.")
    }
  }

  return (
    <Tabs defaultValue="filters" className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-black to-secondary-dark border border-primary-light/20 rounded-t-xl overflow-hidden shadow-lg">
        <TabsTrigger 
          value="filters" 
          className="relative text-primary-light data-[state=active]:bg-black/60 data-[state=active]:text-primary-light group transition-all duration-300"
        >
          <span className="flex items-center gap-2 text-primary-light">
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
          <span className="flex items-center gap-2 text-primary-light">
            Analytiques
            <ChevronRight className="h-4 w-4 transition-transform group-data-[state=active]:rotate-90" />
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-data-[state=active]:scale-x-100 transition-transform" />
        </TabsTrigger>
        <TabsTrigger 
          value="search" 
          className="relative text-primary-light data-[state=active]:bg-black/60 data-[state=active]:text-primary-light group transition-all duration-300"
        >
          <span className="flex items-center gap-2 text-primary-light">
            Recherche
            <ChevronRight className="h-4 w-4 transition-transform group-data-[state=active]:rotate-90" />
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-data-[state=active]:scale-x-100 transition-transform" />
        </TabsTrigger>
        <TabsTrigger 
          value="export" 
          className="relative text-primary-light data-[state=active]:bg-black/60 data-[state=active]:text-primary-light group transition-all duration-300"
        >
          <span className="flex items-center gap-2 text-primary-light">
            Export
            <ChevronRight className="h-4 w-4 transition-transform group-data-[state=active]:rotate-90" />
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-data-[state=active]:scale-x-100 transition-transform" />
        </TabsTrigger>
      </TabsList>

      <TabsContent value="filters">
        <FiltersTabContent 
          filters={filters}
          setFilters={setFilters}
          leads={leads}
          onAddToAnalytics={onAddToAnalytics}
        />
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
          <div className="p-4 rounded-lg bg-black/40 border border-primary/20">
            <p className="text-primary-light/70 mb-4">
              Entrez le nom de l'entreprise pour obtenir toutes les informations détaillées la concernant.
            </p>
            <div className="space-y-4">
              <SearchInput 
                value={filters.search}
                onChange={(value) => setFilters({ ...filters, search: value })}
              />
              <div className="flex justify-end">
                <IconButton
                  icon={Search}
                  label="Lancer la recherche"
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                />
              </div>
            </div>
          </div>

          <LocationFilters 
            country={filters.country}
            city={filters.city}
            onCountryChange={(value) => setFilters({ ...filters, country: value, city: "all" })}
            onCityChange={(value) => setFilters({ ...filters, city: value })}
          />

          <div className="p-4 rounded-lg bg-black/40 border border-primary/20">
            <p className="text-primary-light/70 mb-4">
              Sélectionnez le secteur d'activité pour affiner votre recherche.
            </p>
            <IndustrySelect 
              value={filters.industry}
              onChange={(value) => setFilters({ ...filters, industry: value })}
            />
          </div>
        </motion.div>
      </TabsContent>

      <TabsContent value="export" className="space-y-4 bg-gradient-to-br from-black/80 to-secondary-dark/80 p-8 rounded-b-xl border border-primary/10 shadow-xl">
        <ExportTabContent 
          exportLeads={exportLeads}
          onRemoveFromExport={onRemoveFromExport}
        />
      </TabsContent>
    </Tabs>
  )
}