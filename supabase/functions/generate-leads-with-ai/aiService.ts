const openAiKey = Deno.env.get('OPENAI_API_KEY');

export async function analyzeWithOpenAI(data: { title: string; snippet: string; link: string }) {
  console.log('Analyse OpenAI pour:', data.title);
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Vous êtes un expert en analyse d\'entreprises. Analysez les informations fournies et donnez une réponse structurée avec les points forts, points faibles et recommandations.'
          },
          {
            role: 'user',
            content: `
              Analysez cette entreprise :
              Titre : ${data.title}
              Description : ${data.snippet}
              Site web : ${data.link}
              
              Format de réponse souhaité :
              1. Points forts de l'entreprise
              2. Points faibles potentiels
              3. Recommandations d'amélioration
            `
          }
        ],
      }),
    });

    const result = await response.json();
    console.log('Réponse OpenAI reçue');
    
    if (!result.choices || result.choices.length === 0) {
      throw new Error("Aucune réponse reçue de l'API OpenAI.");
    }

    return result.choices[0].message.content;
  } catch (error) {
    console.error('Erreur lors de l\'analyse OpenAI:', error);
    throw error;
  }
}