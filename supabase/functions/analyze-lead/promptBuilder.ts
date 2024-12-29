import { buildSolutionsPrompt } from "./promptSections/solutionsPrompt"
import { buildApproachPrompt } from "./promptSections/approachPrompt"
import { buildAnalysisPrompt } from "./promptSections/analysisPrompt"

export function buildAnalysisPrompt(lead: any) {
  return `En tant que consultant stratégique senior spécialisé en développement commercial et transformation digitale, réalise une analyse ULTRA-DÉTAILLÉE et EXTRÊMEMENT CONCRÈTE de :

Entreprise : ${lead.company}
Site web : ${lead.website || 'Non spécifié'}
Industrie : ${lead.industry || 'Non spécifié'}
Email : ${lead.email || 'Non spécifié'}
Téléphone : ${lead.phone || 'Non spécifié'}
Adresse : ${lead.address || 'Non spécifié'}

${buildSolutionsPrompt()}

${buildApproachPrompt()}

${buildAnalysisPrompt()}

Format de réponse souhaité (JSON) :
{
  "company_analysis": {
    "qualification_score": number (1-10),
    "market_position": string (Position ultra-détaillée),
    "company_size": string (Taille et structure détaillées),
    "development_stage": string (Phase précise avec indicateurs),
    "growth_potential": string (Potentiel chiffré et justifié),
    "detailed_justification": string (Analyse approfondie avec données)
  },
  "tech_analysis": {
    "tech_stack": string[] (Stack technique exhaustif),
    "digital_maturity": string (Niveau précis avec benchmarks),
    "online_presence": string (Analyse détaillée multicanal),
    "website_performance": string (Métriques détaillées),
    "security_compliance": string (État détaillé de conformité)
  },
  "marketing_analysis": {
    "content_strategy": string (Analyse stratégique complète),
    "social_media_presence": string (Analyse par plateforme),
    "seo_score": number (1-10 avec métriques),
    "brand_strategy": string (Positionnement détaillé),
    "market_positioning": string (Position concurrentielle)
  },
  "financial_analysis": {
    "estimated_revenue": string (Estimation détaillée),
    "investment_potential": string (Capacité détaillée),
    "funding_capacity": string (Analyse approfondie),
    "financial_health": string (Indicateurs complets)
  },
  "competitive_analysis": {
    "market_position": string (Position avec parts),
    "competitive_advantages": string[] (Avantages mesurables),
    "potential_threats": string[] (Menaces avec impacts),
    "development_opportunities": string[] (Opportunités chiffrées)
  },
  "recommendations": {
    "approach_strategy": string (Script détaillé contact),
    "entry_points": string[] (Points d'entrée contextualisés),
    "sales_arguments": string[] (Arguments personnalisés),
    "optimal_timing": string (Calendrier détaillé),
    "required_resources": string[] (Liste exhaustive),
    "improvement_solutions": {
      "tech_solutions": [
        {
          "weakness": string (Point faible détaillé),
          "concrete_solution": string (Solution exhaustive),
          "implementation_steps": string[] (Plan jour par jour),
          "expected_benefits": string[] (Bénéfices chiffrés),
          "estimated_cost": string (Budget détaillé),
          "implementation_timeline": string (Planning précis)
        }
      ],
      "marketing_solutions": [
        {
          "weakness": string (Faiblesse marketing),
          "concrete_solution": string (Plan détaillé),
          "implementation_steps": string[] (Actions précises),
          "expected_benefits": string[] (KPIs marketing),
          "estimated_cost": string (Budget marketing),
          "implementation_timeline": string (Planning)
        }
      ],
      "business_solutions": [
        {
          "weakness": string (Faiblesse business),
          "concrete_solution": string (Solution business),
          "implementation_steps": string[] (Plan business),
          "expected_benefits": string[] (Impact business),
          "estimated_cost": string (Investissement),
          "implementation_timeline": string (Calendrier)
        }
      ]
    }
  },
  "action_plan": {
    "steps": string[] (Plan 90 jours détaillé),
    "timeline": string (Planning précis),
    "kpis": string[] (Indicateurs détaillés),
    "vigilance_points": string[] (Points critiques)
  }
}`
}