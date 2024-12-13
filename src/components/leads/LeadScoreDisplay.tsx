import { Star } from "lucide-react"
import { motion } from "framer-motion"

interface LeadScoreDisplayProps {
  score: number
}

export function LeadScoreDisplay({ score }: LeadScoreDisplayProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3"
    >
      <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
        <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
        <span className="text-sm font-medium text-primary-light">{score}/10</span>
      </div>
      {score >= 7 && (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-medium"
        >
          Lead qualifié
        </motion.div>
      )}
    </motion.div>
  )
}