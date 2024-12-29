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
      className="p-6 rounded-xl bg-black/20 border border-primary/5 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <DollarSign className="h-6 w-6 text-yellow-500" />
        <h4 className="font-semibold text-lg text-white">Analyse financière</h4>
      </div>
      
      <div className="space-y-6">
        <div className="bg-black/10 p-4 rounded-xl">
          <span className="text-base font-medium text-white block mb-2">Chiffre d'affaires estimé :</span>
          <p className="text-base text-white/90">{analysis.estimated_revenue}</p>
        </div>
        
        <div className="bg-black/10 p-4 rounded-xl">
          <span className="text-base font-medium text-white block mb-2">Potentiel d'investissement :</span>
          <p className="text-base text-white/90">{analysis.investment_potential}</p>
        </div>
        
        <div className="bg-black/10 p-4 rounded-xl">
          <span className="text-base font-medium text-white block mb-2">Capacité de financement :</span>
          <p className="text-base text-white/90">{analysis.funding_capacity}</p>
        </div>
        
        <div className="bg-black/10 p-4 rounded-xl">
          <span className="text-base font-medium text-white block mb-2">Santé financière :</span>
          <p className="text-base text-white/90">{analysis.financial_health}</p>
        </div>
      </div>
    </motion.div>
  )
}