import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.string().email("Veuillez entrer une adresse email valide");

export function WaitlistDialog() {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate email
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
      setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-secondary-dark to-black border border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            LeadGen Pro arrive bientôt !
          </DialogTitle>
          <DialogDescription className="text-gray-300 mt-2">
            Soyez parmi les premiers à découvrir notre solution de génération de leads B2B. Inscrivez-vous pour être notifié dès le lancement !
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/50 border-primary/20 text-white placeholder:text-gray-400"
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white"
            >
              {isLoading ? "Inscription en cours..." : "M'inscrire"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}