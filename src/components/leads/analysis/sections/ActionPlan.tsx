import { ListChecks } from "lucide-react"
import { motion } from "framer-motion"

interface ActionPlanProps {
  plan: {
    steps: string[]
    timeline: string
    kpis: string[]
    vigilance_points: string[]
  }
}

export function ActionPlan({ plan }: ActionPlanProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="p-3 sm:p-4 rounded-lg bg-black/40 border border-primary/20"
    >
      <div className="flex items-center gap-2 mb-2">
        <ListChecks className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        <h4 className="font-semibold text-sm sm:text-base text-primary-light">Plan d'action</h4>
      </div>
      
      <div className="space-y-3">
        <div>
          <span className="text-sm font-medium text-primary-light">Étapes à suivre :</span>
          <ul className="mt-1 space-y-1">
            {plan.steps.map((step, index) => (
              <li key={index} className="text-sm text-primary-light/70 flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                {step}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <span className="text-sm font-medium text-primary-light">Timeline :</span>
          <p className="text-sm text-primary-light/70">{plan.timeline}</p>
        </div>
        
        <div>
          <span className="text-sm font-medium text-primary-light">KPIs à surveiller :</span>
          <ul className="mt-1 space-y-1">
            {plan.kpis.map((kpi, index) => (
              <li key={index} className="text-sm text-primary-light/70 flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2" />
                {kpi}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <span className="text-sm font-medium text-primary-light">Points de vigilance :</span>
          <ul className="mt-1 space-y-1">
            {plan.vigilance_points.map((point, index) => (
              <li key={index} className="text-sm text-primary-light/70 flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-2" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}