import { SupabaseClient } from '@supabase/supabase-js'

export async function checkUserLimits(
  supabase: SupabaseClient,
  userId: string,
  requestedLeadCount: number
): Promise<{
  isAllowed: boolean
  currentLimit: number
  error?: Error
}> {
  try {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('subscription_type, leads_generated_this_month')
      .eq('id', userId)
      .single()

    if (profileError) {
      return {
        isAllowed: false,
        currentLimit: 0,
        error: new Error('Erreur lors de la récupération du profil')
      }
    }

    const { data: limits, error: limitsError } = await supabase
      .from('subscription_limits')
      .select('monthly_leads_limit')
      .eq('subscription_type', profile.subscription_type)
      .single()

    if (limitsError) {
      return {
        isAllowed: false,
        currentLimit: 0,
        error: new Error('Erreur lors de la récupération des limites')
      }
    }

    return {
      isAllowed: requestedLeadCount <= limits.monthly_leads_limit,
      currentLimit: limits.monthly_leads_limit
    }
  } catch (error) {
    return {
      isAllowed: false,
      currentLimit: 0,
      error: new Error('Erreur lors de la vérification des limites')
    }
  }
}