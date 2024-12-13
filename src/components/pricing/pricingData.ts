export const plans = [
  {
    name: "Freemium",
    description: "Parfait pour débuter avec LeadGen Pro",
    price: "0€",
    features: [
      "3 leads par jour",
      "90 leads par mois",
      "Analyse IA basique",
      "Export PDF",
      "Support par email",
    ],
    buttonText: "Commencer gratuitement",
    type: "free",
  },
  {
    name: "Pro",
    description: "Pour les professionnels qui veulent plus",
    price: "14,99€",
    features: [
      "8 leads par jour",
      "250 leads par mois",
      "Analyse IA avancée",
      "Export multi-formats",
      "Support prioritaire",
      "API Access",
    ],
    buttonText: "Choisir Pro",
    type: "pro",
    popular: true,
    priceId: "REMPLACEZ_PAR_VOTRE_PRICE_ID_PRO", // Remplacez cette valeur par votre Price ID Pro
  },
  {
    name: "Enterprise",
    description: "Solution complète pour les grandes équipes",
    price: "199€",
    features: [
      "Génération illimitée",
      "Analyse IA personnalisée",
      "Tous les formats d'export",
      "Support dédié 24/7",
      "API illimitée",
      "Intégrations sur mesure",
    ],
    buttonText: "Contacter les ventes",
    type: "enterprise",
    priceId: "REMPLACEZ_PAR_VOTRE_PRICE_ID_ENTERPRISE", // Remplacez cette valeur par votre Price ID Enterprise
  },
];