import { faker } from '@faker-js/faker/locale/fr';

const industries = [
  "Technologies", "E-commerce", "Finance", "Santé", "Éducation",
  "Immobilier", "Services aux entreprises", "Marketing", "Logistique",
  "Énergie", "Tourisme", "Alimentation"
];

const generateRandomStrengths = () => {
  const allStrengths = [
    "Innovation continue", "Équipe expérimentée", "Position de leader",
    "Forte croissance", "Présence internationale", "Excellence opérationnelle",
    "R&D avancée", "Service client premium", "Marque reconnue"
  ];
  
  return faker.helpers.arrayElements(allStrengths, { min: 2, max: 4 });
};

const generateRandomWeaknesses = () => {
  const allWeaknesses = [
    "Concurrence forte", "Coûts élevés", "Dépendance fournisseurs",
    "Marché saturé", "Rotation du personnel", "Dette technique",
    "Processus complexes", "Marketing limité"
  ];
  
  return faker.helpers.arrayElements(allWeaknesses, { min: 1, max: 3 });
};

const generateSocialMediaLinks = (companyName: string) => {
  const sanitizedName = companyName.toLowerCase().replace(/[^a-z0-9]/g, '');
  return {
    linkedin: `https://linkedin.com/company/${sanitizedName}`,
    twitter: `https://twitter.com/${sanitizedName}`,
    facebook: Math.random() > 0.3 ? `https://facebook.com/${sanitizedName}` : undefined,
    instagram: Math.random() > 0.5 ? `https://instagram.com/${sanitizedName}` : undefined
  };
};

export const generateMockLead = () => {
  const company = faker.company.name();
  const domain = faker.internet.domainName();
  
  return {
    id: faker.string.uuid(),
    company,
    email: `contact@${domain}`,
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    qualification: faker.number.int({ min: 3, max: 10 }),
    socialMedia: generateSocialMediaLinks(company),
    score: faker.number.int({ min: 5, max: 10 }),
    industry: faker.helpers.arrayElement(industries),
    strengths: generateRandomStrengths(),
    weaknesses: generateRandomWeaknesses(),
    website: `https://www.${domain}`
  };
};

export const generateMockLeads = (count: number) => {
  return Array.from({ length: count }, () => generateMockLead());
};