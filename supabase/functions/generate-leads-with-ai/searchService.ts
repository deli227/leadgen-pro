export async function searchWithSerpAPI(filters: any) {
  try {
    console.log('Démarrage de la recherche avec les filtres:', JSON.stringify(filters, null, 2));

    // Construct the search query based on filters
    let searchQuery = '';
    
    // Add company name if provided
    if (filters.search) {
      searchQuery = filters.search;
      console.log('Ajout du nom de l\'entreprise à la recherche:', filters.search);
    }

    // Add industry if specified
    if (filters.industry && filters.industry !== 'all') {
      searchQuery += ` ${filters.industry}`;
      console.log('Ajout du secteur à la recherche:', filters.industry);
    }

    // Add location information
    if (filters.country && filters.country !== 'all') {
      searchQuery += ` ${filters.country}`;
      console.log('Ajout du pays à la recherche:', filters.country);
    }
    if (filters.city && filters.city !== 'all') {
      searchQuery += ` ${filters.city}`;
      console.log('Ajout de la ville à la recherche:', filters.city);
    }

    // If no search query is provided, use a default
    if (!searchQuery.trim()) {
      searchQuery = "entreprises";
      console.log('Aucun critère spécifique fourni, utilisation de la recherche par défaut:', searchQuery);
    }

    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
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