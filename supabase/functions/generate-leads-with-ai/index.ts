import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { corsHeaders } from './corsConfig.ts'
import { buildPrompt } from './promptBuilder.ts'
import { parsePerplexityResponse, formatResponse } from './responseParser.ts'
import type { GenerateLeadsResponse } from './types.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { filters, userId } = await req.json()
    console.log('Filtres reçus:', filters)
    console.log('ID utilisateur:', userId)

    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY')
    if (!perplexityApiKey) {
      console.error('Clé API Perplexity manquante')
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Configuration API manquante' 
        }),
        { 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          },
          status: 500
        }
      )
    }

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert en génération de leads B2B. Tu fournis uniquement des données au format JSON demandé, sans texte avant ni après.'
          },
          {
            role: 'user',
            content: buildPrompt(filters)
          }
        ],
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 1000
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Erreur Perplexity:', errorText)
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Erreur lors de la génération des leads' 
        }),
        { 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          },
          status: response.status
        }
      )
    }

    const result = await response.json()
    console.log('Réponse Perplexity brute complète:', JSON.stringify(result, null, 2))

    try {
      const content = result.choices[0].message.content
      console.log('Contenu brut de la réponse avant parsing:', content)
      console.log('Type du contenu:', typeof content)
      console.log('Longueur du contenu:', content.length)
      
      const leads = parsePerplexityResponse(content)
      console.log('Leads parsés avec succès:', leads)
      
      // Création du client Supabase
      const supabaseUrl = Deno.env.get('SUPABASE_URL')
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
      
      if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error('Configuration Supabase manquante')
      }

      const supabase = createClient(supabaseUrl, supabaseServiceKey)

      // Insertion des leads dans la base de données
      for (const lead of leads) {
        const { error: insertError } = await supabase
          .from('leads')
          .insert({
            ...lead,
            user_id: userId,
            qualification: Math.floor(Math.random() * 10) + 1, // Score aléatoire entre 1 et 10
            social_media: {
              linkedin: lead.socialMedia.linkedin,
              twitter: lead.socialMedia.twitter
            }
          })

        if (insertError) {
          console.error('Erreur lors de l\'insertion du lead:', insertError)
          throw insertError
        }
      }

      const formattedResponse = formatResponse(leads, filters)
      return new Response(
        JSON.stringify(formattedResponse),
        { 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      )

    } catch (error) {
      console.error('Erreur lors du traitement de la réponse:', error)
      const errorResponse: GenerateLeadsResponse = {
        success: false,
        error: 'Format de réponse invalide',
        details: error.message
      }

      return new Response(
        JSON.stringify(errorResponse),
        { 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          },
          status: 400
        }
      )
    }

  } catch (error) {
    console.error('Erreur:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Une erreur est survenue' 
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