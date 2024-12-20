import { SearchParams } from './types.ts';

export async function searchWithBrightData(searchQuery: string, leadCount: number) {
  const brightDataUsername = Deno.env.get('BRIGHT_DATA_USERNAME');
  const brightDataPassword = Deno.env.get('BRIGHT_DATA_PASSWORD');
  
  if (!brightDataUsername || !brightDataPassword) {
    console.error('Erreur: Identifiants Bright Data non trouvés dans les variables d\'environnement');
    throw new Error('Configuration error: Bright Data credentials not found');
  }

  console.log('Recherche avec la requête:', searchQuery);
  
  try {
    const proxyUrl = 'brd.superproxy.io:33335';
    const auth = btoa(`${brightDataUsername}:${brightDataPassword}`);
    
    const response = await fetch(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, {
      headers: {
        'Proxy-Authorization': `Basic ${auth}`,
        'Accept-Encoding': 'gzip, deflate',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      signal: AbortSignal.timeout(30000), // 30 seconds timeout
    });

    console.log('Status code de la réponse:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Réponse d\'erreur complète:', errorText);
      throw new Error(`Search error: ${response.status} - ${errorText}`);
    }

    const html = await response.text();
    console.log('Longueur de la réponse HTML:', html.length);

    // Parse the HTML to extract organic results
    // This is a basic example - you might want to use a proper HTML parser
    const results = [];
    const matches = html.match(/<div class="g">(.*?)<\/div>/g);
    
    if (matches) {
      for (const match of matches.slice(0, leadCount)) {
        const titleMatch = match.match(/<h3[^>]*>(.*?)<\/h3>/);
        const linkMatch = match.match(/href="([^"]*)"[^>]*>/);
        
        if (titleMatch && linkMatch) {
          results.push({
            title: titleMatch[1].replace(/<[^>]*>/g, ''),
            link: linkMatch[1]
          });
        }
      }
    }

    console.log('Nombre de résultats extraits:', results.length);
    return results;
  } catch (error) {
    console.error('Erreur détaillée lors de la recherche:', error);
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