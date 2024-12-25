import { CountryParams } from './types.ts';

export function getCountryName(countryCode: string): string {
  const countryNames: { [key: string]: string } = {
    'FR': 'France',
    'BE': 'Belgique',
    'CH': 'Suisse',
    'CA': 'Canada',
    'US': 'États-Unis',
    'GB': 'Royaume-Uni',
    'DE': 'Allemagne',
    'ES': 'Espagne',
    'IT': 'Italie',
    'PT': 'Portugal',
    'NL': 'Pays-Bas',
    'LU': 'Luxembourg'
  };
  
  return countryNames[countryCode] || countryCode;
}

export function getCountrySearchParams(countryCode: string): CountryParams {
  const params: { [key: string]: CountryParams } = {
    'FR': { lang: 'fr', gl: 'fr', businessTerm: 'entreprise' },
    'BE': { lang: 'fr', gl: 'be', businessTerm: 'entreprise' },
    'CH': { lang: 'fr', gl: 'ch', businessTerm: 'entreprise' },
    'CA': { lang: 'fr', gl: 'ca', businessTerm: 'entreprise' },
    'US': { lang: 'en', gl: 'us', businessTerm: 'company' },
    'GB': { lang: 'en', gl: 'uk', businessTerm: 'company' },
    'DE': { lang: 'de', gl: 'de', businessTerm: 'Unternehmen' },
    'ES': { lang: 'es', gl: 'es', businessTerm: 'empresa' },
    'IT': { lang: 'it', gl: 'it', businessTerm: 'azienda' },
    'PT': { lang: 'pt', gl: 'pt', businessTerm: 'empresa' },
    'NL': { lang: 'nl', gl: 'nl', businessTerm: 'bedrijf' },
    'LU': { lang: 'fr', gl: 'lu', businessTerm: 'entreprise' }
  };

  return params[countryCode] || params['FR'];
}