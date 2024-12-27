import { Filters } from './types.ts';

export function buildPrompt(filters: Filters): string {
  const leadCount = Math.min(Math.max(filters.leadCount, 1), 50);
  let prompt = `Tu es un expert en génération de leads B2B. Tu dois UNIQUEMENT renvoyer un tableau JSON valide avec des noms de propriétés et des valeurs entre guillemets doubles, sans AUCUN texte avant ni après. Format exact attendu:

[
  {
    "company": "Nom de l'entreprise",
    "email": "email@example.com",
    "phone": "+33123456789",
    "website": "https://example.com",
    "address": "Adresse complète",
    "industry": "${filters.industry}",
    "score": 8,
    "socialMedia": {
      "linkedin": "https://linkedin.com/company/example",
      "twitter": "https://twitter.com/example",
      "facebook": "https://facebook.com/example",
      "instagram": "https://instagram.com/example"
    }
  }
]`;

  prompt += `\n\nGénère ${leadCount} leads d'entreprises`;
  
  if (filters.search) {
    prompt += ` correspondant à "${filters.search}"`;
  }
  
  if (filters.industry !== 'all') {
    prompt += ` dans le secteur "${filters.industry}"`;
  }
  
  if (filters.country !== 'all') {
    prompt += ` en "${filters.country}"`;
    if (filters.city !== 'all') {
      prompt += `, plus précisément à "${filters.city}"`;
    }
  }

  prompt += `\n\nATTENTION: 
- Renvoie UNIQUEMENT le tableau JSON, sans texte avant ni après
- Utilise TOUJOURS des guillemets doubles pour les noms de propriétés et les valeurs textuelles
- Le score doit être un nombre entre 1 et 10
- Tous les URLs doivent être des URLs valides commençant par "http://" ou "https://"
- Les numéros de téléphone doivent être au format international ("+33...")
- Chaque propriété doit être entourée de guillemets doubles
- Vérifie que le JSON est valide avant de le renvoyer`;

  return prompt;
}