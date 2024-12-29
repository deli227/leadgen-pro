import { Lead } from './types.ts';

export function buildAnalysisPrompt(lead: Lead): string {
  return `
Analyse détaillée pour l'entreprise ${lead.company}

Objectif : Fournir une analyse approfondie et des recommandations stratégiques détaillées.

Contexte :
- Entreprise : ${lead.company}
- Industrie : ${lead.industry || 'Non spécifiée'}
- Site web : ${lead.website || 'Non spécifié'}
- Coordonnées : ${lead.email || 'Non spécifié'} / ${lead.phone || 'Non spécifié'}
- Adresse : ${lead.address || 'Non spécifiée'}

Instructions pour l'analyse :

1. Analyse de l'entreprise
- Évaluer la position actuelle sur le marché
- Analyser la taille et la structure de l'entreprise
- Identifier le stade de développement
- Évaluer le potentiel de croissance
- Fournir une justification détaillée du score de qualification

2. Analyse technologique
- Examiner la stack technologique actuelle
- Évaluer la maturité digitale
- Analyser la présence en ligne
- Mesurer la performance du site web
- Vérifier la sécurité et la conformité

3. Analyse marketing
- Évaluer la stratégie de contenu
- Analyser la présence sur les réseaux sociaux
- Examiner la stratégie de marque
- Évaluer le positionnement marketing
- Score SEO et recommandations

4. Analyse financière
- Estimer le chiffre d'affaires
- Évaluer le potentiel d'investissement
- Analyser la capacité de financement
- Examiner la santé financière globale

5. Analyse concurrentielle
- Identifier la position sur le marché
- Lister les avantages compétitifs
- Analyser les menaces potentielles
- Identifier les opportunités de développement

6. Solutions d'amélioration recommandées
Pour chaque solution (technique, marketing, business), fournir :
- Une description détaillée du problème identifié
- Une solution concrète et approfondie
- Des étapes d'implémentation précises
- Une analyse détaillée des bénéfices attendus
- Une estimation réaliste des coûts
- Un calendrier d'implémentation détaillé
- Des indicateurs de performance à suivre
- Des risques potentiels et mesures d'atténuation
- Des alternatives possibles
- Des exemples de succès similaires
- Des ressources nécessaires
- Des prérequis techniques ou organisationnels
- Des impacts sur les processus existants
- Des recommandations pour la formation des équipes

7. Stratégie d'approche globale
- Définir une stratégie d'approche personnalisée
- Identifier les points d'entrée prioritaires
- Développer des arguments de vente spécifiques
- Proposer un timing optimal d'approche
- Lister les ressources nécessaires
- Anticiper les objections possibles
- Suggérer des approches alternatives
- Définir des étapes de suivi

8. Plan d'action
- Détailler les étapes à suivre
- Établir une timeline réaliste
- Définir des KPIs précis
- Identifier les points de vigilance
- Proposer des jalons de contrôle
- Prévoir des actions correctives

Format de réponse attendu : Fournir une analyse structurée et détaillée en JSON suivant le schéma défini.`;
}