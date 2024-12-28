import { Laptop } from "lucide-react"
import { motion } from "framer-motion"

interface TechAnalysisProps {
  analysis: {
    tech_stack: string[]
    digital_maturity: string
    online_presence: string
    website_performance: string
    security_compliance: string
  }
}

export function TechAnalysis({ analysis }: TechAnalysisProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="p-3 sm:p-4 rounded-lg bg-black/40 border border-primary/20"
    >
      <div className="flex items-center gap-2 mb-4">
        <Laptop className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
        <h4 className="font-semibold text-sm sm:text-base text-white">Analyse technologique</h4>
      </div>
      
      <div className="space-y-4">
        <div className="bg-black/20 p-3 rounded-lg">
          <span className="text-sm font-medium text-white block mb-2">Stack technologique :</span>
          <div className="flex flex-wrap gap-2">
            {analysis.tech_stack.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-blue-500/30 text-white border border-blue-500/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="bg-black/20 p-3 rounded-lg">
          <span className="text-sm font-medium text-white block mb-1">Maturité digitale :</span>
          <p className="text-sm text-white/90">{analysis.digital_maturity}</p>
        </div>
        
        <div className="bg-black/20 p-3 rounded-lg">
          <span className="text-sm font-medium text-white block mb-1">Présence en ligne :</span>
          <p className="text-sm text-white/90">{analysis.online_presence}</p>
        </div>
        
        <div className="bg-black/20 p-3 rounded-lg">
          <span className="text-sm font-medium text-white block mb-1">Performance du site web :</span>
          <p className="text-sm text-white/90">{analysis.website_performance}</p>
        </div>
        
        <div className="bg-black/20 p-3 rounded-lg">
          <span className="text-sm font-medium text-white block mb-1">Sécurité et conformité :</span>
          <p className="text-sm text-white/90">{analysis.security_compliance}</p>
        </div>
      </div>
    </motion.div>
  )
}