import { motion } from "framer-motion";
import { ArrowRight, Globe, Zap, TrendingUp, Brain } from "lucide-react";
import { Button } from "./ui/button";

export const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-secondary-dark via-[#1A1F2C] to-black overflow-hidden flex items-center justify-center px-4 sm:px-6 py-12 sm:py-24">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-20 animate-float"
        style={{
          backgroundImage: "url('/lovable-uploads/5a3ee816-003e-48ec-a91c-424c279360e5.png')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(2px)",
        }}
      />
      
      <div className="w-full max-w-6xl relative z-10">
        <div className="grid grid-cols-1 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center space-y-8 text-center"
          >
            <div className="max-w-2xl mx-auto px-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient">
                Une première mondiale en prospection B2B
              </h1>
              <p className="mt-6 text-base sm:text-lg md:text-xl leading-8 text-gray-300">
                Recherchez vos leads qualifiés et lancez une analyse approfondie grâce à notre IA innovante. Obtenez instantanément une vision à 360° : points forts, points faibles, opportunités d'amélioration... Tout ce dont vous avez besoin pour comprendre et conquérir vos prospects est à portée de clic.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mx-auto px-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                <div className="rounded-lg bg-primary/10 p-3 shadow-[0_0_20px_rgba(155,135,245,0.3)] flex-shrink-0">
                  <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="text-left min-w-0">
                  <h3 className="font-semibold text-white text-sm sm:text-base">Couverture mondiale</h3>
                  <p className="text-xs sm:text-sm text-gray-300 truncate">Accédez à des leads qualifiés partout</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                <div className="rounded-lg bg-primary/10 p-3 shadow-[0_0_20px_rgba(155,135,245,0.3)] flex-shrink-0">
                  <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="text-left min-w-0">
                  <h3 className="font-semibold text-white text-sm sm:text-base">Analyse instantanée</h3>
                  <p className="text-xs sm:text-sm text-gray-300 truncate">Tout savoir en quelques secondes</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                <div className="rounded-lg bg-primary/10 p-3 shadow-[0_0_20px_rgba(155,135,245,0.3)] flex-shrink-0">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="text-left min-w-0">
                  <h3 className="font-semibold text-white text-sm sm:text-base">Taux de conversion élevé</h3>
                  <p className="text-xs sm:text-sm text-gray-300 truncate">Augmentez vos conversions</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                <div className="rounded-lg bg-primary/10 p-3 shadow-[0_0_20px_rgba(155,135,245,0.3)] flex-shrink-0">
                  <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="text-left min-w-0">
                  <h3 className="font-semibold text-white text-sm sm:text-base">Un temps d'avance</h3>
                  <p className="text-xs sm:text-sm text-gray-300 truncate">Anticipez le potentiel</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xl mx-auto px-4">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Commencer gratuitement
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-primary/20 to-primary-dark/20 text-primary-light border-primary-light/20 hover:bg-primary/30 hover:text-white transition-all duration-300"
              >
                Voir la démo
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};