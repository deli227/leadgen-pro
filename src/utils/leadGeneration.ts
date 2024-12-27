import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

interface GenerateLeadsParams {
  search: string
  leadCount: number
  industry: string
  country: string
  city: string
  userId: string
  session: any
}

export const generateLeads = async ({
  search,
  leadCount,
  industry,
  country,
  city,
  userId,
  session
}: GenerateLeadsParams) => {
  try {
    console.log('Génération de leads pour utilisateur:', userId, 'avec paramètres:', {
      search,
      leadCount,
      industry,
      country,
      city
    })

    // S'assurer que tous les champs requis sont présents et correctement formatés
    const requestData = {
      search: search || "",
      leadCount: leadCount || 10,
      industry: industry || "all",
      country: country || "all",
      city: city || "all",
      userId
    }

    const response = await supabase.functions.invoke('generate-leads-with-ai', {
      body: requestData,
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    })

    if (response.error) {
      console.error('Erreur lors de la génération:', response.error)
      throw response.error
    }

    console.log('Leads générés avec succès')
    toast.success("Recherche lancée avec succès")
    window.location.reload()
  } catch (error) {
    console.error('Erreur:', error)
    toast.error("Impossible de lancer la recherche. Veuillez réessayer.")
  }
}