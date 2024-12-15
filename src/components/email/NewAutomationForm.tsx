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
    is_active: true
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
        is_active: true
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
            <Label htmlFor="name">Nom de l'automatisation</Label>
            <Input
              id="name"
              value={newAutomation.name}
              onChange={(e) => setNewAutomation(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ex: Suivi lead qualifié"
              className="bg-black/20 border-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Sujet de l'email</Label>
            <Input
              id="subject"
              value={newAutomation.subject}
              onChange={(e) => setNewAutomation(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="Ex: Découvrez nos services"
              className="bg-black/20 border-primary/20"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="template">Template de l'email</Label>
          <Textarea
            id="template"
            value={newAutomation.template}
            onChange={(e) => setNewAutomation(prev => ({ ...prev, template: e.target.value }))}
            placeholder="Contenu de l'email..."
            className="min-h-[200px] bg-black/20 border-primary/20"
          />
        </div>

        <div className="space-y-2">
          <Label>Score minimum du lead</Label>
          <Slider
            value={[newAutomation.trigger_score]}
            onValueChange={(value) => setNewAutomation(prev => ({ ...prev, trigger_score: value[0] }))}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <span className="text-sm text-primary-light/70">
            Score actuel: {newAutomation.trigger_score}/10
          </span>
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