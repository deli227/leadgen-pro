import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "./ui/button";

export const ContactSection = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Besoin d'une solution sur mesure ?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Vous êtes une entreprise avec des besoins spécifiques ? Nous pouvons adapter notre solution à vos exigences particulières.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-16 max-w-lg text-center"
        >
          <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
            <div className="flex flex-col space-y-6">
              <Button
                variant="outline"
                className="flex items-center justify-center space-x-2 text-lg"
                onClick={() => window.location.href = "mailto:contact@leadgen-pro.fr"}
              >
                <Mail className="h-5 w-5" />
                <span>contact@leadgen-pro.fr</span>
              </Button>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Notre équipe est à votre écoute pour étudier vos besoins et vous proposer une solution adaptée.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};