import { motion } from "framer-motion"
import { CircuitBoard } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Lead } from "@/types/leads"
import { ScrollArea } from "@/components/ui/scroll-area"
import { QualificationScore } from "./sections/QualificationScore"
import { StrengthsList } from "./sections/StrengthsList"
import { WeaknessesList } from "./sections/WeaknessesList"
import { SeoAnalysis } from "./sections/SeoAnalysis"
import { ContactRecommendations } from "./sections/ContactRecommendations"
import { CompanyAnalysis } from "./sections/CompanyAnalysis"
import { TechAnalysis } from "./sections/TechAnalysis"
import { MarketingAnalysis } from "./sections/MarketingAnalysis"
import { FinancialAnalysis } from "./sections/FinancialAnalysis"
import { CompetitiveAnalysis } from "./sections/CompetitiveAnalysis"
import { ActionPlan } from "./sections/ActionPlan"
import { LeadAnalysis } from "@/types/analysis"

interface AIAnalysisWindowProps {
  lead: Lead | null
  analysis: LeadAnalysis | null
  isAnalyzing: boolean
}

export function AIAnalysisWindow({ lead, analysis, isAnalyzing }: AIAnalysisWindowProps) {
  if (!lead) return null

  // Créer un objet de recommendations basique si nous n'avons pas d'analyse
  const basicRecommendations = {
    approach_strategy: "Approche personnalisée basée sur les points faibles identifiés",
    entry_points: ["Contact initial par email"],
    sales_arguments: ["Amélioration des points faibles identifiés"],
    optimal_timing: "Dès que possible",
    required_resources: ["Documentation des solutions"],
    improvement_solutions: {
      tech_solutions: lead.weaknesses?.map(weakness => ({
        weakness,
        concrete_solution: "Solution technique à définir",
        implementation_steps: ["Analyse détaillée requise"],
        expected_benefits: ["Amélioration des performances"],
        estimated_cost: "À évaluer",
        implementation_timeline: "À définir"
      })) || [],
      marketing_solutions: [],
      business_solutions: []
    }
  }

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
              <h3 className="text-lg sm:text-xl font-bold text-primary-light">
                Analyse IA - {lead.company}
              </h3>
              <CircuitBoard className={`h-5 w-5 sm:h-6 sm:w-6 text-primary ${isAnalyzing ? 'animate-pulse' : ''}`} />
            </div>

            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="text-primary-light text-sm">Analyse en cours...</p>
              </div>
            ) : analysis && analysis.company_analysis ? (
              <div className="space-y-3 sm:space-y-4">
                {analysis.company_analysis && <CompanyAnalysis analysis={analysis.company_analysis} />}
                {analysis.tech_analysis && <TechAnalysis analysis={analysis.tech_analysis} />}
                {analysis.marketing_analysis && <MarketingAnalysis analysis={analysis.marketing_analysis} />}
                {analysis.financial_analysis && <FinancialAnalysis analysis={analysis.financial_analysis} />}
                {analysis.competitive_analysis && <CompetitiveAnalysis analysis={analysis.competitive_analysis} />}
                {analysis.recommendations && <ContactRecommendations recommendations={analysis.recommendations} />}
                {analysis.action_plan && <ActionPlan plan={analysis.action_plan} />}
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <QualificationScore qualification={lead.qualification || 0} />
                <StrengthsList strengths={lead.strengths || []} />
                <WeaknessesList weaknesses={lead.weaknesses || []} />
                <SeoAnalysis score={lead.score || 0} weaknesses={lead.weaknesses || []} />
                <ContactRecommendations recommendations={basicRecommendations} />
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>
    </motion.div>
  )
}