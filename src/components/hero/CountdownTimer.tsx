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
    const targetDate = new Date('2024-03-22T18:00:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center space-y-2 mt-8"
    >
      <p className="text-primary font-semibold">Offre limitée - Se termine dans :</p>
      <div className="flex space-x-4 text-white">
        <div className="flex flex-col items-center">
          <div className="bg-secondary-dark/50 backdrop-blur-sm rounded-lg p-3 min-w-[70px]">
            <span className="text-2xl font-bold">{timeLeft.days}</span>
          </div>
          <span className="text-sm mt-1">Jours</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-secondary-dark/50 backdrop-blur-sm rounded-lg p-3 min-w-[70px]">
            <span className="text-2xl font-bold">{timeLeft.hours}</span>
          </div>
          <span className="text-sm mt-1">Heures</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-secondary-dark/50 backdrop-blur-sm rounded-lg p-3 min-w-[70px]">
            <span className="text-2xl font-bold">{timeLeft.minutes}</span>
          </div>
          <span className="text-sm mt-1">Minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-secondary-dark/50 backdrop-blur-sm rounded-lg p-3 min-w-[70px]">
            <span className="text-2xl font-bold">{timeLeft.seconds}</span>
          </div>
          <span className="text-sm mt-1">Secondes</span>
        </div>
      </div>
    </motion.div>
  );
};