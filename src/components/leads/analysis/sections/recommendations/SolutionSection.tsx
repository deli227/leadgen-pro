import { Card } from "@/components/ui/card"
import { SolutionCard } from "./SolutionCard"
import { Code2, Megaphone, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SolutionSectionProps {
  title: string
  solutions: Array<{
    weakness: string
    concrete_solution: string
    implementation_steps: string[]
    expected_benefits: string[]
    estimated_cost: string
    implementation_timeline: string
  }>
  color: string
}

export function SolutionSection({ title, solutions, color }: SolutionSectionProps) {
  if (solutions.length === 0) return null

  const getIcon = () => {
    switch (title.toLowerCase()) {
      case "solutions techniques":
        return Code2
      case "solutions marketing":
        return Megaphone
      case "solutions business":
        return Building2
      default:
        return Code2
    }
  }

  const Icon = getIcon()
  
  return (
    <div className="space-y-4">
      <h5 className="text-sm font-semibold text-white flex items-center gap-2">
        <Icon className="h-4 w-4" />
        {title}
      </h5>
      {solutions.map((solution, index) => (
        <SolutionCard key={index} solution={solution} color={color} />
      ))}
    </div>
  )
}