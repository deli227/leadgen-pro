import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Lead } from "@/types/leads";
import { toast } from "sonner";
import { useEffect } from "react";

export function useLeadsData(session: Session | null) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!session?.user?.id) return;

    console.log('Setting up realtime subscription for leads');
    const channel = supabase
      .channel('public:leads')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'leads',
          filter: `user_id=eq.${session.user.id}`
        }, 
        async (payload) => {
          console.log('Lead change detected:', payload);
          // Invalider à la fois les leads et le profil pour mettre à jour les compteurs
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: ['leads', session.user.id] }),
            queryClient.invalidateQueries({ queryKey: ['profile', session.user.id] })
          ]);
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up leads subscription');
      supabase.removeChannel(channel);
    };
  }, [session?.user?.id, queryClient]);

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
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching leads:', error);
        toast.error('Erreur lors du chargement des leads');
        throw error;
      }
      
      console.log('Leads fetched successfully:', data?.length || 0, 'leads');
      return data;
    },
    enabled: !!session?.user?.id,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 1000
  });

  const leads: Lead[] = supabaseLeads.map(lead => ({
    id: lead.id,
    company: lead.company,
    email: lead.email || "",
    phone: lead.phone || "",
    address: lead.address || undefined,
    qualification: lead.qualification || 0,
    socialMedia: {
      linkedin: (lead.social_media as Record<string, string>)?.linkedin || "",
      twitter: (lead.social_media as Record<string, string>)?.twitter || "",
      facebook: (lead.social_media as Record<string, string>)?.facebook || "",
      instagram: (lead.social_media as Record<string, string>)?.instagram || ""
    },
    score: lead.score || 0,
    industry: lead.industry || "",
    strengths: lead.strengths || [],
    weaknesses: lead.weaknesses || [],
    website: lead.website || ""
  }));

  return leads;
}