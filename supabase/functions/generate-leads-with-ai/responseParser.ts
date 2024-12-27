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
      if (!currentLead.social_media) {
        currentLead.social_media = { linkedin: '', twitter: '' };
      }
      const linkedinUrl = formatSocialUrl(extractValue(trimmedLine), 'linkedin');
      if (linkedinUrl) {
        currentLead.social_media.linkedin = linkedinUrl;
      }
    }
    else if (trimmedLine.includes('twitter')) {
      if (!currentLead.social_media) {
        currentLead.social_media = { linkedin: '', twitter: '' };
      }
      const twitterUrl = formatSocialUrl(extractValue(trimmedLine), 'twitter');
      if (twitterUrl) {
        currentLead.social_media.twitter = twitterUrl;
      }
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
  
  // Nettoyer l'URL
  url = url.trim().toLowerCase();
  
  // Si l'URL est déjà complète, la retourner
  if (url.startsWith('http')) {
    return url;
  }
  
  // Enlever @ ou / au début si présent
  url = url.replace(/^[@/\\]+/, '');
  
  // Construire l'URL complète selon la plateforme
  switch (platform) {
    case 'linkedin':
      return `https://linkedin.com/in/${url}`;
    case 'twitter':
      return `https://twitter.com/${url}`;
    default:
      return `https://${url}`;
  }
}

function formatLead(lead: Partial<Lead>): Lead {
  // S'assurer que social_media existe avec des valeurs par défaut
  const defaultSocialMedia = { linkedin: '', twitter: '' };
  const social_media = lead.social_media || defaultSocialMedia;

  return {
    company: lead.company || '',
    email: lead.email || '',
    phone: lead.phone || '',
    website: lead.website || '',
    address: lead.address || '',
    industry: lead.industry || '',
    score: Math.floor(Math.random() * 10) + 1,
    social_media: {
      linkedin: social_media.linkedin || '',
      twitter: social_media.twitter || ''
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