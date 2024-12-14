import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { PricingSection } from "@/components/PricingSection";
import { FooterSection } from "@/components/FooterSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ContactSection } from "@/components/ContactSection";
import { WaitlistDialog } from "@/components/WaitlistDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const emailSchema = z.string().email("Veuillez entrer une adresse email valide");

export default function Index() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      emailSchema.parse(email);
      
      setIsLoading(true);
      
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') {
          toast.error("Cette adresse email est déjà inscrite");
        } else {
          toast.error("Une erreur est survenue. Veuillez réessayer.");
        }
        console.error('Error:', error);
        return;
      }

      toast.success("Merci ! Vous serez notifié dès que LeadGen Pro sera disponible.");
      setEmail("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error("Veuillez entrer une adresse email valide");
      } else {
        toast.error("Une erreur est survenue. Veuillez réessayer.");
        console.error('Error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary-dark">
      {/* Popup automatique */}
      <WaitlistDialog />
      
      <main>
        <div className="relative">
          <HeroSection />
          
          {/* Formulaire d'inscription à la liste d'attente */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4">
            <form onSubmit={handleSubmit} className="space-y-4 animate-fade-up">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Entrez votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 pl-12 pr-4 w-full bg-black/50 border-2 border-primary/20 text-white placeholder:text-gray-400 text-lg rounded-xl focus:border-primary/40 focus:ring-primary/40"
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary/60 h-5 w-5" />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? "Inscription en cours..." : "Rejoindre la liste d'attente"}
              </Button>
            </form>
          </div>
        </div>

        <HowItWorksSection />
        <PricingSection />
        <FeaturesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
}