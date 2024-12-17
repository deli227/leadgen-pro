import { HeroSection } from "@/components/HeroSection";
import { FooterSection } from "@/components/FooterSection";
import { WaitlistDialog } from "@/components/WaitlistDialog";

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary-dark">
      <WaitlistDialog />
      
      <div className="flex flex-col sm:flex-row justify-end items-center p-4 gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <WaitlistDialog triggerButton />
        </div>
      </div>
      <main>
        <HeroSection />
      </main>
      <FooterSection />
    </div>
  );
}