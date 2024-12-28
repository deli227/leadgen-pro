import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Lead } from "@/types/leads"

export function useLeadActions() {
  const { toast } = useToast()
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async (lead: Lead) => {
    setIsAnalyzing(true)
    try {
      const session = await supabase.auth.getSession()
      if (!session.data.session) {
        throw new Error("Non authentifié")
      }

      const { data, error } = await supabase.functions.invoke('analyze-lead', {
        body: {
          lead,
          userId: session.data.session.user.id
        }
      })

      if (error) throw error

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
    } finally {
      setIsAnalyzing(false)
    }
  }

  return {
    handleAnalyze,
    isAnalyzing
  }
}