import { motion } from "framer-motion"
import { Lead } from "@/types/leads"
import { LeadCard } from "./LeadCard"

interface LeadsListProps {
  leads: Lead[]
  onAddToAnalytics: (lead: Lead) => void
  onAnalyze: (lead: Lead) => void
}

export function LeadsList({ leads, onAddToAnalytics, onAnalyze }: LeadsListProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {leads.map((lead, index) => (
        <motion.div
          key={lead.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <LeadCard 
            lead={lead} 
            onAddToAnalytics={onAddToAnalytics}
            onAnalyze={onAnalyze}
          />
        </motion.div>
      ))}
    </div>
  )
}