import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Globe } from "lucide-react";

export const SocialMediaSection = () => {
  return (
    <div className="relative pt-32 pb-24 bg-gradient-to-b from-black via-secondary-dark to-black overflow-hidden">
      {/* Add a dark gradient overlay at the top */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient mb-8">
            En quelques secondes, parcourez le monde
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Analyse complète des réseaux sociaux et de tous les navigateurs
          </p>
          
          {/* Browser Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="relative w-full max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl rounded-full" />
              <img
                src="/lovable-uploads/76aa2bf1-eda7-42bc-9775-8aecd546877f.png"
                alt="Navigateurs Internet"
                className="relative w-full h-auto rounded-lg shadow-2xl mix-blend-screen"
              />
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {/* Facebook */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#1877F2] text-white">
                <Facebook className="w-8 h-8" />
              </div>
              <p className="text-gray-300">Analyse Facebook</p>
            </motion.div>

            {/* Instagram */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#FF7A00] via-[#E2336B] to-[#8A33E1] text-white">
                <Instagram className="w-8 h-8" />
              </div>
              <p className="text-gray-300">Analyse Instagram</p>
            </motion.div>

            {/* X (Twitter) */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black text-white">
                <img 
                  src="/lovable-uploads/0bb44279-b31e-4c63-992c-63ab9ec11838.png"
                  alt="X (Twitter)"
                  className="w-8 h-8"
                />
              </div>
              <p className="text-gray-300">Analyse X</p>
            </motion.div>

            {/* LinkedIn */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#0A66C2] text-white">
                <Linkedin className="w-8 h-8" />
              </div>
              <p className="text-gray-300">Analyse LinkedIn</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};