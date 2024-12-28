import { Target } from "lucide-react"
import { motion } from "framer-motion"

interface CompetitiveAnalysisProps {
  analysis: {
    market_position: string
    competitive_advantages: string[]
    potential_threats: string[]
    development_opportunities: string[]
  }
}

export function CompetitiveAnalysis({ analysis }: CompetitiveAnalysisProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="p-3 sm:p-4 rounded-lg bg-black/40 border border-primary/20"
    >
      <div className="flex items-center gap-2 mb-2">
        <Target className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
        <h4 className="font-semibold text-sm sm:text-base text-primary-light">Analyse concurrentielle</h4>
      </div>
      
      <div className="space-y-3">
        <div>
          <span className="text-sm font-medium text-primary-light">Position sur le marché :</span>
          <p className="text-sm text-primary-light/70">{analysis.market_position}</p>
        </div>
        
        <div>
          <span className="text-sm font-medium text-primary-light">Avantages compétitifs :</span>
          <ul className="mt-1 space-y-1">
            {analysis.competitive_advantages.map((advantage, index) => (
              <li key={index} className="text-sm text-primary-light/70 flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500 mt-2" />
                {advantage}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <span className="text-sm font-medium text-primary-light">Menaces potentielles :</span>
          <ul className="mt-1 space-y-1">
            {analysis.potential_threats.map((threat, index) => (
              <li key={index} className="text-sm text-primary-light/70 flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 mt-2" />
                {threat}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <span className="text-sm font-medium text-primary-light">Opportunités de développement :</span>
          <ul className="mt-1 space-y-1">
            {analysis.development_opportunities.map((opportunity, index) => (
              <li key={index} className="text-sm text-primary-light/70 flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2" />
                {opportunity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}