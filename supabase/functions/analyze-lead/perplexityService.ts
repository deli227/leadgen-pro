const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

export async function analyzeWithPerplexity(prompt: string) {
  const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY')
  if (!perplexityApiKey) {
    throw new Error('Clé API Perplexity non configurée')
  }

  console.log('Envoi de la requête à Perplexity')
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
  })

  if (!response.ok) {
    console.error('Erreur Perplexity:', await response.text())
    throw new Error('Erreur lors de l\'analyse du lead')
  }

  const result = await response.json()
  console.log('Réponse Perplexity reçue')

  // Nettoyer la réponse de tout formatage Markdown
  const cleanContent = result.choices[0].message.content
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim()

  try {
    return JSON.parse(cleanContent)
  } catch (error) {
    console.error('Erreur lors du parsing JSON:', error)
    console.error('Contenu reçu:', cleanContent)
    throw new Error('Format de réponse invalide de Perplexity')
  }
}