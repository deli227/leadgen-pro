import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Lead } from "./types.ts"
import { buildAnalysisPrompt } from "./promptBuilder.ts"
import { analyzeWithPerplexity } from "./perplexityService.ts"
import { saveAnalysis } from "./databaseService.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Gestion des requêtes OPTIONS pour CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { lead, userId } = await req.json()
    console.log('Analyse du lead:', JSON.stringify(lead))
    console.log('UserId:', userId)

    if (!userId || !lead) {
      throw new Error('UserId et lead requis')
    }

    // Vérification de la clé API Perplexity
    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY')
    if (!perplexityApiKey) {
      console.error('Clé API Perplexity manquante')
      throw new Error('Configuration Perplexity manquante')
    }

    // Construction du prompt et analyse
    const prompt = buildAnalysisPrompt(lead as Lead)
    console.log('Prompt généré:', prompt)

    const analysis = await analyzeWithPerplexity(prompt)
    console.log('Analyse reçue de Perplexity:', JSON.stringify(analysis))

    if (!analysis) {
      throw new Error('Aucune analyse reçue de Perplexity')
    }

    // Préparation de l'analyse pour la sauvegarde
    const analysisToSave = {
      lead_id: lead.id,
      user_id: userId,
      ...analysis
    }

    // Sauvegarde de l'analyse
    const savedAnalysis = await saveAnalysis(analysisToSave)
    console.log('Analyse sauvegardée avec succès:', JSON.stringify(savedAnalysis))

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: savedAnalysis 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )
  } catch (error) {
    console.error('Erreur détaillée:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Erreur lors de l\'analyse du lead',
        details: error.toString()
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