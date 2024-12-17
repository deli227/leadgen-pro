import { motion } from "framer-motion";
import { HeroTitle } from "./hero/HeroTitle";
import { HeroFeatures } from "./hero/HeroFeatures";
import { HeroButtons } from "./hero/HeroButtons";
import { useEffect } from "react";

export const HeroSection = () => {
  useEffect(() => {
    // Add Spline viewer script dynamically
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer@1.9.48/build/spline-viewer.js";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 sm:px-6 py-12 sm:py-24">
      <div className="absolute inset-0 w-full h-full z-0">
        <spline-viewer 
          url="https://prod.spline.design/EOTAV-o4mSLPyxc9/scene.splinecode"
          className="w-full h-full"
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