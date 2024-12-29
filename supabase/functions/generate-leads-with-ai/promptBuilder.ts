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
  
  const sizeMappings = {
    'large': 'grandes entreprises avec plus de 250 employés (vérifie le nombre exact d\'employés sur LinkedIn ou les registres officiels)',
    'medium': 'moyennes entreprises ayant entre 50 et 249 employés (vérifie le nombre exact d\'employés sur LinkedIn ou les registres officiels)',
    'small': 'petites entreprises ayant entre 10 et 49 employés (vérifie le nombre exact d\'employés sur LinkedIn ou les registres officiels)',
    'micro': 'micro-entreprises ayant entre 1 et 9 employés (vérifie le nombre exact d\'employés sur LinkedIn ou les registres officiels)'
  };
  
  let prompt = `Tu es un expert avec plus de 40 ans d'expérience dans la recherche de leads qualifiés et le repérage d'opportunités clients. Tu as une connaissance approfondie des marchés B2B et une expertise pointue dans l'identification des entreprises à fort potentiel.

Pour chaque entreprise que tu vas me proposer, tu dois OBLIGATOIREMENT :
1. Vérifier que le site web existe et est actif avant de l'inclure
2. Fournir au minimum le profil LinkedIn de l'entreprise après avoir vérifié son existence
3. Vérifier le nombre exact d'employés sur LinkedIn ou les registres officiels
4. Ne proposer que des entreprises qui correspondent EXACTEMENT aux critères de taille demandés
5. Vérifier l'existence des autres réseaux sociaux si tu les fournis
6. Vérifier que l'email et le téléphone sont valides et actifs

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
    prompt += ` de type ${sizeMappings[filters.companySize as keyof typeof sizeMappings] || filters.companySize}`;
  }

  prompt += `\n\nRéponds UNIQUEMENT avec un tableau JSON valide contenant les entreprises. Chaque entreprise doit avoir OBLIGATOIREMENT ces champs avec des données vérifiées et valides :
  [
    {
      "company": "Nom de l'entreprise",
      "email": "email@professionnel.com (vérifié et actif)",
      "phone": "+33123456789 (vérifié et actif)",
      "website": "site-web.com (vérifié et actif)",
      "address": "Adresse complète et vérifiée",
      "industry": "${filters.industry || 'Secteur d\'activité'}",
      "score": 8,
      "employeeCount": "Nombre exact d'employés vérifié",
      "socialMedia": {
        "linkedin": "linkedin.com/company/... (obligatoire et vérifié)",
        "twitter": "twitter.com/... (optionnel mais vérifié si fourni)",
        "facebook": "facebook.com/... (optionnel mais vérifié si fourni)",
        "instagram": "instagram.com/... (optionnel mais vérifié si fourni)"
      }
    }
  ]`;

  return prompt;
}