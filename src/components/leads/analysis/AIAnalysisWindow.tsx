import { motion } from "framer-motion"
import { ChartBar, CircuitBoard, Signal, Database } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Lead } from "@/types/leads"

interface AIAnalysisWindowProps {
  lead: Lead | null
}

export function AIAnalysisWindow({ lead }: AIAnalysisWindowProps) {
  if (!lead) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="w-full h-full lg:h-[calc(100vh-12rem)] lg:sticky lg:top-24"
    >
      <Card className="h-full bg-black/60 border border-primary/20 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        
        <div className="relative p-4 sm:p-6 space-y-4 sm:space-y-6 max-h-[80vh] lg:max-h-full overflow-y-auto">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold text-primary-light">Analyse IA</h3>
            <CircuitBoard className="h-5 w-5 sm:h-6 sm:w-6 text-primary animate-pulse" />
          </div>

          <div className="space-y-3 sm:space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-3 sm:p-4 rounded-lg bg-black/40 border border-primary/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <Signal className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <h4 className="font-semibold text-sm sm:text-base text-primary-light">Score de qualification</h4>
              </div>
              <div className="flex items-center gap-2">
                <ChartBar className="h-3 w-3 sm:h-4 sm:w-4 text-primary-light/70" />
                <span className="text-xl sm:text-2xl font-bold text-primary">{lead.qualification}/10</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-3 sm:p-4 rounded-lg bg-black/40 border border-primary/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <h4 className="font-semibold text-sm sm:text-base text-primary-light">Points forts</h4>
              </div>
              <ul className="space-y-1.5 sm:space-y-2">
                {lead.strengths?.map((strength, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-2 text-sm sm:text-base text-primary-light/70"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {strength}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-3 sm:p-4 rounded-lg bg-black/40 border border-primary/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                <h4 className="font-semibold text-sm sm:text-base text-primary-light">Points d'amélioration</h4>
              </div>
              <ul className="space-y-1.5 sm:space-y-2">
                {lead.weaknesses?.map((weakness, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-2 text-sm sm:text-base text-primary-light/70"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {weakness}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}