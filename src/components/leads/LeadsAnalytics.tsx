import { motion } from "framer-motion"
import { Lead } from "@/types/leads"
import { LeadActions } from "./LeadActions"
import { useLeadActions } from "@/hooks/useLeadActions"
import { AIAnalysisWindow } from "./analysis/AIAnalysisWindow"
import { useState } from "react"

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
      <div className="lg:col-span-2 space-y-3 sm:space-y-4">
        {leads.map(lead => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-3 sm:p-4 border border-primary/20 rounded-lg bg-black/40"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-primary-light">{lead.company}</h3>
                <p className="text-xs sm:text-sm text-primary-light/70">{lead.industry}</p>
              </div>
              <LeadActions
                lead={lead}
                onAnalyze={handleAnalyzeLead}
                onShowNotes={() => {}}
                onAddToExport={onAddToExport}
                onDelete={handleDelete}
              />
            </div>
          </motion.div>
        ))}
      </div>
      
      <AIAnalysisWindow lead={selectedLead} />
    </div>
  )
}