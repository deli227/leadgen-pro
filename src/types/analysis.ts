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
    communication_style: string
    decision_makers: string[]
    budget_considerations: string
    potential_objections: string[]
    trust_building_steps: string[]
    competitive_positioning: string
    value_proposition: string
    success_metrics: string[]
    risk_factors: string[]
    timeline_expectations: string
    negotiation_strategy: string
    relationship_building: {
      first_contact: string
      follow_up_strategy: string
      meeting_preparation: string[]
      key_topics: string[]
      conversation_starters: string[]
    }
    improvement_solutions: {
      tech_solutions: Array<{
        weakness: string
        concrete_solution: string
        implementation_steps: string[]
        expected_benefits: string[]
        estimated_cost: string
        implementation_timeline: string
      }>
      marketing_solutions: Array<{
        weakness: string
        concrete_solution: string
        implementation_steps: string[]
        expected_benefits: string[]
        estimated_cost: string
        implementation_timeline: string
      }>
      business_solutions: Array<{
        weakness: string
        concrete_solution: string
        implementation_steps: string[]
        expected_benefits: string[]
        estimated_cost: string
        implementation_timeline: string
      }>
    }
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