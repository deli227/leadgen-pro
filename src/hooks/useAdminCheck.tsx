import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useAdminCheck() {
  return useQuery({
    queryKey: ['adminCheck'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_users')
        .select('user_id')
        .single();

      if (error) throw error;
      return !!data;
    },
  });
}