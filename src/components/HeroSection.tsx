import { motion } from "framer-motion";
import { HeroTitle } from "./hero/HeroTitle";
import { HeroFeatures } from "./hero/HeroFeatures";
import { HeroButtons } from "./hero/HeroButtons";
import Spline from '@splinetool/react-spline';
import { useMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";

export const HeroSection = () => {
  const isMobile = useMobile();
  const [showSpline, setShowSpline] = useState(true);
  const [loadingPerformance, setLoadingPerformance] = useState(false);

  useEffect(() => {
    if (isMobile) {
      // Check device performance
      const checkPerformance = async () => {
        setLoadingPerformance(true);
        try {
          // Simple performance check
          const start = performance.now();
          let result = 0;
          for (let i = 0; i < 1000000; i++) {
            result += Math.random();
          }
          const end = performance.now();
          
          // If the device takes more than 100ms to complete this task,
          // we consider it might struggle with 3D rendering
          setShowSpline(end - start < 100);
        } catch (error) {
          console.error('Performance check failed:', error);
          setShowSpline(false);
        }
        setLoadingPerformance(false);
      };

      checkPerformance();
    }
  }, [isMobile]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-secondary-dark via-[#1A1F2C] to-black overflow-hidden flex items-center justify-center px-4 sm:px-6 py-12 sm:py-24">
      {showSpline && !loadingPerformance && (
        <div className="absolute inset-0 z-0">
          <Spline
            scene="https://prod.spline.design/OGluGCrFq0-SS4IR/scene.splinecode"
            onLoad={() => {
              console.log('Spline scene loaded');
            }}
            onError={(error) => {
              console.error('Spline error:', error);
              setShowSpline(false);
            }}
          />
        </div>
      )}
      
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