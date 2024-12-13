import { Button } from "@/components/ui/button"
import { Eye, NotebookPen, PlusCircle } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { LeadDetails } from "./LeadDetails"
import { LeadNotes } from "./LeadNotes"

interface Lead {
  id: number
  company: string
  email: string
  phone: string
  address?: string
  qualification: number
  socialMedia: {
    linkedin: string
    twitter: string
  }
  score: number
  industry: string
  strengths: string[]
  weaknesses: string[]
}

interface LeadsTableActionsProps {
  lead: Lead
  onShowDetails: (lead: Lead) => void
  onShowNotes: (lead: Lead) => void
  onAddToExport: (leadId: number) => void
  exportList: number[]
}

export function LeadsTableActions({ 
  lead, 
  onShowDetails, 
  onShowNotes, 
  onAddToExport,
  exportList 
}: LeadsTableActionsProps) {
  const { toast } = useToast()

  return (
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={() => onShowDetails(lead)}
            variant="outline"
            size="sm"
            className="bg-gradient-to-r from-primary to-primary-dark text-white border-none hover:opacity-90 transition-all duration-300"
          >
            <Eye className="h-4 w-4 mr-2" />
            Détails
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-secondary-dark border-primary-light backdrop-blur-lg bg-opacity-95">
          <LeadDetails lead={lead} onClose={() => {}} />
        </DialogContent>
      </Dialog>
      
      <Button
        onClick={() => onShowNotes(lead)}
        variant="outline"
        size="sm"
        className="bg-gradient-to-r from-primary to-primary-dark text-white border-none hover:opacity-90 transition-all duration-300"
      >
        <NotebookPen className="h-4 w-4 mr-2" />
        Notes
      </Button>
      
      <Button
        onClick={() => onAddToExport(lead.id)}
        variant="outline"
        size="sm"
        className="bg-gradient-to-r from-primary to-primary-dark text-white border-none hover:opacity-90 transition-all duration-300"
        disabled={exportList.includes(lead.id)}
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        {exportList.includes(lead.id) ? "Ajouté" : "Exporter"}
      </Button>
    </div>
  )
}