import { motion } from "framer-motion";
import { HeroTitle } from "./hero/HeroTitle";
import { HeroFeatures } from "./hero/HeroFeatures";
import { HeroButtons } from "./hero/HeroButtons";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useRef } from "react";

export const HeroSection = () => {
  const isMobile = useIsMobile();
  const splineRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Add Spline viewer script dynamically
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.49/build/spline-viewer.js';
    document.head.appendChild(script);

    // Cleanup
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Configure Spline viewer based on device
    if (splineRef.current) {
      const viewer = splineRef.current as any;
      if (isMobile) {
        viewer.shadowEnabled = false;
        viewer.antialiasing = 'none';
        viewer.quality = 'low';
      } else {
        viewer.shadowEnabled = true;
        viewer.antialiasing = 'high';
        viewer.quality = 'high';
      }
    }
  }, [isMobile, splineRef.current]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-secondary-dark via-[#1A1F2C] to-black overflow-hidden flex items-center justify-center px-4 sm:px-6 py-12 sm:py-24">
      {/* Spline viewer container with absolute positioning */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <spline-viewer
          ref={splineRef as any}
          url="https://prod.spline.design/GKbOrlDSbxK-2WYX/scene.splinecode"
          loading-anim
          loading-style="lazy"
          className="w-full h-full"
        />
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