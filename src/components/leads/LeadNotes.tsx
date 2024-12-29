import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Lead } from "@/types/leads"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useSessionData } from "@/hooks/useSessionData"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2 } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

interface LeadNote {
  id: string
  content: string
  created_at: string
}

interface LeadNotesProps {
  lead: Lead
  onClose: () => void
}

export function LeadNotes({ lead, onClose }: LeadNotesProps) {
  const [note, setNote] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [notes, setNotes] = useState<LeadNote[]>([])
  const { toast } = useToast()
  const { data: session } = useSessionData()

  useEffect(() => {
    const fetchNotes = async () => {
      if (!session?.user?.id) return

      try {
        const { data, error } = await supabase
          .from('lead_notes')
          .select('*')
          .eq('lead_id', lead.id)
          .order('created_at', { ascending: false })

        if (error) throw error

        setNotes(data)
      } catch (error) {
        console.error("Erreur lors de la récupération des notes:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les notes",
          variant: "destructive"
        })
      }
    }

    fetchNotes()
  }, [lead.id, session?.user?.id, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user?.id || !note.trim()) return

    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('lead_notes')
        .insert({
          lead_id: lead.id,
          user_id: session.user.id,
          content: note.trim()
        })
        .select()

      if (error) throw error

      setNotes(prev => [data[0], ...prev])
      setNote("")
      toast({
        title: "Note enregistrée",
        description: "La note a été ajoutée avec succès"
      })
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la note:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement de la note",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteNote = async (noteId: string) => {
    if (!session?.user?.id) return

    try {
      const { error } = await supabase
        .from('lead_notes')
        .delete()
        .eq('id', noteId)

      if (error) throw error

      setNotes(prev => prev.filter(note => note.id !== noteId))
      toast({
        title: "Note supprimée",
        description: "La note a été supprimée avec succès"
      })
    } catch (error) {
      console.error("Erreur lors de la suppression de la note:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de la note",
        variant: "destructive"
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-black border-primary-light">
      <CardHeader>
        <CardTitle className="text-2xl text-primary-light">
          Notes - {lead.company}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Écrivez vos notes ici..."
            className="min-h-[100px] bg-secondary-dark text-primary-light border-primary-light/50 focus:border-primary-light"
            disabled={isLoading}
          />
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-primary-light text-primary-light hover:bg-primary-light/10"
              disabled={isLoading}
            >
              Fermer
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white"
              disabled={isLoading || !note.trim()}
            >
              {isLoading ? "Enregistrement..." : "Sauvegarder"}
            </Button>
          </div>
        </form>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-primary-light mb-4">Historique des notes</h3>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 rounded-lg bg-secondary-dark/50 border border-primary-light/20 relative group"
                >
                  <p className="text-primary-light whitespace-pre-wrap pr-8">{note.content}</p>
                  <p className="text-xs text-primary-light/60 mt-2">
                    {formatDate(note.created_at)}
                  </p>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <div className="fixed inset-0 z-[999999]">
                      <AlertDialogContent className="bg-black border border-primary-light z-[9999999]">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-primary-light">Confirmer la suppression</AlertDialogTitle>
                          <AlertDialogDescription className="text-primary-light/70">
                            Êtes-vous sûr de vouloir supprimer cette note ? Cette action est irréversible.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="border-primary-light text-primary-light hover:bg-primary-light/10">
                            Annuler
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteNote(note.id)}
                            className="bg-red-500 hover:bg-red-600 text-white border-none"
                          >
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </div>
                  </AlertDialog>
                </div>
              ))}
              {notes.length === 0 && (
                <p className="text-primary-light/60 text-center py-4">
                  Aucune note pour le moment
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}