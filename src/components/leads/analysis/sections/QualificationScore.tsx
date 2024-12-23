import { Signal } from "lucide-react"
import { motion } from "framer-motion"

interface QualificationScoreProps {
  qualification: number
}

export function QualificationScore({ qualification }: QualificationScoreProps) {
  return (
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
        <span className="text-xl sm:text-2xl font-bold text-primary">{qualification}/10</span>
      </div>
    </motion.div>
  )
}