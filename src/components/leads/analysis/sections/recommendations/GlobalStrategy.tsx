import { Card } from "@/components/ui/card"
import { 
  Target, 
  Users, 
  Calendar, 
  Clock, 
  MessageCircle, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp,
  Briefcase,
  HandshakeIcon,
  Shield,
  BadgeEuro
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
            <p className="text-sm text-white/90 leading-relaxed">
              {recommendations.approach_strategy}
            </p>
          </div>
        </Card>

        {/* Points d'Entrée */}
        <Card className="p-4 bg-black/40 border border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary mb-2">
              <TrendingUp className="h-5 w-5" />
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

        {/* Décideurs Clés */}
        <Card className="p-4 bg-black/40 border border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Users className="h-5 w-5" />
              <h6 className="font-semibold">Décideurs Clés</h6>
            </div>
            <ul className="space-y-2">
              {recommendations.decision_makers?.map((person, index) => (
                <li key={index} className="text-sm text-white/90 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary/70" />
                  <span>{person}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Arguments de Vente */}
        <Card className="p-4 bg-black/40 border border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary mb-2">
              <MessageCircle className="h-5 w-5" />
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
        <Card className="p-4 bg-black/40 border border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary mb-2">
              <MessageCircle className="h-5 w-5" />
              <h6 className="font-semibold">Style de Communication</h6>
            </div>
            <p className="text-sm text-white/90 leading-relaxed">
              {recommendations.communication_style || "Style de communication à adapter selon le profil du décideur"}
            </p>
          </div>
        </Card>

        {/* Considérations Budgétaires */}
        <Card className="p-4 bg-black/40 border border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary mb-2">
              <BadgeEuro className="h-5 w-5" />
              <h6 className="font-semibold">Considérations Budgétaires</h6>
            </div>
            <p className="text-sm text-white/90 leading-relaxed">
              {recommendations.budget_considerations || "Budget à évaluer selon les besoins spécifiques"}
            </p>
          </div>
        </Card>

        {/* Objections Potentielles */}
        <Card className="p-4 bg-black/40 border border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary mb-2">
              <AlertTriangle className="h-5 w-5" />
              <h6 className="font-semibold">Objections Anticipées</h6>
            </div>
            <ul className="space-y-2">
              {recommendations.potential_objections?.map((objection, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-white/90">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                  <span>{objection}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Construction de la Confiance */}
        <Card className="p-4 bg-black/40 border border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Shield className="h-5 w-5" />
              <h6 className="font-semibold">Étapes de Construction de la Confiance</h6>
            </div>
            <ul className="space-y-2">
              {recommendations.trust_building_steps?.map((step, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-white/90">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Timing et Planning */}
        <Card className="p-4 bg-black/40 border border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Calendar className="h-5 w-5" />
              <h6 className="font-semibold">Planning d'Approche</h6>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/90">
                <Clock className="h-4 w-4 text-primary/70" />
                <span>Timing optimal : {recommendations.optimal_timing}</span>
              </div>
              <p className="text-sm text-white/90">
                {recommendations.timeline_expectations || "Planning à ajuster selon la disponibilité des décideurs"}
              </p>
            </div>
          </div>
        </Card>

        {/* Métriques de Succès */}
        <Card className="p-4 bg-black/40 border border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary mb-2">
              <TrendingUp className="h-5 w-5" />
              <h6 className="font-semibold">Métriques de Succès</h6>
            </div>
            <ul className="space-y-2">
              {recommendations.success_metrics?.map((metric, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-white/90">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span>{metric}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  )
}