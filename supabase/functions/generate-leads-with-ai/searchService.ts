export async function searchWithSerpAPI(filters: any) {
  try {
    console.log('Recherche avec les filtres:', filters);

    // Construct the search query based on filters
    let searchQuery = '';
    if (filters.search) {
      searchQuery = filters.search;
    }
    if (filters.industry && filters.industry !== 'all') {
      searchQuery += ` ${filters.industry}`;
    }
    if (filters.country && filters.country !== 'all') {
      searchQuery += ` ${filters.country}`;
    }
    if (filters.city && filters.city !== 'all') {
      searchQuery += ` ${filters.city}`;
    }

    // If no search query is provided, use a default
    if (!searchQuery.trim()) {
      searchQuery = "entreprises";
    }

    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    console.log('URL de recherche:', googleUrl);

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

    console.log('Options de la requête:', options);

    const response = await fetch('https://api.brightdata.com/request', options);

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log('Réponse de l\'API:', data);

    if (!data || !data.organic_results || data.organic_results.length === 0) {
      console.log('Aucun résultat trouvé');
      return [];
    }

    // Transform and return the results
    return data.organic_results.map((result: any) => ({
      title: result.title || '',
      snippet: result.snippet || '',
      link: result.link || ''
    }));

  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    throw error;
  }
}