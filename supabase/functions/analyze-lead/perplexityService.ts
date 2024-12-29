import { Lead } from './types.ts';

export async function analyzeWithPerplexity(lead: Lead, prompt: string, apiKey: string): Promise<any> {
  console.log('Envoi de la requête à Perplexity avec le prompt enrichi');

  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-sonar-huge-128k-online',
      messages: [
        {
          role: 'system',
          content: 'Tu es un expert en analyse d\'entreprises et transformation digitale. Fournis une analyse détaillée, concrète et immédiatement actionnable au format JSON demandé. Réponds uniquement avec le JSON, sans aucun texte avant ou après.'
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

  const cleanContent = result.choices[0].message.content
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  try {
    return JSON.parse(cleanContent);
  } catch (error) {
    console.error('Erreur lors du parsing JSON:', error);
    console.error('Contenu reçu:', cleanContent);
    throw new Error('Format de réponse invalide de Perplexity');
  }
}