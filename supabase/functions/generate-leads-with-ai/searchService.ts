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

    // Get Bright Data proxy URL from environment
    const brightDataProxyUrl = Deno.env.get('BRIGHT_DATA_PROXY_URL');
    if (!brightDataProxyUrl) {
      throw new Error('BRIGHT_DATA_PROXY_URL not configured');
    }

    // Construct the Google search URL with parameters
    const searchUrl = new URL('https://www.google.com/search');
    searchUrl.searchParams.append('q', searchQuery);
    searchUrl.searchParams.append('hl', countryParams.lang);
    searchUrl.searchParams.append('gl', countryParams.gl);
    searchUrl.searchParams.append('num', filters.leadCount.toString());

    console.log('URL de recherche construite:', searchUrl.toString());

    // Make request through Bright Data proxy
    const response = await fetch(searchUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      method: 'GET',
      redirect: 'follow',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    console.log('Réponse reçue, longueur HTML:', html.length);

    // Parse the results (simplified example)
    const results = parseSearchResults(html);
    console.log('Résultats parsés:', results);

    return results;

  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    throw error;
  }
}

// Helper function to parse search results from HTML
function parseSearchResults(html: string) {
  // Simplified example - you would want to use a proper HTML parser here
  const results = [];
  // Basic regex to extract search results
  const regex = /<div class="g">(.*?)<\/div>/g;
  const matches = html.matchAll(regex);

  for (const match of matches) {
    const result = {
      title: extractTitle(match[1]),
      snippet: extractSnippet(match[1]),
      link: extractLink(match[1])
    };
    if (result.link) {
      results.push(result);
    }
  }

  return results;
}

function extractTitle(html: string): string {
  const match = html.match(/<h3[^>]*>(.*?)<\/h3>/);
  return match ? stripTags(match[1]) : '';
}

function extractSnippet(html: string): string {
  const match = html.match(/<div class="VwiC3b"[^>]*>(.*?)<\/div>/);
  return match ? stripTags(match[1]) : '';
}

function extractLink(html: string): string {
  const match = html.match(/href="([^"]+)"/);
  return match ? match[1] : '';
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, '');
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