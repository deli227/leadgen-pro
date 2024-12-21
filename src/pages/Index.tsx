import { HeroSection } from "@/components/HeroSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { PricingSection } from "@/components/PricingSection";
import { FooterSection } from "@/components/FooterSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ContactSection } from "@/components/ContactSection";
import { LeadExplanationSection } from "@/components/LeadExplanationSection";
import { WaitlistDialog } from "@/components/WaitlistDialog";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import { ExplanationSection } from "@/components/ExplanationSection";
import { ValuePropositionSection } from "@/components/ValuePropositionSection";
import { NeonCursor } from "@/components/NeonCursor";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

export default function Index() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-secondary-dark">
      <NeonCursor />
      <WaitlistDialog />
      
      <div className="flex flex-col sm:flex-row justify-end items-center p-4 gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {session ? (
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white"
            >
              Tableau de bord
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white"
            >
              Connexion
            </Button>
          )}
          <WaitlistDialog triggerButton />
        </div>
      </div>
      <main>
        <HeroSection />
        <SocialMediaSection />
        <ExplanationSection />
        <LeadExplanationSection />
        <HowItWorksSection />
        <PricingSection />
        <ValuePropositionSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
}