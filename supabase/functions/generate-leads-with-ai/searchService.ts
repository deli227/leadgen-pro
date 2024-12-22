import { corsHeaders } from './corsConfig.ts';

const brightDataProxy = Deno.env.get('BRIGHT_DATA_PROXY_URL');

export async function searchWithSerpAPI(filters: any) {
  console.log('Recherche avec les filtres:', filters);
  
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

  if (!brightDataProxy) {
    throw new Error('Configuration Bright Data manquante');
  }

  try {
    const searchParams = new URLSearchParams({
      q: searchQuery,
      hl: 'fr',
      num: String(filters.leadCount || 5)
    });

    console.log('Envoi de la requête à Google avec les paramètres:', Object.fromEntries(searchParams));

    const response = await fetch(`https://www.google.com/search?${searchParams}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      proxy: brightDataProxy
    });

    if (!response.ok) {
      console.error('Erreur de recherche:', response.statusText);
      throw new Error('Erreur lors de la recherche Google');
    }

    const html = await response.text();
    
    // Extraction basique des résultats de recherche
    const results = extractSearchResults(html);
    
    if (!results || results.length === 0) {
      console.error('Aucun résultat dans la réponse');
      throw new Error(`Aucun résultat trouvé pour la recherche "${searchQuery}". Essayez d'élargir vos critères de recherche.`);
    }

    console.log('Nombre de résultats trouvés:', results.length);
    return results;

  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    throw error;
  }
}

function extractSearchResults(html: string) {
  // Extraction basique des résultats avec des expressions régulières
  const results = [];
  const titleRegex = /<h3[^>]*>(.*?)<\/h3>/g;
  const snippetRegex = /<div[^>]*class="[^"]*snippet[^"]*"[^>]*>(.*?)<\/div>/g;
  const linkRegex = /<a[^>]*href="([^"]*)"[^>]*>/g;

  let match;
  while ((match = titleRegex.exec(html)) !== null) {
    const title = match[1].replace(/<[^>]*>/g, '');
    const snippet = snippetRegex.exec(html)?.[1]?.replace(/<[^>]*>/g, '') || '';
    const link = linkRegex.exec(html)?.[1] || '';

    if (title && link) {
      results.push({
        title,
        snippet,
        link: link.startsWith('http') ? link : `https://www.google.com${link}`
      });
    }
  }

  return results;
}