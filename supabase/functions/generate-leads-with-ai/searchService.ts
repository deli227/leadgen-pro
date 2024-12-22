import { corsHeaders } from './corsConfig.ts';

const brightDataProxyUrl = Deno.env.get('BRIGHT_DATA_PROXY_URL');

export async function searchWithSerpAPI(filters: any) {
  console.log('Recherche avec Bright Data et les filtres:', filters);
  
  // Construction de la requête en fonction des filtres
  let searchQuery = '';
  
  // Si une recherche spécifique est fournie, l'utiliser comme base
  if (filters.search) {
    searchQuery = filters.search;
  } else {
    // Ajout de l'industrie si spécifiée
    if (filters.industry && filters.industry !== 'all') {
      searchQuery += `${filters.industry} `;
    }
    
    // Ajout du type d'entreprise
    searchQuery += 'entreprise ';
    
    // Ajout de la ville si spécifiée
    if (filters.city && filters.city !== 'all') {
      searchQuery += `${filters.city} `;
    }
    
    // Ajout du pays si spécifié
    if (filters.country && filters.country !== 'all') {
      const countryMapping: { [key: string]: string } = {
        'FR': 'France',
        'BE': 'Belgique',
        'CH': 'Suisse',
        'CA': 'Canada',
        'LU': 'Luxembourg',
        'MC': 'Monaco',
        'MA': 'Maroc',
        'TN': 'Tunisie',
        'SN': 'Sénégal',
        'CI': 'Côte d\'Ivoire'
      };
      
      const countryName = countryMapping[filters.country] || filters.country;
      searchQuery += countryName;
    }
  }

  // Si la requête est vide après le nettoyage, utiliser une requête par défaut
  if (!searchQuery.trim()) {
    searchQuery = 'entreprise France';
  }

  console.log('Requête de recherche finale:', searchQuery);

  if (!brightDataProxyUrl) {
    throw new Error('URL du proxy Bright Data non configurée');
  }

  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&num=${filters.leadCount || 5}&hl=fr`;
  
  try {
    console.log('Envoi de la requête à Bright Data API:', searchUrl);
    
    const response = await fetch('https://api.brightdata.com/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${brightDataProxyUrl}`,
      },
      body: JSON.stringify({
        url: searchUrl,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      })
    });

    if (!response.ok) {
      console.error('Erreur de la requête:', response.status, response.statusText);
      throw new Error(`Erreur lors de la recherche: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    
    // Extraction basique des résultats de recherche
    const results = [];
    const regex = /<div class="g">(.*?)<\/div>/g;
    const titleRegex = /<h3[^>]*>(.*?)<\/h3>/;
    const snippetRegex = /<div class="VwiC3b[^>]*>(.*?)<\/div>/;
    const linkRegex = /<a href="([^"]*)"[^>]*>/;

    let match;
    while ((match = regex.exec(html)) !== null && results.length < (filters.leadCount || 5)) {
      const titleMatch = titleRegex.exec(match[1]);
      const snippetMatch = snippetRegex.exec(match[1]);
      const linkMatch = linkRegex.exec(match[1]);

      if (titleMatch && snippetMatch && linkMatch) {
        results.push({
          title: titleMatch[1].replace(/<[^>]*>/g, ''),
          snippet: snippetMatch[1].replace(/<[^>]*>/g, ''),
          link: linkMatch[1]
        });
      }
    }

    if (results.length === 0) {
      console.error('Aucun résultat trouvé dans le HTML:', html.substring(0, 500));
      throw new Error(`Aucun résultat trouvé pour la recherche "${searchQuery}". Essayez d'élargir vos critères de recherche.`);
    }

    console.log('Nombre de résultats trouvés:', results.length);
    return results;

  } catch (error) {
    console.error('Erreur lors de la recherche avec Bright Data:', error);
    throw error;
  }
}