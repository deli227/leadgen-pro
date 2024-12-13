import { CheckCircle, Users, LineChart, FileText, Zap, Shield, Globe, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const FeaturesSection = () => {
  const features = [
    {
      name: "Scoring intelligent des leads",
      description: "Notre IA analyse et attribue un score de 1 à 10 à chaque lead en fonction de sa pertinence pour votre activité.",
      icon: Sparkles,
    },
    {
      name: "Analyse approfondie",
      description: "Obtenez une vue détaillée des forces et faiblesses de chaque entreprise prospect.",
      icon: LineChart,
    },
    {
      name: "Base de données centralisée",
      description: "Toutes vos données sont centralisées et facilement accessibles dans un tableau de bord intuitif.",
      icon: Globe,
    },
    {
      name: "Gestion collaborative",
      description: "Partagez et collaborez efficacement avec votre équipe commerciale.",
      icon: Users,
    },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Fonctionnalités principales
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Des outils puissants pour optimiser votre prospection commerciale
          </p>
        </motion.div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group flex flex-col bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                  <div className="rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};