import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const PricingSection = () => {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Accès anticipé - Version Beta
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Soyez parmi les premiers à tester LeadGen Pro Beta et bénéficiez d'avantages exclusifs
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-lg bg-white rounded-3xl ring-1 ring-gray-200">
          <div className="p-8 sm:p-10">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Accès Beta</h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Profitez de toutes les fonctionnalités premium pendant la phase Beta
            </p>
            <div className="mt-8 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-primary">Inclus dans l'offre</h4>
              <div className="h-px flex-auto bg-gray-100"></div>
            </div>
            <ul role="list" className="mt-6 space-y-3 text-sm leading-6 text-gray-600">
              {[
                "Analyse IA illimitée",
                "Scoring automatique des leads",
                "Export multi-formats",
                "Support prioritaire",
                "Accès aux nouvelles fonctionnalités en avant-première",
              ].map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 p-8 sm:p-10">
            <Button className="w-full bg-primary hover:bg-primary-dark" size="lg">
              Rejoindre la Beta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};