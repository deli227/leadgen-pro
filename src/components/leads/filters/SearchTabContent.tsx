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

interface SearchTabContentProps {
  filters: LeadFilters
  setFilters: (filters: LeadFilters) => void
}

export function SearchTabContent({ filters, setFilters }: SearchTabContentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  const saveLeadsToDatabase = async (leads: any[], userId: string) => {
    console.log('Sauvegarde des leads dans la base de données:', leads.length, 'leads')
    
    const { data, error } = await supabase
      .from('leads')
      .insert(leads.map(lead => ({
        ...lead,
        user_id: userId
      })))

    if (error) {
      console.error('Erreur lors de la sauvegarde des leads:', error)
      throw error
    }

    return data
  }

  const handleSearch = async () => {
    try {
      setIsLoading(true)
      
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
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

      if (generationError) {
        console.error('Erreur lors de la génération:', generationError)
        toast.error("Erreur de génération", {
          description: "Une erreur est survenue lors de la génération des leads. Veuillez réessayer."
        })
        return
      }

      if (!generatedData?.success || !generatedData?.data) {
        toast.error("Erreur de génération", {
          description: "La réponse du serveur est invalide. Veuillez réessayer."
        })
        return
      }

      // Sauvegarde des leads générés
      await saveLeadsToDatabase(generatedData.data, session.user.id)
      
      // Rafraîchir la liste des leads
      await queryClient.invalidateQueries({ queryKey: ['leads'] })

      console.log('Leads générés et sauvegardés avec succès')
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