import { motion } from "framer-motion";
import { ArrowRight, Globe, Zap, TrendingUp, Brain } from "lucide-react";
import { Button } from "./ui/button";
import { RobotMascot } from "./RobotMascot";

export const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-secondary-dark via-[#1A1F2C] to-black overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center space-y-8 lg:order-1"
          >
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient">
                Une première mondiale en prospection B2B
              </h1>
              <p className="mt-6 text-lg sm:text-xl leading-8 text-gray-300">
                Générez des leads qualifiés du monde entier et obtenez instantanément une analyse complète de leur potentiel grâce à notre IA avancée.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                <div className="rounded-lg bg-primary/10 p-3 shadow-[0_0_20px_rgba(155,135,245,0.3)]">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-white">Couverture mondiale</h3>
                  <p className="text-sm text-gray-300">Accédez à des leads qualifiés partout</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                <div className="rounded-lg bg-primary/10 p-3 shadow-[0_0_20px_rgba(155,135,245,0.3)]">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-white">Analyse instantanée</h3>
                  <p className="text-sm text-gray-300">Tout savoir en quelques secondes</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                <div className="rounded-lg bg-primary/10 p-3 shadow-[0_0_20px_rgba(155,135,245,0.3)]">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-white">Taux de conversion élevé</h3>
                  <p className="text-sm text-gray-300">Augmentez vos conversions</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                <div className="rounded-lg bg-primary/10 p-3 shadow-[0_0_20px_rgba(155,135,245,0.3)]">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-white">Un temps d'avance</h3>
                  <p className="text-sm text-gray-300">Anticipez le potentiel</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xl mx-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Commencer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-lg px-8 py-6 bg-gradient-to-r from-primary/20 to-primary-dark/20 text-primary-light border-primary-light/20 hover:bg-primary/30 hover:text-white transition-all duration-300"
              >
                Voir la démo
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:order-2 hidden lg:block"
          >
            <RobotMascot className="w-full max-w-md mx-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};