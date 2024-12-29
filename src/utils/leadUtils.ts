import { supabase } from "@/integrations/supabase/client"

export const handleLeadDeletion = async (leadId: string) => {
  try {
    // 1. Supprimer les références dans leads_to_tags
    const { error: tagsError } = await supabase
      .from('leads_to_tags')
      .delete()
      .eq('lead_id', leadId)

    if (tagsError) {
      console.error('Erreur lors de la suppression des tags:', tagsError)
      return tagsError
    }

    // 2. Supprimer les références dans lead_notes
    const { error: notesError } = await supabase
      .from('lead_notes')
      .delete()
      .eq('lead_id', leadId)

    if (notesError) {
      console.error('Erreur lors de la suppression des notes:', notesError)
      return notesError
    }

    // 3. Supprimer les références dans analytics_leads
    const { error: analyticsError } = await supabase
      .from('analytics_leads')
      .delete()
      .eq('lead_id', leadId)

    if (analyticsError) {
      console.error('Erreur lors de la suppression des analytics:', analyticsError)
      return analyticsError
    }

    // 4. Finalement, supprimer le lead
    const { error: leadError } = await supabase
      .from('leads')
      .delete()
      .eq('id', leadId)

    if (leadError) {
      console.error('Erreur lors de la suppression du lead:', leadError)
      return leadError
    }

    return null
  } catch (error) {
    console.error('Erreur système lors de la suppression:', error)
    return error
  }
}