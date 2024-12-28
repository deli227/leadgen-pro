import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { buildPrompt } from "./promptBuilder.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { search, country, city } = await req.json()
    console.log('Recherche entreprise:', { search, country, city })

    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY')
    if (!perplexityApiKey) {
      throw new Error('Clé API Perplexity non configurée')
    }

    const prompt = buildPrompt({ search, country, city })
    console.log('Prompt généré:', prompt)

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
            content: 'Tu es un expert en recherche d\'entreprises. Fournis uniquement les informations au format JSON demandé, sans texte supplémentaire ni balises de code.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 1000
      }),
    })

    if (!response.ok) {
      console.error('Erreur Perplexity:', await response.text())
      throw new Error('Erreur lors de la recherche de l\'entreprise')
    }

    const result = await response.json()
    console.log('Réponse Perplexity brute:', result.choices[0].message.content)

    // Nettoyer et parser la réponse
    let cleanedContent = result.choices[0].message.content
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .replace(/^\s+|\s+$/g, '')

    try {
      // Tentative de parsing du JSON
      const parsedContent = JSON.parse(cleanedContent)
      
      // Vérification de la structure attendue
      if (!parsedContent.company || typeof parsedContent.company !== 'string') {
        throw new Error('Structure JSON invalide : company manquant ou invalide')
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          data: JSON.stringify(parsedContent)
        }),
        { 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          } 
        }
      )
    } catch (parseError) {
      console.error('Erreur de parsing JSON:', parseError, 'Content:', cleanedContent)
      throw new Error('La réponse n\'est pas un JSON valide')
    }
  } catch (error) {
    console.error('Erreur détaillée:', error)
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