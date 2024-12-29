import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface NoteItemProps {
  note: {
    id: string
    content: string
    created_at: string
  }
  onNoteDeleted: (noteId: string) => void
}

export function NoteItem({ note, onNoteDeleted }: NoteItemProps) {
  const { toast } = useToast()

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

  const handleDeleteNote = async () => {
    try {
      const { error } = await supabase
        .from('lead_notes')
        .delete()
        .eq('id', note.id)

      if (error) throw error

      onNoteDeleted(note.id)
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

  return (
    <div className="p-4 rounded-lg bg-secondary-dark/50 border border-primary-light/20 relative group">
      <p className="text-primary-light whitespace-pre-wrap pr-8">{note.content}</p>
      <p className="text-xs text-primary-light/60 mt-2">
        {formatDate(note.created_at)}
      </p>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDeleteNote}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10"
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  )
}