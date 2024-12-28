import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const buildSimplePrompt = (filters: any) => {
  const leadCount = Math.min(Math.max(filters.leadCount, 1), 50);
  
  let prompt = `Génère ${leadCount} entreprises`;
  
  if (filters.country !== 'all') {
    prompt += ` en ${filters.country}`;
    if (filters.city !== 'all') {
      prompt += ` à ${filters.city}`;
    }
  }
  
  if (filters.industry !== 'all') {
    prompt += ` dans le secteur ${filters.industry}`;
  }

  prompt += `\n\nRéponds uniquement avec un tableau JSON contenant les entreprises avec ces champs :
  {
    "company": "Nom de l'entreprise",
    "email": "Email professionnel",
    "phone": "Téléphone",
    "website": "Site web",
    "address": "Adresse complète",
    "industry": "${filters.industry}",
    "score": "Note sur 10",
    "socialMedia": {
      "linkedin": "URL LinkedIn",
      "twitter": "URL Twitter",
      "facebook": "URL Facebook"
    }
  }`;

  return prompt;
}

const validateLead = (lead: any): boolean => {
  // Validation basique des champs requis
  if (!lead.company || typeof lead.company !== 'string') {
    console.error('Champ company invalide');
    return false;
  }

  // Validation du score
  if (lead.score) {
    const score = Number(lead.score);
    if (isNaN(score) || score < 0 || score > 10) {
      console.error('Score invalide');
      return false;
    }
  }

  // Validation des URLs
  if (lead.website && !lead.website.startsWith('http')) {
    lead.website = 'https://' + lead.website;
  }

  if (lead.socialMedia) {
    ['linkedin', 'twitter', 'facebook'].forEach(platform => {
      if (lead.socialMedia[platform] && !lead.socialMedia[platform].startsWith('http')) {
        lead.socialMedia[platform] = 'https://' + lead.socialMedia[platform];
      }
    });
  }

  return true;
}

serve(async (req) => {
  // Gestion du CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Début de la génération de leads');
    const { filters, userId } = await req.json()
    console.log('Filtres reçus:', filters)

    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY')
    if (!perplexityApiKey) {
      throw new Error('Clé API Perplexity non configurée')
    }

    console.log('Envoi de la requête à Perplexity');
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
            content: 'Tu es un expert en recherche d\'entreprises. Fournis uniquement des informations vérifiées au format JSON demandé.'
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
    console.log('Réponse Perplexity reçue');

    let generatedLeads;
    try {
      const content = result.choices[0].message.content;
      console.log('Contenu brut reçu:', content);
      
      // Tentative de parsing du JSON
      generatedLeads = JSON.parse(content);
      
      // Normalisation en tableau
      if (!Array.isArray(generatedLeads)) {
        generatedLeads = [generatedLeads];
      }
      
      // Validation et nettoyage des leads
      generatedLeads = generatedLeads.filter(lead => validateLead(lead));
      
      console.log(`${generatedLeads.length} leads valides générés`);
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