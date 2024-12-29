import { motion } from "framer-motion"
import { Lead } from "@/types/leads"

interface LeadsAnalyticsProps {
  leads: Lead[]
  onAddToExport: (lead: Lead) => void
  onLocalRemove?: (leadId: string) => void
  onRemoveFromAnalytics: (leadId: string) => void
}

export function LeadsAnalytics({ 
  leads,
  onAddToExport,
  onLocalRemove,
  onRemoveFromAnalytics
}: LeadsAnalyticsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-4"
    >
      {leads.map(lead => (
        <div key={lead.id} className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-primary-light">{lead.company}</h3>
            <p className="text-sm text-primary-light/70">{lead.industry}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onAddToExport(lead)}
              className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Exporter
            </button>
            <button
              onClick={() => {
                if (onLocalRemove) onLocalRemove(lead.id)
                onRemoveFromAnalytics(lead.id)
              }}
              className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </motion.div>
  )
}