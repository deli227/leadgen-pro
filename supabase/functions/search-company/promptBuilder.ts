interface SearchFilters {
  search: string
  country?: string
  city?: string
}

export const buildPrompt = (filters: SearchFilters): string => {
  let searchQuery = `"${filters.search}"`
  
  if (filters.country && filters.country !== 'all') {
    searchQuery += ` "${filters.country}"`
    if (filters.city && filters.city !== 'all') {
      searchQuery += ` "${filters.city}"`
    }
  }

  let prompt = `Tu es un expert en recherche d'informations d'entreprises sur Google. Effectue une recherche Google approfondie avec les termes exacts suivants : ${searchQuery}

INSTRUCTIONS DÉTAILLÉES :

1. RECHERCHE GOOGLE :
   - Utilise exactement ces termes de recherche sur Google
   - Examine les 5 premiers résultats Google pertinents
   - Consulte la fiche Google My Business si elle existe
   - Vérifie les Pages Jaunes et autres annuaires professionnels
   - Recherche spécifiquement sur Google Maps pour l'adresse

2. EXTRACTION DES INFORMATIONS :
   - Commence par le site web officiel s'il existe
   - Vérifie la fiche Google My Business
   - Croise avec les informations des annuaires professionnels
   - Cherche les liens vers les réseaux sociaux dans les résultats Google
   - Note les informations de contact visibles sur Google Maps

3. VALIDATION DES DONNÉES :
   - Compare les informations entre les différentes sources
   - Privilégie les informations les plus récentes
   - Vérifie que les liens sont actifs
   - Assure-toi que les profils sociaux sont bien officiels

4. INFORMATIONS À COLLECTER :
   - Nom exact de l'entreprise (tel qu'affiché sur Google)
   - Numéro de téléphone (visible sur Google/Pages Jaunes)
   - Email professionnel (depuis le site web/Google My Business)
   - Adresse complète (depuis Google Maps)
   - Site web officiel
   - Liens des réseaux sociaux trouvés dans les résultats Google
   - Secteur d'activité (basé sur la description Google)

Réponds UNIQUEMENT avec un objet JSON valide contenant ces champs, sans aucun texte supplémentaire :
{
  "company": "Nom exact trouvé sur Google",
  "email": "email@entreprise.com",
  "phone": "Numéro trouvé sur Google/Pages Jaunes",
  "website": "https://site-officiel.com",
  "address": "Adresse complète depuis Google Maps",
  "industry": "Secteur d'activité principal",
  "score": 8,
  "socialMedia": {
    "linkedin": "URL LinkedIn trouvée sur Google",
    "twitter": "URL Twitter trouvée sur Google",
    "facebook": "URL Facebook trouvée sur Google",
    "instagram": "URL Instagram trouvée sur Google"
  }
}`

  return prompt
}