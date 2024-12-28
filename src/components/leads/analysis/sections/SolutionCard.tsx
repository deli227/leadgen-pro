import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SolutionCardProps {
  title: string
  weakness: string
  solution: string
  steps: string[]
  benefits: string[]
  cost: string
  timeline: string
  color: string
}

export function SolutionCard({
  title,
  weakness,
  solution,
  steps,
  benefits,
  cost,
  timeline,
  color
}: SolutionCardProps) {
  return (
    <Card className="p-4 bg-black/40 border border-primary/20">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <Badge variant="outline" className={`${color} px-2 py-1`}>
            Point faible identifié
          </Badge>
          <Badge variant="outline" className="bg-primary/5 text-white">
            {timeline}
          </Badge>
        </div>
        
        <p className="text-sm text-white font-medium">
          {weakness}
        </p>
        
        <div>
          <p className="text-xs text-primary-light font-medium mb-1">
            Solution proposée :
          </p>
          <p className="text-sm text-gray-200">
            {solution}
          </p>
        </div>

        <div>
          <p className="text-xs text-primary-light font-medium mb-1">
            Étapes d'implémentation :
          </p>
          <ul className="list-disc pl-4 space-y-1">
            {steps.map((step, stepIndex) => (
              <li key={stepIndex} className="text-sm text-gray-200">
                {step}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs text-primary-light font-medium mb-1">
            Bénéfices attendus :
          </p>
          <ul className="list-disc pl-4 space-y-1">
            {benefits.map((benefit, benefitIndex) => (
              <li key={benefitIndex} className="text-sm text-gray-200">
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center pt-2">
          <p className="text-xs text-gray-300">
            Coût estimé : {cost}
          </p>
        </div>
      </div>
    </Card>
  )
}