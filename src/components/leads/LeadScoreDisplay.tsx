import { Star } from "lucide-react"

interface LeadScoreDisplayProps {
  score: number
}

export function LeadScoreDisplay({ score }: LeadScoreDisplayProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
        <span className="text-sm font-medium text-primary-light">{score}/10</span>
      </div>
      {score >= 7 && (
        <div className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs">
          Lead qualifié
        </div>
      )}
    </div>
  )
}