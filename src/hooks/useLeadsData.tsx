import { useQuery, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Session } from "@supabase/supabase-js"
import { Lead } from "@/types/leads"
import { toast } from "sonner"
import { useEffect } from "react"

export function useLeadsData(session: Session | null) {
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!session?.user?.id) {
      console.log('Pas de session utilisateur, annulation de la souscription')
      return
    }

    console.log('Configuration du canal de synchronisation en temps réel')
    
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leads',
          filter: `user_id=eq.${session.user.id}`
        },
        async (payload) => {
          console.log('Événement reçu:', payload.eventType)
          console.log('Payload complet:', payload)

          try {
            const queryKey = ['leads', session.user.id]
            const currentData = queryClient.getQueryData<Lead[]>(queryKey) || []

            if (payload.eventType === 'INSERT') {
              console.log('Traitement INSERT pour le lead:', payload.new)
              queryClient.setQueryData(queryKey, [...currentData, payload.new])
              toast.success('Nouveau lead généré')
            }

            if (payload.eventType === 'DELETE') {
              console.log('Traitement DELETE pour le lead:', payload.old.id)
              queryClient.setQueryData(
                queryKey,
                currentData.filter(lead => lead.id !== payload.old.id)
              )
            }

            if (payload.eventType === 'UPDATE') {
              console.log('Traitement UPDATE pour le lead:', payload.new)
              queryClient.setQueryData(
                queryKey,
                currentData.map(lead => 
                  lead.id === payload.new.id ? payload.new : lead
                )
              )
            }
          } catch (error) {
            console.error('Erreur lors du traitement de l\'événement:', error)
            toast.error('Erreur lors de la mise à jour en temps réel')
          }
        }
      )
      .subscribe((status) => {
        console.log('Statut de la souscription:', status)
        if (status === 'SUBSCRIBED') {
          console.log('Souscription réussie au canal temps réel')
        } else if (status === 'CHANNEL_ERROR') {
          console.error('Erreur de souscription au canal')
          toast.error('Erreur de connexion au temps réel')
        }
      })

    return () => {
      console.log('Nettoyage de la souscription')
      supabase.removeChannel(channel)
    }
  }, [session?.user?.id, queryClient])

  const query = useQuery({
    queryKey: ['leads', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) {
        throw new Error('Aucun ID utilisateur')
      }

      console.log('Récupération initiale des leads')
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erreur lors de la récupération des leads:', error)
        throw error
      }

      console.log(`${data?.length || 0} leads récupérés`)
      return data || []
    },
    enabled: !!session?.user?.id,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  })

  return {
    leads: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch
  }
}