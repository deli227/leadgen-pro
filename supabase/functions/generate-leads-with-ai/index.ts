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

  prompt += `\n\nRenvoie un tableau JSON contenant EXACTEMENT ${leadCount} entreprises avec ce format précis :
  [
    {
      "company": "Nom de l'entreprise",
      "email": "Email de contact principal",
      "phone": "Numéro de téléphone",
      "website": "Site web officiel",
      "address": "Adresse complète",
      "industry": "${filters.industry}",
      "score": "Score sur 10 basé sur la présence en ligne et le potentiel commercial",
      "socialMedia": {
        "linkedin": "URL LinkedIn si disponible",
        "twitter": "URL Twitter si disponible",
        "facebook": "URL Facebook si disponible",
        "instagram": "URL Instagram si disponible"
      }
    }
  ]`;

  prompt += `\n\nInstructions importantes:
  - Tu DOIS renvoyer EXACTEMENT ${leadCount} entreprises dans un tableau JSON
  - Le tableau doit commencer par [ et finir par ]
  - Chaque entreprise doit être unique
  - Si tu ne trouves pas assez d'entreprises correspondant aux critères, élargis légèrement la recherche tout en restant pertinent
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
            content: 'Tu es un expert en recherche d\'entreprises B2B. Tu fournis uniquement des informations vérifiables et à jour. Tu réponds TOUJOURS avec un tableau JSON valide.'
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

    // Extraction et formatage des leads depuis la réponse
    let generatedLeads
    try {
      const content = result.choices[0].message.content
      console.log('Contenu de la réponse:', content)
      
      // Nettoyage du contenu pour s'assurer qu'il commence et finit par des crochets
      const cleanedContent = content.trim().replace(/^[^[]*(\[.*\])[^]*$/, '$1')
      console.log('Contenu nettoyé:', cleanedContent)
      
      // Tentative de parser le JSON de la réponse
      generatedLeads = JSON.parse(cleanedContent)
      
      // Vérification que c'est bien un tableau
      if (!Array.isArray(generatedLeads)) {
        throw new Error('La réponse n\'est pas un tableau')
      }
      
      // Vérification du nombre exact de leads
      if (generatedLeads.length !== filters.leadCount) {
        throw new Error(`Nombre incorrect de leads: ${generatedLeads.length} au lieu de ${filters.leadCount}`)
      }
    } catch (error) {
      console.error('Erreur lors du parsing de la réponse:', error)
      throw new Error('Format de réponse invalide: ' + error.message)
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