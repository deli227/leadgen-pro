import { Lead } from './types.ts';

export function buildPrompt(lead: Lead): string {
  return `
Analyse détaillée pour l'entreprise ${lead.company}

Veuillez fournir une analyse complète et structurée couvrant les aspects suivants :

1. Analyse de l'entreprise
- Score de qualification (sur 10)
- Position sur le marché
- Taille de l'entreprise
- Stade de développement
- Potentiel de croissance
- Justification détaillée

2. Analyse technologique
- Stack technologique utilisé
- Maturité digitale
- Présence en ligne
- Performance du site web
- Sécurité et conformité

3. Analyse marketing
- Stratégie de contenu
- Présence sur les réseaux sociaux
- Score SEO
- Stratégie de marque
- Positionnement marketing

4. Analyse financière
- Chiffre d'affaires estimé
- Potentiel d'investissement
- Capacité de financement
- Santé financière

5. Analyse concurrentielle
- Position sur le marché
- Avantages compétitifs
- Menaces potentielles
- Opportunités de développement

6. Recommandations
- Stratégie d'approche
- Points d'entrée
- Arguments de vente
- Timing optimal
- Ressources nécessaires
- Solutions d'amélioration :
  * Solutions techniques
  * Solutions marketing
  * Solutions business

7. Plan d'action
- Étapes à suivre
- Timeline
- KPIs à surveiller
- Points de vigilance

Format de réponse attendu : JSON structuré avec toutes les sections mentionnées ci-dessus.
`;
}