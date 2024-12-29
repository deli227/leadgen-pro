export function buildAnalysisPrompt(lead: any) {
  return `En tant que consultant stratégique senior spécialisé en développement commercial et transformation digitale, réalise une analyse approfondie et TRÈS CONCRÈTE de :

Entreprise : ${lead.company}
Site web : ${lead.website || 'Non spécifié'}
Industrie : ${lead.industry || 'Non spécifié'}
Email : ${lead.email || 'Non spécifié'}
Téléphone : ${lead.phone || 'Non spécifié'}
Adresse : ${lead.address || 'Non spécifié'}

IMPORTANT : Pour chaque point faible identifié, propose des solutions TRÈS CONCRÈTES et IMMÉDIATEMENT APPLICABLES.

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
    "improvement_solutions": {
      "tech_solutions": [
        {
          "weakness": string,
          "concrete_solution": string,
          "implementation_steps": string[],
          "expected_benefits": string[],
          "estimated_cost": string,
          "implementation_timeline": string
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
    "steps": string[],
    "timeline": string,
    "kpis": string[],
    "vigilance_points": string[]
  }
}`
}