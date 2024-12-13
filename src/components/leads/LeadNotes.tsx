import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface LeadNotesProps {
  lead: {
    id: number
    company: string
  }
  onClose: () => void
}

export function LeadNotes({ lead, onClose }: LeadNotesProps) {
  const [note, setNote] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici nous pourrions sauvegarder la note dans une base de données
    console.log("Note saved:", { leadId: lead.id, note })
    onClose()
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
          />
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-primary-light text-primary-light hover:bg-primary-light/10"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white"
            >
              Sauvegarder
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}