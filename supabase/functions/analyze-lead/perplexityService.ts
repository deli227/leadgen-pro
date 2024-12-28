import { AnalysisRequest } from './types.ts';

export async function analyzeLeadWithPerplexity(request: AnalysisRequest) {
  const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');
  if (!perplexityApiKey) {
    throw new Error('Clé API Perplexity non configurée');
  }

  const prompt = `En tant que consultant stratégique senior spécialisé en développement commercial, réalise une analyse approfondie et actionnables de :

Entreprise : ${request.lead.company}
Site web : ${request.lead.website || 'Non spécifié'}
Industrie : ${request.lead.industry || 'Non spécifié'}
Email : ${request.lead.email || 'Non spécifié'}
Téléphone : ${request.lead.phone || 'Non spécifié'}
Adresse : ${request.lead.address || 'Non spécifié'}

Format de réponse souhaité (JSON) avec les sections suivantes :
- Company Analysis (qualification_score, market_position, company_size, development_stage, growth_potential, detailed_justification)
- Tech Analysis (tech_stack array, digital_maturity, online_presence, website_performance, security_compliance)
- Marketing Analysis (content_strategy, social_media_presence, seo_score, brand_strategy, market_positioning)
- Financial Analysis (estimated_revenue, investment_potential, funding_capacity, financial_health)
- Competitive Analysis (market_position, competitive_advantages array, potential_threats array, development_opportunities array)
- Recommendations (approach_strategy, entry_points array, sales_arguments array, optimal_timing, required_resources array)
- Action Plan (steps array, timeline, kpis array, vigilance_points array)`;

  console.log('Envoi de la requête à Perplexity');
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${perplexityApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-sonar-huge-128k-online',
      messages: [
        {
          role: 'system',
          content: 'Tu es un expert en analyse d\'entreprises. Fournis une analyse détaillée et professionnelle au format JSON demandé. Réponds uniquement avec le JSON, sans aucun texte avant ou après, ni formatage markdown.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.1,
      max_tokens: 4000
    }),
  });

  if (!response.ok) {
    console.error('Erreur Perplexity:', await response.text());
    throw new Error('Erreur lors de l\'analyse du lead');
  }

  const result = await response.json();
  console.log('Réponse Perplexity reçue');
  
  return result;
}