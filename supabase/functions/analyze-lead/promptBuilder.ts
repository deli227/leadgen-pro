export function buildAnalysisPrompt(lead: any) {
  return `En tant qu'expert en analyse d'entreprise avec plus de 30 ans d'expérience dans l'évaluation stratégique, le conseil en transformation et le développement commercial, je vais réaliser une analyse EXTRÊMEMENT DÉTAILLÉE et APPROFONDIE de cette entreprise. Mon expertise me permet d'identifier avec précision les opportunités d'amélioration et de proposer des solutions concrètes et immédiatement actionnables.

Je vais analyser TOUS les aspects critiques de l'entreprise pour fournir une vision à 360° incluant :
- La position sur le marché et la stratégie commerciale
- La maturité technologique et les besoins en transformation digitale
- La stratégie marketing et la présence en ligne
- La santé financière et le potentiel de croissance
- L'analyse concurrentielle et les avantages différenciants
- Les opportunités d'amélioration et les solutions concrètes

Entreprise à analyser :
Nom : ${lead.company}
Site web : ${lead.website || 'Non spécifié'}
Industrie : ${lead.industry || 'Non spécifié'}
Email : ${lead.email || 'Non spécifié'}
Téléphone : ${lead.phone || 'Non spécifié'}
Adresse : ${lead.address || 'Non spécifié'}

POINTS CLÉS DE L'ANALYSE :
- Chaque point d'amélioration identifié sera accompagné de solutions ULTRA-CONCRÈTES et IMMÉDIATEMENT APPLICABLES
- Les recommandations seront TRÈS DÉTAILLÉES avec des étapes précises de mise en œuvre
- L'analyse inclura des arguments de vente percutants basés sur les besoins spécifiques identifiés
- Toutes les solutions proposées seront accompagnées d'estimations de coûts et de délais réalistes
- Les bénéfices attendus seront quantifiés et détaillés pour chaque recommandation

Format de réponse souhaité (JSON) :
{
  "company_analysis": {
    "qualification_score": number (1-10),
    "market_position": string (analyse détaillée de la position sur le marché),
    "company_size": string (estimation détaillée de la taille et structure),
    "development_stage": string (analyse approfondie du stade de développement),
    "growth_potential": string (évaluation détaillée du potentiel),
    "detailed_justification": string (justification approfondie de l'analyse)
  },
  "tech_analysis": {
    "tech_stack": string[] (stack technologique détaillée),
    "digital_maturity": string (analyse approfondie de la maturité digitale),
    "online_presence": string (évaluation détaillée de la présence en ligne),
    "website_performance": string (analyse complète des performances web),
    "security_compliance": string (évaluation détaillée de la sécurité)
  },
  "marketing_analysis": {
    "content_strategy": string (analyse détaillée de la stratégie de contenu),
    "social_media_presence": string (évaluation approfondie des réseaux sociaux),
    "seo_score": number (1-10),
    "brand_strategy": string (analyse complète de la stratégie de marque),
    "market_positioning": string (positionnement détaillé sur le marché)
  },
  "financial_analysis": {
    "estimated_revenue": string (estimation détaillée des revenus),
    "investment_potential": string (analyse approfondie du potentiel d'investissement),
    "funding_capacity": string (évaluation détaillée de la capacité de financement),
    "financial_health": string (analyse complète de la santé financière)
  },
  "competitive_analysis": {
    "market_position": string (analyse détaillée du positionnement concurrentiel),
    "competitive_advantages": string[] (avantages concurrentiels détaillés),
    "potential_threats": string[] (menaces potentielles identifiées),
    "development_opportunities": string[] (opportunités de développement détaillées)
  },
  "recommendations": {
    "approach_strategy": string (stratégie d'approche ULTRA-DÉTAILLÉE avec psychologie d'approche),
    "entry_points": string[] (points d'entrée stratégiques TRÈS DÉTAILLÉS),
    "sales_arguments": string[] (arguments de vente percutants et TRÈS DÉTAILLÉS),
    "optimal_timing": string (timing optimal DÉTAILLÉ avec justification),
    "required_resources": string[] (ressources nécessaires DÉTAILLÉES),
    "communication_style": string (style de communication DÉTAILLÉ avec exemples de phrases à utiliser),
    "decision_makers": string[] (analyse DÉTAILLÉE des décideurs clés avec leur profil psychologique),
    "budget_considerations": string (analyse DÉTAILLÉE du budget avec fourchettes de prix),
    "potential_objections": string[] (objections anticipées TRÈS DÉTAILLÉES avec réponses suggérées),
    "trust_building_steps": string[] (étapes DÉTAILLÉES de construction de la confiance),
    "competitive_positioning": string (positionnement concurrentiel DÉTAILLÉ avec arguments différenciants),
    "value_proposition": string (proposition de valeur ULTRA-DÉTAILLÉE et personnalisée),
    "success_metrics": string[] (indicateurs de succès DÉTAILLÉS),
    "risk_factors": string[] (facteurs de risque DÉTAILLÉS avec stratégies d'atténuation),
    "timeline_expectations": string (attentes temporelles DÉTAILLÉES),
    "negotiation_strategy": string (stratégie de négociation DÉTAILLÉE),
    "relationship_building": {
      "first_contact": string (approche initiale DÉTAILLÉE),
      "follow_up_strategy": string (stratégie de suivi DÉTAILLÉE),
      "meeting_preparation": string[] (préparation DÉTAILLÉE des réunions),
      "key_topics": string[] (sujets clés à aborder DÉTAILLÉS),
      "conversation_starters": string[] (accroches conversationnelles DÉTAILLÉES)
    },
    "improvement_solutions": {
      "tech_solutions": [
        {
          "weakness": string (faiblesse technique identifiée),
          "concrete_solution": string (solution technique détaillée),
          "implementation_steps": string[] (étapes précises d'implémentation),
          "expected_benefits": string[] (bénéfices attendus détaillés),
          "estimated_cost": string (estimation détaillée des coûts),
          "implementation_timeline": string (planning détaillé de mise en œuvre)
        }
      ],
      "marketing_solutions": [
        {
          "weakness": string (faiblesse marketing identifiée),
          "concrete_solution": string (solution marketing détaillée),
          "implementation_steps": string[] (étapes précises d'implémentation),
          "expected_benefits": string[] (bénéfices attendus détaillés),
          "estimated_cost": string (estimation détaillée des coûts),
          "implementation_timeline": string (planning détaillé de mise en œuvre)
        }
      ],
      "business_solutions": [
        {
          "weakness": string (faiblesse business identifiée),
          "concrete_solution": string (solution business détaillée),
          "implementation_steps": string[] (étapes précises d'implémentation),
          "expected_benefits": string[] (bénéfices attendus détaillés),
          "estimated_cost": string (estimation détaillée des coûts),
          "implementation_timeline": string (planning détaillé de mise en œuvre)
        }
      ]
    }
  },
  "action_plan": {
    "steps": string[] (étapes détaillées du plan d'action),
    "timeline": string (planning détaillé de mise en œuvre),
    "kpis": string[] (indicateurs de performance détaillés),
    "vigilance_points": string[] (points de vigilance détaillés)
  }
}`
}