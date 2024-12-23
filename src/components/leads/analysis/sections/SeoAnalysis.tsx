import { Search, ChartBar } from "lucide-react"
import { motion } from "framer-motion"

interface SeoAnalysisProps {
  score: number
  weaknesses: string[]
}

export function SeoAnalysis({ score, weaknesses }: SeoAnalysisProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="p-3 sm:p-4 rounded-lg bg-black/40 border border-primary/20"
    >
      <div className="flex items-center gap-2 mb-2">
        <Search className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        <h4 className="font-semibold text-sm sm:text-base text-primary-light">Score SEO & Recommandations</h4>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <ChartBar className="h-3 w-3 sm:h-4 sm:w-4 text-primary-light/70" />
          <span className="text-lg sm:text-xl font-bold text-primary">{score}/10</span>
        </div>
        
        <div className="space-y-4">
          <div>
            <h5 className="text-sm font-medium text-primary-light mb-2">Analyse SEO détaillée :</h5>
            <ul className="space-y-4">
              {weaknesses?.map((improvement, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-sm sm:text-base text-primary-light/70"
                >
                  <div className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2" />
                    <div className="space-y-2">
                      <p className="font-medium text-accent">{improvement}</p>
                      <div className="space-y-1 pl-4 border-l-2 border-accent/20">
                        <p className="text-xs sm:text-sm text-primary-light/80 font-medium">
                          Impact sur le référencement :
                        </p>
                        <p className="text-xs sm:text-sm text-primary-light/60">
                          Analyse détaillée de l'impact sur la visibilité
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}