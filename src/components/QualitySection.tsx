import { motion } from "framer-motion";
import { Target, Search, ChartBar, Zap, Brain } from "lucide-react";

export const QualitySection = () => {
  const features = [
    {
      icon: Target,
      title: "Identification Précise des Leads",
      description: "Trouvez des leads qualifiés selon vos critères spécifiques (pays, ville, secteur) pour cibler les bonnes entreprises.",
    },
    {
      icon: Brain,
      title: "Analyse Approfondie",
      description: "Analysez les points forts et faiblesses de chaque lead pour obtenir des recommandations stratégiques.",
    },
    {
      icon: ChartBar,
      title: "Optimisation des Stratégies",
      description: "Affinez vos actions en ciblant les leads les plus prometteurs pour maximiser votre ROI.",
    },
  ];

  return (
    <div className="bg-secondary-dark py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white sm:text-4xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6">
            C'est Quoi un Lead et Comment LeadGen Pro Vous Aide ?
          </h2>
          <p className="text-base sm:text-lg leading-8 text-gray-300 mb-8">
            Un lead est un contact potentiel qui a montré un intérêt pour vos produits ou services. 
            Il peut s'agir d'un particulier ou d'une entreprise qui, bien que n'étant pas encore un client, 
            est susceptible de l'être. Les leads sont essentiels car ce sont eux qui alimentent votre pipeline de ventes.
          </p>
          <p className="text-base sm:text-lg leading-8 text-gray-300 mb-12">
            LeadGen Pro vous aide à maximiser la valeur de ces leads en transformant le processus de gestion, 
            vous aidant à convertir plus efficacement vos prospects en clients réels.
          </p>
        </motion.div>

        <div className="mx-auto mt-8 sm:mt-16 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative bg-black/40 backdrop-blur-sm border border-primary/10 p-8 rounded-xl hover:border-primary/30 transition-all duration-300">
                  <div className="rounded-full p-3 bg-primary/10 group-hover:bg-primary/20 transition-colors mb-6 w-14 h-14 flex items-center justify-center shadow-[0_0_15px_rgba(155,135,245,0.3)] group-hover:shadow-[0_0_25px_rgba(155,135,245,0.5)]">
                    <feature.icon className="w-8 h-8 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative mt-16 flex justify-center"
        >
          <img
            src="/lovable-uploads/f8c10894-6065-48f2-a488-2e601335f8e0.png"
            alt="LeadGen Pro Illustration"
            className="w-full max-w-2xl rounded-xl shadow-[0_0_30px_rgba(155,135,245,0.2)] hover:shadow-[0_0_50px_rgba(155,135,245,0.4)] transition-all duration-500"
          />
        </motion.div>
      </div>
    </div>
  );
};