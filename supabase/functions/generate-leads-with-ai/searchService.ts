import { corsHeaders } from './corsConfig.ts';

const serpApiKey = Deno.env.get('SERPAPI_KEY');

export async function searchWithSerpAPI(filters: any) {
  console.log('Recherche SerpAPI avec les filtres:', filters);
  
  const serpApiUrl = `https://serpapi.com/search`;
  
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
      // Mapping des codes pays vers les noms complets
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

  const params = new URLSearchParams({
    q: searchQuery,
    engine: "google",
    api_key: serpApiKey!,
    num: String(filters.leadCount || 5),
    gl: filters.country?.toLowerCase() || "fr",
    hl: "fr",
    location: filters.city !== 'all' ? filters.city : (filters.country !== 'all' ? filters.country : 'France'),
  });

  try {
    console.log('Envoi de la requête à SerpAPI avec les paramètres:', Object.fromEntries(params));
    const response = await fetch(`${serpApiUrl}?${params}`);
    const result = await response.json();
    
    if (!response.ok) {
      console.error('Erreur SerpAPI:', result);
      throw new Error(`Erreur SerpAPI: ${result.error || 'Erreur inconnue'}`);
    }

    console.log('Nombre de résultats SerpAPI:', result.organic_results?.length || 0);

    if (!result.organic_results || result.organic_results.length === 0) {
      console.error('Aucun résultat dans la réponse:', result);
      throw new Error(`Aucun résultat trouvé pour la recherche "${searchQuery}". Essayez d'élargir vos critères de recherche.`);
    }

    return result.organic_results.map((entry: any) => ({
      title: entry.title,
      snippet: entry.snippet,
      link: entry.link,
    }));
  } catch (error) {
    console.error('Erreur lors de la recherche SerpAPI:', error);
    throw error;
  }
}