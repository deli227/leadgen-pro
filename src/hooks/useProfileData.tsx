import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { useEffect } from "react";
import { toast } from "sonner";

export function useProfileData(session: Session | null) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!session?.user?.id) return;

    console.log('Setting up realtime subscription for profile');
    const channel = supabase
      .channel('profile-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'profiles',
          filter: `id=eq.${session.user.id}`
        }, 
        async (payload) => {
          console.log('Profile change detected:', payload);
          await queryClient.invalidateQueries({ 
            queryKey: ['profile', session.user.id],
            refetchType: 'active',
            exact: true
          });
        }
      )
      .subscribe((status) => {
        console.log('Profile subscription status:', status);
      });

    return () => {
      console.log('Cleaning up profile subscription');
      supabase.removeChannel(channel);
    };
  }, [session?.user?.id, queryClient]);

  return useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) throw new Error('No user ID');

      console.log('Fetching profile for user:', session.user.id);
      const { data, error } = await supabase
        .from('profiles')
        .select('subscription_type, leads_generated_today, leads_generated_this_month, last_lead_generation_date')
        .eq('id', session.user.id)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        toast.error('Erreur lors du chargement du profil');
        throw error;
      }

      console.log('Profile data fetched:', data);
      return data;
    },
    enabled: !!session?.user?.id,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 3
  });
}