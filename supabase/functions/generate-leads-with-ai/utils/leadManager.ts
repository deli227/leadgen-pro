import { Lead, SocialMedia } from '../types/lead';
import { formatWebsite, formatSocialUrl } from './formatters';

export function initializeEmptyLead(): Partial<Lead> {
  return {
    company: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    industry: '',
    social_media: {
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: ''
    }
  };
}

export function formatLead(lead: Partial<Lead>): Lead {
  try {
    console.log('Formatting lead:', lead);
    
    // Ensure social_media object exists with all required properties
    const social_media: SocialMedia = {
      linkedin: lead.social_media?.linkedin || '',
      twitter: lead.social_media?.twitter || '',
      facebook: lead.social_media?.facebook || '',
      instagram: lead.social_media?.instagram || ''
    };

    const formattedLead: Lead = {
      company: lead.company || '',
      email: lead.email || '',
      phone: lead.phone || '',
      website: formatWebsite(lead.website || ''),
      address: lead.address || '',
      industry: lead.industry || '',
      score: Math.floor(Math.random() * 10) + 1,
      social_media
    };

    console.log('Formatted lead:', formattedLead);
    return formattedLead;
  } catch (error) {
    console.error('Erreur lors du formatage du lead:', error);
    // Return a valid lead object with empty values in case of error
    return {
      company: lead.company || 'Unknown Company',
      email: '',
      phone: '',
      website: '',
      address: '',
      industry: '',
      score: 1,
      social_media: {
        linkedin: '',
        twitter: '',
        facebook: '',
        instagram: ''
      }
    };
  }
}