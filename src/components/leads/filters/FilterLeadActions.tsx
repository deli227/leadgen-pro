import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { Lead } from "@/types/leads";

interface FilterLeadActionsProps {
  lead: Lead;
  onAnalyze: (lead: Lead) => void;
}

export function FilterLeadActions({ 
  lead, 
  onAnalyze 
}: FilterLeadActionsProps) {
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
    </div>
  );
}