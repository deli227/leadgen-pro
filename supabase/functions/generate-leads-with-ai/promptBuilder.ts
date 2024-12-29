interface Filters {
  leadCount?: number;
  country?: string;
  city?: string;
  industry?: string;
  search?: string;
  companySize?: string;
}

export const buildPrompt = (filters: Filters): string => {
  const leadCount = Math.min(Math.max(filters.leadCount || 10, 1), 50);
  
  let prompt = `Tu es un expert avec plus de 40 ans d'expérience dans la recherche de leads qualifiés et le repérage d'opportunités clients. Tu as une connaissance approfondie des marchés B2B et une expertise pointue dans l'identification des entreprises à fort potentiel.

Utilise ton expertise pour me générer ${leadCount} entreprises`;
  
  if (filters.search) {
    prompt += ` similaires à "${filters.search}"`;
  }
  
  if (filters.country && filters.country !== 'all') {
    prompt += ` en ${filters.country}`;
    if (filters.city && filters.city !== 'all') {
      prompt += ` à ${filters.city}`;
    }
  }
  
  if (filters.industry && filters.industry !== 'all') {
    prompt += ` dans le secteur ${filters.industry}`;
  }

  if (filters.companySize && filters.companySize !== 'all') {
    const sizeMappings = {
      'large': 'grandes entreprises (250+ employés)',
      'medium': 'moyennes entreprises (50-249 employés)',
      'small': 'petites entreprises (10-49 employés)',
      'micro': 'micro-entreprises (1-9 employés)'
    };
    prompt += ` de type ${sizeMappings[filters.companySize as keyof typeof sizeMappings] || filters.companySize}`;
  }

  prompt += `\n\nRéponds UNIQUEMENT avec un tableau JSON valide contenant les entreprises. Chaque entreprise doit avoir exactement ces champs :
  [
    {
      "company": "Nom de l'entreprise",
      "email": "email@professionnel.com",
      "phone": "+33123456789",
      "website": "site-web.com",
      "address": "Adresse complète",
      "industry": "${filters.industry || 'Secteur d\'activité'}",
      "score": 8,
      "socialMedia": {
        "linkedin": "linkedin.com/company/...",
        "twitter": "twitter.com/...",
        "facebook": "facebook.com/...",
        "instagram": "instagram.com/..."
      }
    }
  ]`;

  return prompt;
}