import { Button } from "@/components/ui/button";
import { Check, Infinity } from "lucide-react";
import { Link } from "react-router-dom";

export const PricingSection = () => {
  const plans = [
    {
      name: "Freemium",
      description: "Parfait pour débuter avec LeadGen Pro",
      price: "0€",
      features: [
        "3 leads par jour",
        "90 leads par mois",
        "Analyse IA basique",
        "Export PDF",
        "Support par email",
      ],
      buttonText: "Commencer gratuitement",
      type: "free",
    },
    {
      name: "Pro",
      description: "Pour les professionnels qui veulent plus",
      price: "14,99€",
      features: [
        "250 leads par jour",
        "7500 leads par mois",
        "Analyse IA avancée",
        "Export multi-formats",
        "Support prioritaire",
        "API Access",
      ],
      buttonText: "Choisir Pro",
      type: "pro",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "Solution complète pour les grandes équipes",
      price: "199€",
      features: [
        "Génération illimitée",
        "Analyse IA personnalisée",
        "Tous les formats d'export",
        "Support dédié 24/7",
        "API illimitée",
        "Intégrations sur mesure",
      ],
      buttonText: "Contacter les ventes",
      type: "enterprise",
    },
  ];

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Des forfaits adaptés à vos besoins
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choisissez le plan qui correspond le mieux à vos objectifs de prospection
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 md:max-w-none md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${
                plan.popular ? "relative shadow-xl" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="rounded-full bg-primary px-4 py-1 text-sm font-semibold text-white">
                    Populaire
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">
                    {plan.name}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {plan.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {plan.price}
                  </span>
                  {plan.price !== "Sur mesure" && (
                    <span className="text-sm font-semibold leading-6 text-gray-600">
                      /mois
                    </span>
                  )}
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      {feature.includes("illimit") ? (
                        <Infinity className="h-6 w-5 flex-none text-primary" />
                      ) : (
                        <Check className="h-6 w-5 flex-none text-primary" />
                      )}
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/auth"
                className="mt-8 block"
              >
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-primary hover:bg-primary-dark"
                      : "bg-primary/10 hover:bg-primary/20 text-primary"
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};