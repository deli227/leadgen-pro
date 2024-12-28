import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSessionData } from "@/hooks/useSessionData"
import { LeadCard } from "@/components/leads/shared/LeadCard"
import { Lead } from "@/types/leads"
import { useQuery } from "@tanstack/react-query"

interface SearchTabContentProps {
  filters: {
    search: string
    leadCount: number
    industry: string
    country: string
    city: string
  }
  setFilters: (filters: any) => void
}

export function SearchTabContent({ filters, setFilters }: SearchTabContentProps) {
  const [isSearching, setIsSearching] = useState(false)
  const session = useSessionData()

  // Utiliser useQuery pour récupérer les leads de recherche persistants
  const { data: searchResults = [], refetch: refetchSearchResults } = useQuery({
    queryKey: ['search-leads', session.data?.user?.id],
    queryFn: async () => {
      if (!session.data?.user?.id) return []
      
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('user_id', session.data.user.id)
        .eq('is_search_result', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error("Erreur lors de la récupération des leads:", error)
        throw error
      }

      return data as Lead[]
    },
    enabled: !!session.data?.user?.id
  })

  const handleSearch = async () => {
    if (!filters.search) {
      toast.error("Veuillez entrer un terme de recherche")
      return
    }

    setIsSearching(true)
    console.log("Envoi de la requête de recherche avec les filtres:", filters)

    try {
      const { data: functionData, error: functionError } = await supabase.functions.invoke('search-company', {
        body: {
          search: filters.search,
          country: filters.country,
          city: filters.city
        }
      })

      if (functionError) {
        throw new Error(`Erreur lors de la recherche: ${functionError.message}`)
      }

      if (!functionData.success) {
        throw new Error("Échec de la recherche d'entreprise")
      }

      const companyData = JSON.parse(functionData.data)
      console.log("Données de l'entreprise:", companyData)

      // Insérer le lead dans la base de données avec is_search_result = true
      const { data: insertedLead, error: insertError } = await supabase
        .from('leads')
        .insert([{
          user_id: session.data?.user?.id,
          company: companyData.company,
          email: companyData.email,
          phone: companyData.phone,
          website: companyData.website,
          address: companyData.address,
          industry: companyData.industry,
          score: companyData.score,
          social_media: companyData.socialMedia,
          is_search_result: true
        }])
        .select()
        .single()

      if (insertError) {
        console.error("Erreur lors de la sauvegarde:", insertError)
        throw new Error("Erreur lors de la sauvegarde du lead")
      }

      // Rafraîchir la liste des résultats
      refetchSearchResults()
      toast.success("Lead ajouté avec succès")
      setFilters({ ...filters, search: "" })

    } catch (error) {
      console.error("Erreur lors de la recherche:", error)
      toast.error("Une erreur est survenue lors de la recherche")
    } finally {
      setIsSearching(false)
    }
  }

  const handleDelete = async (leadId: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId)

      if (error) throw error

      // Rafraîchir la liste après suppression
      refetchSearchResults()
      toast.success("Lead supprimé avec succès")
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      toast.error("Erreur lors de la suppression du lead")
    }
  }

  const handleAddToAnalytics = async (lead: Lead) => {
    try {
      const { error } = await supabase
        .from('lead_analyses')
        .insert([{
          lead_id: lead.id,
          user_id: session.data?.user?.id
        }])

      if (error) throw error

      toast.success("Lead ajouté aux analytiques avec succès")
    } catch (error) {
      console.error('Erreur lors de l\'ajout aux analytiques:', error)
      toast.error("Erreur lors de l'ajout aux analytiques")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input
          placeholder="Rechercher une entreprise..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="bg-black/20"
        />
        <Button 
          onClick={handleSearch}
          disabled={isSearching}
          className="bg-primary hover:bg-primary/90"
        >
          {isSearching ? "Recherche..." : "Rechercher"}
        </Button>
      </div>

      {searchResults.length > 0 && (
        <div className="mt-6 space-y-6">
          <h3 className="text-lg font-semibold text-primary-light">
            Leads trouvés ({searchResults.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onAddToAnalytics={() => handleAddToAnalytics(lead)}
                onDelete={() => handleDelete(lead.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}