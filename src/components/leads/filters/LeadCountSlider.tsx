import { Slider } from "@/components/ui/slider"

interface LeadCountSliderProps {
  value: number
  onChange: (value: number) => void
  maxValue: number
}

export function LeadCountSlider({ value, onChange, maxValue }: LeadCountSliderProps) {
  const handleValueChange = (newValue: number[]) => {
    onChange(Math.min(newValue[0], maxValue))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-primary-light">
          Nombre de leads à générer
        </label>
        <span className="text-sm text-primary-light">
          {value}
        </span>
      </div>
      <Slider
        value={[value]}
        max={Math.max(maxValue, 1)}
        min={0}
        step={1}
        onValueChange={handleValueChange}
        className="[&_[role=slider]]:bg-primary"
      />
    </div>
  )
}