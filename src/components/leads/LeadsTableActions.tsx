import { Button } from "@/components/ui/button"
import { Eye, NotebookPen, PlusCircle, Globe } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { getScrapingApiKey } from "@/utils/scraping"
import { LeadDetails } from "./LeadDetails"
import { LeadNotes } from "./LeadNotes"
import { ApiKeyDialog } from "./ApiKeyDialog"

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

  const handleScrape = async (company: string) => {
    const apiKey = await getScrapingApiKey();
    
    if (!apiKey) {
      toast({
        title: "Clé API manquante",
        description: "Veuillez configurer votre clé API pour utiliser le scraping.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Scraping en cours",
      description: `Recherche d'informations pour ${company}...`
    })
    
    // Simulation du scraping avec la clé API
    // À remplacer par votre véritable appel API
    setTimeout(() => {
      toast({
        title: "Scraping terminé",
        description: "Les informations ont été récupérées avec succès."
      })
    }, 2000)
  }

  return (
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={() => onShowDetails(lead)}
            variant="outline"
            size="sm"
            className="bg-primary hover:bg-primary-dark text-white border-none"
          >
            <Eye className="h-4 w-4 mr-2" />
            Détails
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-secondary-dark border-primary-light">
          <LeadDetails lead={lead} onClose={() => {}} />
        </DialogContent>
      </Dialog>
      
      <Button
        onClick={() => onShowNotes(lead)}
        variant="outline"
        size="sm"
        className="bg-primary hover:bg-primary-dark text-white border-none"
      >
        <NotebookPen className="h-4 w-4 mr-2" />
        Notes
      </Button>
      
      <Button
        onClick={() => onAddToExport(lead.id)}
        variant="outline"
        size="sm"
        className="bg-primary hover:bg-primary-dark text-white border-none"
        disabled={exportList.includes(lead.id)}
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        {exportList.includes(lead.id) ? "Ajouté" : "Exporter"}
      </Button>

      <Button
        onClick={() => handleScrape(lead.company)}
        variant="outline"
        size="sm"
        className="bg-primary hover:bg-primary-dark text-white border-none"
      >
        <Globe className="h-4 w-4 mr-2" />
        Scraper
      </Button>
    </div>
  )
}
