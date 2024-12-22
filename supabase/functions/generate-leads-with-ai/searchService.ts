export async function searchWithSerpAPI(filters: any) {
  try {
    console.log('Démarrage de la recherche avec les filtres:', JSON.stringify(filters, null, 2));

    // Construct the search query based on filters
    let searchTerms = [];
    
    // Add company name if provided
    if (filters.search) {
      searchTerms.push(filters.search);
      console.log('Ajout du nom de l\'entreprise à la recherche:', filters.search);
    }

    // Add industry if specified
    if (filters.industry && filters.industry !== 'all') {
      searchTerms.push(`"${filters.industry}"`);
      console.log('Ajout du secteur à la recherche:', filters.industry);
    }

    // Add location information
    if (filters.country && filters.country !== 'all') {
      const countryName = getCountryName(filters.country);
      searchTerms.push(countryName);
      console.log('Ajout du pays à la recherche:', countryName);
    }
    
    if (filters.city && filters.city !== 'all') {
      searchTerms.push(`"${filters.city}"`);
      console.log('Ajout de la ville à la recherche:', filters.city);
    }

    // If no search terms are provided, use a default
    if (searchTerms.length === 0) {
      searchTerms.push('entreprises');
      console.log('Aucun critère spécifique fourni, utilisation de la recherche par défaut: entreprises');
    }

    // Add specific terms to improve business search results
    searchTerms.push('business OR company OR entreprise');
    
    // Combine all search terms
    const searchQuery = searchTerms.join(' ');
    console.log('Requête de recherche finale:', searchQuery);

    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&num=10&hl=fr`;
    console.log('URL de recherche construite:', googleUrl);

    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer 352509a73b073f603e763af31cb203e1fad3af732e9a080dfe3d0a4456674a69',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        format: "json",
        zone: "serp_api4",
        url: googleUrl
      })
    };

    console.log('Options de la requête:', JSON.stringify(options, null, 2));

    const response = await fetch('https://api.brightdata.com/request', options);
    console.log('Statut de la réponse:', response.status);

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log('Données brutes reçues:', JSON.stringify(data, null, 2));
    console.log('Nombre de résultats trouvés:', data.organic_results?.length || 0);

    if (!data || !data.organic_results || data.organic_results.length === 0) {
      console.log('Aucun résultat trouvé pour la recherche');
      return [];
    }

    // Transform and return the results
    const results = data.organic_results.map((result: any) => ({
      title: result.title || '',
      snippet: result.snippet || '',
      link: result.link || ''
    }));

    console.log('Résultats transformés:', JSON.stringify(results, null, 2));
    return results;

  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    throw error;
  }
}

// Helper function to convert country codes to full names
function getCountryName(countryCode: string): string {
  const countryMap: { [key: string]: string } = {
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
  return countryMap[countryCode] || countryCode;
}