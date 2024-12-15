import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Mail } from "lucide-react"
import { Card } from "@/components/ui/card"
import { BasicFields } from "./automation/BasicFields"
import { SendingParameters } from "./automation/SendingParameters"
import { useCreateAutomation } from "@/hooks/useCreateAutomation"

interface NewAutomationFormProps {
  onSuccess: () => void
}

export function NewAutomationForm({ onSuccess }: NewAutomationFormProps) {
  const { newAutomation, setNewAutomation, handleCreateAutomation } = useCreateAutomation(onSuccess)

  const handleFieldChange = (field: keyof typeof newAutomation, value: any) => {
    setNewAutomation(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="p-6 bg-black/40 border-primary/20">
      <h3 className="text-xl font-semibold text-primary-light mb-4 flex items-center gap-2">
        <Mail className="h-5 w-5" />
        Nouvelle automatisation
      </h3>
      <div className="space-y-4">
        <BasicFields 
          automation={newAutomation} 
          onChange={handleFieldChange} 
        />

        <div className="space-y-2">
          <Label htmlFor="subject" className="text-primary-light flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Sujet de l'email
          </Label>
          <Input
            id="subject"
            value={newAutomation.subject}
            onChange={(e) => handleFieldChange('subject', e.target.value)}
            placeholder="Ex: Découvrez nos services"
            className="bg-black/20 border-primary/20 text-primary-light placeholder:text-primary-light/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="template" className="text-primary-light">Template de l'email</Label>
          <Textarea
            id="template"
            value={newAutomation.template}
            onChange={(e) => handleFieldChange('template', e.target.value)}
            placeholder="Contenu de l'email..."
            className="min-h-[200px] bg-black/20 border-primary/20 text-primary-light placeholder:text-primary-light/50"
          />
        </div>

        <SendingParameters 
          automation={newAutomation} 
          onChange={handleFieldChange} 
        />

        <div className="space-y-2">
          <Label className="text-primary-light">Délai de relance (jours)</Label>
          <Input
            type="number"
            min={1}
            max={30}
            value={newAutomation.follow_up_days}
            onChange={(e) => handleFieldChange('follow_up_days', parseInt(e.target.value))}
            className="bg-black/20 border-primary/20 text-primary-light"
          />
        </div>

        <Button
          onClick={handleCreateAutomation}
          className="w-full bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Créer l'automatisation
        </Button>
      </div>
    </Card>
  )
}