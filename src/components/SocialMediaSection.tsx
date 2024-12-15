import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Globe } from "lucide-react";

export const SocialMediaSection = () => {
  return (
    <div className="relative py-24 bg-gradient-to-br from-secondary-dark to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient mb-8">
            En quelques minutes, parcourez le monde
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Découvrez tout ce que vous devez savoir sur vos leads grâce à une analyse complète des réseaux sociaux
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
                src="/lovable-uploads/2ad32f21-c100-4971-b366-231debdb7ab2.png"
                alt="Navigateurs Internet"
                className="relative w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
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