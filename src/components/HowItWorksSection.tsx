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
    <div className="bg-secondary-dark py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Comment ça marche ?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
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
                className="relative flex flex-col items-center text-center group"
              >
                <div className="mb-6 rounded-full bg-primary/10 p-4 ring-2 ring-primary/20 transform transition-all group-hover:scale-110 shadow-[0_0_15px_rgba(155,135,245,0.3)] group-hover:shadow-[0_0_25px_rgba(155,135,245,0.6)]">
                  <step.icon className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};