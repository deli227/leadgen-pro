import { motion } from "framer-motion";

export const DocumentationHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
        Guide d'Utilisation LeadGen Pro
      </h2>
      <p className="text-gray-300 text-lg max-w-3xl mx-auto">
        Découvrez comment utiliser efficacement LeadGen Pro pour optimiser votre prospection commerciale.
        Suivez ce guide étape par étape pour maîtriser toutes les fonctionnalités.
      </p>
    </motion.div>
  );
};