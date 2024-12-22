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
      searchTerms.push(filters.industry);
      console.log('Ajout du secteur à la recherche:', filters.industry);
    }

    // Get country specific parameters
    const countryParams = getCountrySearchParams(filters.country);
    console.log('Paramètres spécifiques au pays:', countryParams);

    // Add location information
    if (filters.country && filters.country !== 'all') {
      const countryName = getCountryName(filters.country);
      // Add location keyword based on country
      searchTerms.push(`${countryParams.businessTerm} ${countryName}`);
      console.log('Ajout du pays à la recherche:', countryName);
    }
    
    if (filters.city && filters.city !== 'all') {
      searchTerms.push(`${countryParams.businessTerm} ${filters.city}`);
      console.log('Ajout de la ville à la recherche:', filters.city);
    }

    // If no search terms are provided, use a broader default based on country
    if (searchTerms.length === 0) {
      const defaultCountry = filters.country === 'all' ? 'FR' : filters.country;
      const params = getCountrySearchParams(defaultCountry);
      searchTerms.push(`${params.businessTerm} ${getCountryName(defaultCountry)}`);
      console.log('Utilisation de la recherche par défaut pour le pays:', defaultCountry);
    }

    // Add specific terms to improve business search results but make them optional
    searchTerms.push(`(${countryParams.businessTerms.join(' OR ')})`);
    
    // Combine all search terms with OR operator to get more results
    const searchQuery = searchTerms.join(' OR ');
    console.log('Requête de recherche finale:', searchQuery);

    // Construct Google URL with country-specific parameters
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&num=20&hl=${countryParams.lang}&gl=${countryParams.gl}`;
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
        url: googleUrl,
        params: {
          type: "business",
          results_count: 20,
          country: countryParams.gl
        }
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

// Helper function to get country-specific search parameters
function getCountrySearchParams(countryCode: string): {
  lang: string;
  gl: string;
  businessTerm: string;
  businessTerms: string[];
} {
  const defaultParams = {
    lang: 'fr',
    gl: 'FR',
    businessTerm: 'entreprises',
    businessTerms: ['entreprise', 'société', 'business', 'company']
  };

  const countryParams: { [key: string]: typeof defaultParams } = {
    'FR': defaultParams,
    'BE': {
      lang: 'fr',
      gl: 'BE',
      businessTerm: 'entreprises',
      businessTerms: ['entreprise', 'société', 'bedrijf', 'business']
    },
    'CH': {
      lang: 'fr',
      gl: 'CH',
      businessTerm: 'entreprises',
      businessTerms: ['entreprise', 'société', 'unternehmen', 'firma']
    },
    'CA': {
      lang: 'fr',
      gl: 'CA',
      businessTerm: 'entreprises',
      businessTerms: ['entreprise', 'société', 'business', 'company']
    },
    'LU': {
      lang: 'fr',
      gl: 'LU',
      businessTerm: 'entreprises',
      businessTerms: ['entreprise', 'société', 'firma', 'business']
    },
    'MC': {
      lang: 'fr',
      gl: 'MC',
      businessTerm: 'entreprises',
      businessTerms: ['entreprise', 'société', 'business']
    },
    'MA': {
      lang: 'fr',
      gl: 'MA',
      businessTerm: 'entreprises',
      businessTerms: ['entreprise', 'société', 'شركة']
    },
    'TN': {
      lang: 'fr',
      gl: 'TN',
      businessTerm: 'entreprises',
      businessTerms: ['entreprise', 'société', 'شركة']
    },
    'SN': {
      lang: 'fr',
      gl: 'SN',
      businessTerm: 'entreprises',
      businessTerms: ['entreprise', 'société', 'business']
    },
    'CI': {
      lang: 'fr',
      gl: 'CI',
      businessTerm: 'entreprises',
      businessTerms: ['entreprise', 'société', 'business']
    }
  };

  return countryParams[countryCode] || defaultParams;
}