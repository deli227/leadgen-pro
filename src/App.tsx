import { HeroSection } from "./components/HeroSection";
import { ExplanationSection } from "./components/ExplanationSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { DocumentationSection } from "./components/DocumentationSection";
import { QualitySection } from "./components/QualitySection";
import { PricingSection } from "./components/PricingSection";
import { ContactSection } from "./components/ContactSection";
import { FooterSection } from "./components/FooterSection";

function App() {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <ExplanationSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DocumentationSection />
      <QualitySection />
      <PricingSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}

export default App;
