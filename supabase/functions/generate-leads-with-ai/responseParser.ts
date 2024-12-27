import { Lead, GenerateLeadsResponse } from './types';
import { extractValue } from './utils/formatters';
import { initializeEmptyLead, formatLead } from './utils/leadManager';

export function parsePerplexityResponse(content: string): Lead[] {
  console.log('Parsing response content:', content);
  
  const lines = content.split('\n');
  const leads: Lead[] = [];
  let currentLead = initializeEmptyLead();
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (!trimmedLine || trimmedLine.match(/^[.,\-\[\]{}()]*$/)) continue;
    
    try {
      if (trimmedLine.toLowerCase().includes('company') || trimmedLine.toLowerCase().includes('entreprise')) {
        if (currentLead.company) {
          leads.push(formatLead(currentLead));
          currentLead = initializeEmptyLead();
        }
        currentLead.company = extractValue(trimmedLine);
      }
      else if (trimmedLine.toLowerCase().includes('linkedin')) {
        const linkedinUrl = extractValue(trimmedLine);
        if (linkedinUrl && linkedinUrl !== 'undefined' && linkedinUrl.length > 0) {
          currentLead.social_media = {
            ...currentLead.social_media || {},
            linkedin: linkedinUrl
          };
        }
      }
      else if (trimmedLine.toLowerCase().includes('twitter')) {
        const twitterUrl = extractValue(trimmedLine);
        if (twitterUrl && twitterUrl !== 'undefined' && twitterUrl.length > 0) {
          currentLead.social_media = {
            ...currentLead.social_media || {},
            twitter: twitterUrl
          };
        }
      }
      else if (trimmedLine.toLowerCase().includes('facebook')) {
        const facebookUrl = extractValue(trimmedLine);
        if (facebookUrl && facebookUrl !== 'undefined' && facebookUrl.length > 0) {
          currentLead.social_media = {
            ...currentLead.social_media || {},
            facebook: facebookUrl
          };
        }
      }
      else if (trimmedLine.toLowerCase().includes('instagram')) {
        const instagramUrl = extractValue(trimmedLine);
        if (instagramUrl && instagramUrl !== 'undefined' && instagramUrl.length > 0) {
          currentLead.social_media = {
            ...currentLead.social_media || {},
            instagram: instagramUrl
          };
        }
      }
      else if (trimmedLine.toLowerCase().includes('email')) {
        currentLead.email = extractValue(trimmedLine);
      }
      else if (trimmedLine.toLowerCase().includes('phone')) {
        currentLead.phone = extractValue(trimmedLine);
      }
      else if (trimmedLine.toLowerCase().includes('website')) {
        currentLead.website = extractValue(trimmedLine);
      }
      else if (trimmedLine.toLowerCase().includes('industry')) {
        currentLead.industry = extractValue(trimmedLine);
      }
    } catch (error) {
      console.error('Erreur lors du parsing de la ligne:', trimmedLine, error);
      continue;
    }
  }

  if (currentLead.company) {
    leads.push(formatLead(currentLead));
  }

  console.log('Leads extraits:', leads);
  return leads;
}

export function formatResponse(leads: Lead[], filters: any): GenerateLeadsResponse {
  return {
    success: true,
    data: {
      leads,
      metadata: {
        totalLeads: leads.length,
        generatedAt: new Date().toISOString(),
        searchCriteria: {
          industry: filters.industry,
          country: filters.country,
          leadCount: filters.leadCount
        }
      }
    }
  };
}