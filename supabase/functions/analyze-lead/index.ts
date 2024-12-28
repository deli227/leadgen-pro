import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { analyzeLeadWithPerplexity } from "./perplexityService.ts"
import { saveAnalysisToDatabase } from "./databaseService.ts"
import { AnalysisRequest, AnalysisResponse } from "./types.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { lead, userId } = await req.json() as AnalysisRequest
    console.log('Analyse du lead:', lead)
    console.log('UserId:', userId)

    if (!userId || !lead) {
      throw new Error('UserId et lead requis')
    }

    // Analyse avec Perplexity
    const result = await analyzeLeadWithPerplexity({ lead, userId })
    console.log('Analyse parsée avec succès:', result)

    // Parse le contenu JSON de la réponse
    const cleanContent = result.choices[0].message.content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()

    let analysis
    try {
      analysis = JSON.parse(cleanContent)
    } catch (error) {
      console.error('Erreur lors du parsing JSON:', error)
      console.error('Contenu reçu:', cleanContent)
      throw new Error('Format de réponse invalide de Perplexity')
    }

    // Sauvegarde en base de données
    const savedAnalysis = await saveAnalysisToDatabase(lead.id, userId, analysis)
    console.log('Analyse sauvegardée avec succès:', savedAnalysis)

    const response: AnalysisResponse = {
      success: true,
      data: savedAnalysis
    }

    return new Response(
      JSON.stringify(response),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )
  } catch (error) {
    console.error('Erreur détaillée:', error)
    const response: AnalysisResponse = {
      success: false,
      error: error.message
    }

    return new Response(
      JSON.stringify(response),
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