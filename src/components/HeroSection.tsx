import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, BarChart3, Database, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="animate-fade-up text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Optimisez votre prospection avec{" "}
            <span className="text-primary">l'Intelligence Artificielle</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            LeadGen Pro Beta révolutionne la gestion de vos leads en utilisant l'IA pour analyser, 
            qualifier et classer vos prospects automatiquement.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Link to="/auth">
              <Button size="lg" className="bg-primary hover:bg-primary-dark">
                Commencer maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="lg">
                <LogIn className="mr-2 h-4 w-4" />
                Connexion
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3 animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <div className="flex flex-col items-center text-center">
            <div className="rounded-lg bg-primary/10 p-3">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Analyse IA</h3>
            <p className="mt-2 text-sm text-gray-600">
              Qualification automatique et scoring intelligent de vos leads
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="rounded-lg bg-primary/10 p-3">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Insights détaillés</h3>
            <p className="mt-2 text-sm text-gray-600">
              Analyses approfondies et recommandations personnalisées
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="rounded-lg bg-primary/10 p-3">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Export flexible</h3>
            <p className="mt-2 text-sm text-gray-600">
              Exportez vos données aux formats PDF, Excel et JSON
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};