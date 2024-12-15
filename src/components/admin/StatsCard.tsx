import { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface StatsCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  formatter?: (value: number) => string
}

export function StatsCard({ icon: Icon, label, value, formatter }: StatsCardProps) {
  const displayValue = typeof value === 'number' && formatter ? formatter(value) : value

  return (
    <Card className="p-4 bg-black/40 border-primary/20">
      <div className="flex items-center space-x-4">
        <Icon className="h-8 w-8 text-primary" />
        <div>
          <p className="text-sm text-primary-light/70">{label}</p>
          <p className="text-2xl font-bold text-primary-light">{displayValue}</p>
        </div>
      </div>
    </Card>
  )
}