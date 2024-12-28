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
      <div className="flex items-center gap-2 mb-2">
        <Laptop className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
        <h4 className="font-semibold text-sm sm:text-base text-primary-light">Analyse technologique</h4>
      </div>
      
      <div className="space-y-3">
        <div>
          <span className="text-sm font-medium text-primary-light">Stack technologique :</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {analysis.tech_stack.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <span className="text-sm font-medium text-primary-light">Maturité digitale :</span>
          <p className="text-sm text-primary-light/70">{analysis.digital_maturity}</p>
        </div>
        
        <div>
          <span className="text-sm font-medium text-primary-light">Présence en ligne :</span>
          <p className="text-sm text-primary-light/70">{analysis.online_presence}</p>
        </div>
        
        <div>
          <span className="text-sm font-medium text-primary-light">Performance du site web :</span>
          <p className="text-sm text-primary-light/70">{analysis.website_performance}</p>
        </div>
        
        <div>
          <span className="text-sm font-medium text-primary-light">Sécurité et conformité :</span>
          <p className="text-sm text-primary-light/70">{analysis.security_compliance}</p>
        </div>
      </div>
    </motion.div>
  )
}