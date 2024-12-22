export async function searchWithSerpAPI(filters: any) {
  try {
    console.log('Démarrage de la recherche avec les filtres:', JSON.stringify(filters, null, 2));

    // Get country specific parameters
    const countryParams = getCountrySearchParams(filters.country);
    console.log('Paramètres spécifiques au pays:', countryParams);

    // Construct the search query based on filters
    let searchTerms = [];
    
    // Add company name if provided
    if (filters.search) {
      searchTerms.push(`"${filters.search}"`);
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

    // Simulate search results for now
    const mockResults = [
      {
        title: "Entreprise Test 1",
        snippet: "Une description d'entreprise test 1",
        link: "https://example1.com"
      },
      {
        title: "Entreprise Test 2",
        snippet: "Une description d'entreprise test 2",
        link: "https://example2.com"
      }
    ];

    console.log('Résultats simulés générés');
    return mockResults;

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
} {
  const params: { [key: string]: { lang: string; gl: string; businessTerm: string } } = {
    'FR': {
      lang: 'fr',
      gl: 'FR',
      businessTerm: 'entreprise'
    },
    'BE': {
      lang: 'fr',
      gl: 'BE',
      businessTerm: 'entreprise'
    },
    'CH': {
      lang: 'fr',
      gl: 'CH',
      businessTerm: 'entreprise'
    },
    'CA': {
      lang: 'fr',
      gl: 'CA',
      businessTerm: 'entreprise'
    },
    'LU': {
      lang: 'fr',
      gl: 'LU',
      businessTerm: 'entreprise'
    },
    'MC': {
      lang: 'fr',
      gl: 'MC',
      businessTerm: 'entreprise'
    },
    'MA': {
      lang: 'fr',
      gl: 'MA',
      businessTerm: 'société'
    },
    'TN': {
      lang: 'fr',
      gl: 'TN',
      businessTerm: 'société'
    },
    'SN': {
      lang: 'fr',
      gl: 'SN',
      businessTerm: 'entreprise'
    },
    'CI': {
      lang: 'fr',
      gl: 'CI',
      businessTerm: 'entreprise'
    }
  };

  return params[countryCode] || params['FR'];
}