import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useSessionData } from "@/hooks/useSessionData"

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

      // Insérer le lead dans la base de données
      const { error: insertError } = await supabase
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
          social_media: companyData.socialMedia
        }])

      if (insertError) {
        console.error("Erreur lors de la sauvegarde:", insertError)
        throw new Error("Erreur lors de la sauvegarde du lead")
      }

      toast.success("Lead ajouté avec succès")
      setFilters({ ...filters, search: "" })

    } catch (error) {
      console.error("Erreur lors de la recherche:", error)
      toast.error("Une erreur est survenue lors de la recherche")
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="space-y-4">
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
    </div>
  )
}