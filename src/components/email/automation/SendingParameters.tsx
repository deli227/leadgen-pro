import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Clock } from "lucide-react"
import { NewAutomation } from "@/hooks/useCreateAutomation"

interface SendingParametersProps {
  automation: NewAutomation
  onChange: (field: keyof NewAutomation, value: any) => void
}

export function SendingParameters({ automation, onChange }: SendingParametersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label className="text-primary-light">Score minimum du lead</Label>
        <Slider
          value={[automation.trigger_score]}
          onValueChange={(value) => onChange('trigger_score', value[0])}
          max={10}
          min={1}
          step={1}
          className="w-full"
        />
        <span className="text-sm text-primary-light">
          Score actuel: {automation.trigger_score}/10
        </span>
      </div>

      <div className="space-y-2">
        <Label className="text-primary-light flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Heure d'envoi
        </Label>
        <Input
          type="time"
          value={automation.send_time}
          onChange={(e) => onChange('send_time', e.target.value)}
          className="bg-black/20 border-primary/20 text-primary-light"
        />
      </div>
    </div>
  )
}