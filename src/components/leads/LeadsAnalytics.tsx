import { motion } from "framer-motion"
import { Lead } from "@/types/leads"
import { useLeadActions } from "@/hooks/useLeadActions"
import { AIAnalysisWindow } from "./analysis/AIAnalysisWindow"
import { useState } from "react"
import { LeadsList } from "./shared/LeadsList"

interface LeadsAnalyticsProps {
  leads: Lead[]
  onAddToExport: (lead: Lead) => void
  onLocalRemove?: (leadId: string) => void
  onRemoveFromAnalytics?: (leadId: string) => void
}

export function LeadsAnalytics({ 
  leads, 
  onAddToExport, 
  onLocalRemove,
  onRemoveFromAnalytics 
}: LeadsAnalyticsProps) {
  const { handleAnalyze } = useLeadActions()
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const handleDelete = (lead: Lead) => {
    if (onRemoveFromAnalytics) {
      onRemoveFromAnalytics(lead.id)
    }
  }

  const handleAnalyzeLead = async (lead: Lead) => {
    await handleAnalyze(lead)
    setSelectedLead(lead)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      <div className="lg:col-span-2">
        <LeadsList 
          leads={leads}
          onAddToAnalytics={handleAnalyzeLead}
          onAddToExport={onAddToExport}
          onDelete={handleDelete}
          title="Leads en analyse"
        />
      </div>
      
      <AIAnalysisWindow lead={selectedLead} />
    </div>
  )
}