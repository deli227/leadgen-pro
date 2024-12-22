import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Brain, NotebookPen, FileDown, Trash2 } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { LeadNotes } from "./LeadNotes"
import { Textarea } from "@/components/ui/textarea"
import { useQueryClient } from "@tanstack/react-query"
import { Lead } from "@/types/leads"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

interface LeadsAnalyticsProps {
  leads: Lead[]
  onAddToExport: (lead: Lead) => void
}

export function LeadsAnalytics({ leads, onAddToExport }: LeadsAnalyticsProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [showNotes, setShowNotes] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<Record<number, string>>({})
  const queryClient = useQueryClient()

  const handleDelete = async (lead: Lead) => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError || !session) {
        console.error('Erreur de session:', sessionError)
        toast.error("Erreur d'authentification", {
          description: "Veuillez vous reconnecter pour effectuer cette action"
        })
        return
      }

      console.log('Tentative de suppression du lead:', lead.id)
      
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', lead.id)

      if (error) {
        console.error('Erreur lors de la suppression:', error)
        toast.error("Erreur", {
          description: "Une erreur est survenue lors de la suppression du lead"
        })
        return
      }

      toast.success("Succès", {
        description: "Le lead a été supprimé avec succès"
      })
      
      queryClient.invalidateQueries({ queryKey: ['leads'] })
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      toast.error("Erreur", {
        description: "Une erreur est survenue lors de la suppression du lead"
      })
    }
  }

  const handleAnalyze = async (lead: Lead) => {
    try {
      const analysis = `Analyse IA pour ${lead.company}:\n- Force principale: ${lead.strengths[0]}\n- Point d'amélioration: ${lead.weaknesses[0]}`
      setAiAnalysis(prev => ({ ...prev, [lead.id]: analysis }))
      setSelectedLead(lead)
      
      toast.success("Analyse terminée", {
        description: "L'analyse IA a été générée avec succès"
      })
    } catch (error) {
      toast.error("Erreur", {
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
                <Button
                  onClick={() => handleDelete(lead)}
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:flex-none bg-gradient-to-r from-red-500 to-red-600 text-white border-none hover:opacity-90 text-xs sm:text-sm"
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Supprimer
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={showNotes} onOpenChange={setShowNotes}>
        <DialogContent className="bg-secondary-dark border-primary-light backdrop-blur-lg bg-opacity-95 w-[95vw] max-w-[500px] sm:w-full">
          {selectedLead && (
            <LeadNotes
              lead={selectedLead}
              onClose={() => {
                setShowNotes(false)
                toast.success("Note enregistrée", {
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