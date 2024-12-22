import { IconButton } from "@/components/buttons/IconButton"
import { Lead } from "@/types/leads"
import { BrainCircuit, Plus } from "lucide-react"

interface LeadCardProps {
  lead: Lead
  onAddToAnalytics: (lead: Lead) => void
  onAnalyze: (lead: Lead) => void
}

export function LeadCard({ lead, onAddToAnalytics, onAnalyze }: LeadCardProps) {
  return (
    <div className="p-4 border border-primary/20 rounded-lg bg-black/40">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-primary-light">{lead.company}</h3>
          <p className="text-sm text-primary-light/70">{lead.industry}</p>
        </div>
        <div className="flex gap-2">
          <IconButton
            icon={BrainCircuit}
            label="Analyser"
            onClick={() => onAnalyze(lead)}
            variant="outline"
            size="sm"
            className="border-primary hover:bg-primary hover:text-white"
          />
          <IconButton
            icon={Plus}
            label="Ajouter aux analytiques"
            onClick={() => onAddToAnalytics(lead)}
            variant="outline"
            size="sm"
            className="border-primary hover:bg-primary hover:text-white"
          />
        </div>
      </div>
    </div>
  )
}