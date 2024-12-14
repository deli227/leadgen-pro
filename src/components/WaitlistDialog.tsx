import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.string().email("Veuillez entrer une adresse email valide");

export function WaitlistDialog({ triggerButton = false }: { triggerButton?: boolean }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!triggerButton) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [triggerButton]);

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

  if (triggerButton) {
    return (
      <>
        <Button 
          onClick={() => setOpen(true)}
          variant="outline"
          className="bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 border-primary/20 text-white"
        >
          Rejoindre la liste d'attente
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[400px] bg-gradient-to-br from-secondary-dark to-black border border-primary/20">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                LeadGen Pro arrive bientôt !
              </DialogTitle>
              <DialogDescription className="text-gray-300 mt-2 text-sm">
                Soyez parmi les premiers à découvrir notre solution de génération de leads B2B. Inscrivez-vous pour être notifié dès le lancement !
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-3 mt-2">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/50 border-primary/20 text-white placeholder:text-gray-400 text-sm"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white text-sm"
                >
                  {isLoading ? "Inscription en cours..." : "M'inscrire"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[400px] bg-gradient-to-br from-secondary-dark to-black border border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            LeadGen Pro arrive bientôt !
          </DialogTitle>
          <DialogDescription className="text-gray-300 mt-2 text-sm">
            Soyez parmi les premiers à découvrir notre solution de génération de leads B2B. Inscrivez-vous pour être notifié dès le lancement !
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3 mt-2">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/50 border-primary/20 text-white placeholder:text-gray-400 text-sm"
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white text-sm"
            >
              {isLoading ? "Inscription en cours..." : "M'inscrire"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}