import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const serpApiKey = Deno.env.get('SERPAPI_KEY');
const openAiKey = Deno.env.get('OPENAI_API_KEY');

async function searchWithSerpAPI(query: string, numLeads: number) {
  console.log('Recherche SerpAPI pour:', query);
  
  const serpApiUrl = `https://serpapi.com/search`;
  const params = new URLSearchParams({
    q: query,
    engine: "google",
    api_key: serpApiKey!,
    num: String(numLeads),
  });

  const response = await fetch(`${serpApiUrl}?${params}`);
  const result = await response.json();

  if (!result.organic_results || result.organic_results.length === 0) {
    throw new Error("Aucun résultat trouvé.");
  }

  return result.organic_results.map((entry: any) => ({
    title: entry.title,
    snippet: entry.snippet,
    link: entry.link,
  }));
}

async function analyzeWithOpenAI(data: { title: string; snippet: string; link: string }) {
  console.log('Analyse OpenAI pour:', data.title);
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Vous êtes un expert en analyse d\'entreprises. Analysez les informations fournies et donnez une réponse structurée avec les points forts, points faibles et recommandations.'
        },
        {
          role: 'user',
          content: `
            Analysez cette entreprise :
            Titre : ${data.title}
            Description : ${data.snippet}
            Site web : ${data.link}
            
            Format de réponse souhaité :
            1. Points forts de l'entreprise
            2. Points faibles potentiels
            3. Recommandations d'amélioration
          `
        }
      ],
    }),
  });

  const result = await response.json();
  
  if (!result.choices || result.choices.length === 0) {
    throw new Error("Aucune réponse reçue de l'API OpenAI.");
  }

  return result.choices[0].message.content;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { country, city, sector, numLeads, userId } = await req.json();
    console.log('Génération de leads pour:', { country, city, sector, numLeads, userId });

    if (!serpApiKey || !openAiKey) {
      throw new Error('Clés API manquantes');
    }

    // Création du client Supabase avec les clés d'environnement
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Construction de la requête
    const query = `${sector} entreprise ${city} ${country}`;
    const searchResults = await searchWithSerpAPI(query, numLeads);
    
    // Analyse et sauvegarde des leads
    const leads = [];
    for (const result of searchResults) {
      const analysis = await analyzeWithOpenAI(result);
      
      // Extraction des points forts et faibles depuis l'analyse
      const strengths = analysis.split('Points forts')[1]?.split('Points faibles')[0]
        ?.split('\n')
        .filter(Boolean)
        .map(s => s.replace(/^[•-]\s*/, '').trim()) || [];
        
      const weaknesses = analysis.split('Points faibles')[1]?.split('Recommandations')[0]
        ?.split('\n')
        .filter(Boolean)
        .map(s => s.replace(/^[•-]\s*/, '').trim()) || [];

      // Création du lead
      const lead = {
        user_id: userId,
        company: result.title,
        website: result.link,
        industry: sector,
        strengths,
        weaknesses,
        score: Math.floor(Math.random() * 5) + 5, // Score entre 5 et 10
        qualification: Math.floor(Math.random() * 3) + 2, // Qualification entre 2 et 5
      };

      const { data, error } = await supabaseClient
        .from('leads')
        .insert([lead]);

      if (error) throw error;
      leads.push(lead);
    }

    return new Response(
      JSON.stringify({ success: true, leads }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erreur:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});