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

          if (payload.eventType === 'INSERT') {
            const newLead = payload.new as Lead;
            console.log('Nouveau lead détecté:', newLead);
            
            // Mise à jour optimiste immédiate du cache
            queryClient.setQueryData(['leads', session.user.id], (old: Lead[] | undefined) => {
              if (!old) return [newLead];
              // Vérifier si le lead existe déjà
              const exists = old.some(lead => lead.id === newLead.id);
              if (exists) return old;
              return [newLead, ...old];
            });

            // Notification de succès
            toast.success('Nouveau lead généré');
          } else if (payload.eventType === 'DELETE') {
            console.log('Suppression du lead:', payload.old.id);
            
            queryClient.setQueryData(['leads', session.user.id], (old: Lead[] | undefined) => {
              if (!old) return [];
              return old.filter(lead => lead.id !== payload.old.id);
            });
          }

          // Force un re-fetch pour s'assurer de la synchronisation
          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: ['leads', session.user.id],
              exact: true,
              refetchType: 'active'
            }),
            queryClient.invalidateQueries({
              queryKey: ['profile', session.user.id],
              exact: true
            })
          ]);
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

  return useQuery({
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
      return data || [];
    },
    enabled: !!session?.user?.id,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0
  });
}