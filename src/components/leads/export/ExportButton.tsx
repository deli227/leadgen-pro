import { Download } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface ExportButtonProps {
  leadsCount: number;
  onExportCSV: () => void;
  onExportJSON: () => void;
  onExportPDF: () => void;
}

export function ExportButton({ 
  leadsCount, 
  onExportCSV, 
  onExportJSON, 
  onExportPDF 
}: ExportButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-gradient-to-r from-primary/20 to-primary-dark/20 text-primary-light border-primary-light/20 hover:bg-primary/30 hover:text-white transition-all duration-300"
          disabled={leadsCount === 0}
        >
          <Download className="h-4 w-4 mr-2" />
          Exporter ({leadsCount})
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-secondary-dark border-primary-light">
        <DropdownMenuItem 
          onClick={onExportCSV}
          className="text-primary-light hover:bg-primary/20 cursor-pointer"
        >
          Export CSV
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={onExportJSON}
          className="text-primary-light hover:bg-primary/20 cursor-pointer"
        >
          Export JSON
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={onExportPDF}
          className="text-primary-light hover:bg-primary/20 cursor-pointer"
        >
          Export PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}