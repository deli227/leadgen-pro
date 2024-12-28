import { motion } from "framer-motion"
import { Search, Loader2 } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { SearchInput } from "./SearchInput"
import { LocationFilters } from "./LocationFilters"
import { IndustrySelect } from "./IndustrySelect"
import { IconButton } from "@/components/buttons/IconButton"
import { LeadFilters } from "@/types/filters"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useSessionData } from "@/hooks/useSessionData"

interface SearchTabContentProps {
  filters: LeadFilters
  setFilters: (filters: LeadFilters) => void
}

export function SearchTabContent({ filters, setFilters }: SearchTabContentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()
  const { data: session } = useSessionData()

  const handleSearch = async () => {
    try {
      setIsLoading(true)
      
      if (!session?.user?.id) {
        toast.error("Erreur d'authentification", {
          description: "Veuillez vous connecter pour générer des leads"
        })
        return
      }

      console.log('Envoi de la requête de génération avec les filtres:', filters)
      const { data: generatedData, error: generationError } = await supabase.functions.invoke('generate-leads-with-ai', {
        body: { 
          filters,
          userId: session.user.id
        }
      })

      if (generationError || !generatedData?.success) {
        console.error('Erreur lors de la génération:', generationError || generatedData?.error)
        toast.error("Erreur de génération", {
          description: "Une erreur est survenue lors de la génération des leads. Veuillez réessayer."
        })
        return
      }

      console.log('Leads générés avec succès:', generatedData.data)
      
      // Rafraîchir la liste des leads
      await queryClient.invalidateQueries({ queryKey: ['leads'] })

      toast.success("Génération réussie", {
        description: "Les leads ont été générés et sauvegardés avec succès."
      })
    } catch (error) {
      console.error('Erreur détaillée:', error)
      toast.error("Erreur système", {
        description: "Une erreur inattendue est survenue. Veuillez réessayer plus tard."
      })
    } finally {
      setIsLoading(false)
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
              icon={isLoading ? Loader2 : Search}
              label="Lancer la recherche"
              onClick={handleSearch}
              disabled={isLoading}
              className={`bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
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