import { Suspense, lazy } from "react";
import { HeroSection } from "@/components/HeroSection";
import { NeonCursor } from "@/components/NeonCursor";
import { WaitlistDialog } from "@/components/WaitlistDialog";

// Lazy load non-critical components
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection").then(module => ({ default: module.TestimonialsSection })));
const PricingSection = lazy(() => import("@/components/PricingSection").then(module => ({ default: module.PricingSection })));
const FooterSection = lazy(() => import("@/components/FooterSection").then(module => ({ default: module.FooterSection })));
const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection").then(module => ({ default: module.HowItWorksSection })));
const ContactSection = lazy(() => import("@/components/ContactSection").then(module => ({ default: module.ContactSection })));
const LeadExplanationSection = lazy(() => import("@/components/LeadExplanationSection").then(module => ({ default: module.LeadExplanationSection })));
const SocialMediaSection = lazy(() => import("@/components/SocialMediaSection").then(module => ({ default: module.SocialMediaSection })));
const ExplanationSection = lazy(() => import("@/components/ExplanationSection").then(module => ({ default: module.ExplanationSection })));
const ValuePropositionSection = lazy(() => import("@/components/ValuePropositionSection").then(module => ({ default: module.ValuePropositionSection })));

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