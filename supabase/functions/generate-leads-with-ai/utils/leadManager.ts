import { Lead } from '../types';

export function initializeEmptyLead(): Partial<Lead> {
  return {
    company: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    social_media: {}
  };
}

export function formatLead(lead: Partial<Lead>): Lead {
  try {
    console.log('Formatting lead:', lead);
    
    // Ne garder que les réseaux sociaux non vides
    const social_media = lead.social_media || {};
    const filteredSocialMedia = Object.fromEntries(
      Object.entries(social_media).filter(([_, value]) => 
        value && value !== 'undefined' && value.length > 0
      )
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