import { TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

interface StrengthsListProps {
  strengths: string[]
}

export function StrengthsList({ strengths }: StrengthsListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="p-3 sm:p-4 rounded-lg bg-black/40 border border-primary/20"
    >
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
        <h4 className="font-semibold text-sm sm:text-base text-primary-light">Points forts</h4>
      </div>
      <ul className="space-y-1.5 sm:space-y-2">
        {strengths?.map((strength, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-start gap-2 text-sm sm:text-base text-primary-light/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2" />
            <div className="space-y-1">
              <p>{strength}</p>
              <div className="pl-2 border-l-2 border-green-500/20 text-xs">
                <p className="text-primary-light/60 italic">Impact positif : Comment ce point fort peut être exploité</p>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}