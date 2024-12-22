import { motion } from "framer-motion"
import { ChartBar, CircuitBoard, Signal, Database, Search, TrendingUp, AlertTriangle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Lead } from "@/types/leads"
import { ScrollArea } from "@/components/ui/scroll-area"

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
        
        <ScrollArea className="h-[80vh] lg:h-full">
          <div className="relative p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-bold text-primary-light">Analyse IA</h3>
              <CircuitBoard className="h-5 w-5 sm:h-6 sm:w-6 text-primary animate-pulse" />
            </div>

            <div className="space-y-3 sm:space-y-4">
              {/* Score de qualification */}
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

              {/* Points forts */}
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
                  {lead.strengths?.map((strength, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-2 text-sm sm:text-base text-primary-light/70"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      {strength}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Points faibles */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-3 sm:p-4 rounded-lg bg-black/40 border border-primary/20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                  <h4 className="font-semibold text-sm sm:text-base text-primary-light">Points faibles</h4>
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
                      <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                      {weakness}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Score SEO et Améliorations */}
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
                    <span className="text-lg sm:text-xl font-bold text-primary">{lead.score}/10</span>
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-primary-light">Points d'amélioration détaillés :</h5>
                    <ul className="space-y-4">
                      {lead.weaknesses?.map((improvement, index) => (
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
                                  Solution recommandée :
                                </p>
                                <p className="text-xs sm:text-sm text-primary-light/60">
                                  {getRecommendation(improvement)}
                                </p>
                                <p className="text-xs sm:text-sm text-primary-light/80 font-medium mt-2">
                                  Actions concrètes :
                                </p>
                                <ul className="list-disc pl-4 space-y-1">
                                  {getActionSteps(improvement).map((step, stepIndex) => (
                                    <li key={stepIndex} className="text-xs sm:text-sm text-primary-light/60">
                                      {step}
                                    </li>
                                  ))}
                                </ul>
                                <p className="text-xs sm:text-sm text-primary-light/80 font-medium mt-2">
                                  Ressources utiles :
                                </p>
                                <ul className="list-disc pl-4 space-y-1">
                                  {getResources(improvement).map((resource, resourceIndex) => (
                                    <li key={resourceIndex} className="text-xs sm:text-sm">
                                      <a 
                                        href={resource.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-primary hover:text-primary-light hover:underline"
                                      >
                                        {resource.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollArea>
      </Card>
    </motion.div>
  )
}

// Fonction utilitaire pour générer des recommandations détaillées basées sur les points faibles
function getRecommendation(weakness: string): string {
  const recommendations: { [key: string]: string } = {
    "Présence en ligne limitée": "Développer une stratégie de présence en ligne complète incluant un site web professionnel, des profils sociaux actifs et du contenu de qualité.",
    "Manque de contenu": "Créer un calendrier éditorial pour publier régulièrement du contenu pertinent et engageant sur votre site web et vos réseaux sociaux.",
    "SEO faible": "Optimiser le référencement naturel en travaillant sur les mots-clés, la structure du site et le contenu technique.",
    "Expérience utilisateur": "Améliorer l'ergonomie du site web en optimisant la navigation, la vitesse de chargement et l'adaptation mobile.",
    "Communication client": "Mettre en place des canaux de communication efficaces et une stratégie de service client proactive.",
    "Visibilité locale": "Renforcer la présence locale via Google My Business, les annuaires locaux et les partenariats locaux.",
    "Image de marque": "Développer une identité de marque cohérente à travers tous les points de contact avec les clients.",
    "Engagement social": "Augmenter l'engagement sur les réseaux sociaux avec du contenu interactif et des conversations authentiques.",
    "Conversion": "Optimiser le parcours client et les points de conversion sur le site web.",
    "Fidélisation": "Mettre en place un programme de fidélisation et une stratégie de rétention client.",
  }

  return recommendations[weakness] || `Mettre en place un plan d'action spécifique pour améliorer ${weakness.toLowerCase()}.`
}

// Fonction pour générer des étapes d'action concrètes
function getActionSteps(weakness: string): string[] {
  const actionSteps: { [key: string]: string[] } = {
    "Présence en ligne limitée": [
      "Auditer votre présence en ligne actuelle",
      "Créer ou mettre à jour votre site web avec un design moderne",
      "Établir des profils professionnels sur les réseaux sociaux pertinents",
      "Développer une stratégie de contenu cross-canal",
      "Mettre en place des outils d'analyse pour suivre les performances"
    ],
    "Manque de contenu": [
      "Identifier les sujets d'intérêt pour votre audience",
      "Créer un calendrier éditorial sur 3 mois",
      "Produire du contenu varié (articles, vidéos, infographies)",
      "Optimiser le contenu pour le SEO",
      "Mettre en place une stratégie de distribution du contenu"
    ],
    "SEO faible": [
      "Réaliser un audit SEO complet",
      "Optimiser les balises title et meta descriptions",
      "Améliorer la structure des URLs",
      "Créer du contenu optimisé pour les mots-clés ciblés",
      "Travailler sur les backlinks de qualité"
    ],
    // ... Ajoutez d'autres catégories selon vos besoins
  }

  return actionSteps[weakness] || [
    "Analyser la situation actuelle",
    "Définir des objectifs mesurables",
    "Créer un plan d'action détaillé",
    "Mettre en place des indicateurs de suivi",
    "Évaluer et ajuster la stratégie régulièrement"
  ]
}

// Fonction pour fournir des ressources utiles
function getResources(weakness: string): Array<{name: string, url: string}> {
  const resources: { [key: string]: Array<{name: string, url: string}> } = {
    "Présence en ligne limitée": [
      {
        name: "Guide complet de la présence en ligne",
        url: "https://www.google.com/business"
      },
      {
        name: "Outils d'analyse web",
        url: "https://analytics.google.com"
      }
    ],
    "SEO faible": [
      {
        name: "Guide SEO de Google",
        url: "https://developers.google.com/search"
      },
      {
        name: "Outils SEO essentiels",
        url: "https://search.google.com/search-console"
      }
    ],
    // ... Ajoutez d'autres catégories selon vos besoins
  }

  return resources[weakness] || [
    {
      name: "Ressources générales d'amélioration",
      url: "https://www.google.com"
    }
  ]
}