export function buildAnalysisPrompt(lead: any) {
  return `En tant que consultant stratégique senior spécialisé en développement commercial et transformation digitale, réalise une analyse TRÈS DÉTAILLÉE et CONCRÈTE de :

Entreprise : ${lead.company}
Site web : ${lead.website || 'Non spécifié'}
Industrie : ${lead.industry || 'Non spécifié'}
Email : ${lead.email || 'Non spécifié'}
Téléphone : ${lead.phone || 'Non spécifié'}
Adresse : ${lead.address || 'Non spécifié'}

IMPORTANT :
1. Pour chaque point faible identifié, propose des solutions TRÈS CONCRÈTES et IMMÉDIATEMENT APPLICABLES.
2. Fournis des recommandations détaillées sur la manière d'approcher et de convaincre ce lead.
3. Inclus un plan d'action clair et chronologique.
4. Mets l'accent sur la valeur ajoutée immédiate que nous pouvons apporter.
5. Détaille les bénéfices chiffrés attendus pour chaque solution proposée.
6. Fournis des arguments de vente spécifiques basés sur leur secteur d'activité.
7. Identifie les opportunités d'amélioration rapide avec un fort impact.

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
    "approach_strategy": string (Détaille précisément comment aborder ce lead),
    "entry_points": string[] (Points d'entrée concrets pour initier la discussion),
    "sales_arguments": string[] (Arguments de vente spécifiques et chiffrés),
    "optimal_timing": string (Meilleur moment pour les contacter),
    "required_resources": string[] (Ressources nécessaires pour concrétiser),
    "improvement_solutions": {
      "tech_solutions": [
        {
          "weakness": string (Point faible identifié),
          "concrete_solution": string (Solution détaillée et chiffrée),
          "implementation_steps": string[] (Étapes précises de mise en œuvre),
          "expected_benefits": string[] (Bénéfices chiffrés et mesurables),
          "estimated_cost": string (Coût estimé),
          "implementation_timeline": string (Délai de mise en place)
        }
      ],
      "marketing_solutions": [
        {
          "weakness": string,
          "concrete_solution": string,
          "implementation_steps": string[],
          "expected_benefits": string[],
          "estimated_cost": string,
          "implementation_timeline": string
        }
      ],
      "business_solutions": [
        {
          "weakness": string,
          "concrete_solution": string,
          "implementation_steps": string[],
          "expected_benefits": string[],
          "estimated_cost": string,
          "implementation_timeline": string
        }
      ]
    }
  },
  "action_plan": {
    "steps": string[] (Plan d'action détaillé et chronologique),
    "timeline": string (Planning de mise en œuvre),
    "kpis": string[] (Indicateurs clés à suivre),
    "vigilance_points": string[] (Points de vigilance spécifiques)
  }
}`
}