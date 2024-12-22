import { motion } from "framer-motion"
import { LeadsFilters } from "@/components/leads/LeadsFilters"
import { Lead } from "@/types/leads"
import { useToast } from "@/hooks/use-toast"

interface LeadsTabProps {
  filters: {
    search: string
    leadCount: number
    industry: string
    country: string
    city: string
  }
  setFilters: (filters: any) => void
  leads: Lead[]
  analyticsLeads: Lead[]
  onAddToAnalytics: (lead: Lead) => void
  onAddToExport: (lead: Lead) => void
  exportLeads: Lead[]
  onRemoveFromExport: (leadId: string) => void
}

export function LeadsTab({
  filters,
  setFilters,
  leads,
  analyticsLeads,
  onAddToAnalytics,
  onAddToExport,
  exportLeads,
  onRemoveFromExport
}: LeadsTabProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <LeadsFilters 
        filters={filters} 
        setFilters={setFilters} 
        leads={leads}
        analyticsLeads={analyticsLeads}
        onAddToAnalytics={onAddToAnalytics}
        onAddToExport={onAddToExport}
        exportLeads={exportLeads}
        onRemoveFromExport={onRemoveFromExport}
      />
    </motion.div>
  )
}