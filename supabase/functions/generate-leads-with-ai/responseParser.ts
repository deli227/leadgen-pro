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