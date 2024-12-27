import { Lead, GenerateLeadsResponse } from './types.ts';

export function parsePerplexityResponse(content: string): Lead[] {
  console.log('Contenu brut de la réponse:', content);
  
  const lines = content.split('\n');
  const leads: Lead[] = [];
  let currentLead: Partial<Lead> = {};
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (!trimmedLine || trimmedLine.match(/^[.,\-\[\]{}()]*$/)) continue;
    
    if (trimmedLine.includes('company') || trimmedLine.includes('entreprise') || trimmedLine.includes('société')) {
      if (currentLead.company) {
        leads.push(formatLead(currentLead));
        currentLead = {};
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
      if (!currentLead.social_media) currentLead.social_media = { linkedin: '', twitter: '' };
      currentLead.social_media.linkedin = formatSocialUrl(extractValue(trimmedLine), 'linkedin');
    }
    else if (trimmedLine.includes('twitter')) {
      if (!currentLead.social_media) currentLead.social_media = { linkedin: '', twitter: '' };
      currentLead.social_media.twitter = formatSocialUrl(extractValue(trimmedLine), 'twitter');
    }
  }

  if (currentLead.company) {
    leads.push(formatLead(currentLead));
  }

  console.log('Leads extraits:', leads);
  return leads;
}

function extractValue(line: string): string {
  const matches = line.match(/(?::|=|-)\s*([^,}\]]+)/);
  if (matches && matches[1]) {
    return matches[1].trim().replace(/['"]/g, '');
  }
  const words = line.split(/\s+/);
  return words.slice(1).join(' ').replace(/['"]/g, '');
}

function formatWebsite(url: string): string {
  if (!url) return '';
  if (!url.startsWith('http')) {
    return `https://${url.replace(/^[/\\]+/, '')}`;
  }
  return url;
}

function formatSocialUrl(url: string, platform: string): string {
  if (!url) return '';
  if (!url.startsWith('http')) {
    switch (platform) {
      case 'linkedin':
        return `https://linkedin.com/${url.replace(/^[/\\]+/, '')}`;
      case 'twitter':
        return `https://twitter.com/${url.replace(/^[/\\]+/, '')}`;
      default:
        return `https://${url}`;
    }
  }
  return url;
}

function formatLead(lead: Partial<Lead>): Lead {
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