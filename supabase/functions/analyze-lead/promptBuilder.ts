export function buildAnalysisPrompt(lead: any) {
  return `En tant que consultant stratégique senior spécialisé en développement commercial et transformation digitale, réalise une analyse ULTRA-DÉTAILLÉE et EXTRÊMEMENT CONCRÈTE de :

Entreprise : ${lead.company}
Site web : ${lead.website || 'Non spécifié'}
Industrie : ${lead.industry || 'Non spécifié'}
Email : ${lead.email || 'Non spécifié'}
Téléphone : ${lead.phone || 'Non spécifié'}
Adresse : ${lead.address || 'Non spécifié'}

CRUCIAL - Fournir une analyse hyper-détaillée sur chaque point avec des solutions ULTRA-CONCRÈTES :

1. SOLUTIONS TRANSFORMATIVES :
   Pour chaque point faible identifié, fournir :
   - 5-6 solutions ULTRA-CONCRÈTES avec des exemples réels
   - ROI détaillé et chiffré pour chaque solution
   - Analyse coûts-bénéfices complète
   - Timeline précise d'implémentation (jour par jour)
   - Quick wins immédiats (résultats en 24-48h)
   - Solutions moyen terme (1-3 mois)
   - Solutions long terme (3-12 mois)
   - Ressources exactes nécessaires
   - Obstacles potentiels et solutions
   - Métriques de succès précises
   - Exemples de réussite similaires
   - Alternatives et plans B pour chaque solution

2. STRATÉGIE D'APPROCHE COMMERCIALE :
   - Script détaillé pour chaque point de contact (email, téléphone, LinkedIn)
   - Réponses aux 20 objections les plus courantes
   - Points de douleur spécifiques avec solutions associées
   - Timing optimal pour chaque interaction
   - Personnes clés à impliquer (avec titres exacts)
   - Stratégie de relance multi-canal
   - Indicateurs de réceptivité à surveiller
   - Éléments déclencheurs d'achat à exploiter
   - Documentation et preuves à préparer
   - Questions stratégiques à poser
   - Scénarios de négociation détaillés

3. ANALYSE CONCURRENTIELLE APPROFONDIE :
   - Position exacte sur le marché avec parts de marché
   - Analyse SWOT ultra-détaillée
   - Avantages concurrentiels quantifiés
   - Benchmark exhaustif des concurrents
   - Opportunités de différenciation immédiates
   - Menaces à court et long terme
   - Stratégies de mitigation des risques
   - Analyse des tendances du marché
   - Évolutions réglementaires à anticiper
   - Innovations disruptives potentielles

4. POTENTIEL DE CROISSANCE DÉTAILLÉ :
   - Marchés adjacents avec potentiel chiffré
   - Nouveaux segments clients identifiés
   - Innovations possibles par segment
   - Synergies potentielles chiffrées
   - Estimation détaillée des revenus
   - Scénarios de croissance
   - Facteurs clés de succès
   - Risques et opportunités
   - Plan d'expansion géographique
   - Diversification produit/service

5. PLAN D'ACTION ULTRA-PRÉCIS :
   - Plan détaillé jour par jour sur 90 jours
   - KPIs précis pour chaque action
   - Points de contrôle quotidiens
   - Plan de contingence détaillé
   - Ressources nécessaires chiffrées
   - Étapes critiques identifiées
   - Dépendances entre actions
   - Critères de succès mesurables
   - Plan de communication associé
   - Processus de validation

6. ARGUMENTS COMMERCIAUX PERCUTANTS :
   - Proposition de valeur unique détaillée
   - Bénéfices quantifiés par segment
   - ROI démontrable avec exemples
   - Études de cas détaillées
   - Garanties et preuves concrètes
   - Témoignages et références
   - Démonstrations suggérées
   - Offres spéciales personnalisées
   - Éléments différenciateurs clés
   - Arguments de closing puissants

7. SOLUTIONS D'AMÉLIORATION SECTORIELLES :
   - Solutions technologiques avancées
   - Optimisations marketing détaillées
   - Améliorations opérationnelles
   - Innovations sectorielles
   - Meilleures pratiques du marché
   - Tendances émergentes à exploiter
   - Certifications recommandées
   - Partenariats stratégiques suggérés
   - Optimisations de processus
   - Formations recommandées

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
          "implementation_timeline": string (Planning précis),
          "success_metrics": string[] (KPIs spécifiques),
          "required_resources": string[] (Ressources détaillées),
          "potential_obstacles": string[] (Risques identifiés),
          "mitigation_strategies": string[] (Solutions aux obstacles),
          "case_studies": string[] (Exemples réels),
          "alternative_solutions": string[] (Plans B détaillés)
        }
      ],
      "marketing_solutions": [
        {
          "weakness": string (Faiblesse marketing),
          "concrete_solution": string (Plan détaillé),
          "implementation_steps": string[] (Actions précises),
          "expected_benefits": string[] (KPIs marketing),
          "estimated_cost": string (Budget marketing),
          "implementation_timeline": string (Planning),
          "success_metrics": string[] (Métriques spécifiques),
          "required_resources": string[] (Ressources marketing),
          "potential_obstacles": string[] (Défis marketing),
          "mitigation_strategies": string[] (Solutions marketing),
          "case_studies": string[] (Succès similaires),
          "alternative_solutions": string[] (Alternatives marketing)
        }
      ],
      "business_solutions": [
        {
          "weakness": string (Faiblesse business),
          "concrete_solution": string (Solution business),
          "implementation_steps": string[] (Plan business),
          "expected_benefits": string[] (Impact business),
          "estimated_cost": string (Investissement),
          "implementation_timeline": string (Calendrier),
          "success_metrics": string[] (KPIs business),
          "required_resources": string[] (Ressources business),
          "potential_obstacles": string[] (Risques business),
          "mitigation_strategies": string[] (Solutions business),
          "case_studies": string[] (Exemples business),
          "alternative_solutions": string[] (Alternatives business)
        }
      ]
    }
  },
  "action_plan": {
    "steps": string[] (Plan 90 jours détaillé),
    "timeline": string (Planning précis),
    "kpis": string[] (Indicateurs détaillés),
    "vigilance_points": string[] (Points critiques),
    "daily_actions": string[] (Actions quotidiennes),
    "weekly_milestones": string[] (Objectifs hebdomadaires),
    "resource_allocation": string[] (Attribution ressources),
    "success_criteria": string[] (Critères de réussite),
    "contingency_plans": string[] (Plans alternatifs),
    "validation_process": string[] (Processus validation)
  }
}`
}