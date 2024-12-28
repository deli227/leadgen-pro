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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { lead, userId } = await req.json()
    console.log('Analyse du lead:', lead)
    console.log('UserId:', userId)

    if (!userId || !lead) {
      throw new Error('UserId et lead requis')
    }

    // Construction du prompt et analyse
    const prompt = buildAnalysisPrompt(lead as Lead)
    const analysis = await analyzeWithPerplexity(prompt)

    // Préparation de l'analyse pour la sauvegarde
    const analysisToSave = {
      lead_id: lead.id,
      user_id: userId,
      ...analysis
    }

    // Sauvegarde de l'analyse
    const savedAnalysis = await saveAnalysis(analysisToSave)
    console.log('Analyse sauvegardée avec succès:', savedAnalysis)

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