import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Date cible : 22 décembre 2024 à 20h00 (heure de Paris)
      const targetDate = new Date('2024-12-22T20:00:00+01:00');
      const now = new Date();
      
      console.log('Target date:', targetDate);
      console.log('Current date:', now);
      
      const difference = targetDate.getTime() - now.getTime();
      console.log('Time difference in ms:', difference);

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        console.log('Calculated time:', { days, hours, minutes, seconds });
        
        setTimeLeft({
          days,
          hours,
          minutes,
          seconds
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculer immédiatement
    calculateTimeLeft();
    
    // Mettre à jour chaque seconde
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center space-y-2 mt-8"
    >
      <p className="text-primary font-semibold">Lancement de LeadGen Pro</p>
      <div className="flex flex-wrap justify-center gap-4 text-white">
        <div className="flex flex-col items-center">
          <div className="bg-secondary-dark/50 backdrop-blur-sm rounded-lg p-3 min-w-[70px]">
            <span className="text-2xl font-bold">{String(timeLeft.days).padStart(2, '0')}</span>
          </div>
          <span className="text-sm mt-1">Jours</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-secondary-dark/50 backdrop-blur-sm rounded-lg p-3 min-w-[70px]">
            <span className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
          </div>
          <span className="text-sm mt-1">Heures</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-secondary-dark/50 backdrop-blur-sm rounded-lg p-3 min-w-[70px]">
            <span className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
          </div>
          <span className="text-sm mt-1">Minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-secondary-dark/50 backdrop-blur-sm rounded-lg p-3 min-w-[70px]">
            <span className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
          <span className="text-sm mt-1">Secondes</span>
        </div>
      </div>
    </motion.div>
  );
};