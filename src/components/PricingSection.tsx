import { PricingPlan } from "./pricing/PricingPlan";
import { plans } from "./pricing/pricingData";
import { motion } from "framer-motion";
import { ComparisonTable } from "./pricing/ComparisonTable";

export const PricingSection = () => {
  return (
    <div id="pricing-section" className="bg-gradient-to-b from-secondary-dark via-black to-black py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
            Des forfaits adaptés à vos besoins
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-8 text-gray-300">
            Choisissez le plan qui correspond le mieux à vos objectifs de prospection
          </p>
        </motion.div>

        <div className="mx-auto mt-8 sm:mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-6 sm:p-8 border border-primary/10"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Nous ne générons pas des leads, nous créons des opportunités !
          </h3>
          
          <p className="text-gray-300 mb-8 text-center">
            Oubliez les générateurs de leads aléatoires qui vous noient sous des listes inutiles. Notre solution, c'est bien plus ! Grâce à notre analyse IA avancée, chaque lead est une opportunité taillée sur mesure pour votre réussite.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-black/30 p-4 rounded-lg border border-primary/10">
              <h4 className="text-lg font-semibold text-primary-light mb-2">Des contacts pertinents, pas de hasard :</h4>
              <p className="text-gray-400">Chaque lead est sélectionné et analysé pour vous garantir un profil précis et prêt à convertir. Vous ne recevez que des prospects réellement intéressants.</p>
            </div>

            <div className="bg-black/30 p-4 rounded-lg border border-primary/10">
              <h4 className="text-lg font-semibold text-primary-light mb-2">Connaître avant d'agir :</h4>
              <p className="text-gray-400">Nous identifions les besoins et points faibles de chaque lead, pour que vous puissiez arriver avec la solution parfaite dès le premier contact.</p>
            </div>
          </div>

          <div className="bg-black/30 p-4 rounded-lg border border-primary/10 mb-8">
            <h4 className="text-lg font-semibold text-primary-light mb-2">Un volume exact, sans surprises :</h4>
            <p className="text-gray-400">Pas de faux espoirs : nous livrons exactement le nombre de leads promis, qualifiés et vérifiés.</p>
          </div>

          <div className="text-center p-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg">
            <p className="text-lg text-gray-200">
              💡 Avec nous, vous ne chassez plus à l'aveugle : vous ciblez, vous convainquez, vous transformez. Essayez gratuitement avec 3 leads offerts et découvrez une nouvelle ère de prospection !
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <ComparisonTable />
        </motion.div>
      </div>
    </div>
  );
};
