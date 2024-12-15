import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Trash2, Mail } from "lucide-react"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"

interface EmailAutomation {
  id: string
  name: string
  subject: string
  template: string
  trigger_score: number
  is_active: boolean
}

interface AutomationListProps {
  automations: EmailAutomation[] | null
  onUpdate: () => void
}

export function AutomationList({ automations, onUpdate }: AutomationListProps) {
  const handleDeleteAutomation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('email_automations')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast.success("Automatisation supprimée avec succès")
      onUpdate()
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
      onUpdate()
    } catch (error) {
      console.error('Error:', error)
      toast.error("Erreur lors de la mise à jour de l'automatisation")
    }
  }

  if (!automations || automations.length === 0) {
    return (
      <div className="text-center py-8 text-primary-light/70">
        <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Aucune automatisation créée pour le moment</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {automations.map((automation) => (
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
    </div>
  )
}