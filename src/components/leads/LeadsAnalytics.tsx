import { motion } from "framer-motion"
import { Lead } from "@/types/leads"
import { useLeadActions } from "@/hooks/useLeadActions"
import { AIAnalysisWindow } from "./analysis/AIAnalysisWindow"
import { useState, useEffect } from "react"
import { LeadsList } from "./shared/LeadsList"
import { LeadAnalysis } from "@/types/analysis"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useSessionData } from "@/hooks/useSessionData"

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
  const [analyticsLeads, setAnalyticsLeads] = useState<Lead[]>([])
  const { data: session } = useSessionData()

  useEffect(() => {
    const fetchAnalyticsLeads = async () => {
      if (!session?.user?.id) return

      console.log('Fetching analytics leads...')
      const { data: analyticsData, error } = await supabase
        .from('analytics_leads')
        .select('lead_id')
        .eq('user_id', session.user.id)

      if (error) {
        console.error('Erreur lors de la récupération des leads analytiques:', error)
        return
      }

      console.log('Analytics data received:', analyticsData)
      const analyticsLeadIds = analyticsData.map(row => row.lead_id)
      const filteredLeads = leads.filter(lead => analyticsLeadIds.includes(lead.id))
      console.log('Filtered leads:', filteredLeads)
      setAnalyticsLeads(filteredLeads)
    }

    fetchAnalyticsLeads()
  }, [session?.user?.id, leads])

  const handleDelete = async (lead: Lead) => {
    try {
      if (!session?.user?.id) {
        throw new Error("Utilisateur non authentifié")
      }

      console.log('Deleting lead:', lead.id)
      const { error: analyticsError } = await supabase
        .from('analytics_leads')
        .delete()
        .eq('lead_id', lead.id)
        .eq('user_id', session.user.id)

      if (analyticsError) throw analyticsError

      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', lead.id)

      if (error) throw error

      setRemovedLeads(prev => [...prev, lead.id])
      if (onRemoveFromAnalytics) {
        onRemoveFromAnalytics(lead.id)
      }
      
      setAnalyticsLeads(prev => prev.filter(l => l.id !== lead.id))

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

  const filteredLeads = analyticsLeads.filter(lead => !removedLeads.includes(lead.id))

  const handleAnalyzeLead = async (lead: Lead) => {
    try {
      if (!session?.user?.id) {
        throw new Error("Utilisateur non authentifié")
      }

      console.log('Adding lead to analytics:', lead.id)
      const { error: analyticsError } = await supabase
        .from('analytics_leads')
        .insert([
          { user_id: session.user.id, lead_id: lead.id }
        ])

      if (analyticsError) {
        if (analyticsError.code === '23505') {
          console.log('Ce lead est déjà dans les analytiques')
          toast({
            title: "Information",
            description: "Ce lead est déjà dans les analytiques"
          })
          return
        }
        throw analyticsError
      }

      console.log('Lead added to analytics successfully')
      setSelectedLead(lead)
      setCurrentAnalysis(null)

      const analysis = await handleAnalyze(lead)
      if (analysis) {
        console.log("Analyse reçue:", analysis)
        setCurrentAnalysis(analysis)
      }
      
      setAnalyticsLeads(prev => {
        if (!prev.find(l => l.id === lead.id)) {
          return [...prev, lead]
        }
        return prev
      })

      toast({
        title: "Lead ajouté aux analytiques",
        description: "Le lead a été ajouté avec succès"
      })
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