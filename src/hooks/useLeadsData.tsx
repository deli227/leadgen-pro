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

    console.log('Configuration du canal de synchronisation en temps réel');
    
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
        (payload) => {
          console.log('Changement détecté:', payload);

          // Mise à jour instantanée pour les nouveaux leads
          if (payload.eventType === 'INSERT') {
            queryClient.setQueryData(['leads', session.user.id], (oldData: Lead[] | undefined) => {
              const newLead = payload.new as Lead;
              console.log('Ajout du nouveau lead:', newLead);
              return oldData ? [newLead, ...oldData] : [newLead];
            });
          }

          // Mise à jour instantanée pour les suppressions
          if (payload.eventType === 'DELETE') {
            queryClient.setQueryData(['leads', session.user.id], (oldData: Lead[] | undefined) => {
              if (!oldData) return [];
              return oldData.filter(lead => lead.id !== payload.old.id);
            });
          }
        }
      )
      .subscribe((status) => {
        console.log('Statut de la souscription:', status);
      });

    return () => {
      console.log('Nettoyage de la souscription');
      supabase.removeChannel(channel);
    };
  }, [session?.user?.id, queryClient]);

  return useQuery({
    queryKey: ['leads', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) {
        throw new Error('Aucun ID utilisateur');
      }

      console.log('Récupération initiale des leads');
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur lors de la récupération des leads:', error);
        throw error;
      }

      console.log(`${data?.length || 0} leads récupérés`);
      return data || [];
    },
    enabled: !!session?.user?.id,
    staleTime: 0,
    refetchOnMount: true
  });
}