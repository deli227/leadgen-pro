import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, BarChart3, Database, LogIn, Sparkles, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-secondary-dark py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-6xl font-bold tracking-tight text-white sm:text-7xl mb-4 animate-pulse">
            LeadGen Pro{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
              (Beta)
            </span>
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-300">
            Optimisez votre prospection avec l'Intelligence Artificielle. Notre solution analyse, 
            qualifie et classe vos prospects automatiquement.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 transform transition-all hover:scale-105 shadow-[0_0_15px_rgba(155,135,245,0.5)] hover:shadow-[0_0_25px_rgba(155,135,245,0.8)]">
                Commencer maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="lg" className="text-white border-primary hover:bg-primary/20 transform transition-all hover:scale-105 shadow-[0_0_10px_rgba(155,135,245,0.3)] hover:shadow-[0_0_20px_rgba(155,135,245,0.6)]">
                <LogIn className="mr-2 h-4 w-4" />
                Connexion
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3"
        >
          <div className="flex flex-col items-center text-center group">
            <div className="rounded-lg bg-primary/10 p-3 transform transition-all group-hover:scale-110 group-hover:bg-primary/20 shadow-[0_0_10px_rgba(155,135,245,0.3)] group-hover:shadow-[0_0_20px_rgba(155,135,245,0.6)]">
              <Brain className="h-6 w-6 text-primary animate-pulse" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">Analyse IA</h3>
            <p className="mt-2 text-sm text-gray-300">
              Qualification automatique et scoring intelligent de vos leads
            </p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="rounded-lg bg-primary/10 p-3 transform transition-all group-hover:scale-110 group-hover:bg-primary/20 shadow-[0_0_10px_rgba(155,135,245,0.3)] group-hover:shadow-[0_0_20px_rgba(155,135,245,0.6)]">
              <BarChart3 className="h-6 w-6 text-primary animate-pulse" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">Insights détaillés</h3>
            <p className="mt-2 text-sm text-gray-300">
              Analyses approfondies et recommandations personnalisées
            </p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="rounded-lg bg-primary/10 p-3 transform transition-all group-hover:scale-110 group-hover:bg-primary/20 shadow-[0_0_10px_rgba(155,135,245,0.3)] group-hover:shadow-[0_0_20px_rgba(155,135,245,0.6)]">
              <Database className="h-6 w-6 text-primary animate-pulse" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">Export flexible</h3>
            <p className="mt-2 text-sm text-gray-300">
              Exportez vos données aux formats PDF, Excel et JSON
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};