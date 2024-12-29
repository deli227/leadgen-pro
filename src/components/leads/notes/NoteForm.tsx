import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

interface NoteFormProps {
  leadId: string
  userId: string
  onNoteAdded: (note: any) => void
  onClose: () => void
}

export function NoteForm({ leadId, userId, onNoteAdded, onClose }: NoteFormProps) {
  const [note, setNote] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId || !note.trim()) return

    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('lead_notes')
        .insert({
          lead_id: leadId,
          user_id: userId,
          content: note.trim()
        })
        .select()

      if (error) throw error

      onNoteAdded(data[0])
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

  return (
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
  )
}