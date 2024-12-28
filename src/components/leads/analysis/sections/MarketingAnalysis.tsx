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
      <div className="flex items-center gap-2 mb-4">
        <Target className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
        <h4 className="font-semibold text-sm sm:text-base text-white">Analyse marketing</h4>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2 bg-black/20 p-3 rounded-lg">
          <span className="text-xl sm:text-2xl font-bold text-primary">{analysis.seo_score}/10</span>
          <span className="text-sm text-white/90">Score SEO</span>
        </div>

        <div className="bg-black/20 p-3 rounded-lg">
          <span className="text-sm font-medium text-white block mb-1">Stratégie de contenu :</span>
          <p className="text-sm text-white/90">{analysis.content_strategy}</p>
        </div>
        
        <div className="bg-black/20 p-3 rounded-lg">
          <span className="text-sm font-medium text-white block mb-1">Présence sur les réseaux sociaux :</span>
          <p className="text-sm text-white/90">{analysis.social_media_presence}</p>
        </div>
        
        <div className="bg-black/20 p-3 rounded-lg">
          <span className="text-sm font-medium text-white block mb-1">Stratégie de marque :</span>
          <p className="text-sm text-white/90">{analysis.brand_strategy}</p>
        </div>
        
        <div className="bg-black/20 p-3 rounded-lg">
          <span className="text-sm font-medium text-white block mb-1">Positionnement marketing :</span>
          <p className="text-sm text-white/90">{analysis.market_positioning}</p>
        </div>
      </div>
    </motion.div>
  )
}