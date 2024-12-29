interface SearchFilters {
  search: string
  country?: string
  city?: string
}

export const buildPrompt = (filters: SearchFilters): string => {
  let prompt = `En tant qu'expert en recherche d'entreprises, effectue une recherche sur "${filters.search}"`;
  
  if (filters.country && filters.country !== 'all') {
    prompt += ` en ${filters.country}`;
    if (filters.city && filters.city !== 'all') {
      prompt += ` à ${filters.city}`;
    }
  }

  prompt += `\n\nINSTRUCTIONS DE RECHERCHE :
1. Rechercher sur Google, Bing, Pages Jaunes et annuaires professionnels
2. Trouver IMPÉRATIVEMENT (si disponible) :
   - Un numéro de téléphone valide
   - Le site web officiel
   - Une adresse email professionnelle
   - L'adresse physique complète
3. Localiser tous les réseaux sociaux actifs de l'entreprise

IMPORTANT : Vérifier la validité des informations sur plusieurs sources.

Réponds UNIQUEMENT avec un objet JSON valide contenant ces champs :
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