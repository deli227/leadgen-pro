import { LocationFilters } from "./LocationFilters"
import { IndustrySelect } from "./IndustrySelect"
import { LeadCountSlider } from "./LeadCountSlider"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { LeadsList } from "./LeadsList"
import { motion } from "framer-motion"
import { useState } from "react"

interface FiltersTabContentProps {
  filters: any
  setFilters: (filters: any) => void
  leads: any[]
  onAddToAnalytics: (lead: any) => void
}

export function FiltersTabContent({ 
  filters, 
  setFilters, 
  leads, 
  onAddToAnalytics 
}: FiltersTabContentProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateLeads = async () => {
    try {
      setIsGenerating(true)

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) throw new Error('Session non trouvée')

      console.log('Envoi des paramètres à generate-leads:', filters)
      const response = await supabase.functions.invoke('generate-leads', {
        body: { filters },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      })

      console.log('Réponse de generate-leads:', response)

      if (response.error) {
        console.error('Erreur détaillée:', response.error)
        throw new Error(response.error.message || 'Erreur lors de la génération des leads')
      }

      toast.success("Génération réussie", {
        description: "Les leads ont été générés avec succès."
      })

      window.location.reload()
    } catch (error: any) {
      console.error('Erreur complète:', error)
      toast.error("Erreur de génération", {
        description: error.message || "Une erreur est survenue lors de la génération des leads."
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-black/80 to-secondary-dark/80 p-8 rounded-b-xl border border-primary/10 shadow-xl">
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
            console.log("Changement de pays:", value)
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
    </div>
  )
}