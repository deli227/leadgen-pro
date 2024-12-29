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
    console.log('Prompt envoyé:', prompt)

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
            content: 'Tu es un expert en recherche d\'entreprises. Fournis uniquement les informations au format JSON demandé, sans texte supplémentaire ni balises de code.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.1,
        max_tokens: 1000
      }),
    })

    if (!response.ok) {
      console.error('Erreur Perplexity:', await response.text())
      throw new Error('Erreur lors de la recherche de l\'entreprise')
    }

    const result = await response.json()
    console.log('Réponse Perplexity brute:', result.choices[0].message.content)

    let cleanedContent = result.choices[0].message.content
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .replace(/^\s*{\s*/, '{')
      .replace(/\s*}\s*$/, '}')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/\n/g, ' ')
      .replace(/,\s*}/g, '}')
      .replace(/,\s*,/g, ',')
      .replace(/\s+/g, ' ')
      .replace(/([{,])\s*"(\w+)":/g, '$1"$2":')
      .replace(/:\s*"([^"]+)"\s*([,}])/g, ':"$1"$2')
      .replace(/([{,])\s+/g, '$1')
      .replace(/\s+([}])/g, '$1')
      .replace(/"\s+:/g, '":')
      .replace(/:\s+"/g, ':"')
      .replace(/null/g, '""')

    console.log('Contenu JSON nettoyé:', cleanedContent)

    try {
      const parsedContent = JSON.parse(cleanedContent)
      
      // Validation des champs requis avec valeurs par défaut
      const defaultValues = {
        company: '',
        email: '',
        phone: '',
        website: '',
        address: '',
        industry: '',
        score: 0,
        socialMedia: {
          linkedin: '',
          twitter: '',
          facebook: '',
          instagram: ''
        }
      }

      const validatedContent = {
        ...defaultValues,
        ...parsedContent,
        socialMedia: {
          ...defaultValues.socialMedia,
          ...(parsedContent.socialMedia || {})
        }
      }

      // Vérification finale des types
      if (typeof validatedContent.score !== 'number') {
        validatedContent.score = parseInt(validatedContent.score) || 0
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          data: JSON.stringify(validatedContent)
        }),
        { 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          } 
        }
      )
    } catch (parseError) {
      console.error('Erreur de parsing JSON:', parseError, 'Contenu nettoyé:', cleanedContent)
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