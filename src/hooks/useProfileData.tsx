import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { useEffect } from "react";

export function useProfileData(session: Session | null) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!session?.user?.id) return;

    console.log('Setting up realtime subscription for profile');
    const channel = supabase
      .channel('public:profiles')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'profiles',
          filter: `id=eq.${session.user.id}`
        }, 
        (payload) => {
          console.log('Profile change detected:', payload);
          queryClient.invalidateQueries({ queryKey: ['profile', session.user.id] });
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up profile subscription');
      supabase.removeChannel(channel);
    };
  }, [session?.user?.id, queryClient]);

  return useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) throw new Error('No user ID');

      const { data, error } = await supabase
        .from('profiles')
        .select('subscription_type, leads_generated_today, leads_generated_this_month, last_lead_generation_date')
        .eq('id', session.user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id
  });
}