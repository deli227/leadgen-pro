import { Lead, GenerateLeadsResponse } from './types/lead';
import { extractValue } from './utils/formatters';
import { initializeEmptyLead, formatLead } from './utils/leadManager';
import { formatWebsite, formatSocialUrl } from './utils/formatters';

export function parsePerplexityResponse(content: string): Lead[] {
  console.log('Parsing response content:', content);
  
  const lines = content.split('\n');
  const leads: Lead[] = [];
  let currentLead = initializeEmptyLead();
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (!trimmedLine || trimmedLine.match(/^[.,\-\[\]{}()]*$/)) continue;
    
    try {
      if (trimmedLine.includes('company') || trimmedLine.includes('entreprise') || trimmedLine.includes('société')) {
        if (currentLead.company) {
          leads.push(formatLead(currentLead));
          currentLead = initializeEmptyLead();
        }
        currentLead.company = extractValue(trimmedLine);
      }
      else if (trimmedLine.includes('email')) {
        currentLead.email = extractValue(trimmedLine);
      }
      else if (trimmedLine.includes('phone') || trimmedLine.includes('téléphone')) {
        currentLead.phone = extractValue(trimmedLine);
      }
      else if (trimmedLine.includes('website') || trimmedLine.includes('site')) {
        currentLead.website = formatWebsite(extractValue(trimmedLine));
      }
      else if (trimmedLine.includes('address') || trimmedLine.includes('adresse')) {
        currentLead.address = extractValue(trimmedLine);
      }
      else if (trimmedLine.includes('industry') || trimmedLine.includes('secteur')) {
        currentLead.industry = extractValue(trimmedLine);
      }
      else if (trimmedLine.includes('linkedin')) {
        const linkedinUrl = formatSocialUrl(extractValue(trimmedLine), 'linkedin');
        if (linkedinUrl) {
          if (!currentLead.social_media) {
            currentLead.social_media = { linkedin: '', twitter: '' };
          }
          currentLead.social_media.linkedin = linkedinUrl;
        }
      }
      else if (trimmedLine.includes('twitter')) {
        const twitterUrl = formatSocialUrl(extractValue(trimmedLine), 'twitter');
        if (twitterUrl) {
          if (!currentLead.social_media) {
            currentLead.social_media = { linkedin: '', twitter: '' };
          }
          currentLead.social_media.twitter = twitterUrl;
        }
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
  try {
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
  } catch (error) {
    console.error('Erreur lors du formatage de la réponse:', error);
    return {
      success: false,
      error: 'Erreur lors du formatage de la réponse'
    };
  }
}