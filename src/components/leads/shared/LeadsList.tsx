import { ScrollArea } from "@/components/ui/scroll-area"
import { LeadCard } from "./LeadCard"
import { Lead } from "@/types/leads"
import { motion } from "framer-motion"

interface LeadsListProps {
  leads: Lead[]
  onAddToAnalytics?: (lead: Lead) => void
  onAddToExport?: (lead: Lead) => void
  onDelete?: (lead: Lead) => void
  showActions?: boolean
  title?: string
}

export function LeadsList({ 
  leads, 
  onAddToAnalytics, 
  onAddToExport,
  onDelete,
  showActions = true,
  title = "Leads générés"
}: LeadsListProps) {
  if (leads.length === 0) {
    return (
      <div className="text-center p-8 text-primary-light/70">
        Aucun lead disponible
      </div>
    )
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
        {title}
      </h3>
      <ScrollArea className="h-[calc(100vh-20rem)] pr-2">
        <div className="grid gap-3 grid-cols-1">
          {leads.map((lead) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <LeadCard
                lead={lead}
                onAddToAnalytics={onAddToAnalytics}
                onAddToExport={onAddToExport}
                onDelete={onDelete}
                showActions={showActions}
              />
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}