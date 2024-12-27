import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const buildBasicSearchPrompt = (filters: any) => {
  const leadCount = Math.min(Math.max(filters.leadCount, 1), 50);

  let prompt = `Génère ${leadCount} leads d'entreprises`;
  
  if (filters.search) {
    prompt += ` correspondant à "${filters.search}"`;
  }
  
  if (filters.industry !== 'all') {
    prompt += ` dans le secteur ${filters.industry}`;
  }
  
  if (filters.country !== 'all') {
    prompt += ` en ${filters.country}`;
    if (filters.city !== 'all') {
      prompt += `, plus précisément à ${filters.city}`;
    }
  }

  prompt += `\n\nRéponds UNIQUEMENT avec un tableau JSON d'objets ayant cette structure exacte, sans texte avant ni après:
  [
    {
      "company": "Nom de l'entreprise",
      "email": "Email de contact",
      "phone": "Téléphone",
      "website": "Site web",
      "address": "Adresse complète",
      "industry": "${filters.industry}",
      "score": "Note sur 10 basée sur la présence en ligne",
      "socialMedia": {
        "linkedin": "URL LinkedIn",
        "twitter": "URL Twitter",
        "facebook": "URL Facebook",
        "instagram": "URL Instagram"
      }
    }
  ]`;

  return prompt;
}

serve(async (req) => {
  // Gestion des requêtes CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders
    })
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
            content: buildBasicSearchPrompt(filters)
          }
        ],
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 1000
      }),
    });

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
    console.log('Réponse Perplexity reçue:', result)

    let generatedLeads
    try {
      const content = result.choices[0].message.content
      // Vérifie si la réponse commence par un crochet (tableau JSON)
      if (!content.trim().startsWith('[')) {
        throw new Error('Format de réponse invalide: la réponse doit être un tableau JSON')
      }
      generatedLeads = JSON.parse(content)
      console.log('Leads générés et parsés avec succès:', generatedLeads)
    } catch (error) {
      console.error('Erreur lors du parsing de la réponse:', error)
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Format de réponse invalide' 
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

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: generatedLeads 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )

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