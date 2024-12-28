import { motion } from "framer-motion"
import { Search, Loader2 } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { SearchInput } from "./SearchInput"
import { LocationFilters } from "./LocationFilters"
import { IconButton } from "@/components/buttons/IconButton"
import { LeadFilters } from "@/types/filters"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useSessionData } from "@/hooks/useSessionData"
import { Lead } from "@/types/leads"

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
          description: "Veuillez vous connecter pour rechercher des entreprises"
        })
        return
      }

      console.log('Envoi de la requête de recherche avec les filtres:', filters)
      const { data: searchData, error: searchError } = await supabase.functions.invoke('search-company', {
        body: { 
          search: filters.search,
          country: filters.country,
          city: filters.city
        }
      })

      if (searchError || !searchData?.success) {
        console.error('Erreur lors de la recherche:', searchError || searchData?.error)
        toast.error("Erreur de recherche", {
          description: "Une erreur est survenue lors de la recherche de l'entreprise. Veuillez réessayer."
        })
        return
      }

      // Parsage des données JSON retournées par Perplexity
      const leadData = JSON.parse(searchData.data)
      console.log('Données de l\'entreprise:', leadData)

      // Sauvegarde du lead dans la base de données
      const { data: savedLead, error: saveError } = await supabase
        .from('leads')
        .insert([{
          user_id: session.user.id,
          ...leadData
        }])
        .select()
        .single()

      if (saveError) {
        console.error('Erreur lors de la sauvegarde:', saveError)
        toast.error("Erreur de sauvegarde", {
          description: "Une erreur est survenue lors de la sauvegarde des informations. Veuillez réessayer."
        })
        return
      }

      // Rafraîchir la liste des leads
      await queryClient.invalidateQueries({ queryKey: ['leads'] })

      toast.success("Recherche réussie", {
        description: "Les informations de l'entreprise ont été trouvées et sauvegardées avec succès."
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
              disabled={isLoading || !filters.search}
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
    </motion.div>
  )
}