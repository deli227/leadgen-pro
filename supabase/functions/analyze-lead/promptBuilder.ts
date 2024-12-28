import { Lead } from "./types.ts";

export function buildAnalysisPrompt(lead: Lead): string {
  return `En tant que consultant stratégique senior spécialisé en développement commercial et transformation digitale, réalise une analyse approfondie et détaillée de :

Entreprise : ${lead.company}
Site web : ${lead.website || 'Non spécifié'}
Industrie : ${lead.industry || 'Non spécifié'}
Email : ${lead.email || 'Non spécifié'}
Téléphone : ${lead.phone || 'Non spécifié'}
Adresse : ${lead.address || 'Non spécifié'}
Points forts identifiés : ${lead.strengths?.join(', ') || 'Non spécifié'}
Points faibles identifiés : ${lead.weaknesses?.join(', ') || 'Non spécifié'}

Pour chaque section de l'analyse, sois extrêmement détaillé et concret :

1. Company Analysis :
   - Évalue le potentiel réel de conversion
   - Identifie les cycles de décision
   - Analyse la capacité d'investissement
   - Évalue la maturité pour notre solution

2. Tech Analysis :
   - Examine la stack technique en détail
   - Identifie les opportunités d'intégration
   - Évalue les besoins techniques non satisfaits
   - Analyse la compatibilité avec nos solutions

3. Marketing Analysis :
   - Analyse les canaux de communication préférés
   - Identifie les messages qui résonnent
   - Évalue la réceptivité aux nouvelles solutions
   - Examine leur stratégie de contenu

4. Financial Analysis :
   - Évalue la santé financière réelle
   - Identifie les cycles budgétaires
   - Analyse la capacité d'investissement
   - Examine les priorités d'investissement

5. Competitive Analysis :
   - Compare avec les leaders du marché
   - Identifie les avantages concurrentiels réels
   - Analyse les menaces immédiates
   - Trouve les opportunités inexploitées

6. Recommendations (TRÈS IMPORTANT - Sois extrêmement détaillé) :
   - Propose une stratégie d'approche personnalisée
   - Identifie les points d'entrée spécifiques
   - Suggère des arguments de vente adaptés
   - Définis le timing optimal
   - Liste les ressources nécessaires
   
   Pour chaque point faible identifié, fournis :
   - Des suggestions d'amélioration concrètes avec :
     * Niveau de priorité
     * Actions spécifiques à entreprendre
     * Impact attendu
     * Difficulté de mise en œuvre
     * Délai estimé
     * Investissement requis
   
   - Des solutions spécifiques détaillées avec :
     * Solutions proposées étape par étape
     * Plan de mise en œuvre
     * Bénéfices attendus
     * Métriques de succès

7. Action Plan :
   - Établis un calendrier réaliste
   - Définis des objectifs mesurables
   - Identifie les ressources nécessaires
   - Prévois les points de contrôle

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