import { motion } from "framer-motion"
import { Lead } from "@/types/leads"
import { LeadActions } from "./LeadActions"
import { useLeadActions } from "@/hooks/useLeadActions"

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

  const handleDelete = (lead: Lead) => {
    if (onLocalRemove) {
      onLocalRemove(lead.id)
    }
    if (onRemoveFromAnalytics) {
      onRemoveFromAnalytics(lead.id)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <div className="space-y-3 sm:space-y-4">
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
                onAnalyze={handleAnalyze}
                onShowNotes={() => {}}
                onAddToExport={onAddToExport}
                onDelete={handleDelete}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}