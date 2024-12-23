import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export const HeroButtons = () => {
  const scrollToPricing = () => {
    const pricingSection = document.querySelector('#pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xl mx-auto px-4 mt-24">
      <Button
        size="lg"
        className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Commencer l'essai gratuit"
      >
        Commencer gratuitement
        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={scrollToPricing}
        className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-accent via-primary to-accent text-white border-primary-light hover:border-primary hover:from-accent/90 hover:via-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Voir nos tarifs"
      >
        Nos tarifs
      </Button>
    </div>
  );
};