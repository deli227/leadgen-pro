import { motion } from "framer-motion";
import { HeroTitle } from "./hero/HeroTitle";
import { HeroFeatures } from "./hero/HeroFeatures";
import { HeroButtons } from "./hero/HeroButtons";

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
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-secondary-dark via-[#1A1F2C] to-black overflow-hidden flex items-center justify-center px-4 sm:px-6 py-12 sm:py-24">
      <div className="absolute inset-0 z-0">
        <spline-viewer
          url="https://prod.spline.design/4a0Qe8fhhRCudmRe/scene.splinecode"
          loading-anim={true}
          events-target="global"
          className="w-full h-full"
        />
      </div>
      
      {/* Overlay gradient pour améliorer la lisibilité */}
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