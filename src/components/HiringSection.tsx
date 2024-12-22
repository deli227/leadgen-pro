import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Users } from "lucide-react";

export const HiringSection = () => {
  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/40 to-accent/30 animate-gradient" />
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nous recrutons !
          </h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-lg md:text-xl text-white mb-8 font-medium">
              Rejoignez notre équipe passionnée et participez à la construction de la prochaine génération d'outils de prospection B2B.
            </p>
            
            <div className="bg-secondary-dark/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-primary/20 hover:border-primary/40 transition-all duration-300">
              <div className="flex items-center justify-center mb-6">
                <Users className="w-12 h-12 text-primary" />
              </div>
              
              <h3 className="text-2xl font-semibold text-white mb-4">
                Développeur Full Stack
              </h3>
              
              <p className="text-white/90 mb-6 text-lg">
                Nous recherchons des développeurs talentueux et passionnés pour nous aider à construire l'avenir de la prospection B2B. Stack technique : React, TypeScript, Supabase, et plus encore.
              </p>
              
              <Button
                onClick={scrollToContact}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Postuler maintenant
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};