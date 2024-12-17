import { motion } from "framer-motion";
import { HeroTitle } from "./hero/HeroTitle";
import { HeroFeatures } from "./hero/HeroFeatures";
import { HeroButtons } from "./hero/HeroButtons";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <spline-viewer url="https://prod.spline.design/4a0Qe8fhhRCudmRe/scene.splinecode"></spline-viewer>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 py-12 sm:py-24 min-h-screen bg-gradient-to-b from-transparent via-black/50 to-black/80">
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