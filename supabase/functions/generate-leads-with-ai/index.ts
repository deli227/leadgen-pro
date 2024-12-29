import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { validateLead } from './validateLead.ts'
import { buildPrompt } from './promptBuilder.ts'
import { extractJSONFromText } from './responseHandler.ts'
import { checkAndGetAvailableLeads, updateLeadCount } from './limitHandler.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    console.log('Requête OPTIONS reçue - Gestion CORS')
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('🚀 Début de la génération de leads')
    const { filters, userId } = await req.json()
    console.log('📋 Filtres reçus:', JSON.stringify(filters, null, 2))
    console.log('👤 UserId reçu:', userId)

    if (!userId) {
      console.error('❌ Erreur: UserId non fourni')
      throw new Error('UserId non fourni')
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('🔌 Client Supabase initialisé')

    const { canGenerate, availableLeads, error: limitError } = await checkAndGetAvailableLeads(
      supabase,
      userId,
      filters.leadCount
    );
    console.log('✅ Vérification des limites:', { canGenerate, availableLeads })

    if (!canGenerate || availableLeads === 0) {
      console.warn('⚠️ Limite de génération atteinte:', { limitError })
      return new Response(
        JSON.stringify({
          success: false,
          error: limitError || "Limite de leads atteinte",
          limitReached: true
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

    console.log(`✨ Génération autorisée pour ${availableLeads} leads`)

    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY')
    if (!perplexityApiKey) {
      console.error('❌ Erreur: Clé API Perplexity non configurée')
      throw new Error('Clé API Perplexity non configurée')
    }

    const adjustedFilters = { ...filters, leadCount: availableLeads };
    const prompt = buildPrompt(adjustedFilters)
    console.log('📝 Prompt généré pour', availableLeads, 'leads')

    console.log('🤖 Appel API Perplexity en cours...')
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
      const errorText = await response.text()
      console.error('❌ Erreur Perplexity:', errorText)
      throw new Error('Erreur lors de la génération des leads')
    }

    const result = await response.json()
    console.log('✅ Réponse Perplexity reçue')

    const content = result.choices[0].message.content;
    console.log('📄 Contenu brut reçu:', content)
    
    const generatedLeads = extractJSONFromText(content);
    console.log('🔍 Leads extraits:', generatedLeads)
    
    let validLeads = generatedLeads.filter(validateLead);
    console.log(`✨ ${validLeads.length} leads valides générés:`, validLeads)

    if (validLeads.length > availableLeads) {
      console.log(`⚠️ Troncature des leads de ${validLeads.length} à ${availableLeads}`)
      validLeads = validLeads.slice(0, availableLeads);
    }

    if (validLeads.length === 0) {
      console.error('❌ Erreur: Aucun lead valide n\'a été généré')
      throw new Error('Aucun lead valide n\'a été généré')
    }

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

    console.log(`📥 Tentative d'insertion de ${leadsToInsert.length} leads`)

    const { data: insertedLeads, error: insertError } = await supabase
      .from('leads')
      .insert(leadsToInsert)
      .select();

    if (insertError) {
      console.error('❌ Erreur détaillée lors de l\'insertion:', insertError)
      throw new Error(`Erreur lors de l'insertion des leads: ${JSON.stringify(insertError)}`)
    }

    if (!insertedLeads) {
      console.error('❌ Erreur: Aucun lead n\'a été inséré')
      throw new Error('Aucun lead n\'a été inséré')
    }

    console.log(`✅ ${insertedLeads.length} leads insérés avec succès`)
    await updateLeadCount(supabase, userId, insertedLeads.length);
    console.log(`📊 Compteurs mis à jour pour ${insertedLeads.length} leads`)

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
    console.error('❌ Erreur détaillée:', error)
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