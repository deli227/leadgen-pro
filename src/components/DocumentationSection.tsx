import { Search, Brain, FileDown, Target, Filter, Database, ArrowRight, Plus, ChartBar } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
            "Triez par date, pertinence ou score",
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Guide d'Utilisation LeadGen Pro
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Découvrez comment utiliser efficacement LeadGen Pro pour optimiser votre prospection commerciale.
            Suivez ce guide étape par étape pour maîtriser toutes les fonctionnalités.
          </p>
        </motion.div>

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

              <Accordion type="single" collapsible className="w-full">
                {section.steps.map((step, stepIndex) => (
                  <AccordionItem key={stepIndex} value={`step-${stepIndex}`}>
                    <AccordionTrigger className="text-primary-light hover:text-primary">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary text-sm">{stepIndex + 1}</span>
                        </div>
                        {step.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 pl-8">
                        {step.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2 text-gray-300">
                            <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Button
            variant="outline"
            className="bg-primary/10 hover:bg-primary/20 text-primary-light border-primary/30"
          >
            <Target className="w-4 h-4 mr-2" />
            Commencer à générer des leads
          </Button>
        </motion.div>
      </div>
    </section>
  );
};