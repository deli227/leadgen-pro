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
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Analyse IA d'entreprise
          </h2>
          <p className="text-lg leading-8 text-gray-300">
            Découvrez les forces et faiblesses de n'importe quelle entreprise grâce à notre technologie d'analyse IA avancée
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src="/lovable-uploads/318f6c2f-2235-41ca-8eee-313fb4283a1c.png"
                alt="Analyse IA d'entreprise"
                className="w-full rounded-2xl shadow-[0_0_30px_rgba(155,135,245,0.3)] hover:shadow-[0_0_50px_rgba(155,135,245,0.5)] transition-all duration-500"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary/10 backdrop-blur-lg p-4 rounded-2xl border border-primary/20">
                <Search className="h-8 w-8 text-primary animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Right Column - Features */}
          <div className="space-y-8">
            {[
              {
                icon: Brain,
                title: "Analyse Complète",
                description: "Notre IA analyse en profondeur toutes les données publiques disponibles sur l'entreprise"
              },
              {
                icon: LineChart,
                title: "Insights Stratégiques",
                description: "Obtenez des insights précieux sur les forces, faiblesses et opportunités d'amélioration"
              },
              {
                icon: Lightbulb,
                title: "Recommandations Personnalisées",
                description: "Recevez des suggestions concrètes pour améliorer vos performances"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="flex gap-6 p-6 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="rounded-xl bg-primary/10 p-4 self-start group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-6"
            >
              <button className="group bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(155,135,245,0.3)] hover:shadow-[0_0_30px_rgba(155,135,245,0.5)]">
                Lancer une analyse
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};