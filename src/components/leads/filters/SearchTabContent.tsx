import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { SearchInput } from "./SearchInput"
import { LocationFilters } from "./LocationFilters"
import { IndustrySelect } from "./IndustrySelect"
import { IconButton } from "@/components/buttons/IconButton"
import { LeadFilters } from "@/types/filters"

interface SearchTabContentProps {
  filters: LeadFilters
  setFilters: (filters: LeadFilters) => void
}

export function SearchTabContent({ filters, setFilters }: SearchTabContentProps) {
  const handleSearch = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        toast.error("Erreur d'authentification", {
          description: "Veuillez vous connecter pour générer des leads"
        })
        return
      }

      const response = await supabase.functions.invoke('generate-leads-with-ai', {
        body: { 
          filters,
          userId: session.user.id
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      })

      if (response.error) {
        console.error('Erreur lors de la génération:', response.error)
        toast.error("Erreur de génération", {
          description: "Une erreur est survenue lors de la génération des leads. Veuillez réessayer."
        })
        return
      }

      if (!response.data?.success) {
        toast.error("Erreur de génération", {
          description: "La réponse du serveur est invalide. Veuillez réessayer."
        })
        return
      }

      toast.success("Recherche lancée avec succès", {
        description: "Les leads ont été générés et seront bientôt disponibles."
      })
      
      window.location.reload()
    } catch (error) {
      console.error('Erreur détaillée:', error)
      toast.error("Erreur système", {
        description: "Une erreur inattendue est survenue. Veuillez réessayer plus tard."
      })
    }
  }

  return (
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
  )
}