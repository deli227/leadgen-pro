interface SearchFilters {
  search: string
  country?: string
  city?: string
}

export const buildPrompt = (filters: SearchFilters): string => {
  let prompt = `En tant qu'expert en recherche d'entreprises, effectue une recherche approfondie sur Google pour l'entreprise "${filters.search}"`;
  
  if (filters.country && filters.country !== 'all') {
    prompt += ` en ${filters.country}`;
    if (filters.city && filters.city !== 'all') {
      prompt += ` à ${filters.city}`;
    }
  }

  prompt += `\n\nINSTRUCTIONS DE RECHERCHE DÉTAILLÉES :
1. Rechercher sur Google en priorité :
   - Le site web officiel de l'entreprise
   - Les pages Google My Business / Google Maps
   - Les annuaires professionnels (Pages Jaunes, LinkedIn, etc.)
   - Les réseaux sociaux professionnels

2. INFORMATIONS À EXTRAIRE (si disponibles) :
   - Coordonnées complètes :
     * Numéro de téléphone professionnel vérifié
     * Email professionnel officiel
     * Adresse physique complète et exacte (via Google Maps)
     * Site web officiel (avec vérification du HTTPS)
   
   - Présence en ligne :
     * Profil LinkedIn de l'entreprise
     * Page Facebook professionnelle
     * Compte Twitter officiel
     * Compte Instagram professionnel
   
   - Informations business :
     * Secteur d'activité principal
     * Taille approximative
     * Année de création si disponible

3. CRITÈRES DE QUALITÉ :
   - Vérifier la cohérence des informations sur plusieurs sources
   - Privilégier les sources officielles et récentes
   - S'assurer que les profils sociaux sont actifs et officiels
   - Vérifier que les coordonnées sont professionnelles

Réponds UNIQUEMENT avec un objet JSON valide contenant ces champs :
{
  "company": "Nom officiel de l'entreprise",
  "email": "email@professionnel.com",
  "phone": "+33123456789",
  "website": "https://site-web.com",
  "address": "Adresse complète et vérifiée",
  "industry": "Secteur d'activité principal",
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