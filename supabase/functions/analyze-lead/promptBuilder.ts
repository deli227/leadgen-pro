export function buildAnalysisPrompt(lead: any) {
  return `En tant que consultant stratégique senior spécialisé en développement commercial et transformation digitale, réalise une analyse EXTRÊMEMENT DÉTAILLÉE et CONCRÈTE de :

Entreprise : ${lead.company}
Site web : ${lead.website || 'Non spécifié'}
Industrie : ${lead.industry || 'Non spécifié'}
Email : ${lead.email || 'Non spécifié'}
Téléphone : ${lead.phone || 'Non spécifié'}
Adresse : ${lead.address || 'Non spécifié'}

IMPORTANT - Fournir une analyse ultra-détaillée sur chaque point :

1. SOLUTIONS CONCRÈTES :
   - Pour chaque point faible, proposer 3-4 solutions TRÈS CONCRÈTES
   - Détailler le ROI attendu pour chaque solution
   - Fournir un calendrier précis de mise en œuvre
   - Estimer les coûts et ressources nécessaires
   - Identifier les quick wins et les actions à fort impact

2. STRATÉGIE D'APPROCHE :
   - Script détaillé pour le premier contact
   - Points de douleur spécifiques à adresser
   - Objections potentielles et réponses
   - Timing optimal pour chaque étape du contact
   - Personnes clés à impliquer dans la discussion

3. ANALYSE CONCURRENTIELLE :
   - Position exacte sur le marché
   - Avantages concurrentiels détaillés
   - Benchmark des concurrents directs
   - Opportunités de différenciation
   - Menaces spécifiques à anticiper

4. POTENTIEL DE CROISSANCE :
   - Marchés adjacents à explorer
   - Nouveaux segments de clientèle
   - Innovations possibles
   - Synergies potentielles
   - Estimation du potentiel de revenus

5. PLAN D'ACTION :
   - Étapes détaillées sur 30/60/90 jours
   - KPIs précis pour chaque étape
   - Points de contrôle et jalons
   - Plan de contingence
   - Ressources nécessaires

6. ARGUMENTS COMMERCIAUX :
   - Proposition de valeur unique
   - Bénéfices quantifiés
   - ROI démontrable
   - Études de cas similaires
   - Garanties et preuves de concept

Format de réponse souhaité (JSON) :
{
  "company_analysis": {
    "qualification_score": number (1-10),
    "market_position": string (Position détaillée sur le marché),
    "company_size": string (Taille et structure détaillées),
    "development_stage": string (Phase précise de développement),
    "growth_potential": string (Potentiel chiffré et justifié),
    "detailed_justification": string (Analyse approfondie avec données)
  },
  "tech_analysis": {
    "tech_stack": string[] (Stack technique détaillé),
    "digital_maturity": string (Niveau précis avec benchmarks),
    "online_presence": string (Analyse détaillée de la présence en ligne),
    "website_performance": string (Métriques détaillées),
    "security_compliance": string (État détaillé de la conformité)
  },
  "marketing_analysis": {
    "content_strategy": string (Analyse détaillée de la stratégie),
    "social_media_presence": string (Analyse par plateforme),
    "seo_score": number (1-10 avec métriques détaillées),
    "brand_strategy": string (Positionnement détaillé),
    "market_positioning": string (Position concurrentielle détaillée)
  },
  "financial_analysis": {
    "estimated_revenue": string (Estimation détaillée et justifiée),
    "investment_potential": string (Capacité détaillée),
    "funding_capacity": string (Analyse approfondie),
    "financial_health": string (Indicateurs détaillés)
  },
  "competitive_analysis": {
    "market_position": string (Position détaillée avec parts de marché),
    "competitive_advantages": string[] (Avantages détaillés et mesurables),
    "potential_threats": string[] (Menaces avec probabilités et impacts),
    "development_opportunities": string[] (Opportunités chiffrées)
  },
  "recommendations": {
    "approach_strategy": string (Script détaillé de prise de contact),
    "entry_points": string[] (Points d'entrée avec contexte et timing),
    "sales_arguments": string[] (Arguments chiffrés et personnalisés),
    "optimal_timing": string (Calendrier détaillé de contact),
    "required_resources": string[] (Liste exhaustive des ressources),
    "improvement_solutions": {
      "tech_solutions": [
        {
          "weakness": string (Point faible avec impact business),
          "concrete_solution": string (Solution détaillée et chiffrée),
          "implementation_steps": string[] (Plan détaillé par semaine),
          "expected_benefits": string[] (Bénéfices chiffrés et ROI),
          "estimated_cost": string (Budget détaillé),
          "implementation_timeline": string (Planning précis)
        }
      ],
      "marketing_solutions": [
        {
          "weakness": string (Point faible marketing détaillé),
          "concrete_solution": string (Plan marketing détaillé),
          "implementation_steps": string[] (Actions marketing précises),
          "expected_benefits": string[] (KPIs marketing détaillés),
          "estimated_cost": string (Budget marketing détaillé),
          "implementation_timeline": string (Planning marketing)
        }
      ],
      "business_solutions": [
        {
          "weakness": string (Point faible business détaillé),
          "concrete_solution": string (Solution business complète),
          "implementation_steps": string[] (Plan d'action business),
          "expected_benefits": string[] (Impact business chiffré),
          "estimated_cost": string (Investissement détaillé),
          "implementation_timeline": string (Calendrier précis)
        }
      ]
    }
  },
  "action_plan": {
    "steps": string[] (Plan d'action détaillé sur 90 jours),
    "timeline": string (Planning précis avec jalons),
    "kpis": string[] (Indicateurs détaillés et mesurables),
    "vigilance_points": string[] (Points critiques à surveiller)
  }
}`
}