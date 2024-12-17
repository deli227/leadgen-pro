import { Suspense, lazy } from "react";
import { HeroSection } from "@/components/HeroSection";
import { NeonCursor } from "@/components/NeonCursor";
import { WaitlistDialog } from "@/components/WaitlistDialog";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import { ValuePropositionSection } from "@/components/ValuePropositionSection";
import { ExplanationSection } from "@/components/ExplanationSection";
import { LeadExplanationSection } from "@/components/LeadExplanationSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { PricingSection } from "@/components/PricingSection";
import { FooterSection } from "@/components/FooterSection";
import { ContactSection } from "@/components/ContactSection";

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

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
        <Suspense fallback={<LoadingSpinner />}>
          <SocialMediaSection />
          <ValuePropositionSection />
          <ExplanationSection />
          <LeadExplanationSection />
          <HowItWorksSection />
          <PricingSection />
          <TestimonialsSection />
          <ContactSection />
        </Suspense>
      </main>

      <Suspense fallback={<LoadingSpinner />}>
        <FooterSection />
      </Suspense>
    </div>
  );
}