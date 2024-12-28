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

  if (!lead.company || typeof lead.company !== 'string') {
    console.error('Champ company invalide');
    return false;
  }

  if (lead.score !== undefined) {
    const score = Number(lead.score);
    if (isNaN(score) || score < 0 || score > 10) {
      console.error('Score invalide');
      return false;
    }
  }

  // Normalisation des URLs
  if (lead.website && !lead.website.startsWith('http')) {
    lead.website = 'https://' + lead.website;
  }

  if (lead.socialMedia) {
    ['linkedin', 'twitter', 'facebook'].forEach(platform => {
      if (lead.socialMedia[platform] && !lead.socialMedia[platform].startsWith('http')) {
        lead.socialMedia[platform] = 'https://' + lead.socialMedia[platform];
      }
    });
  }

  return true;
}