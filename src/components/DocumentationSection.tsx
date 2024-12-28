import { Book, Search, BarChart, Download, Settings, Shield, Mail } from "lucide-react";
import { motion } from "framer-motion";

export const DocumentationSection = () => {
  const docs = [
    {
      icon: Search,
      title: "Recherche de leads",
      description: "Apprenez à utiliser notre moteur de recherche IA pour trouver les meilleurs prospects.",
      steps: [
        "Définissez vos critères de recherche (localisation, industrie)",
        "Ajustez le nombre de leads souhaités",
        "Lancez la recherche et attendez les résultats",
        "Consultez la liste des leads générés"
      ]
    },
    {
      icon: BarChart,
      title: "Analyse des leads",
      description: "Découvrez comment analyser et qualifier vos leads efficacement.",
      steps: [
        "Consultez le score de qualification",
        "Examinez l'analyse détaillée",
        "Identifiez les points forts et faibles",
        "Utilisez les recommandations personnalisées"
      ]
    },
    {
      icon: Download,
      title: "Export et gestion",
      description: "Gérez vos leads et exportez-les dans différents formats.",
      steps: [
        "Sélectionnez les leads à exporter",
        "Choisissez le format d'export (PDF, CSV)",
        "Téléchargez vos données",
        "Importez dans votre CRM"
      ]
    },
    {
      icon: Mail,
      title: "Automatisation emails",
      description: "Configurez des séquences d'emails automatisées.",
      steps: [
        "Créez un nouveau modèle d'email",
        "Définissez les critères de déclenchement",
        "Personnalisez le contenu",
        "Activez l'automatisation"
      ]
    },
    {
      icon: Settings,
      title: "Configuration du compte",
      description: "Personnalisez votre compte et vos préférences.",
      steps: [
        "Mettez à jour votre profil",
        "Gérez votre abonnement",
        "Configurez les notifications",
        "Personnalisez l'interface"
      ]
    },
    {
      icon: Shield,
      title: "Sécurité et confidentialité",
      description: "Protégez vos données et gérez vos paramètres de confidentialité.",
      steps: [
        "Activez l'authentification à deux facteurs",
        "Gérez les accès",
        "Consultez l'historique de connexion",
        "Configurez la sauvegarde des données"
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
            Documentation Utilisateur
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Tout ce dont vous avez besoin pour maîtriser LeadGen Pro et optimiser votre prospection commerciale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {docs.map((doc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-secondary-dark/50 rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <doc.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white">{doc.title}</h3>
              </div>
              
              <p className="text-gray-300 mb-6">{doc.description}</p>
              
              <div className="space-y-3">
                {doc.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm">{stepIndex + 1}</span>
                    </div>
                    <p className="text-sm text-gray-300">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors cursor-pointer group">
            <Book className="w-5 h-5" />
            <span>Accéder à la documentation complète</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};