import { Button } from "@/components/ui/button"
import { Brain, Download, Trash2 } from "lucide-react"
import { Lead } from "@/types/leads"

interface LeadActionsProps {
  lead: Lead
  onAnalyze: (lead: Lead) => void
  onAddToExport?: (lead: Lead) => void
  onDelete: () => void
}

export function LeadActions({ lead, onAnalyze, onAddToExport, onDelete }: LeadActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 w-full sm:w-auto mt-4">
      <Button
        onClick={() => onAnalyze(lead)}
        variant="outline"
        size="sm"
        className="flex-1 sm:flex-none bg-gradient-to-r from-primary to-primary-dark text-primary-light border-none hover:opacity-90 text-xs sm:text-sm"
      >
        <Brain className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
        Analyser
      </Button>
      
      {onAddToExport && (
        <Button
          onClick={() => onAddToExport(lead)}
          variant="outline"
          size="sm"
          className="flex-1 sm:flex-none bg-gradient-to-r from-primary to-primary-dark text-primary-light border-none hover:opacity-90 text-xs sm:text-sm"
        >
          <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          Exporter
        </Button>
      )}

      <Button
        onClick={onDelete}
        variant="outline"
        size="sm"
        className="flex-1 sm:flex-none bg-gradient-to-r from-red-500 to-red-600 text-white border-none hover:opacity-90 text-xs sm:text-sm"
      >
        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
        Supprimer
      </Button>
    </div>
  )
}