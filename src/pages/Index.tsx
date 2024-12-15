import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { PricingSection } from "@/components/PricingSection";
import { FooterSection } from "@/components/FooterSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ContactSection } from "@/components/ContactSection";
import { QualitySection } from "@/components/QualitySection";
import { WaitlistDialog } from "@/components/WaitlistDialog";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import { ExplanationSection } from "@/components/ExplanationSection";

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary-dark">
      {/* Popup automatique */}
      <WaitlistDialog />
      
      <div className="flex flex-col sm:flex-row justify-end items-center p-4 gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <WaitlistDialog triggerButton />
        </div>
      </div>
      <main>
        <HeroSection />
        <SocialMediaSection />
        <ExplanationSection />
        <QualitySection />
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