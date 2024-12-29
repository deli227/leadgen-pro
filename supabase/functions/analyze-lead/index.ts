import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'
import { buildPrompt } from './promptBuilder.ts'

const PERPLEXITY_API_KEY = Deno.env.get('PERPLEXITY_API_KEY')

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { lead, userId } = await req.json()

    if (!lead || !userId) {
      throw new Error('Lead et userId sont requis')
    }

    console.log("Début de l'analyse pour:", lead.company)

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const prompt = buildPrompt(lead)
    console.log("Prompt envoyé:", prompt)

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-instruct',
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert en analyse d\'entreprise. Tu fournis des analyses détaillées et structurées au format JSON uniquement, sans texte additionnel.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 4000,
        temperature: 0.7,
        top_p: 0.9
      })
    })

    if (!response.ok) {
      console.error("Erreur API Perplexity:", response.status, await response.text())
      throw new Error(`Erreur API Perplexity: ${response.statusText}`)
    }

    const data = await response.json()
    console.log("Réponse brute de l'API:", data)
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error("Format de réponse invalide de l'API")
    }

    const analysis = JSON.parse(data.choices[0].message.content)
    console.log("Analyse parsée:", analysis)

    const { data: savedAnalysis, error: saveError } = await supabaseClient
      .from('lead_analyses')
      .insert({
        lead_id: lead.id,
        user_id: userId,
        company_analysis: analysis.company_analysis,
        tech_analysis: analysis.tech_analysis,
        marketing_analysis: analysis.marketing_analysis,
        financial_analysis: analysis.financial_analysis,
        competitive_analysis: analysis.competitive_analysis,
        recommendations: analysis.recommendations,
        action_plan: analysis.action_plan
      })
      .select()
      .single()

    if (saveError) {
      throw saveError
    }

    return new Response(
      JSON.stringify({ success: true, data: savedAnalysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error("Erreur complète:", error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})