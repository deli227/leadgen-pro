import { Button } from "@/components/ui/button"
import { Brain, Trash2 } from "lucide-react"
import { Lead } from "@/types/leads"

interface FilterLeadActionsProps {
  lead: Lead
  onAnalyze: (lead: Lead) => void
  onDelete?: (lead: Lead) => void
}

export function FilterLeadActions({ lead, onAnalyze, onDelete }: FilterLeadActionsProps) {
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
      
      {onDelete && (
        <Button
          onClick={() => onDelete(lead)}
          variant="outline"
          size="sm"
          className="flex-1 sm:flex-none bg-gradient-to-r from-red-500 to-red-600 text-white border-none hover:opacity-90 text-xs sm:text-sm"
        >
          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          Supprimer
        </Button>
      )}
    </div>
  )
}