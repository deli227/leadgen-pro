import { motion } from "framer-motion";
import { Search, Brain, LineChart, Lightbulb, ArrowRight } from "lucide-react";

export const ExplanationSection = () => {
  return (
    <div className="bg-gradient-to-br from-secondary-dark via-[#1A1F2C] to-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center mb-20"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-8">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Analyse IA d'entreprise
            </span>
          </h2>
          <p className="text-xl leading-8 text-gray-300 max-w-3xl mx-auto">
            Recherchez n'importe quelle entreprise pour tout savoir sur elle : points forts, points faibles, axes d'amélioration et analyse SEO. Lancez également l'analyse sur votre propre entreprise pour optimiser vos performances et prendre des décisions stratégiques.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Features */}
          <div className="space-y-10">
            {[
              {
                icon: Search,
                title: "Analyse Complète",
                description: "Notre IA analyse en profondeur toutes les données publiques disponibles sur l'entreprise"
              },
              {
                icon: Brain,
                title: "Intelligence Artificielle",
                description: "Utilisation d'algorithmes avancés pour une analyse précise et pertinente"
              },
              {
                icon: LineChart,
                title: "Insights Stratégiques",
                description: "Obtenez des insights précieux sur les forces, faiblesses et opportunités d'amélioration"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                className="flex gap-8 p-8 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group border border-primary/10"
              >
                <div className="rounded-xl bg-primary/10 p-4 self-start group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-6"
            >
              <button className="group bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(155,135,245,0.3)] hover:shadow-[0_0_30px_rgba(155,135,245,0.5)] flex items-center gap-3">
                Lancer une analyse
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          </div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative order-first lg:order-last"
          >
            <div className="relative">
              <img
                src="/lovable-uploads/318f6c2f-2235-41ca-8eee-313fb4283a1c.png"
                alt="Analyse IA d'entreprise"
                className="w-3/4 mx-auto rounded-2xl shadow-[0_0_30px_rgba(155,135,245,0.3)] hover:shadow-[0_0_50px_rgba(155,135,245,0.5)] transition-all duration-500"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary/10 backdrop-blur-lg p-6 rounded-2xl border border-primary/20">
                <Lightbulb className="h-10 w-10 text-primary animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};