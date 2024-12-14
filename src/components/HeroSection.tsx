import { motion } from "framer-motion";
import { ArrowRight, Globe, Zap, TrendingUp, Brain } from "lucide-react";
import { Button } from "./ui/button";
import { RobotMascot } from "./RobotMascot";

export const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-secondary-dark via-[#1A1F2C] to-black overflow-hidden">
      <div className="relative pt-16 pb-20 sm:pt-24 lg:pt-32 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left space-y-8"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-white bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Une première mondiale en prospection B2B
              </h1>
              <p className="mt-4 text-base sm:text-lg leading-8 text-gray-300">
                Générez des leads qualifiés du monde entier et obtenez instantanément une analyse complète de leur potentiel grâce à notre IA avancée.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                  <div className="rounded-lg bg-primary/10 p-2 shadow-[0_0_15px_rgba(155,135,245,0.3)]">
                    <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-white text-sm sm:text-base">Couverture mondiale</h3>
                    <p className="text-xs sm:text-sm text-gray-300">Accédez à des leads qualifiés partout</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                  <div className="rounded-lg bg-primary/10 p-2 shadow-[0_0_15px_rgba(155,135,245,0.3)]">
                    <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-white text-sm sm:text-base">Analyse instantanée</h3>
                    <p className="text-xs sm:text-sm text-gray-300">Tout savoir en quelques secondes</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                  <div className="rounded-lg bg-primary/10 p-2 shadow-[0_0_15px_rgba(155,135,245,0.3)]">
                    <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-white text-sm sm:text-base">Taux de conversion élevé</h3>
                    <p className="text-xs sm:text-sm text-gray-300">Augmentez vos conversions</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                  <div className="rounded-lg bg-primary/10 p-2 shadow-[0_0_15px_rgba(155,135,245,0.3)]">
                    <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-white text-sm sm:text-base">Un temps d'avance</h3>
                    <p className="text-xs sm:text-sm text-gray-300">Anticipez le potentiel</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-primary/20 to-primary-dark/20 text-primary-light border-primary-light/20 hover:bg-primary/30 hover:text-white transition-all duration-300"
                >
                  Voir la démo
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <RobotMascot className="w-full max-w-lg mx-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};