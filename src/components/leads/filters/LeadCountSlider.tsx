import { Slider } from "@/components/ui/slider"

interface LeadCountSliderProps {
  value: number
  onChange: (value: number) => void
}

export function LeadCountSlider({ value, onChange }: LeadCountSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm text-primary-light">Nombre de leads à afficher</label>
        <span className="text-sm font-medium text-primary-light">{value}</span>
      </div>
      <Slider
        defaultValue={[value]}
        max={50}
        min={1}
        step={1}
        onValueChange={(values) => onChange(values[0])}
        className="[&_[role=slider]]:bg-primary-light [&_[role=slider]]:border-primary-light/20"
      />
    </div>
  )
}