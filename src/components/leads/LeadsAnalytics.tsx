import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Brain, NotebookPen, FileDown } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { LeadNotes } from "./LeadNotes"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"

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

interface LeadsAnalyticsProps {
  leads: Lead[]
  onAddToExport: (lead: Lead) => void
}

export function LeadsAnalytics({ leads, onAddToExport }: LeadsAnalyticsProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [showNotes, setShowNotes] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<Record<number, string>>({})
  const { toast } = useToast()

  const handleAnalyze = async (lead: Lead) => {
    try {
      const analysis = `Analyse IA pour ${lead.company}:\n- Force principale: ${lead.strengths[0]}\n- Point d'amélioration: ${lead.weaknesses[0]}`
      setAiAnalysis(prev => ({ ...prev, [lead.id]: analysis }))
      setSelectedLead(lead)
      
      toast({
        title: "Analyse terminée",
        description: "L'analyse IA a été générée avec succès"
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de générer l'analyse IA"
      })
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <div className="space-y-3 sm:space-y-4">
        {leads.map(lead => (
          <div key={lead.id} className="p-3 sm:p-4 border border-primary/20 rounded-lg bg-black/40">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-primary-light">{lead.company}</h3>
                <p className="text-xs sm:text-sm text-primary-light/70">{lead.industry}</p>
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Button
                  onClick={() => handleAnalyze(lead)}
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:flex-none bg-gradient-to-r from-primary to-primary-dark text-white border-none hover:opacity-90 text-xs sm:text-sm"
                >
                  <Brain className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Analyser
                </Button>
                <Button
                  onClick={() => {
                    setSelectedLead(lead)
                    setShowNotes(true)
                  }}
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:flex-none bg-gradient-to-r from-primary to-primary-dark text-white border-none hover:opacity-90 text-xs sm:text-sm"
                >
                  <NotebookPen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Notes
                </Button>
                <Button
                  onClick={() => onAddToExport(lead)}
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:flex-none bg-gradient-to-r from-primary to-primary-dark text-white border-none hover:opacity-90 text-xs sm:text-sm"
                >
                  <FileDown className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Exporter
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:sticky lg:top-4 space-y-4">
        <div className="p-4 sm:p-6 border border-primary/20 rounded-lg bg-black/40 min-h-[300px]">
          <h3 className="text-lg sm:text-xl font-semibold text-primary-light mb-4">
            {selectedLead ? "Analyse IA" : "Sélectionnez un lead à analyser"}
          </h3>
          {selectedLead && aiAnalysis[selectedLead.id] ? (
            <div className="space-y-4 animate-fade-in">
              <div className="p-3 sm:p-4 bg-black/20 rounded-lg border border-primary/10">
                <h4 className="text-base sm:text-lg font-medium text-primary-light mb-2">{selectedLead.company}</h4>
                <Textarea
                  value={aiAnalysis[selectedLead.id]}
                  readOnly
                  className="w-full min-h-[200px] bg-black/20 border-primary-light/20 text-primary-light text-xs sm:text-sm"
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[200px] text-primary-light/50">
              <Brain className="h-8 w-8 sm:h-12 sm:w-12 mr-2" />
              <span className="text-xs sm:text-base">Cliquez sur "Analyser" pour lancer l'analyse IA</span>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showNotes} onOpenChange={setShowNotes}>
        <DialogContent className="bg-secondary-dark border-primary-light backdrop-blur-lg bg-opacity-95 w-[95vw] max-w-[500px] sm:w-full">
          {selectedLead && (
            <LeadNotes
              lead={selectedLead}
              onClose={() => {
                setShowNotes(false)
                toast({
                  title: "Note enregistrée",
                  description: "Votre note a été sauvegardée avec succès."
                })
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}