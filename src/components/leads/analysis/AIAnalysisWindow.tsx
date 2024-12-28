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
import { useLeadActions } from "@/hooks/useLeadActions"
import { useState, useEffect } from "react"

interface AIAnalysisWindowProps {
  lead: Lead | null
  analysis?: LeadAnalysis | null
}

export function AIAnalysisWindow({ lead }: AIAnalysisWindowProps) {
  const { isAnalyzing } = useLeadActions()
  const [currentAnalysis, setCurrentAnalysis] = useState<LeadAnalysis | null>(null)

  useEffect(() => {
    if (!lead) {
      setCurrentAnalysis(null)
    }
  }, [lead])

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
              <CircuitBoard className={`h-5 w-5 sm:h-6 sm:w-6 text-primary ${isAnalyzing ? 'animate-pulse' : ''}`} />
            </div>

            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="text-primary-light text-sm">Analyse en cours...</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {currentAnalysis ? (
                  <>
                    <CompanyAnalysis analysis={currentAnalysis.company_analysis} />
                    <TechAnalysis analysis={currentAnalysis.tech_analysis} />
                    <MarketingAnalysis analysis={currentAnalysis.marketing_analysis} />
                    <FinancialAnalysis analysis={currentAnalysis.financial_analysis} />
                    <CompetitiveAnalysis analysis={currentAnalysis.competitive_analysis} />
                    <ContactRecommendations recommendations={currentAnalysis.recommendations} />
                    <ActionPlan plan={currentAnalysis.action_plan} />
                  </>
                ) : (
                  <>
                    <QualificationScore qualification={lead.qualification || 0} />
                    <StrengthsList strengths={lead.strengths || []} />
                    <WeaknessesList weaknesses={lead.weaknesses || []} />
                    <SeoAnalysis score={lead.score || 0} weaknesses={lead.weaknesses || []} />
                    <ContactRecommendations weaknesses={lead.weaknesses || []} />
                  </>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>
    </motion.div>
  )
}