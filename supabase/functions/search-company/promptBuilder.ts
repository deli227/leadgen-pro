interface SearchFilters {
  search: string
  country?: string
  city?: string
}

export const buildPrompt = (filters: SearchFilters): string => {
  let prompt = `Recherche des informations détaillées sur l'entreprise "${filters.search}"`
  
  if (filters.country && filters.country !== 'all') {
    prompt += ` en ${filters.country}`
    if (filters.city && filters.city !== 'all') {
      prompt += ` à ${filters.city}`
    }
  }

  prompt += `\n\nRéponds UNIQUEMENT avec un objet JSON valide contenant les informations de l'entreprise avec exactement ces champs (ne pas inclure de balises \`\`\`json ou \`\`\`) :
  {
    "company": "Nom de l'entreprise",
    "email": "email@professionnel.com",
    "phone": "+33123456789",
    "website": "site-web.com",
    "address": "Adresse complète",
    "industry": "Secteur d'activité",
    "score": 8,
    "socialMedia": {
      "linkedin": "linkedin.com/company/...",
      "twitter": "twitter.com/...",
      "facebook": "facebook.com/..."
    }
  }`

  return prompt
}