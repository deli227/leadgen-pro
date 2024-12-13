import { Slider } from "@/components/ui/slider"

interface LeadCountSliderProps {
  value: number
  onChange: (value: number) => void
}

export function LeadCountSlider({ value, onChange }: LeadCountSliderProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-primary-light">
        Nombre de leads à générer (1-50)
      </label>
      <div className="px-2">
        <Slider
          defaultValue={[value]}
          max={50}
          min={1}
          step={1}
          onValueChange={([value]) => onChange(value)}
          className="[&_[role=slider]]:bg-primary-light [&_[role=slider]]:border-primary-light"
        />
      </div>
      <div className="flex justify-between text-sm text-primary-light">
        <span>1</span>
        <span>{value}</span>
        <span>50</span>
      </div>
    </div>
  )
}