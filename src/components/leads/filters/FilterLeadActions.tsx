import { Button } from "@/components/ui/button"
import { Brain, Trash2 } from "lucide-react"
import { Lead } from "@/types/leads"
import { useToast } from "@/hooks/use-toast"

interface FilterLeadActionsProps {
  lead: Lead
  onAnalyze: (lead: Lead) => void
  onDelete?: (lead: Lead) => void
}

export function FilterLeadActions({ lead, onAnalyze, onDelete }: FilterLeadActionsProps) {
  const { toast } = useToast()

  const handleAnalyzeClick = () => {
    toast({
      title: "Analyse IA avancée",
      description: "Rendez-vous dans l'onglet 'Analytique' pour lancer l'analyse IA avancée de ce lead !",
      className: "bg-gradient-to-br from-primary/90 to-primary-dark/90 text-primary-light border-primary/20",
      duration: 5000,
    })
    onAnalyze(lead)
  }

  return (
    <div className="flex flex-wrap gap-2 w-full sm:w-auto mt-4">
      <Button
        onClick={handleAnalyzeClick}
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