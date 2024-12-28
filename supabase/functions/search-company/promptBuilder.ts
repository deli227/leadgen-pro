interface SearchFilters {
  search: string
  country?: string
  city?: string
}

export const buildPrompt = (filters: SearchFilters): string => {
  let prompt = `En tant qu'expert en développement commercial B2B, recherche des informations détaillées sur des clients potentiels correspondant à "${filters.search}"`
  
  if (filters.country && filters.country !== 'all') {
    prompt += ` en ${filters.country}`
    if (filters.city && filters.city !== 'all') {
      prompt += ` à ${filters.city}`
    }
  }

  prompt += `\n\nPoints clés à identifier :
- Taille et structure de l'entreprise
- Besoins potentiels et points de douleur
- Cycle de décision et budget potentiel
- Personnes clés dans le processus de décision
- Projets en cours ou futurs
- Technologies utilisées
- Investissements récents
- Opportunités de business immédiates

Concentre-toi sur les entreprises ayant :
- Un réel potentiel de conversion
- Des besoins identifiables
- Une capacité financière adéquate
- Un processus de décision clair

Vérifie particulièrement :
- La validité des coordonnées
- La pertinence des contacts
- L'historique récent de l'entreprise
- Les signaux d'intention d'achat

Réponds UNIQUEMENT avec un objet JSON valide contenant les informations de l'entreprise avec exactement ces champs (ne pas inclure de balises \`\`\`json ou \`\`\`) :
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