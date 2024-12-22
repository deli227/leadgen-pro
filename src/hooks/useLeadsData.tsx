import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Lead } from "@/types/leads";
import { toast } from "sonner";

export function useLeadsData(session: Session | null) {
  const { data: supabaseLeads = [], error } = useQuery({
    queryKey: ['leads', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) {
        console.error('No user ID available');
        throw new Error('No user ID');
      }

      console.log('Fetching leads for user:', session.user.id);
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('user_id', session.user.id);
      
      if (error) {
        console.error('Error fetching leads:', error);
        toast.error('Erreur lors du chargement des leads');
        throw error;
      }
      
      console.log('Leads fetched successfully:', data?.length || 0, 'leads');
      return data;
    },
    enabled: !!session?.user?.id
  });

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
  }));

  return leads;
}