import { Lead, GenerateLeadsResponse } from './types.ts';

export function parsePerplexityResponse(content: string): Lead[] {
  console.log('Contenu brut de la réponse:', content);
  
  // Nettoyage et validation du contenu JSON
  let jsonContent = content.trim();
  
  // Recherche d'un tableau JSON valide
  const arrayMatch = jsonContent.match(/\[([\s\S]*)\]/);
  if (!arrayMatch) {
    console.error('Aucun tableau JSON trouvé dans:', jsonContent);
    throw new Error('Aucun tableau JSON valide trouvé dans la réponse');
  }

  jsonContent = arrayMatch[0];
  console.log('Tableau JSON extrait:', jsonContent);

  try {
    const leads = JSON.parse(jsonContent);
    console.log('Leads parsés avec succès:', leads);
    
    // Validation du format des leads
    if (!Array.isArray(leads)) {
      throw new Error('La réponse n\'est pas un tableau');
    }

    // Validation de chaque lead
    leads.forEach((lead, index) => {
      if (!lead.company || typeof lead.company !== 'string') {
        throw new Error(`Lead ${index} : company manquant ou invalide`);
      }
      // Ajout de valeurs par défaut si nécessaire
      lead.email = lead.email || '';
      lead.phone = lead.phone || '';
      lead.website = lead.website || '';
      lead.address = lead.address || '';
      lead.industry = lead.industry || '';
      lead.socialMedia = lead.socialMedia || {
        linkedin: '',
        twitter: '',
        facebook: '',
        instagram: ''
      };
    });

    return leads;
  } catch (error) {
    console.error('Erreur lors du parsing JSON:', error);
    console.log('Contenu qui a causé l\'erreur:', jsonContent);
    throw new Error(`Erreur de parsing JSON: ${error.message}`);
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