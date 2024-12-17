import { motion } from "framer-motion";
import { HeroTitle } from "./hero/HeroTitle";
import { HeroFeatures } from "./hero/HeroFeatures";
import { HeroButtons } from "./hero/HeroButtons";
import { useState, useEffect } from "react";

export const HeroSection = () => {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  useEffect(() => {
    // Listen for the Spline viewer load event
    const handleSplineLoad = () => {
      setIsSplineLoaded(true);
      console.log("Spline scene loaded");
    };

    // Add event listener to the spline-viewer element
    const splineViewer = document.querySelector('spline-viewer');
    splineViewer?.addEventListener('load', handleSplineLoad);

    return () => {
      splineViewer?.removeEventListener('load', handleSplineLoad);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Loading overlay */}
      {!isSplineLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-secondary-dark">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Spline 3D Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <spline-viewer
          url="https://prod.spline.design/4a0Qe8fhhRCudmRe/scene.splinecode"
          loading-anim
          events-target="global"
        ></spline-viewer>
      </div>

      {/* Content Overlay */}
      <div 
        className={`relative z-10 flex items-center justify-center px-4 sm:px-6 py-12 sm:py-24 min-h-screen bg-gradient-to-b from-transparent via-black/50 to-black/80 transition-opacity duration-500 ${
          isSplineLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isSplineLoaded ? 1 : 0, x: isSplineLoaded ? 0 : -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
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