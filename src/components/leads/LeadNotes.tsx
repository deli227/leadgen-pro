import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lead } from "@/types/leads"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useSessionData } from "@/hooks/useSessionData"
import { NoteForm } from "./notes/NoteForm"
import { NotesList } from "./notes/NotesList"

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

  const handleNoteAdded = (newNote: LeadNote) => {
    setNotes(prev => [newNote, ...prev])
  }

  const handleNoteDeleted = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-black border-primary-light">
      <CardHeader>
        <CardTitle className="text-2xl text-primary-light">
          Notes - {lead.company}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {session?.user?.id && (
          <NoteForm
            leadId={lead.id}
            userId={session.user.id}
            onNoteAdded={handleNoteAdded}
            onClose={onClose}
          />
        )}
        <NotesList
          notes={notes}
          onNoteDeleted={handleNoteDeleted}
        />
      </CardContent>
    </Card>
  )
}