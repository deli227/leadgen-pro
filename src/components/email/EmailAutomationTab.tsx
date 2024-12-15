import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Mail, Plus, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useQuery } from "@tanstack/react-query"

interface EmailAutomation {
  id: string
  name: string
  subject: string
  template: string
  trigger_score: number
  is_active: boolean
}

export function EmailAutomationTab() {
  const [newAutomation, setNewAutomation] = useState({
    name: "",
    subject: "",
    template: "",
    trigger_score: 7,
    is_active: true
  })

  const { data: automations, refetch } = useQuery({
    queryKey: ['email-automations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_automations')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as EmailAutomation[]
    }
  })

  const handleCreateAutomation = async () => {
    try {
      const { error } = await supabase
        .from('email_automations')
        .insert([newAutomation])

      if (error) throw error

      toast.success("Automatisation créée avec succès")
      refetch()
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

  const handleDeleteAutomation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('email_automations')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast.success("Automatisation supprimée avec succès")
      refetch()
    } catch (error) {
      console.error('Error:', error)
      toast.error("Erreur lors de la suppression de l'automatisation")
    }
  }

  const handleToggleAutomation = async (id: string, currentState: boolean) => {
    try {
      const { error } = await supabase
        .from('email_automations')
        .update({ is_active: !currentState })
        .eq('id', id)

      if (error) throw error

      toast.success("État de l'automatisation mis à jour")
      refetch()
    } catch (error) {
      console.error('Error:', error)
      toast.error("Erreur lors de la mise à jour de l'automatisation")
    }
  }

  return (
    <div className="space-y-6">
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

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary-light">Automatisations existantes</h3>
        {automations?.map((automation) => (
          <Card
            key={automation.id}
            className="p-4 bg-black/40 border-primary/20"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="font-medium text-primary-light">{automation.name}</h4>
                <p className="text-sm text-primary-light/70">{automation.subject}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={automation.is_active}
                    onCheckedChange={() => handleToggleAutomation(automation.id, automation.is_active)}
                  />
                  <Label className="text-sm">
                    {automation.is_active ? 'Activé' : 'Désactivé'}
                  </Label>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteAutomation(automation.id)}
                  className="text-primary-light/70 hover:text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {(!automations || automations.length === 0) && (
          <div className="text-center py-8 text-primary-light/70">
            <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Aucune automatisation créée pour le moment</p>
          </div>
        )}
      </div>
    </div>
  )
}