import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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

    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY')
    if (!perplexityApiKey) {
      throw new Error('Clé API Perplexity non configurée')
    }

    // Construction du prompt pour l'analyse
    const prompt = `Analyse complète et détaillée de l'entreprise suivante:
    Nom: ${lead.company}
    Site web: ${lead.website || 'Non spécifié'}
    Industrie: ${lead.industry || 'Non spécifié'}
    Email: ${lead.email || 'Non spécifié'}
    Téléphone: ${lead.phone || 'Non spécifié'}
    Adresse: ${lead.address || 'Non spécifié'}
    
    Format de réponse souhaité (JSON) :
    {
      "company_analysis": {
        "qualification_score": number (1-10),
        "market_position": string,
        "company_size": string,
        "development_stage": string,
        "growth_potential": string,
        "detailed_justification": string
      },
      "tech_analysis": {
        "tech_stack": string[],
        "digital_maturity": string,
        "online_presence": string,
        "website_performance": string,
        "security_compliance": string
      },
      "marketing_analysis": {
        "content_strategy": string,
        "social_media_presence": string,
        "seo_score": number (1-10),
        "brand_strategy": string,
        "market_positioning": string
      },
      "financial_analysis": {
        "estimated_revenue": string,
        "investment_potential": string,
        "funding_capacity": string,
        "financial_health": string
      },
      "competitive_analysis": {
        "market_position": string,
        "competitive_advantages": string[],
        "potential_threats": string[],
        "development_opportunities": string[]
      },
      "recommendations": {
        "approach_strategy": string,
        "entry_points": string[],
        "sales_arguments": string[],
        "optimal_timing": string,
        "required_resources": string[]
      },
      "action_plan": {
        "steps": string[],
        "timeline": string,
        "kpis": string[],
        "vigilance_points": string[]
      }
    }`

    console.log('Envoi de la requête à Perplexity')
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert en analyse d\'entreprises. Fournis une analyse détaillée et professionnelle au format JSON demandé. Réponds uniquement avec le JSON, sans aucun texte avant ou après, ni formatage markdown.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.1,
        max_tokens: 4000
      }),
    })

    if (!response.ok) {
      console.error('Erreur Perplexity:', await response.text())
      throw new Error('Erreur lors de l\'analyse du lead')
    }

    const result = await response.json()
    console.log('Réponse Perplexity reçue')

    // Nettoyer la réponse de tout formatage Markdown
    const cleanContent = result.choices[0].message.content
      .replace(/```json\n?/g, '')  // Enlever ```json
      .replace(/```\n?/g, '')      // Enlever ```
      .trim()                      // Enlever les espaces

    // S'assurer que la réponse est bien au format JSON
    let analysis
    try {
      analysis = JSON.parse(cleanContent)
      console.log('Analyse parsée avec succès:', analysis)
    } catch (error) {
      console.error('Erreur lors du parsing JSON:', error)
      console.error('Contenu reçu:', cleanContent)
      throw new Error('Format de réponse invalide de Perplexity')
    }

    // Configuration du client Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Sauvegarde de l'analyse
    const { data: savedAnalysis, error: insertError } = await supabase
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

    if (insertError) {
      console.error('Erreur lors de la sauvegarde:', insertError)
      throw new Error('Erreur lors de la sauvegarde de l\'analyse')
    }

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