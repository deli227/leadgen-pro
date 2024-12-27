import { Lead, GenerateLeadsResponse } from './types.ts';

export function parsePerplexityResponse(content: string): Lead[] {
  console.log('Contenu brut de la réponse:', content);
  
  const lines = content.split('\n');
  const leads: Lead[] = [];
  let currentLead: Partial<Lead> = {
    social_media: { linkedin: '', twitter: '' }
  };
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (!trimmedLine || trimmedLine.match(/^[.,\-\[\]{}()]*$/)) continue;
    
    try {
      if (trimmedLine.includes('company') || trimmedLine.includes('entreprise') || trimmedLine.includes('société')) {
        if (currentLead.company) {
          leads.push(formatLead(currentLead));
          currentLead = {
            social_media: { linkedin: '', twitter: '' }
          };
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
        currentLead.social_media = {
          ...currentLead.social_media,
          linkedin: formatSocialUrl(extractValue(trimmedLine), 'linkedin')
        };
      }
      else if (trimmedLine.includes('twitter')) {
        currentLead.social_media = {
          ...currentLead.social_media,
          twitter: formatSocialUrl(extractValue(trimmedLine), 'twitter')
        };
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

function extractValue(line: string): string {
  try {
    const matches = line.match(/(?::|=|-)\s*([^,}\]]+)/);
    if (matches && matches[1]) {
      return matches[1].trim().replace(/['"]/g, '');
    }
    const words = line.split(/\s+/);
    return words.slice(1).join(' ').replace(/['"]/g, '');
  } catch (error) {
    console.error('Erreur lors de l\'extraction de la valeur:', line, error);
    return '';
  }
}

function formatWebsite(url: string): string {
  if (!url) return '';
  try {
    if (!url.startsWith('http')) {
      return `https://${url.replace(/^[/\\]+/, '')}`;
    }
    return url;
  } catch (error) {
    console.error('Erreur lors du formatage du site web:', url, error);
    return '';
  }
}

function formatSocialUrl(url: string, platform: string): string {
  if (!url) return '';
  
  try {
    url = url.trim().toLowerCase();
    url = url.replace(/^[@/\\]+/, '');
    
    if (url.startsWith('http')) {
      return url;
    }
    
    switch (platform) {
      case 'linkedin':
        return `https://linkedin.com/in/${url}`;
      case 'twitter':
        return `https://twitter.com/${url}`;
      default:
        return `https://${url}`;
    }
  } catch (error) {
    console.error('Erreur lors du formatage de l\'URL sociale:', url, platform, error);
    return '';
  }
}

function formatLead(lead: Partial<Lead>): Lead {
  try {
    return {
      company: lead.company || '',
      email: lead.email || '',
      phone: lead.phone || '',
      website: lead.website || '',
      address: lead.address || '',
      industry: lead.industry || '',
      score: Math.floor(Math.random() * 10) + 1,
      social_media: {
        linkedin: lead.social_media?.linkedin || '',
        twitter: lead.social_media?.twitter || ''
      }
    };
  } catch (error) {
    console.error('Erreur lors du formatage du lead:', lead, error);
    return {
      company: lead.company || 'Unknown Company',
      email: '',
      phone: '',
      website: '',
      address: '',
      industry: '',
      score: 1,
      social_media: { linkedin: '', twitter: '' }
    };
  }
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