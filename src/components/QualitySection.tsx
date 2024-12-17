import { Star, Bolt, BarChartHorizontal, Brain, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export const QualitySection = () => {
  const features = [
    {
      icon: Bolt,
      title: "Rapidité exceptionnelle",
      description: "Accès en seulement 3 minutes",
    },
    {
      icon: Brain,
      title: "IA spécialisée",
      description: "Analyse approfondie et qualification précise",
    },
    {
      icon: Star,
      title: "Leads premium",
      description: "Les meilleurs leads du marché",
    },
    {
      icon: BarChartHorizontal,
      title: "Analyse complète",
      description: "Toutes les informations essentielles",
    },
    {
      icon: CheckCircle,
      title: "Parfaitement aligné",
      description: "Services adaptés aux besoins",
    },
  ];

  return (
    <div className="bg-secondary-dark py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white sm:text-4xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6">
            Qualité exceptionnelle des leads
          </h2>
          <p className="text-base sm:text-lg leading-8 text-gray-300 mb-12 px-4">
            En seulement 3 minutes, accédez aux meilleurs leads du marché. Nos leads sont minutieusement qualifiés et analysés par notre IA spécialisée, vous donnant accès à toutes les informations essentielles pour proposer des services parfaitement alignés avec leurs besoins d'amélioration.
          </p>
        </motion.div>

        <div className="mx-auto mt-8 sm:mt-16 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="flex flex-col items-center p-6 bg-secondary-dark/50 rounded-lg border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(155,135,245,0.3)]">
                  <div className="rounded-full p-3 bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4 shadow-[0_0_15px_rgba(155,135,245,0.3)] group-hover:shadow-[0_0_25px_rgba(155,135,245,0.5)]">
                    <feature.icon className="w-6 h-6 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 text-center">{feature.title}</h3>
                  <p className="text-sm text-gray-300 text-center">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};