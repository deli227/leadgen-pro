import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { LeadNotes } from "./LeadNotes"
import { Lead } from "@/types/leads"
import { toast } from "sonner"
import { useLeadActions } from "@/hooks/useLeadActions"
import { LeadActions } from "./LeadActions"

interface LeadsAnalyticsProps {
  leads: Lead[]
  onAddToExport: (lead: Lead) => void
}

export function LeadsAnalytics({ leads, onAddToExport }: LeadsAnalyticsProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [showNotes, setShowNotes] = useState(false)
  const { handleAnalyze } = useLeadActions()
  const [removedLeads, setRemovedLeads] = useState<string[]>([])

  const handleDelete = (lead: Lead) => {
    setRemovedLeads(prev => [...prev, lead.id])
    toast.success("Lead retiré des analytiques", {
      description: "Le lead a été retiré de l'analyse mais reste dans votre liste principale"
    })
  }

  const filteredLeads = leads.filter(lead => !removedLeads.includes(lead.id))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <div className="space-y-3 sm:space-y-4">
        {filteredLeads.map(lead => (
          <div key={lead.id} className="p-3 sm:p-4 border border-primary/20 rounded-lg bg-black/40">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-primary-light">{lead.company}</h3>
                <p className="text-xs sm:text-sm text-primary-light/70">{lead.industry}</p>
              </div>
              <LeadActions
                lead={lead}
                onAnalyze={handleAnalyze}
                onShowNotes={(lead) => {
                  setSelectedLead(lead)
                  setShowNotes(true)
                }}
                onAddToExport={onAddToExport}
                onDelete={handleDelete}
              />
            </div>
          </div>
        ))}
      </div>

      <Dialog open={showNotes} onOpenChange={setShowNotes}>
        <DialogContent className="bg-secondary-dark border-primary-light backdrop-blur-lg bg-opacity-95 w-[95vw] max-w-[500px] sm:w-full">
          {selectedLead && (
            <LeadNotes
              lead={selectedLead}
              onClose={() => {
                setShowNotes(false)
                toast.success("Note enregistrée", {
                  description: "Votre note a été sauvegardée avec succès."
                })
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}