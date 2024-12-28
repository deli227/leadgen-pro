import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Lead } from "@/types/leads"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"

interface FilterLeadActionsProps {
  lead: Lead
  onAddToAnalytics: (lead: Lead) => void
  onAddToExport: (lead: Lead) => void
}

export function FilterLeadActions({
  lead,
  onAddToAnalytics,
  onAddToExport,
}: FilterLeadActionsProps) {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAnalyze = () => {
    onAddToAnalytics(lead)
    setIsDialogOpen(true)
  }

  const handleExport = () => {
    onAddToExport(lead)
    toast({
      title: "Ajout à l'export",
      description: "Le lead a été ajouté à l'export avec succès"
    })
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleAnalyze}
        variant="outline"
        className="bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary border-none"
      >
        Analyser
      </Button>
      <Button
        onClick={handleExport}
        variant="outline"
        className="bg-gradient-to-r from-accent to-accent-dark text-white hover:from-accent-dark hover:to-accent border-none"
      >
        Exporter
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gradient-to-br from-secondary via-secondary-dark to-black text-white border-primary/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Analyse IA Avancée
            </DialogTitle>
            <DialogDescription className="text-gray-300 mt-4">
              <p className="mb-4">
                Pour lancer l'analyse IA avancée de {lead.company}, rendez-vous dans l'onglet "Analytiques" !
              </p>
              <p className="text-sm opacity-80">
                Notre intelligence artificielle y effectuera une analyse approfondie de l'entreprise, 
                incluant son positionnement marketing, sa présence technique, et générera des recommandations personnalisées.
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}