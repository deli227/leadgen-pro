import { motion } from "framer-motion";
import Spline from '@splinetool/react-spline';
import { HeroTitle } from "./hero/HeroTitle";
import { HeroFeatures } from "./hero/HeroFeatures";
import { HeroButtons } from "./hero/HeroButtons";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Spline Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Spline
          scene="https://prod.spline.design/OGluGCrFq0-SS4IR/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 py-12 sm:py-24 bg-gradient-to-b from-secondary-dark/80 via-secondary-dark/70 to-black/90">
        <div className="w-full max-w-6xl">
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
      </div>
    </section>
  );
};