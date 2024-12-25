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
    toast.error("La génération automatique de leads est temporairement désactivée")
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
          disabled={true}
          className="ml-auto bg-gradient-to-r from-primary/50 to-accent/50 text-white/50 cursor-not-allowed"
        >
          Génération désactivée
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