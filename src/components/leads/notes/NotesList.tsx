import { ScrollArea } from "@/components/ui/scroll-area"
import { NoteItem } from "./NoteItem"

interface Note {
  id: string
  content: string
  created_at: string
}

interface NotesListProps {
  notes: Note[]
  onNoteDeleted: (noteId: string) => void
}

export function NotesList({ notes, onNoteDeleted }: NotesListProps) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-primary-light mb-4">Historique des notes</h3>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onNoteDeleted={onNoteDeleted}
            />
          ))}
          {notes.length === 0 && (
            <p className="text-primary-light/60 text-center py-4">
              Aucune note pour le moment
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}