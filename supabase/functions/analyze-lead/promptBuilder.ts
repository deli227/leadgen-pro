import { Lead } from './types.ts';

export function buildPrompt(lead: Lead): string {
  return `
Analyse détaillée pour l'entreprise ${lead.company}

Fournir une analyse complète et structurée au format JSON avec les sections suivantes :

{
  "company_analysis": {
    "market_position": "...",
    "company_size": "...",
    "development_stage": "...",
    "growth_potential": "...",
    "detailed_justification": "..."
  },
  "tech_analysis": {
    "tech_stack": ["..."],
    "digital_maturity": "...",
    "online_presence": "...",
    "website_performance": "...",
    "security_compliance": "..."
  },
  "marketing_analysis": {
    "content_strategy": "...",
    "social_media_presence": "...",
    "seo_score": 7,
    "brand_strategy": "...",
    "market_positioning": "..."
  },
  "financial_analysis": {
    "estimated_revenue": "...",
    "investment_potential": "...",
    "funding_capacity": "...",
    "financial_health": "..."
  },
  "competitive_analysis": {
    "market_position": "...",
    "competitive_advantages": ["..."],
    "potential_threats": ["..."],
    "development_opportunities": ["..."]
  },
  "recommendations": {
    "approach_strategy": "...",
    "entry_points": ["..."],
    "sales_arguments": ["..."],
    "optimal_timing": "...",
    "required_resources": ["..."],
    "improvement_solutions": {
      "tech_solutions": ["..."],
      "marketing_solutions": ["..."],
      "business_solutions": ["..."]
    }
  },
  "action_plan": {
    "steps": ["..."],
    "timeline": "...",
    "kpis": ["..."],
    "vigilance_points": ["..."]
  }
}

Utilise toutes les informations disponibles sur l'entreprise pour fournir une analyse détaillée et pertinente.
Assure-toi que la réponse est un JSON valide et suit exactement la structure fournie.`;
}