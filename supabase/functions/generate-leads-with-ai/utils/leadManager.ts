import { Lead } from '../types/lead';
import { formatWebsite } from './formatters';

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
    },
    score: 0,
    qualification: 0,
    strengths: [],
    weaknesses: []
  };
}

export function formatLead(lead: Partial<Lead>): Lead {
  try {
    console.log('Formatting lead:', lead);
    
    // Ensure social_media object exists with all required properties
    const social_media = {
      linkedin: lead.social_media?.linkedin || '',
      twitter: lead.social_media?.twitter || '',
      facebook: lead.social_media?.facebook || '',
      instagram: lead.social_media?.instagram || ''
    };

    return {
      company: lead.company || '',
      email: lead.email || '',
      phone: lead.phone || '',
      website: formatWebsite(lead.website || ''),
      address: lead.address || '',
      industry: lead.industry || '',
      score: Math.floor(Math.random() * 10) + 1,
      qualification: Math.floor(Math.random() * 10) + 1,
      social_media,
      strengths: lead.strengths || [],
      weaknesses: lead.weaknesses || []
    };
  } catch (error) {
    console.error('Error formatting lead:', error);
    throw error;
  }
}