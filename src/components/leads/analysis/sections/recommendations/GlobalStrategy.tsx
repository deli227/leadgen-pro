import { Card } from "@/components/ui/card"

interface GlobalStrategyProps {
  recommendations: {
    approach_strategy: string
    entry_points: string[]
    sales_arguments: string[]
    optimal_timing: string
    required_resources: string[]
  }
}

export function GlobalStrategy({ recommendations }: GlobalStrategyProps) {
  return (
    <div className="space-y-4 mt-6">
      <h5 className="text-sm font-semibold text-white">
        Stratégie d'approche globale
      </h5>
      <Card className="p-4 bg-black/40 border border-primary/20">
        <div className="space-y-4">
          <div>
            <p className="text-xs text-white font-semibold mb-1">
              Approche recommandée :
            </p>
            <p className="text-sm text-white/90">
              {recommendations.approach_strategy}
            </p>
          </div>

          <div>
            <p className="text-xs text-white font-semibold mb-1">
              Points d'entrée :
            </p>
            <ul className="list-disc pl-4 space-y-1">
              {recommendations.entry_points.map((point, index) => (
                <li key={index} className="text-sm text-white/90">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs text-white font-semibold mb-1">
              Arguments de vente :
            </p>
            <ul className="list-disc pl-4 space-y-1">
              {recommendations.sales_arguments.map((arg, index) => (
                <li key={index} className="text-sm text-white/90">
                  {arg}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center pt-2">
            <p className="text-xs text-white/80">
              Timing optimal : {recommendations.optimal_timing}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}