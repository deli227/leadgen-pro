import { motion } from "framer-motion";

export const VideoSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-secondary-dark to-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Découvrez LeadGen Pro en action
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Regardez notre vidéo de présentation pour comprendre comment LeadGen Pro peut transformer votre prospection commerciale
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl hover:shadow-primary/20 transition-shadow duration-300"
        >
          <iframe
            src="https://www.youtube.com/embed/1o7hi9Mmtuw"
            title="Présentation de LeadGen Pro"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </motion.div>
      </div>
    </section>
  );
};