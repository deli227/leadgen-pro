import { motion } from "framer-motion"
import { LeadsFilters } from "@/components/leads/LeadsFilters"
import { Lead } from "@/types/leads"
import { LeadFilters } from "@/types/filters"
import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

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

  const handleLocalRemove = async (leadId: string) => {
    try {
      // Mettre à jour l'état local
      setRemovedLeads(prev => [...prev, leadId])

      // Si le lead est dans les analytics, on le retire aussi
      if (analyticsLeads.find(lead => lead.id === leadId)) {
        onRemoveFromAnalytics(leadId)
      }

      // Si le lead est dans l'export, on le retire aussi
      if (exportLeads.find(lead => lead.id === leadId)) {
        onRemoveFromExport(leadId)
      }

    } catch (error) {
      console.error('Erreur:', error)
      toast.error("Une erreur est survenue")
    }
  }

  const filteredLeads = leads.filter(lead => !removedLeads.includes(lead.id))

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