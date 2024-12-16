import { motion } from "framer-motion";
import { Brain, Target, Search, LineChart, Lightbulb, ArrowRight, BarChart2, Database, MagnifyingGlass } from "lucide-react";

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
            Analyse IA d'entreprise
          </h2>
          <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm shadow-[0_0_15px_rgba(155,135,245,0.1)]">
            <div className="flex flex-col items-center gap-8">
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                src="/lovable-uploads/318f6c2f-2235-41ca-8eee-313fb4283a1c.png"
                alt="Analyse IA d'entreprise"
                className="w-full max-w-md mx-auto rounded-lg mb-6 shadow-[0_0_30px_rgba(155,135,245,0.5),0_0_60px_rgba(155,135,245,0.3),0_0_90px_rgba(155,135,245,0.2)]"
              />
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3 shadow-[0_0_20px_rgba(155,135,245,0.3)]">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <p className="text-left text-gray-300 leading-relaxed">
                  Notre technologie d'analyse IA vous permet d'explorer en profondeur n'importe quelle entreprise. 
                  Obtenez des insights précieux sur leurs forces, faiblesses et opportunités d'amélioration.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 p-6 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
          >
            <div className="rounded-lg bg-primary/10 p-4 w-fit mb-4">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Collecte de données</h3>
            <p className="text-gray-300">
              Analyse automatique des données publiques : site web, réseaux sociaux, avis clients, actualités...
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/5 p-6 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
          >
            <div className="rounded-lg bg-primary/10 p-4 w-fit mb-4">
              <BarChart2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Analyse approfondie</h3>
            <p className="text-gray-300">
              Évaluation détaillée des performances, de la présence digitale et du positionnement marché.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/5 p-6 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
          >
            <div className="rounded-lg bg-primary/10 p-4 w-fit mb-4">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Recommandations</h3>
            <p className="text-gray-300">
              Suggestions concrètes et personnalisées pour améliorer les performances et la compétitivité.
            </p>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <button className="bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-all duration-300 shadow-[0_0_20px_rgba(155,135,245,0.3)] group">
            Lancer une analyse
            <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};