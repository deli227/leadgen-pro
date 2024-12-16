import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

export const ExplanationSection = () => {
  return (
    <section className="relative py-24 bg-secondary-dark overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap -m-8">
          <div className="w-full md:w-1/2 p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block mb-6 px-2 py-1 text-sm text-primary font-semibold bg-primary/10 rounded-full"
            >
              Notre Solution
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-8 text-4xl md:text-5xl leading-tight text-white font-bold tracking-tight"
            >
              Une plateforme{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-accent">
                tout-en-un
              </span>{" "}
              pour votre prospection
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mb-6 text-lg text-gray-400"
            >
              Notre solution innovante combine intelligence artificielle et données
              en temps réel pour vous aider à identifier et qualifier les meilleurs
              prospects pour votre entreprise.
            </motion.p>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mb-8 space-y-4"
            >
              {[
                "Analyse approfondie des entreprises",
                "Scoring intelligent des prospects",
                "Qualification automatique des leads",
                "Suivi en temps réel des opportunités",
              ].map((item, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <svg
                    className="mr-3 w-5 h-5 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>
          </div>
          <div className="w-full md:w-1/2 p-8">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <img
                  src="/lovable-uploads/7c8a1b04-55fa-4a6a-b31a-73aee2517ede.png"
                  alt="Tableau de bord LeadGen Pro"
                  className="w-full rounded-2xl shadow-[0_0_30px_rgba(155,135,245,0.3)] hover:shadow-[0_0_50px_rgba(155,135,245,0.5)] transition-all duration-500"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary/10 backdrop-blur-lg p-6 rounded-2xl border border-primary/20">
                  <Lightbulb className="h-10 w-10 text-primary animate-pulse" />
                </div>
              </motion.div>
              <div className="absolute top-0 left-0 -ml-14 -mt-14 w-72 h-72 bg-primary/30 rounded-full filter blur-3xl opacity-70"></div>
              <div className="absolute bottom-0 right-0 -mr-14 -mb-14 w-72 h-72 bg-accent/30 rounded-full filter blur-3xl opacity-70"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};