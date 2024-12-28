import { Card } from "@/components/ui/card"
import { SolutionCard } from "./SolutionCard"

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
  
  return (
    <div className="space-y-4">
      <h5 className="text-sm font-semibold text-white">
        {title}
      </h5>
      {solutions.map((solution, index) => (
        <SolutionCard key={index} solution={solution} color={color} />
      ))}
    </div>
  )
}