import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"

interface NewAutomation {
  name: string
  subject: string
  template: string
  trigger_score: number
  is_active: boolean
  send_time: string
  follow_up_days: number
}

interface NewAutomationFormProps {
  onSuccess: () => void
}

export function NewAutomationForm({ onSuccess }: NewAutomationFormProps) {
  const [newAutomation, setNewAutomation] = useState<NewAutomation>({
    name: "",
    subject: "",
    template: "",
    trigger_score: 7,
    is_active: true,
    send_time: "09:00",
    follow_up_days: 3
  })

  const handleCreateAutomation = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('email_automations')
        .insert([{ ...newAutomation, user_id: user.id }])

      if (error) throw error

      toast.success("Automatisation créée avec succès")
      onSuccess()
      setNewAutomation({
        name: "",
        subject: "",
        template: "",
        trigger_score: 7,
        is_active: true,
        send_time: "09:00",
        follow_up_days: 3
      })
    } catch (error) {
      console.error('Error:', error)
      toast.error("Erreur lors de la création de l'automatisation")
    }
  }

  return (
    <Card className="p-6 bg-black/40 border-primary/20">
      <h3 className="text-xl font-semibold text-primary-light mb-4">Nouvelle automatisation</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-primary-light">Nom de l'automatisation</Label>
            <Input
              id="name"
              value={newAutomation.name}
              onChange={(e) => setNewAutomation(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ex: Suivi lead qualifié"
              className="bg-black/20 border-primary/20 text-primary-light"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-primary-light">Sujet de l'email</Label>
            <Input
              id="subject"
              value={newAutomation.subject}
              onChange={(e) => setNewAutomation(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="Ex: Découvrez nos services"
              className="bg-black/20 border-primary/20 text-primary-light"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="template" className="text-primary-light">Template de l'email</Label>
          <Textarea
            id="template"
            value={newAutomation.template}
            onChange={(e) => setNewAutomation(prev => ({ ...prev, template: e.target.value }))}
            placeholder="Contenu de l'email..."
            className="min-h-[200px] bg-black/20 border-primary/20 text-primary-light"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-primary-light">Score minimum du lead</Label>
            <Slider
              value={[newAutomation.trigger_score]}
              onValueChange={(value) => setNewAutomation(prev => ({ ...prev, trigger_score: value[0] }))}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <span className="text-sm text-primary-light">
              Score actuel: {newAutomation.trigger_score}/10
            </span>
          </div>

          <div className="space-y-2">
            <Label className="text-primary-light">Heure d'envoi</Label>
            <Input
              type="time"
              value={newAutomation.send_time}
              onChange={(e) => setNewAutomation(prev => ({ ...prev, send_time: e.target.value }))}
              className="bg-black/20 border-primary/20 text-primary-light"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-primary-light">Délai de relance (jours)</Label>
          <Input
            type="number"
            min={1}
            max={30}
            value={newAutomation.follow_up_days}
            onChange={(e) => setNewAutomation(prev => ({ ...prev, follow_up_days: parseInt(e.target.value) }))}
            className="bg-black/20 border-primary/20 text-primary-light"
          />
        </div>

        <Button
          onClick={handleCreateAutomation}
          className="w-full bg-gradient-to-r from-primary to-primary-dark text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Créer l'automatisation
        </Button>
      </div>
    </Card>
  )
}