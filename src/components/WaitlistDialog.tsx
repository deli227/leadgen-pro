import { useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.string().email("Veuillez entrer une adresse email valide");

export function WaitlistDialog({ triggerButton = false }: { triggerButton?: boolean }) {
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

  const dialog = (
    <div 
      className="fixed bottom-4 right-4 z-[99999] w-[320px] bg-gradient-to-br from-secondary-dark to-black border border-primary/20 rounded-lg shadow-xl"
      style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        zIndex: 99999,
      }}
    >
      <div className="p-4">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            LeadGen Pro arrive bientôt !
          </h3>
          <p className="text-gray-300 text-sm">
            Soyez parmi les premiers à découvrir notre solution de génération de leads B2B.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3 mt-3">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/50 border-primary/20 text-white placeholder:text-gray-400 text-sm"
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white text-sm"
          >
            {isLoading ? "Inscription en cours..." : "M'inscrire"}
          </Button>
        </form>
      </div>
    </div>
  );

  return createPortal(dialog, document.body);
}