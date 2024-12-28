import { Button } from "@/components/ui/button";
import { Brain, NotebookPen, FileDown, Trash2 } from "lucide-react";
import { Lead } from "@/types/leads";

interface LeadActionsProps {
  lead: Lead;
  onAnalyze: (lead: Lead) => void;
  onShowNotes: (lead: Lead) => void;
  onAddToExport: (lead: Lead) => void;
  onDelete?: (lead: Lead) => void;
  showDelete?: boolean;
}

export function LeadActions({ 
  lead, 
  onAnalyze, 
  onShowNotes, 
  onAddToExport, 
  onDelete,
  showDelete = true
}: LeadActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
      <Button
        onClick={() => onAnalyze(lead)}
        variant="outline"
        size="sm"
        className="flex-1 sm:flex-none bg-gradient-to-r from-primary to-primary-dark text-primary-light border-none hover:opacity-90 text-xs sm:text-sm"
      >
        <Brain className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
        Analyser
      </Button>
      <Button
        onClick={() => onShowNotes(lead)}
        variant="outline"
        size="sm"
        className="flex-1 sm:flex-none bg-gradient-to-r from-primary to-primary-dark text-primary-light border-none hover:opacity-90 text-xs sm:text-sm"
      >
        <NotebookPen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
        Notes
      </Button>
      <Button
        onClick={() => onAddToExport(lead)}
        variant="outline"
        size="sm"
        className="flex-1 sm:flex-none bg-gradient-to-r from-primary to-primary-dark text-primary-light border-none hover:opacity-90 text-xs sm:text-sm"
      >
        <FileDown className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
        Exporter
      </Button>
      {showDelete && onDelete && (
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
  );
}