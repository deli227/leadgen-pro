import { Lead, GenerateLeadsResponse } from './types.ts';
import JSON5 from 'https://cdn.jsdelivr.net/npm/json5@2.2.3/dist/index.min.mjs';

export function parsePerplexityResponse(content: string): Lead[] {
  console.log('Contenu brut de la réponse avant parsing:', content);
  console.log('Type du contenu:', typeof content);
  console.log('Longueur du contenu:', content.length);
  
  // Nettoyage et validation du contenu JSON
  let cleanedContent = content.trim();
  
  // Recherche du premier [ et du dernier ] pour extraire uniquement le JSON
  const startIndex = cleanedContent.indexOf('[');
  const endIndex = cleanedContent.lastIndexOf(']');
  
  if (startIndex === -1 || endIndex === -1) {
    console.error('Aucun tableau JSON trouvé dans la réponse');
    throw new Error('Format de réponse invalide: aucun tableau JSON trouvé');
  }
  
  // Extraction du JSON uniquement
  cleanedContent = cleanedContent.substring(startIndex, endIndex + 1);
  
  // Nettoyage supplémentaire
  cleanedContent = cleanedContent
    .replace(/'/g, '"') // Remplace les guillemets simples par des doubles
    .replace(/(\w+):/g, '"$1":') // Entoure les clés sans guillemets par des guillemets
    .replace(/\n/g, '') // Supprime les nouvelles lignes
    .replace(/,\s*([\]}])/g, '$1') // Supprime les virgules trailing
    .replace(/\\"/g, '"') // Gère les guillemets échappés
    .replace(/"{2,}/g, '"'); // Remplace les guillemets doubles multiples par un seul

  console.log('Contenu nettoyé avant parsing:', cleanedContent);
  
  try {
    const parsedContent = JSON5.parse(cleanedContent);
    console.log('Contenu parsé:', parsedContent);
    
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
    console.error('Position approximative de l\'erreur:', error.message);
    console.log('Contenu qui a causé l\'erreur:', cleanedContent);
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

    // S'assurer que toutes les propriétés textuelles sont des chaînes
    const textProperties = ['email', 'phone', 'website', 'address', 'industry'];
    textProperties.forEach(prop => {
      if (lead[prop] && typeof lead[prop] !== 'string') {
        lead[prop] = String(lead[prop]);
      }
    });

    // Valider et formater les URLs
    if (lead.website && !lead.website.startsWith('https://')) {
      lead.website = `https://${lead.website.replace(/^https?:\/\//, '')}`;
    }

    // Valider le format des réseaux sociaux
    if (lead.socialMedia) {
      const socialMediaProperties = ['linkedin', 'twitter', 'facebook', 'instagram'];
      socialMediaProperties.forEach(prop => {
        if (lead.socialMedia[prop] && !lead.socialMedia[prop].startsWith('https://')) {
          lead.socialMedia[prop] = `https://${lead.socialMedia[prop].replace(/^https?:\/\//, '')}`;
        }
      });
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