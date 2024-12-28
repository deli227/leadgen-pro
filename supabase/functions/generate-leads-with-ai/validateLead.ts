export interface Lead {
  company: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  industry?: string;
  score?: number;
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

export const validateLead = (lead: any): boolean => {
  console.log('Validation du lead:', lead);

  // Vérification des champs obligatoires
  if (!lead.company || typeof lead.company !== 'string') {
    console.error('Champ company invalide ou manquant');
    return false;
  }

  // Validation du score
  if (lead.score !== undefined) {
    const score = Number(lead.score);
    if (isNaN(score) || score < 0 || score > 10) {
      console.error('Score invalide');
      return false;
    }
  }

  // Normalisation des URLs
  if (lead.website) {
    if (typeof lead.website !== 'string') {
      console.error('Website invalide');
      return false;
    }
    if (!lead.website.startsWith('http')) {
      lead.website = 'https://' + lead.website;
    }
  }

  // Validation des réseaux sociaux
  if (lead.socialMedia) {
    if (typeof lead.socialMedia !== 'object') {
      console.error('Social media invalide');
      return false;
    }

    ['linkedin', 'twitter', 'facebook'].forEach(platform => {
      if (lead.socialMedia[platform] && typeof lead.socialMedia[platform] === 'string') {
        if (!lead.socialMedia[platform].startsWith('http')) {
          lead.socialMedia[platform] = 'https://' + lead.socialMedia[platform];
        }
      }
    });
  }

  console.log('Lead validé avec succès');
  return true;
}