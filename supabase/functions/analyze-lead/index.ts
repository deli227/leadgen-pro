import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AnalysisData {
  company_analysis: {
    qualification_score: number;
    market_position: string;
    company_size: string;
    development_stage: string;
    growth_potential: string;
    detailed_justification: string;
  };
  tech_analysis: {
    tech_stack: string[];
    digital_maturity: string;
    online_presence: string;
    website_performance: string;
    security_compliance: string;
  };
  marketing_analysis: {
    content_strategy: string;
    social_media_presence: string;
    seo_score: number;
    brand_strategy: string;
    market_positioning: string;
  };
  financial_analysis: {
    estimated_revenue: string;
    investment_potential: string;
    funding_capacity: string;
    financial_health: string;
  };
  competitive_analysis: {
    market_position: string;
    competitive_advantages: string[];
    potential_threats: string[];
    development_opportunities: string[];
  };
  recommendations: {
    approach_strategy: string;
    entry_points: string[];
    sales_arguments: string[];
    optimal_timing: string;
    required_resources: string[];
  };
  action_plan: {
    steps: string[];
    timeline: string;
    kpis: string[];
    vigilance_points: string[];
  };
}

function validateAnalysisData(data: any): data is AnalysisData {
  try {
    // Validation basique des champs requis
    if (!data.company_analysis || !data.tech_analysis || !data.marketing_analysis ||
        !data.financial_analysis || !data.competitive_analysis || !data.recommendations ||
        !data.action_plan) {
      return false;
    }

    // Validation des tableaux
    if (!Array.isArray(data.tech_analysis.tech_stack) ||
        !Array.isArray(data.competitive_analysis.competitive_advantages) ||
        !Array.isArray(data.competitive_analysis.potential_threats) ||
        !Array.isArray(data.competitive_analysis.development_opportunities) ||
        !Array.isArray(data.recommendations.entry_points) ||
        !Array.isArray(data.recommendations.sales_arguments) ||
        !Array.isArray(data.recommendations.required_resources) ||
        !Array.isArray(data.action_plan.steps) ||
        !Array.isArray(data.action_plan.kpis) ||
        !Array.isArray(data.action_plan.vigilance_points)) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erreur de validation:', error);
    return false;
  }
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
    const prompt = `En tant que consultant stratégique senior spécialisé en développement commercial, réalise une analyse approfondie et actionnables de :

Entreprise : ${lead.company}
Site web : ${lead.website || 'Non spécifié'}
Industrie : ${lead.industry || 'Non spécifié'}
Email : ${lead.email || 'Non spécifié'}
Téléphone : ${lead.phone || 'Non spécifié'}
Adresse : ${lead.address || 'Non spécifié'}

Format de réponse souhaité (JSON) avec les sections suivantes :
- Company Analysis (qualification_score, market_position, company_size, development_stage, growth_potential, detailed_justification)
- Tech Analysis (tech_stack array, digital_maturity, online_presence, website_performance, security_compliance)
- Marketing Analysis (content_strategy, social_media_presence, seo_score, brand_strategy, market_positioning)
- Financial Analysis (estimated_revenue, investment_potential, funding_capacity, financial_health)
- Competitive Analysis (market_position, competitive_advantages array, potential_threats array, development_opportunities array)
- Recommendations (approach_strategy, entry_points array, sales_arguments array, optimal_timing, required_resources array)
- Action Plan (steps array, timeline, kpis array, vigilance_points array)`

    console.log('Envoi de la requête à Perplexity')
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-huge-128k-online',
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

    const cleanContent = result.choices[0].message.content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()

    let analysis
    try {
      analysis = JSON.parse(cleanContent)
      console.log('Analyse parsée avec succès:', analysis)
      
      if (!validateAnalysisData(analysis)) {
        throw new Error('Format de données invalide')
      }
    } catch (error) {
      console.error('Erreur lors du parsing JSON:', error)
      console.error('Contenu reçu:', cleanContent)
      throw new Error('Format de réponse invalide de Perplexity')
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

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