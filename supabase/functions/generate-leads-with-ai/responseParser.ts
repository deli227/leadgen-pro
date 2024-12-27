import { Lead, GenerateLeadsResponse } from './types.ts';

export function parsePerplexityResponse(content: string): Lead[] {
  console.log('Contenu brut de la réponse:', content);
  
  // Nettoyage et validation du contenu JSON
  let jsonContent = content.trim();
  
  // Essayons d'abord de trouver un tableau JSON valide
  const arrayMatch = jsonContent.match(/\[([\s\S]*)\]/);
  if (arrayMatch) {
    try {
      const leads = JSON.parse(arrayMatch[0]);
      console.log('Leads parsés depuis le tableau:', leads);
      return validateAndFormatLeads(leads);
    } catch (error) {
      console.error('Erreur lors du parsing du tableau:', error);
    }
  }

  // Si ce n'est pas un tableau, essayons de parser l'ensemble du contenu
  try {
    const parsedContent = JSON.parse(jsonContent);
    console.log('Contenu parsé complet:', parsedContent);
    
    // Si c'est un tableau, utilisons-le directement
    if (Array.isArray(parsedContent)) {
      return validateAndFormatLeads(parsedContent);
    }
    
    // Si c'est un objet avec une propriété contenant un tableau
    const possibleArrayProperties = ['leads', 'data', 'results', 'companies'];
    for (const prop of possibleArrayProperties) {
      if (Array.isArray(parsedContent[prop])) {
        return validateAndFormatLeads(parsedContent[prop]);
      }
    }
    
    throw new Error('Aucun tableau de leads trouvé dans la réponse');
  } catch (error) {
    console.error('Erreur lors du parsing JSON:', error);
    console.log('Contenu qui a causé l\'erreur:', jsonContent);
    throw new Error(`Erreur de parsing JSON: ${error.message}`);
  }
}

function validateAndFormatLeads(leads: any[]): Lead[] {
  if (!Array.isArray(leads)) {
    throw new Error('La réponse n\'est pas un tableau');
  }

  return leads.map((lead, index) => {
    if (!lead.company || typeof lead.company !== 'string') {
      console.warn(`Lead ${index} : company manquant ou invalide, utilisation d'une valeur par défaut`);
      lead.company = `Entreprise ${index + 1}`;
    }

    return {
      company: lead.company,
      email: lead.email || '',
      phone: lead.phone || '',
      website: lead.website || '',
      address: lead.address || '',
      industry: lead.industry || '',
      score: typeof lead.score === 'number' ? lead.score : 0,
      socialMedia: {
        linkedin: lead.socialMedia?.linkedin || '',
        twitter: lead.socialMedia?.twitter || '',
        facebook: lead.socialMedia?.facebook || '',
        instagram: lead.socialMedia?.instagram || ''
      }
    };
  });
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