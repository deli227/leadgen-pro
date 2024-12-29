import { motion } from "framer-motion"
import { Lead } from "@/types/leads"
import { useLeadActions } from "@/hooks/useLeadActions"
import { AIAnalysisWindow } from "./analysis/AIAnalysisWindow"
import { useState } from "react"
import { LeadsList } from "./shared/LeadsList"
import { LeadAnalysis } from "@/types/analysis"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

interface LeadsAnalyticsProps {
  leads: Lead[]
  onAddToExport: (lead: Lead) => void
  onLocalRemove?: (leadId: string) => void
  onRemoveFromAnalytics?: (leadId: string) => void
}

export function LeadsAnalytics({ 
  leads, 
  onAddToExport, 
  onLocalRemove,
  onRemoveFromAnalytics 
}: LeadsAnalyticsProps) {
  const { handleAnalyze, isAnalyzing } = useLeadActions()
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [currentAnalysis, setCurrentAnalysis] = useState<LeadAnalysis | null>(null)
  const { toast } = useToast()
  const [removedLeads, setRemovedLeads] = useState<string[]>([])

  const handleDelete = async (lead: Lead) => {
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', lead.id)

      if (error) throw error

      setRemovedLeads(prev => [...prev, lead.id])
      if (onRemoveFromAnalytics) {
        onRemoveFromAnalytics(lead.id)
      }
      toast({
        title: "Lead supprimé",
        description: "Le lead a été supprimé avec succès"
      })
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du lead",
        variant: "destructive"
      })
    }
  }

  const filteredLeads = leads.filter(lead => !removedLeads.includes(lead.id))

  const handleAnalyzeLead = async (lead: Lead) => {
    try {
      setSelectedLead(lead)
      setCurrentAnalysis(null)
      const analysis = await handleAnalyze(lead)
      if (analysis) {
        console.log("Analyse reçue:", analysis)
        setCurrentAnalysis(analysis)
      }
    } catch (error) {
      console.error("Erreur lors de l'analyse:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'analyse du lead",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="flex flex-col xl:flex-row gap-8 p-4 xl:p-8 min-h-[calc(100vh-8rem)] max-w-[2400px] mx-auto">
      <div className="xl:w-1/4 2xl:w-1/5">
        <div className="bg-gradient-to-br from-black/40 to-secondary/20 rounded-2xl backdrop-blur-sm border border-primary/10 shadow-xl hover:shadow-primary/5 transition-all duration-300 p-6 xl:p-8">
          <LeadsList 
            leads={filteredLeads}
            onAddToAnalytics={handleAnalyzeLead}
            onAddToExport={onAddToExport}
            onDelete={handleDelete}
            title="Leads en analyse"
          />
        </div>
      </div>
      
      <div className="xl:flex-1">
        <AIAnalysisWindow 
          lead={selectedLead} 
          analysis={currentAnalysis} 
          isAnalyzing={isAnalyzing}
        />
      </div>
    </div>
  )
}