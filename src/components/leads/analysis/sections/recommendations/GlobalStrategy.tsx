import { Card } from "@/components/ui/card"
import { 
  Target, Users, Calendar, Clock, MessageCircle, AlertTriangle, 
  CheckCircle2, TrendingUp, Briefcase, HandshakeIcon, Shield, 
  BadgeEuro, Brain, ArrowUpRight, Lightbulb, UserCheck, Scale,
  Timer, MessageSquareWarning, Handshake, MessagesSquare
} from "lucide-react"

interface GlobalStrategyProps {
  recommendations: {
    approach_strategy: string
    entry_points: string[]
    sales_arguments: string[]
    optimal_timing: string
    required_resources: string[]
    communication_style?: string
    decision_makers?: string[]
    budget_considerations?: string
    potential_objections?: string[]
    trust_building_steps?: string[]
    competitive_positioning?: string
    value_proposition?: string
    success_metrics?: string[]
    risk_factors?: string[]
    timeline_expectations?: string
    negotiation_strategy?: string
    relationship_building?: {
      first_contact: string
      follow_up_strategy: string
      meeting_preparation: string[]
      key_topics: string[]
      conversation_starters: string[]
    }
  }
}

export function GlobalStrategy({ recommendations }: GlobalStrategyProps) {
  return (
    <div className="space-y-6 mt-6">
      <h5 className="text-lg font-semibold text-white flex items-center gap-2">
        <Target className="h-5 w-5 text-primary" />
        Stratégie d'Approche Globale
      </h5>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Approche Principale */}
        <Card className="p-4 bg-black/40 border border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary mb-2">
              <HandshakeIcon className="h-5 w-5" />
              <h6 className="font-semibold">Approche Recommandée</h6>
            </div>
            <p className="text-sm text-white/90 leading-relaxed whitespace-pre-line">
              {recommendations.approach_strategy}
            </p>
          </div>
        </Card>

        {/* Points d'Entrée */}
        <Card className="p-4 bg-black/40 border border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary mb-2">
              <ArrowUpRight className="h-5 w-5" />
              <h6 className="font-semibold">Points d'Entrée Stratégiques</h6>
            </div>
            <ul className="space-y-2">
              {recommendations.entry_points.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-white/90">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Proposition de Valeur */}
        {recommendations.value_proposition && (
          <Card className="p-4 bg-black/40 border border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Lightbulb className="h-5 w-5" />
                <h6 className="font-semibold">Proposition de Valeur Unique</h6>
              </div>
              <p className="text-sm text-white/90 leading-relaxed whitespace-pre-line">
                {recommendations.value_proposition}
              </p>
            </div>
          </Card>
        )}

        {/* Décideurs Clés */}
        {recommendations.decision_makers && recommendations.decision_makers.length > 0 && (
          <Card className="p-4 bg-black/40 border border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <UserCheck className="h-5 w-5" />
                <h6 className="font-semibold">Profils des Décideurs</h6>
              </div>
              <ul className="space-y-2">
                {recommendations.decision_makers.map((person, index) => (
                  <li key={index} className="text-sm text-white/90 flex items-start gap-2">
                    <Briefcase className="h-4 w-4 text-primary/70 mt-1 flex-shrink-0" />
                    <span className="whitespace-pre-line">{person}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}

        {/* Arguments de Vente */}
        <Card className="p-4 bg-black/40 border border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Brain className="h-5 w-5" />
              <h6 className="font-semibold">Arguments de Vente Percutants</h6>
            </div>
            <ul className="space-y-2">
              {recommendations.sales_arguments.map((arg, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-white/90">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span>{arg}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Style de Communication */}
        {recommendations.communication_style && (
          <Card className="p-4 bg-black/40 border border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <MessageCircle className="h-5 w-5" />
                <h6 className="font-semibold">Style de Communication</h6>
              </div>
              <p className="text-sm text-white/90 leading-relaxed whitespace-pre-line">
                {recommendations.communication_style}
              </p>
            </div>
          </Card>
        )}

        {/* Stratégie de Négociation */}
        {recommendations.negotiation_strategy && (
          <Card className="p-4 bg-black/40 border border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Scale className="h-5 w-5" />
                <h6 className="font-semibold">Stratégie de Négociation</h6>
              </div>
              <p className="text-sm text-white/90 leading-relaxed whitespace-pre-line">
                {recommendations.negotiation_strategy}
              </p>
            </div>
          </Card>
        )}

        {/* Construction de la Relation */}
        {recommendations.relationship_building && (
          <Card className="p-4 bg-black/40 border border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Handshake className="h-5 w-5" />
                <h6 className="font-semibold">Construction de la Relation</h6>
              </div>
              <div className="space-y-3">
                <div>
                  <h7 className="text-sm font-medium text-primary-light">Premier Contact</h7>
                  <p className="text-sm text-white/90 mt-1 whitespace-pre-line">
                    {recommendations.relationship_building.first_contact}
                  </p>
                </div>
                <div>
                  <h7 className="text-sm font-medium text-primary-light">Stratégie de Suivi</h7>
                  <p className="text-sm text-white/90 mt-1 whitespace-pre-line">
                    {recommendations.relationship_building.follow_up_strategy}
                  </p>
                </div>
                <div>
                  <h7 className="text-sm font-medium text-primary-light">Préparation des Réunions</h7>
                  <ul className="mt-1 space-y-1">
                    {recommendations.relationship_building.meeting_preparation.map((step, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-white/90">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h7 className="text-sm font-medium text-primary-light">Sujets Clés</h7>
                  <ul className="mt-1 space-y-1">
                    {recommendations.relationship_building.key_topics.map((topic, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-white/90">
                        <MessageSquareWarning className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h7 className="text-sm font-medium text-primary-light">Accroches Conversationnelles</h7>
                  <ul className="mt-1 space-y-1">
                    {recommendations.relationship_building.conversation_starters.map((starter, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-white/90">
                        <MessagesSquare className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>{starter}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Considérations Budgétaires */}
        {recommendations.budget_considerations && (
          <Card className="p-4 bg-black/40 border border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <BadgeEuro className="h-5 w-5" />
                <h6 className="font-semibold">Considérations Budgétaires</h6>
              </div>
              <p className="text-sm text-white/90 leading-relaxed whitespace-pre-line">
                {recommendations.budget_considerations}
              </p>
            </div>
          </Card>
        )}

        {/* Objections Potentielles */}
        {recommendations.potential_objections && recommendations.potential_objections.length > 0 && (
          <Card className="p-4 bg-black/40 border border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <AlertTriangle className="h-5 w-5" />
                <h6 className="font-semibold">Objections Anticipées</h6>
              </div>
              <ul className="space-y-2">
                {recommendations.potential_objections.map((objection, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-white/90">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                    <span className="whitespace-pre-line">{objection}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}

        {/* Construction de la Confiance */}
        {recommendations.trust_building_steps && recommendations.trust_building_steps.length > 0 && (
          <Card className="p-4 bg-black/40 border border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Shield className="h-5 w-5" />
                <h6 className="font-semibold">Étapes de Construction de la Confiance</h6>
              </div>
              <ul className="space-y-2">
                {recommendations.trust_building_steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-white/90">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span className="whitespace-pre-line">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}

        {/* Timing et Planning */}
        <Card className="p-4 bg-black/40 border border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Timer className="h-5 w-5" />
              <h6 className="font-semibold">Planning d'Approche</h6>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm text-white/90">
                <Clock className="h-4 w-4 text-primary/70 mt-1" />
                <span className="whitespace-pre-line">Timing optimal : {recommendations.optimal_timing}</span>
              </div>
              {recommendations.timeline_expectations && (
                <p className="text-sm text-white/90 whitespace-pre-line mt-2">
                  {recommendations.timeline_expectations}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Métriques de Succès */}
        {recommendations.success_metrics && recommendations.success_metrics.length > 0 && (
          <Card className="p-4 bg-black/40 border border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <TrendingUp className="h-5 w-5" />
                <h6 className="font-semibold">Métriques de Succès</h6>
              </div>
              <ul className="space-y-2">
                {recommendations.success_metrics.map((metric, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-white/90">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span className="whitespace-pre-line">{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}