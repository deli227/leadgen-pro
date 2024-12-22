import { motion } from "framer-motion"
import { Lead } from "@/types/leads"
import { LeadsList } from "./LeadsList"
import { LeadCountSlider } from "./LeadCountSlider"

interface FiltersTabContentProps {
  filters: {
    search: string
    leadCount: number
    industry: string
    country: string
    city: string
  }
  setFilters: (filters: any) => void
  leads: Lead[]
  onAddToAnalytics: (lead: Lead) => void
  onAnalyze: (lead: Lead) => void
}

export function FiltersTabContent({ 
  filters, 
  setFilters, 
  leads,
  onAddToAnalytics,
  onAnalyze
}: FiltersTabContentProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 bg-gradient-to-br from-black/80 to-secondary-dark/80 p-8 rounded-b-xl border border-primary/10 shadow-xl"
    >
      <LeadCountSlider 
        value={filters.leadCount}
        onChange={(value) => setFilters({ ...filters, leadCount: value })}
      />
      <LeadsList 
        leads={leads} 
        onAddToAnalytics={onAddToAnalytics}
        onAnalyze={onAnalyze}
      />
    </motion.div>
  )
}