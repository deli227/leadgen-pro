import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const buildSimplePrompt = (filters: any) => {
  const leadCount = Math.min(Math.max(filters.leadCount, 1), 50);
  
  let prompt = `Je recherche ${leadCount} entreprises`;
  
  if (filters.country !== 'all') {
    prompt += ` en ${filters.country}`;
    if (filters.city !== 'all') {
      prompt += ` à ${filters.city}`;
    }
  }
  
  if (filters.industry !== 'all') {
    prompt += ` dans le secteur ${filters.industry}`;
  }

  prompt += `\n\nPour chaque entreprise, donne uniquement les informations suivantes au format JSON :
  {
    "company": "Nom de l'entreprise",
    "email": "Email si trouvé",
    "phone": "Téléphone si trouvé",
    "website": "Site web si trouvé",
    "address": "Adresse si trouvée",
    "industry": "${filters.industry}",
    "score": "Note sur 10 basée sur la présence en ligne",
    "socialMedia": {
      "linkedin": "URL LinkedIn si trouvé",
      "twitter": "URL Twitter si trouvé",
      "facebook": "URL Facebook si trouvé"
    }
  }`;

  return prompt;
}

const validateLeadData = (lead: any) => {
  const requiredFields = ['company'];
  for (const field of requiredFields) {
    if (!lead[field]) {
      console.error(`Champ requis manquant: ${field}`);
      return false;
    }
  }
  return true;
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
            content: 'Tu es un expert en recherche d\'entreprises. Fournis uniquement des informations vérifiées.'
          },
          {
            role: 'user',
            content: buildSimplePrompt(filters)
          }
        ],
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 1000
      }),
    });

    if (!response.ok) {
      console.error('Erreur Perplexity:', await response.text())
      throw new Error('Erreur lors de la génération des leads')
    }

    const result = await response.json()
    console.log('Réponse Perplexity reçue')

    let generatedLeads
    try {
      const content = result.choices[0].message.content
      generatedLeads = JSON.parse(content)
      
      // Validation des données
      if (Array.isArray(generatedLeads)) {
        generatedLeads = generatedLeads.filter(lead => validateLeadData(lead))
      } else if (validateLeadData(generatedLeads)) {
        generatedLeads = [generatedLeads]
      } else {
        throw new Error('Format de données invalide')
      }
    } catch (error) {
      console.error('Erreur lors du parsing:', error)
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