import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { validateLead } from './validateLead.ts'
import { buildPrompt } from './promptBuilder.ts'
import { extractJSONFromText } from './responseHandler.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Début de la génération de leads');
    const { filters, userId } = await req.json()
    console.log('Filtres reçus:', filters)
    console.log('UserId reçu:', userId)

    if (!userId) {
      throw new Error('UserId non fourni')
    }

    // Configuration du client Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Vérification des limites
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('subscription_type, leads_generated_this_month')
      .eq('id', userId)
      .single()

    if (profileError) {
      throw new Error('Erreur lors de la récupération du profil')
    }

    const { data: limits, error: limitsError } = await supabase
      .from('subscription_limits')
      .select('monthly_leads_limit')
      .eq('subscription_type', profile.subscription_type)
      .single()

    if (limitsError) {
      throw new Error('Erreur lors de la récupération des limites')
    }

    // Vérification si l'utilisateur a atteint sa limite
    if (profile.leads_generated_this_month >= limits.monthly_leads_limit) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Limite de leads atteinte",
          limitReached: true,
          currentPlan: profile.subscription_type
        }),
        { 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          },
          status: 403
        }
      )
    }

    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY')
    if (!perplexityApiKey) {
      throw new Error('Clé API Perplexity non configurée')
    }

    // Génération du prompt
    const prompt = buildPrompt(filters)
    console.log('Prompt généré:', prompt)

    // Appel à l'API Perplexity
    console.log('Envoi de la requête à Perplexity');
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-huge-128k-online',
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert en génération de données d\'entreprises. Fournis uniquement des données au format JSON demandé, sans texte supplémentaire.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 4000
      }),
    });

    if (!response.ok) {
      console.error('Erreur Perplexity:', await response.text())
      throw new Error('Erreur lors de la génération des leads')
    }

    const result = await response.json()
    console.log('Réponse Perplexity reçue');

    // Extraction et validation des leads
    const content = result.choices[0].message.content;
    console.log('Contenu brut reçu:', content);
    
    const generatedLeads = extractJSONFromText(content);
    console.log('Leads extraits:', generatedLeads);
    
    const validLeads = generatedLeads.filter(validateLead);
    console.log(`${validLeads.length} leads valides générés:`, validLeads);

    if (validLeads.length === 0) {
      throw new Error('Aucun lead valide n\'a été généré');
    }

    // Préparation des leads pour l'insertion
    const leadsToInsert = validLeads.map(lead => ({
      user_id: userId,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      website: lead.website,
      address: lead.address,
      industry: lead.industry,
      score: lead.score,
      social_media: lead.socialMedia || null
    }));

    console.log('Tentative d\'insertion des leads:', leadsToInsert);

    // Mise à jour du compteur de leads générés
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
        leads_generated_this_month: profile.leads_generated_this_month + validLeads.length,
        last_lead_generation_date: new Date().toISOString()
      })
      .eq('id', userId);

    if (updateError) {
      throw new Error('Erreur lors de la mise à jour du profil');
    }

    // Insertion des leads
    const { data: insertedLeads, error: insertError } = await supabase
      .from('leads')
      .insert(leadsToInsert)
      .select();

    if (insertError) {
      console.error('Erreur détaillée lors de l\'insertion:', insertError);
      throw new Error(`Erreur lors de l'insertion des leads: ${JSON.stringify(insertError)}`);
    }

    if (!insertedLeads) {
      throw new Error('Aucun lead n\'a été inséré');
    }

    console.log('Leads insérés avec succès:', insertedLeads);

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: insertedLeads 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )
  } catch (error) {
    console.error('Erreur détaillée:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 400
      }
    )
  }
})