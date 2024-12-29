import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Lead } from "@/types/leads"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useSessionData } from "@/hooks/useSessionData"

interface LeadNotesProps {
  lead: Lead
  onClose: () => void
}

export function LeadNotes({ lead, onClose }: LeadNotesProps) {
  const [note, setNote] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { data: session } = useSessionData()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user?.id) return

    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('lead_notes')
        .insert({
          lead_id: lead.id,
          user_id: session.user.id,
          content: note
        })

      if (error) throw error

      toast({
        title: "Note enregistrée",
        description: "La note a été ajoutée avec succès"
      })
      onClose()
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
            className="min-h-[200px] bg-secondary-dark text-primary-light border-primary-light/50 focus:border-primary-light"
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
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white"
              disabled={isLoading}
            >
              {isLoading ? "Enregistrement..." : "Sauvegarder"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}