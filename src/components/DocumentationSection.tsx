import { Search, Brain, FileDown, Target, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { DocumentationHeader } from "./documentation/DocumentationHeader";
import { SectionAccordion } from "./documentation/SectionAccordion";

export const DocumentationSection = () => {
  const sections = [
    {
      icon: Filter,
      title: "Filtrage et Génération de Leads",
      description: "Découvrez comment générer et filtrer vos leads efficacement",
      steps: [
        {
          title: "Accéder aux filtres",
          content: [
            "Rendez-vous dans l'onglet 'Filtres' du tableau de bord",
            "Définissez vos critères : pays, ville, secteur d'activité",
            "Ajustez le nombre de leads souhaités avec le curseur",
          ]
        },
        {
          title: "Générer des leads",
          content: [
            "Cliquez sur 'Générer des leads' pour lancer la recherche",
            "Notre IA analyse et qualifie automatiquement chaque lead",
            "Les leads générés apparaissent dans votre tableau de bord",
          ]
        },
        {
          title: "Filtrer les résultats",
          content: [
            "Utilisez la barre de recherche pour filtrer par nom d'entreprise",
            "Filtrez par score de qualification (1-10)",
          ]
        }
      ]
    },
    {
      icon: Brain,
      title: "Analyse Approfondie des Leads",
      description: "Analysez en détail chaque lead avec notre IA",
      steps: [
        {
          title: "Lancer une analyse",
          content: [
            "Sélectionnez un lead dans votre liste",
            "Cliquez sur le bouton 'Analyser' avec l'icône cerveau",
            "Le lead est ajouté à l'onglet 'Analytique'",
          ]
        },
        {
          title: "Consulter l'analyse",
          content: [
            "Accédez à l'onglet 'Analytique'",
            "Retrouvez une analyse détaillée : forces, faiblesses, opportunités",
            "Visualisez le score de qualification et les recommandations personnalisées",
          ]
        },
        {
          title: "Utiliser les insights",
          content: [
            "Exploitez les recommandations stratégiques",
            "Identifiez les meilleurs angles d'approche",
            "Optimisez votre stratégie commerciale",
          ]
        }
      ]
    },
    {
      icon: Search,
      title: "Recherche d'Entreprise Spécifique",
      description: "Recherchez et analysez une entreprise précise",
      steps: [
        {
          title: "Effectuer une recherche",
          content: [
            "Accédez à l'onglet 'Recherche'",
            "Entrez le nom de l'entreprise recherchée",
            "Précisez la localisation si nécessaire",
          ]
        },
        {
          title: "Analyser les résultats",
          content: [
            "Examinez les informations trouvées",
            "Cliquez sur 'Ajouter aux analyses' pour une étude approfondie",
            "Retrouvez l'entreprise dans l'onglet 'Analytique'",
          ]
        }
      ]
    },
    {
      icon: FileDown,
      title: "Export des Leads",
      description: "Exportez vos leads qualifiés dans différents formats",
      steps: [
        {
          title: "Sélectionner les leads",
          content: [
            "Choisissez les leads à exporter depuis votre tableau de bord",
            "Cliquez sur 'Ajouter à l'export' pour chaque lead",
            "Accédez à l'onglet 'Export'",
          ]
        },
        {
          title: "Choisir le format",
          content: [
            "Sélectionnez le format d'export souhaité (CSV, PDF)",
            "Personnalisez les champs à inclure",
            "Cliquez sur 'Télécharger' pour obtenir votre fichier",
          ]
        },
        {
          title: "Intégration CRM",
          content: [
            "Importez facilement les données dans votre CRM",
            "Format compatible avec les principaux CRM du marché",
            "Conservez toutes les informations importantes",
          ]
        }
      ]
    }
  ];

  return (
    <section className="bg-gradient-to-b from-secondary-dark to-black py-24">
      <div className="container mx-auto px-4">
        <DocumentationHeader />

        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-secondary-dark/50 rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <section.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                  <p className="text-gray-400">{section.description}</p>
                </div>
              </div>

              <SectionAccordion steps={section.steps} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Link to="/dashboard">
            <Button
              variant="outline"
              className="bg-primary/10 hover:bg-primary/20 text-primary-light border-primary/30"
            >
              <Target className="w-4 h-4 mr-2" />
              Commencer à générer des leads
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
