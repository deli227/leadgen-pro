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

    console.log('Configuration de la souscription temps réel pour les leads');
    
    const channel = supabase
      .channel('leads-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leads',
          filter: `user_id=eq.${session.user.id}`
        },
        async (payload) => {
          console.log('Changement détecté dans les leads:', payload);

          // Invalider et rafraîchir les requêtes
          await queryClient.invalidateQueries({
            queryKey: ['leads', session.user.id]
          });

          // Invalider aussi les données du profil pour mettre à jour les compteurs
          await queryClient.invalidateQueries({
            queryKey: ['profile', session.user.id]
          });

          // Notification à l'utilisateur
          if (payload.eventType === 'INSERT') {
            toast.success('Nouveau lead généré');
          }
        }
      )
      .subscribe((status) => {
        console.log('Statut de la souscription:', status);
      });

    return () => {
      console.log('Nettoyage de la souscription aux leads');
      supabase.removeChannel(channel);
    };
  }, [session?.user?.id, queryClient]);

  const { data: supabaseLeads = [], error, isLoading } = useQuery({
    queryKey: ['leads', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) {
        console.error('Aucun ID utilisateur disponible');
        throw new Error('Aucun ID utilisateur');
      }

      console.log('Récupération des leads pour l\'utilisateur:', session.user.id);
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Erreur lors de la récupération des leads:', error);
        toast.error('Erreur lors du chargement des leads');
        throw error;
      }
      
      console.log('Leads récupérés avec succès:', data?.length || 0, 'leads');
      return data;
    },
    enabled: !!session?.user?.id,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0
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

  return { leads, isLoading, error };
}