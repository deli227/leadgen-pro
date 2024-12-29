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

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="h-full"
    >
      <Card className="h-full bg-gradient-to-br from-black/40 to-secondary/20 border border-primary/10 backdrop-blur-sm overflow-hidden shadow-xl hover:shadow-primary/5 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 animate-gradient opacity-50" />
        
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="relative p-6 xl:p-8 space-y-6">
            <div className="flex items-center justify-between bg-black/20 p-4 xl:p-6 rounded-xl backdrop-blur-sm border border-primary/5">
              <h3 className="text-xl xl:text-2xl font-bold bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
                Analyse IA - {lead.company}
              </h3>
              <CircuitBoard className={`h-6 w-6 xl:h-7 xl:w-7 text-primary ${isAnalyzing ? 'animate-pulse' : ''}`} />
            </div>

            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                <p className="text-primary-light text-base">Analyse en cours...</p>
              </div>
            ) : analysis && analysis.company_analysis ? (
              <div className="space-y-6">
                {analysis.company_analysis && <CompanyAnalysis analysis={analysis.company_analysis} />}
                {analysis.tech_analysis && <TechAnalysis analysis={analysis.tech_analysis} />}
                {analysis.marketing_analysis && <MarketingAnalysis analysis={analysis.marketing_analysis} />}
                {analysis.financial_analysis && <FinancialAnalysis analysis={analysis.financial_analysis} />}
                {analysis.competitive_analysis && <CompetitiveAnalysis analysis={analysis.competitive_analysis} />}
                {analysis.recommendations && <ContactRecommendations recommendations={analysis.recommendations} />}
                {analysis.action_plan && <ActionPlan plan={analysis.action_plan} />}
              </div>
            ) : (
              <div className="space-y-6">
                <QualificationScore qualification={lead.qualification || 0} />
                <StrengthsList strengths={lead.strengths || []} />
                <WeaknessesList weaknesses={lead.weaknesses || []} />
                <SeoAnalysis score={lead.score || 0} weaknesses={lead.weaknesses || []} />
                <ContactRecommendations recommendations={{
                  approach_strategy: "",
                  entry_points: [],
                  sales_arguments: [],
                  optimal_timing: "",
                  required_resources: [],
                  improvement_solutions: {
                    tech_solutions: [],
                    marketing_solutions: [],
                    business_solutions: []
                  }
                }} />
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>
    </motion.div>
  )
}