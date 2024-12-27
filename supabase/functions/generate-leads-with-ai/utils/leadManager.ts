import { Lead } from '../types';

export function initializeEmptyLead(): Partial<Lead> {
  return {
    company: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    social_media: {
      linkedin: '',
      twitter: ''
    }
  };
}

export function formatLead(lead: Partial<Lead>): Lead {
  try {
    console.log('Formatting lead:', lead);
    
    // S'assurer que social_media existe avec les propriétés requises
    const social_media = {
      linkedin: lead.social_media?.linkedin || '',
      twitter: lead.social_media?.twitter || ''
    };

    // Ne garder que les réseaux sociaux non vides
    const filteredSocialMedia = Object.fromEntries(
      Object.entries(social_media).filter(([_, value]) => value !== '')
    );

    return {
      company: lead.company || '',
      email: lead.email || '',
      phone: lead.phone || '',
      website: lead.website || '',
      industry: lead.industry || '',
      social_media: Object.keys(filteredSocialMedia).length > 0 ? filteredSocialMedia : undefined
    };
  } catch (error) {
    console.error('Error formatting lead:', error);
    throw error;
  }
}