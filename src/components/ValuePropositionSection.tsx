import { motion } from "framer-motion";
import { Target, Zap, Brain } from "lucide-react";
import { ComparisonTable } from "./pricing/ComparisonTable";

export const ValuePropositionSection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-black via-secondary-dark to-black overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.6)_100%)]" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl animate-pulse" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
            Découvrez la puissance de l'IA pour votre prospection
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl font-semibold text-white mb-8 p-6 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 shadow-lg backdrop-blur-sm"
          >
            Transformez vos leads en opportunités concrètes grâce à notre technologie innovante
          </motion.p>
          
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
            Notre solution utilise l'intelligence artificielle pour analyser et comprendre les besoins de vos prospects avant même qu'ils ne les expriment.
          </p>
          
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
            Plus de prospection à l'aveugle : ciblez précisément les entreprises qui ont besoin de vos services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16"
        >
          {[
            {
              icon: Target,
              title: "Ciblage Intelligent",
              description: "Identifiez les prospects les plus pertinents pour votre activité"
            },
            {
              icon: Brain,
              title: "Analyse IA",
              description: "Comprenez les besoins de vos prospects grâce à notre technologie avancée"
            },
            {
              icon: Zap,
              title: "Résultats Rapides",
              description: "Convertissez plus efficacement avec des insights précis et actionnables"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-black/40 backdrop-blur-sm border border-primary/10 p-8 rounded-xl hover:border-primary/30 transition-all duration-300">
                <feature.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <ComparisonTable />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            LeadGen Pro : L'intelligence artificielle au service de votre croissance
          </p>
        </motion.div>
      </div>
    </section>
  );
};