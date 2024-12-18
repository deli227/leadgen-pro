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
import { DataAnalyticsSection } from "@/components/DataAnalyticsSection";
import { NeonCursor } from "@/components/NeonCursor";

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary-dark">
      <NeonCursor />
      <WaitlistDialog />
      
      <div className="flex flex-col sm:flex-row justify-end items-center p-4 gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <WaitlistDialog triggerButton />
        </div>
      </div>
      <main>
        <HeroSection />
        <SocialMediaSection />
        <ValuePropositionSection />
        <DataAnalyticsSection />
        <ExplanationSection />
        <LeadExplanationSection />
        <HowItWorksSection />
        <PricingSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
}