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

          // Force le rafraîchissement immédiat des données
          queryClient.setQueryData(['leads', session.user.id], (oldData: any) => {
            if (payload.eventType === 'INSERT') {
              // Ajoute le nouveau lead au début de la liste
              return [payload.new, ...(oldData || [])];
            }
            if (payload.eventType === 'DELETE') {
              // Filtre le lead supprimé
              return oldData?.filter((lead: Lead) => lead.id !== payload.old.id) || [];
            }
            // Pour les autres événements, force un rafraîchissement complet
            return queryClient.fetchQuery({
              queryKey: ['leads', session.user.id],
              queryFn: async () => {
                const { data } = await supabase
                  .from('leads')
                  .select('*')
                  .eq('user_id', session.user.id)
                  .order('created_at', { ascending: false });
                return data || [];
              }
            });
          });

          // Rafraîchit également les données du profil
          await queryClient.invalidateQueries({
            queryKey: ['profile', session.user.id]
          });

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

  const { data: leads = [], error, isLoading } = useQuery({
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

  return { leads, isLoading, error };
}