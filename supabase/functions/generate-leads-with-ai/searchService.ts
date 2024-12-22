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
        format: 'json',
        zone: 'serp_api4',
        url: searchUrl
      })
    });

    if (!response.ok) {
      console.error('Erreur de la requête:', response.status, response.statusText);
      throw new Error(`Erreur lors de la recherche: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Réponse de Bright Data:', data);
    
    if (!data || !data.organic_results) {
      console.error('Aucun résultat trouvé dans la réponse');
      throw new Error(`Aucun résultat trouvé pour la recherche "${searchQuery}". Essayez d'élargir vos critères de recherche.`);
    }

    // Transformation des résultats au format attendu
    const results = data.organic_results.slice(0, filters.leadCount || 5).map((result: any) => ({
      title: result.title,
      snippet: result.snippet,
      link: result.link
    }));

    console.log('Nombre de résultats trouvés:', results.length);
    return results;

  } catch (error) {
    console.error('Erreur lors de la recherche avec Bright Data:', error);
    throw error;
  }
}