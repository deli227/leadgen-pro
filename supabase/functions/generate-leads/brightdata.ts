import { SearchParams } from './types.ts';

export async function searchWithBrightData(searchQuery: string, leadCount: number) {
  const brightDataApiKey = Deno.env.get('BRIGHT_DATA_SERP_API_KEY');
  
  if (!brightDataApiKey) {
    console.error('Erreur: Clé API Bright Data non trouvée dans les variables d\'environnement');
    throw new Error('Configuration error: Bright Data API key not found');
  }

  console.log('Appel de l\'API Bright Data avec la requête:', searchQuery);
  
  const response = await fetch('https://api.brightdata.com/serp/google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${brightDataApiKey}`,
    },
    body: JSON.stringify({
      query: searchQuery,
      domain: 'google.com',
      num_pages: Math.ceil(leadCount / 10),
      parse: true
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Erreur Bright Data:', errorText);
    throw new Error(`Bright Data API error: ${errorText}`);
  }

  const results = await response.json();
  console.log('Résultats bruts reçus de Bright Data:', results);

  if (!results.organic || !Array.isArray(results.organic)) {
    console.error('Format de réponse invalide:', results);
    throw new Error('Invalid response format from Bright Data');
  }

  return results.organic;
}

export function buildSearchQuery({ industry, country, city }: SearchParams): string {
  let searchQuery = '';
  if (industry !== 'all') {
    searchQuery += `${industry} company `;
  }
  if (city !== 'all') {
    searchQuery += `${city} `;
  }
  if (country !== 'all') {
    searchQuery += `${country}`;
  }
  
  return searchQuery.trim() || 'companies';
}