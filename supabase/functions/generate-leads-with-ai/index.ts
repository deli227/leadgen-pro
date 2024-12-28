import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const buildBasicSearchPrompt = (filters: any) => {
  const leadCount = Math.min(Math.max(filters.leadCount, 1), 50);

  let prompt = `Je recherche EXACTEMENT ${leadCount} entreprises différentes`;
  
  if (filters.country !== 'all') {
    prompt += ` en ${filters.country}`;
    if (filters.city !== 'all') {
      prompt += `, plus précisément à ${filters.city}`;
    }
  }
  
  if (filters.industry !== 'all') {
    prompt += ` dans le secteur ${filters.industry}`;
  }

  prompt += `\n\nPour chaque entreprise, fournis uniquement les informations trouvées dans ce format JSON :
  {
    "company": "Nom de l'entreprise",
    "email": "Email de contact principal (si trouvé)",
    "phone": "Numéro de téléphone (si trouvé)",
    "website": "Site web officiel (si trouvé)",
    "address": "Adresse complète (si trouvée)",
    "industry": "${filters.industry}",
    "score": "Score sur 10 basé sur la présence en ligne",
    "socialMedia": {
      // Inclure uniquement les réseaux sociaux trouvés
      "linkedin": "URL LinkedIn (si trouvé)",
      "twitter": "URL Twitter (si trouvé)"
    }
  }`;

  prompt += `\n\nInstructions importantes:
  - Renvoie EXACTEMENT ${leadCount} entreprises
  - Chaque entreprise doit être unique
  - N'inclus que les informations que tu as réellement trouvées
  - Ne pas essayer de deviner ou d'inventer des informations manquantes
  - Le nombre de résultats (${leadCount}) est une contrainte absolue`;

  return prompt;
}

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
      throw new Error('Clé API Perplexity non configurée')
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
            content: 'Tu es un expert en recherche d\'entreprises B2B. Tu fournis uniquement des informations vérifiables et à jour.'
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
      const error = await response.text()
      console.error('Erreur Perplexity:', error)
      throw new Error('Erreur lors de la génération des leads')
    }

    const result = await response.json()
    console.log('Réponse Perplexity reçue:', result)

    let generatedLeads
    try {
      const content = result.choices[0].message.content
      generatedLeads = JSON.parse(content)
    } catch (error) {
      console.error('Erreur lors du parsing de la réponse:', error)
      throw new Error('Format de réponse invalide')
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