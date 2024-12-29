import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Lead, AnalysisResponse } from './types.ts'
import { buildAnalysisPrompt } from './promptBuilder.ts'
import { analyzeWithPerplexity } from './perplexityService.ts'
import { saveAnalysis } from './supabaseService.ts'

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
    const { lead, userId } = await req.json()
    console.log('Analyse du lead:', lead)
    console.log('UserId:', userId)

    if (!userId || !lead) {
      throw new Error('UserId et lead requis')
    }

    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY')
    if (!perplexityApiKey) {
      throw new Error('Clé API Perplexity non configurée')
    }

    const prompt = buildAnalysisPrompt(lead)
    const analysis = await analyzeWithPerplexity(lead, prompt, perplexityApiKey)

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const savedAnalysis = await saveAnalysis(analysis, lead, userId, supabaseUrl, supabaseKey)

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