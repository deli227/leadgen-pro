import { Signal } from "lucide-react"
import { motion } from "framer-motion"

interface CompanyAnalysisProps {
  analysis: {
    qualification_score: number
    market_position: string
    company_size: string
    development_stage: string
    growth_potential: string
    detailed_justification: string
  }
}

export function CompanyAnalysis({ analysis }: CompanyAnalysisProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="p-3 sm:p-4 rounded-lg bg-black/40 border border-primary/20"
    >
      <div className="flex items-center gap-2 mb-2">
        <Signal className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        <h4 className="font-semibold text-sm sm:text-base text-primary-light">Analyse de l'entreprise</h4>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-bold text-primary">{analysis.qualification_score}/10</span>
          <span className="text-sm text-primary-light/70">Score de qualification</span>
        </div>

        <div className="space-y-2">
          <div>
            <span className="text-sm font-medium text-primary-light">Position sur le marché :</span>
            <p className="text-sm text-primary-light/70">{analysis.market_position}</p>
          </div>
          
          <div>
            <span className="text-sm font-medium text-primary-light">Taille de l'entreprise :</span>
            <p className="text-sm text-primary-light/70">{analysis.company_size}</p>
          </div>
          
          <div>
            <span className="text-sm font-medium text-primary-light">Stade de développement :</span>
            <p className="text-sm text-primary-light/70">{analysis.development_stage}</p>
          </div>
          
          <div>
            <span className="text-sm font-medium text-primary-light">Potentiel de croissance :</span>
            <p className="text-sm text-primary-light/70">{analysis.growth_potential}</p>
          </div>
          
          <div>
            <span className="text-sm font-medium text-primary-light">Justification détaillée :</span>
            <p className="text-sm text-primary-light/70">{analysis.detailed_justification}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}