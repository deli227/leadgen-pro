import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from './corsConfig.ts';
import { searchWithSerpAPI } from './searchService.ts';
import { analyzeWithOpenAI } from './aiService.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { filters, userId } = await req.json();
    console.log('Génération de leads pour:', { filters, userId });

    const serpApiKey = Deno.env.get('SERPAPI_KEY');
    const openAiKey = Deno.env.get('OPENAI_API_KEY');

    if (!serpApiKey || !openAiKey) {
      throw new Error('Clés API manquantes');
    }

    const searchResults = await searchWithSerpAPI(filters);
    console.log('Résultats de recherche obtenus:', searchResults.length);
    
    // Création du client Supabase avec le rôle de service
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
    
    // Analyse et sauvegarde des leads
    const leads = [];
    for (const result of searchResults) {
      try {
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
          industry: filters.industry,
          strengths,
          weaknesses,
          score: Math.floor(Math.random() * 5) + 5,
          qualification: Math.floor(Math.random() * 3) + 2,
        };

        const { data, error } = await supabaseAdmin
          .from('leads')
          .insert([lead]);

        if (error) {
          console.error('Erreur lors de l\'insertion du lead:', error);
          throw error;
        }

        leads.push(lead);
      } catch (error) {
        console.error('Erreur lors du traitement du lead:', error);
      }
    }

    if (leads.length === 0) {
      throw new Error("Aucun lead n'a pu être généré. Veuillez réessayer avec des critères différents.");
    }

    return new Response(
      JSON.stringify({ success: true, leads }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erreur:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Une erreur est survenue lors de la génération des leads." 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});