import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Target, AtSign } from "lucide-react"
import { NewAutomation } from "@/hooks/useCreateAutomation"

interface BasicFieldsProps {
  automation: NewAutomation
  onChange: (field: keyof NewAutomation, value: string) => void
}

export function BasicFields({ automation, onChange }: BasicFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-primary-light flex items-center gap-2">
          <Target className="h-4 w-4" />
          Nom de l'automatisation
        </Label>
        <Input
          id="name"
          value={automation.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Ex: Suivi lead qualifié"
          className="bg-black/20 border-primary/20 text-primary-light placeholder:text-primary-light/50"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sender_email" className="text-primary-light flex items-center gap-2">
          <AtSign className="h-4 w-4" />
          Email d'expédition
        </Label>
        <Input
          id="sender_email"
          type="email"
          value={automation.sender_email}
          onChange={(e) => onChange('sender_email', e.target.value)}
          placeholder="votre@email.com"
          className="bg-black/20 border-primary/20 text-primary-light placeholder:text-primary-light/50"
        />
      </div>
    </div>
  )
}