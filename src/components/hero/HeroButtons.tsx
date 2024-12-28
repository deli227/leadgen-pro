import { ArrowRight, LayoutDashboard } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const HeroButtons = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuthRedirect = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
      toast({
        title: "Authentification requise",
        description: "Veuillez vous connecter pour accéder à votre tableau de bord",
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xl mx-auto px-4 mt-24">
      <Button
        size="lg"
        onClick={handleAuthRedirect}
        className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Commencer l'essai gratuit"
      >
        Commencer gratuitement
        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
      </Button>

      <Button
        size="lg"
        onClick={handleAuthRedirect}
        className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-primary hover:bg-primary-dark text-white shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Accéder au tableau de bord"
      >
        <LayoutDashboard className="mr-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
        Accéder à mon tableau de bord
      </Button>
    </div>
  );
};