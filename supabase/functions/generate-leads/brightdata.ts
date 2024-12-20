import { SearchParams } from './types.ts';

export async function searchWithBrightData(searchQuery: string, leadCount: number) {
  const brightDataApiKey = Deno.env.get('BRIGHT_DATA_SERP_API_KEY');
  
  if (!brightDataApiKey) {
    console.error('Erreur: Clé API Bright Data non trouvée dans les variables d\'environnement');
    throw new Error('Configuration error: Bright Data API key not found');
  }

  console.log('Appel de l\'API Bright Data avec la requête:', searchQuery);
  console.log('Utilisation de la clé API:', brightDataApiKey.substring(0, 5) + '...');
  
  try {
    const response = await fetch('https://api.brightdata.com/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${brightDataApiKey}`,
      },
      body: JSON.stringify({
        zone: 'serp_api1',
        url: `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`,
        format: 'raw',
        method: 'GET',
        country: 'fr',
        parse: true,
        num_pages: Math.ceil(leadCount / 10)
      }),
    });

    console.log('Status code de la réponse Bright Data:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Réponse complète de Bright Data:', errorText);
      console.error('Headers de la réponse:', Object.fromEntries(response.headers.entries()));
      throw new Error(`Bright Data API error: ${response.status} - ${errorText}`);
    }

    const results = await response.json();
    console.log('Nombre de résultats reçus:', results.organic?.length || 0);

    if (!results.organic || !Array.isArray(results.organic)) {
      console.error('Format de réponse invalide:', results);
      throw new Error('Invalid response format from Bright Data');
    }

    return results.organic;
  } catch (error) {
    console.error('Erreur détaillée lors de l\'appel à Bright Data:', error);
    throw error;
  }
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