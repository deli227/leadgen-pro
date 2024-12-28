import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

interface ImprovementSuggestion {
  priority: string
  action: string
  expected_impact: string
  implementation_difficulty: string
  estimated_timeframe: string
  required_investment: string
}

interface SpecificSolution {
  weakness: string
  proposed_solutions: string[]
  implementation_steps: string[]
  expected_benefits: string[]
  success_metrics: string[]
}

interface ContactRecommendationsProps {
  weaknesses?: string[]
  recommendations?: {
    approach_strategy: string
    entry_points: string[]
    sales_arguments: string[]
    optimal_timing: string
    required_resources: string[]
    improvement_suggestions: ImprovementSuggestion[]
    specific_solutions: SpecificSolution[]
  }
}

export function ContactRecommendations({ weaknesses, recommendations }: ContactRecommendationsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="p-3 sm:p-4 rounded-lg bg-black/40 border border-primary/20"
    >
      <div className="flex items-center gap-2 mb-2">
        <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
        <h4 className="font-semibold text-sm sm:text-base text-primary-light">Recommandations pour le contact</h4>
      </div>
      
      <div className="space-y-4">
        {recommendations ? (
          <>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-primary-light/80 font-medium">Stratégie d'approche :</p>
                <p className="text-sm text-primary-light/60">{recommendations.approach_strategy}</p>
              </div>
              
              <div>
                <p className="text-sm text-primary-light/80 font-medium">Points d'entrée :</p>
                <ul className="list-disc pl-4 space-y-1">
                  {recommendations.entry_points.map((point, index) => (
                    <li key={index} className="text-sm text-primary-light/60">{point}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm text-primary-light/80 font-medium">Arguments de vente :</p>
                <ul className="list-disc pl-4 space-y-1">
                  {recommendations.sales_arguments.map((arg, index) => (
                    <li key={index} className="text-sm text-primary-light/60">{arg}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm text-primary-light/80 font-medium">Timing optimal :</p>
                <p className="text-sm text-primary-light/60">{recommendations.optimal_timing}</p>
              </div>

              <div>
                <p className="text-sm text-primary-light/80 font-medium">Ressources nécessaires :</p>
                <ul className="list-disc pl-4 space-y-1">
                  {recommendations.required_resources.map((resource, index) => (
                    <li key={index} className="text-sm text-primary-light/60">{resource}</li>
                  ))}
                </ul>
              </div>

              {recommendations.improvement_suggestions && (
                <div className="mt-6">
                  <h5 className="text-sm font-semibold text-primary-light mb-3">Suggestions d'amélioration détaillées :</h5>
                  <div className="space-y-4">
                    {recommendations.improvement_suggestions.map((suggestion, index) => (
                      <div key={index} className="bg-black/20 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary-light">
                            Priorité : {suggestion.priority}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-primary-light/80"><span className="font-medium">Action :</span> {suggestion.action}</p>
                          <p className="text-sm text-primary-light/80"><span className="font-medium">Impact attendu :</span> {suggestion.expected_impact}</p>
                          <p className="text-sm text-primary-light/80"><span className="font-medium">Difficulté :</span> {suggestion.implementation_difficulty}</p>
                          <p className="text-sm text-primary-light/80"><span className="font-medium">Délai estimé :</span> {suggestion.estimated_timeframe}</p>
                          <p className="text-sm text-primary-light/80"><span className="font-medium">Investissement requis :</span> {suggestion.required_investment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {recommendations.specific_solutions && (
                <div className="mt-6">
                  <h5 className="text-sm font-semibold text-primary-light mb-3">Solutions spécifiques par point faible :</h5>
                  <div className="space-y-4">
                    {recommendations.specific_solutions.map((solution, index) => (
                      <div key={index} className="bg-black/20 p-3 rounded-lg">
                        <p className="text-sm font-medium text-primary-light mb-2">Point faible : {solution.weakness}</p>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-primary-light/80 font-medium">Solutions proposées :</p>
                            <ul className="list-disc pl-4 space-y-1">
                              {solution.proposed_solutions.map((sol, idx) => (
                                <li key={idx} className="text-sm text-primary-light/60">{sol}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p className="text-sm text-primary-light/80 font-medium">Étapes de mise en œuvre :</p>
                            <ul className="list-disc pl-4 space-y-1">
                              {solution.implementation_steps.map((step, idx) => (
                                <li key={idx} className="text-sm text-primary-light/60">{step}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p className="text-sm text-primary-light/80 font-medium">Bénéfices attendus :</p>
                            <ul className="list-disc pl-4 space-y-1">
                              {solution.expected_benefits.map((benefit, idx) => (
                                <li key={idx} className="text-sm text-primary-light/60">{benefit}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p className="text-sm text-primary-light/80 font-medium">Métriques de succès :</p>
                            <ul className="list-disc pl-4 space-y-1">
                              {solution.success_metrics.map((metric, idx) => (
                                <li key={idx} className="text-sm text-primary-light/60">{metric}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : weaknesses ? (
          <>
            <p className="text-sm text-primary-light/80">Points clés à aborder lors du contact :</p>
            <ul className="space-y-4">
              {weaknesses.map((weakness, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="text-sm sm:text-base"
                >
                  <div className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2" />
                    <div className="space-y-2">
                      <p className="font-medium text-primary-light/90">Sujet : {weakness}</p>
                      <div className="space-y-2 pl-4 border-l-2 border-blue-500/20">
                        <div>
                          <p className="text-xs sm:text-sm text-primary-light/80 font-medium">
                            Approche recommandée :
                          </p>
                          <p className="text-xs sm:text-sm text-primary-light/60">
                            Comment aborder ce point de manière constructive
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-xs sm:text-sm text-primary-light/80 font-medium">
                            Solutions à proposer :
                          </p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li className="text-xs sm:text-sm text-primary-light/60">
                              Solution adaptée à leur contexte
                            </li>
                            <li className="text-xs sm:text-sm text-primary-light/60">
                              Bénéfices concrets pour leur activité
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <p className="text-xs sm:text-sm text-primary-light/80 font-medium">
                            Arguments clés :
                          </p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li className="text-xs sm:text-sm text-primary-light/60">
                              ROI potentiel
                            </li>
                            <li className="text-xs sm:text-sm text-primary-light/60">
                              Avantage concurrentiel
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </motion.div>
  )
}