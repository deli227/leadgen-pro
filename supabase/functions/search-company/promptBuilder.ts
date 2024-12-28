interface SearchFilters {
  search: string
  country?: string
  city?: string
}

export const buildPrompt = (filters: SearchFilters): string => {
  let prompt = `En tant qu'expert chevronné en recherche d'entreprises B2B, effectue une recherche exhaustive et approfondie sur toutes les sources disponibles (Google, Bing, LinkedIn, Pages Jaunes, registres du commerce, annuaires professionnels, sites d'entreprises) pour trouver des informations détaillées sur "${filters.search}"`
  
  if (filters.country && filters.country !== 'all') {
    prompt += ` en ${filters.country}`
    if (filters.city && filters.city !== 'all') {
      prompt += ` à ${filters.city}`
    }
  }

  prompt += `\n\nUtilise toutes les sources possibles pour :
- Trouver IMPÉRATIVEMENT un numéro de téléphone valide (vérifier plusieurs sources)
- Identifier le site web officiel de l'entreprise
- Localiser TOUS les réseaux sociaux actifs (LinkedIn, Twitter, Facebook, Instagram)
- Croiser et valider les informations entre différentes sources
- Vérifier la cohérence des coordonnées trouvées
- Explorer les annuaires professionnels spécialisés
- Consulter les registres de commerce et bases légales
- Analyser les mentions dans la presse et médias

Points clés à identifier :
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
    "facebook": "facebook.com/...",
    "instagram": "instagram.com/..."
  }
}`

  return prompt
}