import { CountryParams } from './types.ts';

export function getCountryName(countryCode: string): string {
  const countryNames: { [key: string]: string } = {
    'FR': 'France',
    'BE': 'Belgique',
    'CH': 'Suisse',
    'CA': 'Canada',
    'LU': 'Luxembourg',
    'MC': 'Monaco',
    'MA': 'Maroc',
    'TN': 'Tunisie',
    'SN': 'Sénégal',
    'CI': 'Côte d\'Ivoire'
  };
  
  return countryNames[countryCode] || countryCode;
}

export function getCountrySearchParams(countryCode: string): CountryParams {
  const params: { [key: string]: CountryParams } = {
    'FR': { lang: 'fr', gl: 'fr', businessTerm: 'entreprise' },
    'BE': { lang: 'fr', gl: 'be', businessTerm: 'entreprise' },
    'CH': { lang: 'fr', gl: 'ch', businessTerm: 'entreprise' },
    'CA': { lang: 'fr', gl: 'ca', businessTerm: 'entreprise' },
    'LU': { lang: 'fr', gl: 'lu', businessTerm: 'entreprise' },
    'MC': { lang: 'fr', gl: 'mc', businessTerm: 'entreprise' },
    'MA': { lang: 'fr', gl: 'ma', businessTerm: 'société' },
    'TN': { lang: 'fr', gl: 'tn', businessTerm: 'société' },
    'SN': { lang: 'fr', gl: 'sn', businessTerm: 'entreprise' },
    'CI': { lang: 'fr', gl: 'ci', businessTerm: 'entreprise' }
  };

  return params[countryCode] || params['FR'];
}