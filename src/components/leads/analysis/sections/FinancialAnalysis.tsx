import { DollarSign } from "lucide-react"
import { motion } from "framer-motion"

interface FinancialAnalysisProps {
  analysis: {
    estimated_revenue: string
    investment_potential: string
    funding_capacity: string
    financial_health: string
  }
}

export function FinancialAnalysis({ analysis }: FinancialAnalysisProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="p-3 sm:p-4 rounded-lg bg-black/40 border border-primary/20"
    >
      <div className="flex items-center gap-2 mb-2">
        <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
        <h4 className="font-semibold text-sm sm:text-base text-primary-light">Analyse financière</h4>
      </div>
      
      <div className="space-y-3">
        <div>
          <span className="text-sm font-medium text-primary-light">Chiffre d'affaires estimé :</span>
          <p className="text-sm text-primary-light mt-1">{analysis.estimated_revenue}</p>
        </div>
        
        <div>
          <span className="text-sm font-medium text-primary-light">Potentiel d'investissement :</span>
          <p className="text-sm text-primary-light mt-1">{analysis.investment_potential}</p>
        </div>
        
        <div>
          <span className="text-sm font-medium text-primary-light">Capacité de financement :</span>
          <p className="text-sm text-primary-light mt-1">{analysis.funding_capacity}</p>
        </div>
        
        <div>
          <span className="text-sm font-medium text-primary-light">Santé financière :</span>
          <p className="text-sm text-primary-light mt-1">{analysis.financial_health}</p>
        </div>
      </div>
    </motion.div>
  )
}