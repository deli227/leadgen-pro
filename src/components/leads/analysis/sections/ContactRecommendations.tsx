import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { SolutionSection } from "./recommendations/SolutionSection"
import { GlobalStrategy } from "./recommendations/GlobalStrategy"

interface ContactRecommendationsProps {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="p-3 sm:p-4 rounded-lg bg-black/40 border border-primary/20"
    >
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
        <h4 className="font-semibold text-sm sm:text-base text-white">
          Solutions d'amélioration recommandées
        </h4>
      </div>

      <div className="space-y-6">
        <SolutionSection
          title="Solutions Techniques"
          solutions={improvement_solutions.tech_solutions}
          color="text-blue-500"
        />

        <SolutionSection
          title="Solutions Marketing"
          solutions={improvement_solutions.marketing_solutions}
          color="text-green-500"
        />

        <SolutionSection
          title="Solutions Business"
          solutions={improvement_solutions.business_solutions}
          color="text-purple-500"
        />

        <GlobalStrategy recommendations={recommendations} />
      </div>
    </motion.div>
  )
}