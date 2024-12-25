import { SearchFilters, SearchResult } from './types';
import { getCountryName, getCountrySearchParams } from './countryUtils';

export async function searchWithSerpAPI(filters: SearchFilters): Promise<SearchResult[]> {
  try {
    console.log('Démarrage de la recherche avec les filtres:', JSON.stringify(filters, null, 2));

    // Get country specific parameters
    const countryParams = getCountrySearchParams(filters.country || 'FR');
    console.log('Paramètres spécifiques au pays:', countryParams);

    // Construct the search query based on filters
    let searchTerms = [];
    
    if (filters.search) {
      searchTerms.push(`"${filters.search}"`);
      console.log('Ajout du nom de l\'entreprise à la recherche:', filters.search);
    }

    if (filters.industry && filters.industry !== 'all') {
      searchTerms.push(`"${filters.industry}"`);
      console.log('Ajout du secteur à la recherche:', filters.industry);
    }

    if (filters.country && filters.country !== 'all') {
      const countryName = getCountryName(filters.country);
      searchTerms.push(`${countryParams.businessTerm} ${countryName}`);
      console.log('Ajout du pays à la recherche:', countryName);
    }
    
    if (filters.city && filters.city !== 'all') {
      searchTerms.push(`${countryParams.businessTerm} ${filters.city}`);
      console.log('Ajout de la ville à la recherche:', filters.city);
    }

    // If no specific search terms are provided, use a broader search
    if (searchTerms.length === 0) {
      const defaultCountry = filters.country === 'all' ? 'FR' : filters.country;
      const params = getCountrySearchParams(defaultCountry);
      searchTerms.push(`${params.businessTerm} ${getCountryName(defaultCountry)}`);
      console.log('Utilisation de la recherche par défaut pour le pays:', defaultCountry);
    }

    // Combine search terms
    const searchQuery = searchTerms.join(' ');
    console.log('Requête de recherche finale:', searchQuery);

    // Get Bright Data SERP API key from environment
    const apiKey = Deno.env.get('BRIGHT_DATA_SERP_API_KEY');
    if (!apiKey) {
      throw new Error('BRIGHT_DATA_SERP_API_KEY not configured');
    }

    // Construct the SERP API request
    const response = await fetch('https://api.brightdata.com/serp/google', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: searchQuery,
        language: countryParams.lang,
        country: countryParams.gl,
        num_results: filters.leadCount,
        type: 'search'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erreur de l\'API SERP:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Réponse de l\'API SERP reçue:', data);

    // Transform the SERP API response to our format
    const results = data.organic_results.map((result: any) => ({
      title: result.title,
      snippet: result.snippet,
      link: result.url
    }));

    console.log('Résultats transformés:', results);
    return results;

  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    throw error;
  }
}