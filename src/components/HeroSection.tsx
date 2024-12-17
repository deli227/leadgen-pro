import { motion } from "framer-motion";
import { HeroTitle } from "./hero/HeroTitle";
import { HeroFeatures } from "./hero/HeroFeatures";
import { HeroButtons } from "./hero/HeroButtons";
import { useEffect, useState } from "react";

// Star component for the animated background
const Star = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-0.5 h-0.5 bg-primary rounded-full"
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      y: [0, -20, 0],
      x: [0, 10, 0],
    }}
    transition={{
      duration: 4,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  />
);

export const HeroSection = () => {
  const [stars, setStars] = useState<number[]>([]);

  useEffect(() => {
    // Create 50 stars with random delays
    setStars(Array.from({ length: 50 }, (_, i) => Math.random() * 3));
  }, []);

  return (
    <div className="relative w-full">
      {/* Background image with overlay - now covers full width */}
      <div 
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/lovable-uploads/78755e93-23d8-47a2-815a-90bfd6291210.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.2)',
        }}
      />

      {/* Stars container that covers the entire viewport */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
        {stars.map((delay, index) => (
          <Star key={index} delay={delay} />
        ))}
      </div>

      {/* Hero content section - now properly positioned */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-24 z-20">
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
      </section>
    </div>
  );
};