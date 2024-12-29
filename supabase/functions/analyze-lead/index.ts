import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
    console.log('Envoi de la requête à Perplexity avec le prompt enrichi')

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
            content: 'Tu es un expert en analyse d\'entreprises et transformation digitale. Fournis une analyse détaillée, concrète et immédiatement actionnable au format JSON demandé. Réponds uniquement avec le JSON, sans aucun texte avant ou après.'
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

function buildAnalysisPrompt(lead: any): string {
  return `
Analyse détaillée pour l'entreprise ${lead.company}

Objectif : Fournir une analyse approfondie et des recommandations stratégiques détaillées.

Contexte :
- Entreprise : ${lead.company}
- Industrie : ${lead.industry || 'Non spécifiée'}
- Site web : ${lead.website || 'Non spécifié'}
- Coordonnées : ${lead.email || 'Non spécifié'} / ${lead.phone || 'Non spécifié'}
- Adresse : ${lead.address || 'Non spécifiée'}

Instructions pour l'analyse :

1. Analyse de l'entreprise
- Évaluer la position actuelle sur le marché
- Analyser la taille et la structure de l'entreprise
- Identifier le stade de développement
- Évaluer le potentiel de croissance
- Fournir une justification détaillée du score de qualification

2. Analyse technologique
- Examiner la stack technologique actuelle
- Évaluer la maturité digitale
- Analyser la présence en ligne
- Mesurer la performance du site web
- Vérifier la sécurité et la conformité

3. Analyse marketing
- Évaluer la stratégie de contenu
- Analyser la présence sur les réseaux sociaux
- Examiner la stratégie de marque
- Évaluer le positionnement marketing
- Score SEO et recommandations

4. Analyse financière
- Estimer le chiffre d'affaires
- Évaluer le potentiel d'investissement
- Analyser la capacité de financement
- Examiner la santé financière globale

5. Analyse concurrentielle
- Identifier la position sur le marché
- Lister les avantages compétitifs
- Analyser les menaces potentielles
- Identifier les opportunités de développement

6. Solutions d'amélioration recommandées
Pour chaque solution (technique, marketing, business), fournir :
- Une description détaillée du problème identifié
- Une solution concrète et approfondie
- Des étapes d'implémentation précises
- Une analyse détaillée des bénéfices attendus
- Une estimation réaliste des coûts
- Un calendrier d'implémentation détaillé
- Des indicateurs de performance à suivre
- Des risques potentiels et mesures d'atténuation
- Des alternatives possibles
- Des exemples de succès similaires
- Des ressources nécessaires
- Des prérequis techniques ou organisationnels
- Des impacts sur les processus existants
- Des recommandations pour la formation des équipes

7. Stratégie d'approche globale
- Définir une stratégie d'approche personnalisée
- Identifier les points d'entrée prioritaires
- Développer des arguments de vente spécifiques
- Proposer un timing optimal d'approche
- Lister les ressources nécessaires
- Anticiper les objections possibles
- Suggérer des approches alternatives
- Définir des étapes de suivi

8. Plan d'action
- Détailler les étapes à suivre
- Établir une timeline réaliste
- Définir des KPIs précis
- Identifier les points de vigilance
- Proposer des jalons de contrôle
- Prévoir des actions correctives

Format de réponse attendu : Fournir une analyse structurée et détaillée en JSON suivant le schéma défini.`
}