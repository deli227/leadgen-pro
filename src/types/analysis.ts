export interface LeadAnalysis {
  id: string
  lead_id: string
  user_id: string
  company_analysis: {
    qualification_score: number
    market_position: string
    company_size: string
    development_stage: string
    growth_potential: string
    detailed_justification: string
  }
  tech_analysis: {
    tech_stack: string[]
    digital_maturity: string
    online_presence: string
    website_performance: string
    security_compliance: string
  }
  marketing_analysis: {
    content_strategy: string
    social_media_presence: string
    seo_score: number
    brand_strategy: string
    market_positioning: string
  }
  financial_analysis: {
    estimated_revenue: string
    investment_potential: string
    funding_capacity: string
    financial_health: string
  }
  competitive_analysis: {
    market_position: string
    competitive_advantages: string[]
    potential_threats: string[]
    development_opportunities: string[]
  }
  recommendations: {
    approach_strategy: string
    entry_points: string[]
    sales_arguments: string[]
    optimal_timing: string
    required_resources: string[]
    improvement_suggestions: Array<{
      priority: string
      action: string
      expected_impact: string
      implementation_difficulty: string
      estimated_timeframe: string
      required_investment: string
    }>
    specific_solutions: Array<{
      weakness: string
      proposed_solutions: string[]
      implementation_steps: string[]
      expected_benefits: string[]
      success_metrics: string[]
    }>
  }
  action_plan: {
    steps: string[]
    timeline: string
    kpis: string[]
    vigilance_points: string[]
  }
  created_at: string
  updated_at: string
}