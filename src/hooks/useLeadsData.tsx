import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Session } from "@supabase/supabase-js"
import { Lead } from "@/types/leads"

export function useLeadsData(session: Session | null) {
  const { data: supabaseLeads = [] } = useQuery({
    queryKey: ['leads', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) throw new Error('No user ID')

      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('user_id', session.user.id)
      
      if (error) throw error
      return data
    },
    enabled: !!session?.user?.id
  })

  const leads: Lead[] = supabaseLeads.map(lead => ({
    id: parseInt(lead.id),
    company: lead.company,
    email: lead.email || "",
    phone: lead.phone || "",
    address: lead.address || undefined,
    qualification: lead.qualification || 0,
    socialMedia: {
      linkedin: (lead.social_media as any)?.linkedin || "",
      twitter: (lead.social_media as any)?.twitter || ""
    },
    score: lead.score || 0,
    industry: lead.industry || "",
    strengths: lead.strengths || [],
    weaknesses: lead.weaknesses || []
  }))

  return leads
}