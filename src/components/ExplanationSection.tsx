import { motion } from "framer-motion";
import { Brain, Target, Search, LineChart, Lightbulb, ArrowRight } from "lucide-react";

export const ExplanationSection = () => {
  return (
    <div className="bg-secondary-dark py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Lead */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center mb-20"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-16">
            Comprendre les leads B2B
          </h2>
          <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm shadow-[0_0_15px_rgba(155,135,245,0.1)]">
            <div className="flex flex-col items-center gap-8">
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                src="/lovable-uploads/7e33b496-6e9d-4d95-a058-ac4bb3cdcd98.png"
                alt="Cycle des leads B2B"
                className="w-full max-w-md mx-auto rounded-lg mb-6"
              />
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3 shadow-[0_0_20px_rgba(155,135,245,0.3)]">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <p className="text-left text-gray-300 leading-relaxed">
                  Un lead B2B est une entreprise qui pourrait être intéressée par vos produits ou services. 
                  C'est un prospect qualifié qui correspond à votre cible idéale et présente un potentiel 
                  de conversion en client. La qualification des leads est essentielle pour concentrer vos 
                  efforts commerciaux sur les opportunités les plus prometteuses.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Analyse IA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-4xl"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent text-center mb-12">
            L'analyse approfondie par notre IA
          </h2>
          
          <div className="grid gap-8">
            {/* Collecte des données */}
            <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm shadow-[0_0_15px_rgba(155,135,245,0.1)] transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3 shadow-[0_0_20px_rgba(155,135,245,0.3)]">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Collecte intelligente des données</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Notre IA parcourt et analyse en temps réel toutes les informations publiques disponibles : 
                    site web, réseaux sociaux, articles de presse, avis clients, données financières... 
                    Rien n'échappe à son analyse approfondie.
                  </p>
                </div>
              </div>
            </div>

            {/* Analyse des forces */}
            <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm shadow-[0_0_15px_rgba(155,135,245,0.1)] transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3 shadow-[0_0_20px_rgba(155,135,245,0.3)]">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Identification des forces et faiblesses</h3>
                  <p className="text-gray-300 leading-relaxed">
                    L'IA évalue la performance de l'entreprise sur différents critères : présence digitale, 
                    satisfaction client, innovation, position sur le marché... Elle identifie précisément 
                    les points forts à valoriser et les axes d'amélioration prioritaires.
                  </p>
                </div>
              </div>
            </div>

            {/* Recommandations */}
            <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm shadow-[0_0_15px_rgba(155,135,245,0.1)] transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3 shadow-[0_0_20px_rgba(155,135,245,0.3)]">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Recommandations personnalisées</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Sur base de cette analyse complète, l'IA génère des recommandations concrètes et 
                    actionnables. Elle suggère les meilleures approches pour entrer en contact avec 
                    l'entreprise et propose un argumentaire commercial adapté qui répond précisément 
                    à ses besoins et enjeux spécifiques.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};