import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface SolutionCardProps {
  solution: {
    weakness: string
    concrete_solution: string
    implementation_steps: string[]
    expected_benefits: string[]
    estimated_cost: string
    implementation_timeline: string
  }
  color: string
}

export function SolutionCard({ solution, color }: SolutionCardProps) {
  return (
    <Card className="p-4 bg-black/40 border border-primary/20">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <Badge variant="outline" className={`${color} px-2 py-1 font-medium`}>
            Point faible identifié
          </Badge>
          <Badge variant="outline" className="bg-primary/10 text-white">
            {solution.implementation_timeline}
          </Badge>
        </div>
        
        <p className="text-sm text-white font-medium">
          {solution.weakness}
        </p>
        
        <div>
          <p className="text-xs text-white font-semibold mb-1">
            Solution proposée :
          </p>
          <p className="text-sm text-white/90">
            {solution.concrete_solution}
          </p>
        </div>

        <div>
          <p className="text-xs text-white font-semibold mb-1">
            Étapes d'implémentation :
          </p>
          <ul className="list-disc pl-4 space-y-1">
            {solution.implementation_steps.map((step, stepIndex) => (
              <li key={stepIndex} className="text-sm text-white/90">
                {step}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs text-white font-semibold mb-1">
            Bénéfices attendus :
          </p>
          <ul className="list-disc pl-4 space-y-1">
            {solution.expected_benefits.map((benefit, benefitIndex) => (
              <li key={benefitIndex} className="text-sm text-white/90">
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center pt-2">
          <p className="text-xs text-white/80">
            Coût estimé : {solution.estimated_cost}
          </p>
        </div>
      </div>
    </Card>
  )
}