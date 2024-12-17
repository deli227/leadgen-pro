import { motion } from "framer-motion";
import { HeroTitle } from "./hero/HeroTitle";
import { HeroFeatures } from "./hero/HeroFeatures";
import { HeroButtons } from "./hero/HeroButtons";
import { useState, useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          url?: string;
          'loading-anim'?: boolean;
          'events-target'?: string;
        },
        HTMLElement
      >;
    }
  }
}

export const HeroSection = () => {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false);

  useEffect(() => {
    // Delay loading of Spline to prioritize main content
    const timer = setTimeout(() => {
      setShouldLoadSpline(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSplineLoad = () => {
    setIsSplineLoaded(true);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-secondary-dark via-[#1A1F2C] to-black overflow-hidden flex items-center justify-center px-4 sm:px-6 py-12 sm:py-24">
      {shouldLoadSpline && (
        <div className="absolute inset-0 z-0">
          <spline-viewer
            url="https://prod.spline.design/4a0Qe8fhhRCudmRe/scene.splinecode"
            loading-anim={true}
            events-target="global"
            className={`w-full h-full transition-opacity duration-500 ${
              isSplineLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleSplineLoad}
          />
        </div>
      )}
      
      {/* Gradient overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary-dark/80 via-secondary-dark/60 to-secondary-dark/80 z-[1]" />
      
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