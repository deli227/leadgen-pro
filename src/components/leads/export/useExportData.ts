import { useToast } from "@/hooks/use-toast"
import { Lead } from "@/types/leads"
import { supabase } from "@/integrations/supabase/client"
import { useQuery } from "@tanstack/react-query"

export function useExportData(leads: Lead[]) {
  const { toast } = useToast()

  // Récupérer les notes pour chaque lead
  const { data: notesData } = useQuery({
    queryKey: ['lead_notes', leads.map(l => l.id)],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lead_notes')
        .select('*')
        .in('lead_id', leads.map(l => l.id))
      
      if (error) throw error
      return data
    },
    enabled: leads.length > 0
  })

  // Récupérer les tags pour chaque lead
  const { data: tagsData } = useQuery({
    queryKey: ['lead_tags', leads.map(l => l.id)],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads_to_tags')
        .select(`
          lead_id,
          lead_tags (*)
        `)
        .in('lead_id', leads.map(l => l.id))
      
      if (error) throw error
      return data
    },
    enabled: leads.length > 0
  })

  // Enrichir les leads avec leurs notes et tags
  const enrichedLeads = leads.map(lead => {
    const leadNotes = notesData?.filter(note => note.lead_id === lead.id) || []
    const leadTags = tagsData
      ?.filter(tag => tag.lead_id === lead.id)
      .map(tag => tag.lead_tags) || []

    return {
      ...lead,
      notes: leadNotes,
      tags: leadTags
    }
  })

  return {
    enrichedLeads,
    toast
  }
}