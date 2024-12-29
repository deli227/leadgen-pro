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
      // D'abord supprimer les références dans analytics_leads
      const { error: analyticsError } = await supabase
        .from('analytics_leads')
        .delete()
        .eq('lead_id', lead.id)

      if (analyticsError) {
        console.error("Erreur lors de la suppression des analytics:", analyticsError)
      }

      // Ensuite supprimer le lead
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      <div className="lg:col-span-2">
        <LeadsList 
          leads={filteredLeads}
          onAddToAnalytics={handleAnalyzeLead}
          onAddToExport={onAddToExport}
          onDelete={handleDelete}
          title="Leads en analyse"
        />
      </div>
      
      <AIAnalysisWindow 
        lead={selectedLead} 
        analysis={currentAnalysis} 
        isAnalyzing={isAnalyzing}
      />
    </div>
  )
}