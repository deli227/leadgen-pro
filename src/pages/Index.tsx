import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { PricingSection } from "@/components/PricingSection";
import { FooterSection } from "@/components/FooterSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ContactSection } from "@/components/ContactSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { WaitlistDialog } from "@/components/WaitlistDialog";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-secondary-dark">
      <WaitlistDialog />
      <div className="flex justify-end p-4">
        <Button 
          onClick={() => navigate("/dashboard")}
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white shadow-[0_0_15px_rgba(155,135,245,0.5)] hover:shadow-[0_0_25px_rgba(155,135,245,0.8)] transition-all duration-300"
        >
          Accéder au tableau de bord
        </Button>
      </div>
      <main>
        <HeroSection />
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