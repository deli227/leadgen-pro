import { motion } from "framer-motion"
import { LeadsFilters } from "@/components/leads/LeadsFilters"
import { Lead } from "@/types/leads"
import { LeadFilters } from "@/types/filters"
import { useState, useEffect } from "react"

interface LeadsTabProps {
  filters: LeadFilters
  setFilters: (filters: LeadFilters) => void
  leads: Lead[]
  analyticsLeads: Lead[]
  onAddToAnalytics: (lead: Lead) => void
  onAddToExport: (lead: Lead) => void
  exportLeads: Lead[]
  onRemoveFromExport: (leadId: string) => void
  onRemoveFromAnalytics: (leadId: string) => void
}

export function LeadsTab({
  filters,
  setFilters,
  leads,
  analyticsLeads,
  onAddToAnalytics,
  onAddToExport,
  exportLeads,
  onRemoveFromExport,
  onRemoveFromAnalytics
}: LeadsTabProps) {
  const [removedLeads, setRemovedLeads] = useState<string[]>([])
  const [localLeads, setLocalLeads] = useState<Lead[]>([])

  useEffect(() => {
    setLocalLeads(leads)
  }, [leads])

  const filteredLeads = localLeads.filter(lead => !removedLeads.includes(lead.id))

  const handleLocalRemove = (leadId: string) => {
    setRemovedLeads(prev => [...prev, leadId])
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <LeadsFilters 
        filters={filters} 
        setFilters={setFilters} 
        leads={filteredLeads}
        analyticsLeads={analyticsLeads}
        onAddToAnalytics={onAddToAnalytics}
        onAddToExport={onAddToExport}
        exportLeads={exportLeads}
        onRemoveFromExport={onRemoveFromExport}
        onRemoveFromAnalytics={onRemoveFromAnalytics}
        onLocalRemove={handleLocalRemove}
      />
    </motion.div>
  )
}