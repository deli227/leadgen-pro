import { Filters } from './types'

export function buildPrompt(filters: Filters): string {
  const leadCount = Math.min(Math.max(filters.leadCount, 1), 50)
  let prompt = `Génère ${leadCount} leads d'entreprises`
  
  if (filters.search) {
    prompt += ` correspondant à "${filters.search}"`
  }
  
  if (filters.industry !== 'all') {
    prompt += ` dans le secteur ${filters.industry}`
  }
  
  if (filters.country !== 'all') {
    prompt += ` en ${filters.country}`
    if (filters.city !== 'all') {
      prompt += `, plus précisément à ${filters.city}`
    }
  }

  prompt += `\n\nRéponds UNIQUEMENT avec un tableau JSON d'objets ayant cette structure exacte, sans texte avant ni après:
  [
    {
      "company": "Nom de l'entreprise",
      "email": "Email de contact",
      "phone": "Téléphone",
      "website": "Site web",
      "address": "Adresse complète",
      "industry": "${filters.industry}",
      "score": "Note sur 10 basée sur la présence en ligne",
      "socialMedia": {
        "linkedin": "URL LinkedIn",
        "twitter": "URL Twitter",
        "facebook": "URL Facebook",
        "instagram": "URL Instagram"
      }
    }
  ]`

  return prompt
}