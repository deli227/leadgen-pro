import { CountryParams } from './types';

export const getCountryName = (countryCode: string): string => {
  const countryMap: { [key: string]: string } = {
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
  return countryMap[countryCode] || countryCode;
};

export const getCountrySearchParams = (countryCode: string): CountryParams => {
  const params: { [key: string]: CountryParams } = {
    'FR': {
      lang: 'fr',
      gl: 'FR',
      businessTerm: 'entreprise'
    },
    'BE': {
      lang: 'fr',
      gl: 'BE',
      businessTerm: 'entreprise'
    },
    'CH': {
      lang: 'fr',
      gl: 'CH',
      businessTerm: 'entreprise'
    },
    'CA': {
      lang: 'fr',
      gl: 'CA',
      businessTerm: 'entreprise'
    },
    'LU': {
      lang: 'fr',
      gl: 'LU',
      businessTerm: 'entreprise'
    },
    'MC': {
      lang: 'fr',
      gl: 'MC',
      businessTerm: 'entreprise'
    },
    'MA': {
      lang: 'fr',
      gl: 'MA',
      businessTerm: 'société'
    },
    'TN': {
      lang: 'fr',
      gl: 'TN',
      businessTerm: 'société'
    },
    'SN': {
      lang: 'fr',
      gl: 'SN',
      businessTerm: 'entreprise'
    },
    'CI': {
      lang: 'fr',
      gl: 'CI',
      businessTerm: 'entreprise'
    }
  };

  return params[countryCode] || params['FR'];
};