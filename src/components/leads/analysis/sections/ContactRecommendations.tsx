import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ContactRecommendationsProps {
  weaknesses?: string[]
  recommendations?: {
    approach_strategy: string
    entry_points: string[]
    sales_arguments: string[]
    optimal_timing: string
    required_resources: string[]
    improvement_solutions: {
      tech_solutions: Array<{
        weakness: string
        concrete_solution: string
        implementation_steps: string[]
        expected_benefits: string[]
        estimated_cost: string
        implementation_timeline: string
      }>
      marketing_solutions: Array<{
        weakness: string
        concrete_solution: string
        implementation_steps: string[]
        expected_benefits: string[]
        estimated_cost: string
        implementation_timeline: string
      }>
      business_solutions: Array<{
        weakness: string
        concrete_solution: string
        implementation_steps: string[]
        expected_benefits: string[]
        estimated_cost: string
        implementation_timeline: string
      }>
    }
  }
}

export function ContactRecommendations({ recommendations }: ContactRecommendationsProps) {
  if (!recommendations) return null

  const { improvement_solutions } = recommendations

  const renderSolutionSection = (
    title: string,
    solutions: Array<{
      weakness: string
      concrete_solution: string
      implementation_steps: string[]
      expected_benefits: string[]
      estimated_cost: string
      implementation_timeline: string
    }>,
    color: string
  ) => (
    <div className="space-y-4">
      <h5 className="text-sm font-semibold text-primary-light/90">{title}</h5>
      {solutions.map((solution, index) => (
        <Card key={index} className="p-4 bg-black/40 border border-primary/20">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <Badge variant="outline" className={`${color} px-2 py-1`}>
                Point faible identifié
              </Badge>
              <Badge variant="outline" className="bg-primary/5">
                {solution.implementation_timeline}
              </Badge>
            </div>
            
            <p className="text-sm text-primary-light/90 font-medium">
              {solution.weakness}
            </p>
            
            <div>
              <p className="text-xs text-primary-light/80 font-medium mb-1">
                Solution proposée :
              </p>
              <p className="text-sm text-primary-light/70">
                {solution.concrete_solution}
              </p>
            </div>

            <div>
              <p className="text-xs text-primary-light/80 font-medium mb-1">
                Étapes d'implémentation :
              </p>
              <ul className="list-disc pl-4 space-y-1">
                {solution.implementation_steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="text-sm text-primary-light/70">
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs text-primary-light/80 font-medium mb-1">
                Bénéfices attendus :
              </p>
              <ul className="list-disc pl-4 space-y-1">
                {solution.expected_benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="text-sm text-primary-light/70">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center pt-2">
              <p className="text-xs text-primary-light/60">
                Coût estimé : {solution.estimated_cost}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="p-3 sm:p-4 rounded-lg bg-black/40 border border-primary/20"
    >
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
        <h4 className="font-semibold text-sm sm:text-base text-primary-light">
          Solutions d'amélioration recommandées
        </h4>
      </div>

      <div className="space-y-6">
        {improvement_solutions.tech_solutions.length > 0 && (
          renderSolutionSection(
            "Solutions Techniques",
            improvement_solutions.tech_solutions,
            "text-blue-500"
          )
        )}

        {improvement_solutions.marketing_solutions.length > 0 && (
          renderSolutionSection(
            "Solutions Marketing",
            improvement_solutions.marketing_solutions,
            "text-green-500"
          )
        )}

        {improvement_solutions.business_solutions.length > 0 && (
          renderSolutionSection(
            "Solutions Business",
            improvement_solutions.business_solutions,
            "text-purple-500"
          )
        )}

        <div className="space-y-4 mt-6">
          <h5 className="text-sm font-semibold text-primary-light/90">
            Stratégie d'approche globale
          </h5>
          <Card className="p-4 bg-black/40 border border-primary/20">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-primary-light/80 font-medium mb-1">
                  Approche recommandée :
                </p>
                <p className="text-sm text-primary-light/70">
                  {recommendations.approach_strategy}
                </p>
              </div>

              <div>
                <p className="text-xs text-primary-light/80 font-medium mb-1">
                  Points d'entrée :
                </p>
                <ul className="list-disc pl-4 space-y-1">
                  {recommendations.entry_points.map((point, index) => (
                    <li key={index} className="text-sm text-primary-light/70">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs text-primary-light/80 font-medium mb-1">
                  Arguments de vente :
                </p>
                <ul className="list-disc pl-4 space-y-1">
                  {recommendations.sales_arguments.map((arg, index) => (
                    <li key={index} className="text-sm text-primary-light/70">
                      {arg}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center pt-2">
                <p className="text-xs text-primary-light/60">
                  Timing optimal : {recommendations.optimal_timing}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}