import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Lead } from "@/types/leads"
import { LeadAnalysis } from "@/types/analysis"

export function useLeadActions() {
  const { toast } = useToast()
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async (lead: Lead): Promise<LeadAnalysis | null> => {
    setIsAnalyzing(true)
    try {
      const session = await supabase.auth.getSession()
      if (!session.data.session) {
        throw new Error("Non authentifié")
      }

      console.log("Début de l'analyse pour:", lead.company)
      
      const { data, error } = await supabase.functions.invoke('analyze-lead', {
        body: {
          lead,
          userId: session.data.session.user.id
        }
      })

      if (error) {
        console.error("Erreur lors de l'analyse:", error)
        throw error
      }

      console.log("Analyse reçue:", data)

      if (!data) {
        throw new Error("Aucune donnée reçue de l'analyse")
      }

      toast({
        title: "Analyse terminée",
        description: "L'analyse du lead a été effectuée avec succès"
      })

      return data
    } catch (error) {
      console.error('Erreur lors de l\'analyse:', error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'analyse du lead",
        variant: "destructive"
      })
      return null
    } finally {
      setIsAnalyzing(false)
    }
  }

  return {
    handleAnalyze,
    isAnalyzing
  }
}