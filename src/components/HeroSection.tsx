import { motion } from "framer-motion";
import { HeroTitle } from "./hero/HeroTitle";
import { HeroFeatures } from "./hero/HeroFeatures";
import { HeroButtons } from "./hero/HeroButtons";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 sm:px-6 py-12 sm:py-24">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/lovable-uploads/4b68c7fb-ed13-4c3f-996a-97dd2d9a1eeb.png"
          alt="Earth from space"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-dark/90 via-[#1A1F2C]/80 to-black/70" />
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="grid grid-cols-1 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center space-y-8 text-center"
          >
            <HeroTitle />
            <HeroFeatures />
            <HeroButtons />
          </motion.div>
        </div>
      </div>
    </section>
  );
};