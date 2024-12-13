import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

export function useSubscriptionLimits(subscriptionType: string | undefined) {
  return useQuery({
    queryKey: ['subscription_limits', subscriptionType],
    queryFn: async () => {
      if (!subscriptionType) return null
      const { data, error } = await supabase
        .from('subscription_limits')
        .select('daily_leads_limit, monthly_leads_limit')
        .eq('subscription_type', subscriptionType)
        .single()
      
      if (error) throw error
      return data
    },
    enabled: !!subscriptionType
  })
}