interface Filters {
  leadCount: number;
  country: string;
  city: string;
  industry: string;
}

export const buildPrompt = (filters: Filters): string => {
  const leadCount = Math.min(Math.max(filters.leadCount, 1), 50);
  
  let prompt = `Génère ${leadCount} entreprises`;
  
  if (filters.country !== 'all') {
    prompt += ` en ${filters.country}`;
    if (filters.city !== 'all') {
      prompt += ` à ${filters.city}`;
    }
  }
  
  if (filters.industry !== 'all') {
    prompt += ` dans le secteur ${filters.industry}`;
  }

  prompt += `\n\nRéponds UNIQUEMENT avec un tableau JSON valide contenant les entreprises. Chaque entreprise doit avoir exactement ces champs, pas plus pas moins :
  [
    {
      "company": "Nom de l'entreprise",
      "email": "email@professionnel.com",
      "phone": "+33123456789",
      "website": "https://site-web.com",
      "address": "Adresse complète",
      "industry": "${filters.industry}",
      "score": 8,
      "socialMedia": {
        "linkedin": "https://linkedin.com/company/...",
        "twitter": "https://twitter.com/...",
        "facebook": "https://facebook.com/..."
      }
    }
  ]`;

  return prompt;
}