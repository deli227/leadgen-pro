import { PricingPlan } from "./pricing/PricingPlan";
import { plans } from "./pricing/pricingData";
import { motion } from "framer-motion";

export const PricingSection = () => {
  return (
    <div className="bg-gradient-to-b from-secondary-dark to-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
            Des forfaits adaptés à vos besoins
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Choisissez le plan qui correspond le mieux à vos objectifs de prospection
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 md:max-w-none md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <PricingPlan {...plan} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};