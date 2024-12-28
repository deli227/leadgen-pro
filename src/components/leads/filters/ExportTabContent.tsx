import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { LeadsExport } from "../LeadsExport"
import { Lead } from "@/types/leads"
import { useState } from "react"
import { toast } from "sonner"

interface ExportTabContentProps {
  exportLeads: Lead[]
  onRemoveFromExport: (leadId: string) => void
}

export function ExportTabContent({ exportLeads, onRemoveFromExport }: ExportTabContentProps) {
  const [removedLeads, setRemovedLeads] = useState<string[]>([])

  const handleRemove = (leadId: string) => {
    setRemovedLeads(prev => [...prev, leadId])
    onRemoveFromExport(leadId)
    toast.success("Lead retiré de la liste d'export")
  }

  const filteredLeads = exportLeads.filter(lead => !removedLeads.includes(lead.id))

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-primary-light">Leads à exporter ({filteredLeads.length})</h3>
        <LeadsExport leads={filteredLeads} />
      </div>

      <div className="space-y-4">
        {filteredLeads.map((lead) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center justify-between p-4 rounded-lg bg-black/40 border border-primary/20"
          >
            <div>
              <h4 className="text-primary-light font-medium">{lead.company}</h4>
              <p className="text-sm text-primary-light/70">{lead.email}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemove(lead.id)}
              className="text-primary-light/70 hover:text-red-500 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}

        {filteredLeads.length === 0 && (
          <div className="text-center py-8 text-primary-light/70">
            Aucun lead à exporter. Ajoutez des leads depuis les autres onglets.
          </div>
        )}
      </div>
    </motion.div>
  )
}