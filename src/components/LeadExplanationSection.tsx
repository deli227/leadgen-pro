import { Target, Search, BarChart2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export const LeadExplanationSection = () => {
  const features = [
    {
      icon: Search,
      title: "Identification Précise des Leads",
      description: "Trouvez des leads qualifiés selon vos critères spécifiques (pays, ville, secteur, etc.)",
    },
    {
      icon: BarChart2,
      title: "Analyse Approfondie",
      description: "Analysez les points forts et faiblesses de vos leads pour mieux les convertir",
    },
    {
      icon: TrendingUp,
      title: "Optimisation de Vos Stratégies",
      description: "Affinez vos actions pour cibler les leads les plus prometteurs",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-secondary-dark via-secondary-dark to-black py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6">
            C'est Quoi un Lead et Comment LeadGen Pro Vous Aide ?
          </h2>
          <p className="text-lg leading-8 text-gray-300">
            Un lead est un contact potentiel qui a montré un intérêt pour vos produits ou services. 
            Il peut s'agir d'un particulier ou d'une entreprise qui, bien que n'étant pas encore un client, 
            est susceptible de l'être. Les leads sont essentiels car ce sont eux qui alimentent votre pipeline de ventes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="flex flex-col items-center p-8 bg-secondary-dark/50 rounded-xl border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(155,135,245,0.2)]">
                <div className="rounded-full p-4 bg-primary/10 group-hover:bg-primary/20 transition-colors mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-300 text-center">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            LeadGen Pro transforme le processus de gestion des leads, vous aidant à convertir plus efficacement 
            vos prospects en clients réels.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
