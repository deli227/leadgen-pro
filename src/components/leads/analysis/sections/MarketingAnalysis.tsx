import { Target } from "lucide-react"
import { motion } from "framer-motion"

interface MarketingAnalysisProps {
  analysis: {
    content_strategy: string
    social_media_presence: string
    seo_score: number
    brand_strategy: string
    market_positioning: string
  }
}

export function MarketingAnalysis({ analysis }: MarketingAnalysisProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="p-3 sm:p-4 rounded-lg bg-black/40 border border-primary/20"
    >
      <div className="flex items-center gap-2 mb-2">
        <Target className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
        <h4 className="font-semibold text-sm sm:text-base text-primary-light">Analyse marketing</h4>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-bold text-primary">{analysis.seo_score}/10</span>
          <span className="text-sm text-primary-light">Score SEO</span>
        </div>

        <div>
          <span className="text-sm font-medium text-primary-light">Stratégie de contenu :</span>
          <p className="text-sm text-primary-light mt-1">{analysis.content_strategy}</p>
        </div>
        
        <div>
          <span className="text-sm font-medium text-primary-light">Présence sur les réseaux sociaux :</span>
          <p className="text-sm text-primary-light mt-1">{analysis.social_media_presence}</p>
        </div>
        
        <div>
          <span className="text-sm font-medium text-primary-light">Stratégie de marque :</span>
          <p className="text-sm text-primary-light mt-1">{analysis.brand_strategy}</p>
        </div>
        
        <div>
          <span className="text-sm font-medium text-primary-light">Positionnement marketing :</span>
          <p className="text-sm text-primary-light mt-1">{analysis.market_positioning}</p>
        </div>
      </div>
    </motion.div>
  )
}