import { motion } from "framer-motion";
import { Rocket, Star, ThumbsUp } from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: Rocket,
      title: "Démarrage rapide",
      description: "Connectez-vous et importez vos premières données en quelques clics"
    },
    {
      icon: Star,
      title: "Analyse automatique",
      description: "Notre IA analyse vos prospects et génère des insights pertinents"
    },
    {
      icon: ThumbsUp,
      title: "Résultats concrets",
      description: "Obtenez des recommandations actionnables pour optimiser votre prospection"
    }
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
            Comment ça marche ?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Découvrez comment LeadGen Pro peut transformer votre approche de la prospection
          </p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="mb-6 rounded-full bg-primary/10 p-4 ring-2 ring-primary/20">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};