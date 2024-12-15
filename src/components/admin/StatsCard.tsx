import { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  formatter?: (value: number) => string
  className?: string
}

export function StatsCard({ icon: Icon, label, value, formatter, className }: StatsCardProps) {
  const displayValue = typeof value === 'number' && formatter ? formatter(value) : value

  return (
    <Card className={cn("p-6 bg-black/40 border-primary/20 hover:bg-black/50 transition-colors", className)}>
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-primary-light/70">{label}</p>
          <p className="text-2xl font-bold text-primary-light">{displayValue}</p>
        </div>
      </div>
    </Card>
  )
}