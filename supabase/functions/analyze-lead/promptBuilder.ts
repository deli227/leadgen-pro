import { Lead } from "./types.ts";

export function buildAnalysisPrompt(lead: Lead): string {
  return `En tant qu'expert en analyse commerciale et stratégique, réalise une analyse approfondie et détaillée de l'entreprise suivante. Utilise toutes les informations disponibles et fais des déductions logiques basées sur le secteur d'activité et le contexte :

Entreprise : ${lead.company}
Site web : ${lead.website || 'Non spécifié'}
Industrie : ${lead.industry || 'Non spécifié'}
Email : ${lead.email || 'Non spécifié'}
Téléphone : ${lead.phone || 'Non spécifié'}
Adresse : ${lead.address || 'Non spécifié'}
Points forts identifiés : ${lead.strengths?.join(', ') || 'Non spécifié'}
Points faibles identifiés : ${lead.weaknesses?.join(', ') || 'Non spécifié'}

IMPORTANT: Pour chaque section, fournis une analyse DÉTAILLÉE et CONCRÈTE. Si une information n'est pas directement disponible, fais des déductions logiques basées sur le secteur d'activité et le contexte. Ne réponds JAMAIS "Inconnu" sans proposer une analyse ou des hypothèses.

1. Company Analysis :
   - Évalue la taille probable de l'entreprise en fonction du secteur et des informations disponibles
   - Analyse sa position sur le marché en fonction du secteur
   - Détermine son stade de développement
   - Évalue son potentiel de croissance
   - Justifie chaque point avec des éléments concrets

2. Tech Analysis :
   - Analyse la stack technique probable en fonction du secteur
   - Évalue la maturité digitale en fonction du site web et de la présence en ligne
   - Examine la performance du site web
   - Évalue la conformité et la sécurité
   - Propose des améliorations techniques concrètes

3. Marketing Analysis :
   - Analyse la stratégie de contenu visible
   - Évalue la présence sur les réseaux sociaux
   - Calcule un score SEO basé sur les éléments visibles
   - Analyse la stratégie de marque
   - Examine le positionnement marketing

4. Financial Analysis :
   - Estime le chiffre d'affaires probable en fonction du secteur et de la taille
   - Évalue la capacité d'investissement
   - Analyse la santé financière probable
   - Identifie les opportunités d'optimisation financière

5. Competitive Analysis :
   - Analyse la position concurrentielle dans le secteur
   - Identifie les avantages concurrentiels probables
   - Liste les menaces potentielles
   - Trouve les opportunités de développement

6. Recommendations (TRÈS IMPORTANT - Sois extrêmement détaillé) :
   - Propose une stratégie d'approche personnalisée
   - Identifie les points d'entrée spécifiques
   - Suggère des arguments de vente adaptés
   - Définis le timing optimal
   - Liste les ressources nécessaires
   
   Pour chaque point faible identifié, fournis :
   - Des suggestions d'amélioration avec :
     * Niveau de priorité
     * Actions concrètes à entreprendre
     * Impact attendu
     * Difficulté de mise en œuvre
     * Délai estimé
     * Investissement requis
   
   - Des solutions spécifiques avec :
     * Solutions proposées étape par étape
     * Plan de mise en œuvre détaillé
     * Bénéfices attendus
     * Métriques de succès

7. Action Plan :
   - Établis un calendrier précis
   - Définis des objectifs mesurables
   - Identifie les points de vigilance
   - Propose des KPIs pertinents

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
    "required_resources": string[],
    "improvement_suggestions": [
      {
        "priority": string,
        "action": string,
        "expected_impact": string,
        "implementation_difficulty": string,
        "estimated_timeframe": string,
        "required_investment": string
      }
    ],
    "specific_solutions": [
      {
        "weakness": string,
        "proposed_solutions": string[],
        "implementation_steps": string[],
        "expected_benefits": string[],
        "success_metrics": string[]
      }
    ]
  },
  "action_plan": {
    "steps": string[],
    "timeline": string,
    "kpis": string[],
    "vigilance_points": string[]
  }
}`
}