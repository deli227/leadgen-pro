import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from './corsConfig.ts'
import { generateLeadsWithAI } from './aiService.ts'
import { validateLead } from './validateLead.ts'
import { handleResponse } from './responseHandler.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { filters, userId } = await req.json()

    // Création du client Supabase
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Vérification des limites de l'utilisateur
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('subscription_type, leads_generated_this_month')
      .eq('id', userId)
      .single()

    if (profileError) {
      throw new Error('Erreur lors de la récupération du profil')
    }

    const { data: limits, error: limitsError } = await supabaseClient
      .from('subscription_limits')
      .select('monthly_leads_limit')
      .eq('subscription_type', profile.subscription_type)
      .single()

    if (limitsError) {
      throw new Error('Erreur lors de la récupération des limites')
    }

    const remainingLeads = limits.monthly_leads_limit - (profile.leads_generated_this_month || 0)

    if (filters.leadCount > remainingLeads) {
      return handleResponse({
        success: false,
        error: `Limite de génération atteinte. Il vous reste ${remainingLeads} leads disponibles.`
      })
    }

    // Génération des leads
    const leads = await generateLeadsWithAI(filters)
    
    // Validation et insertion des leads
    for (const lead of leads) {
      const validatedLead = validateLead(lead)
      if (!validatedLead) continue

      await supabaseClient
        .from('leads')
        .insert({
          ...validatedLead,
          user_id: userId
        })
    }

    // Mise à jour du compteur de leads générés
    await supabaseClient
      .from('profiles')
      .update({
        leads_generated_this_month: (profile.leads_generated_this_month || 0) + filters.leadCount
      })
      .eq('id', userId)

    return handleResponse({
      success: true,
      data: leads
    })

  } catch (error) {
    return handleResponse({
      success: false,
      error: error.message
    })
  }
})