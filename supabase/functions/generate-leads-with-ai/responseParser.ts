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
        const url = extractValue(trimmedLine);
        if (url && url.length > 0 && url !== 'undefined') {
          currentLead.social_media = currentLead.social_media || {};
          currentLead.social_media.linkedin = url;
        }
      }
      else if (trimmedLine.toLowerCase().includes('twitter')) {
        const url = extractValue(trimmedLine);
        if (url && url.length > 0 && url !== 'undefined') {
          currentLead.social_media = currentLead.social_media || {};
          currentLead.social_media.twitter = url;
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