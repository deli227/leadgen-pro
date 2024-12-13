import { PricingPlan } from "./pricing/PricingPlan";
import { plans } from "./pricing/pricingData";

export const PricingSection = () => {
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
            <PricingPlan key={plan.name} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
};