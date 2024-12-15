import { motion } from "framer-motion";

interface RobotMascotProps {
  className?: string;
}

export const RobotMascot = ({ className }: RobotMascotProps) => {
  return (
    <motion.div
      className={`relative ${className || ''}`}
      initial={{ y: 0, rotate: -5 }}
      animate={{ 
        y: [0, -5, 0],
        rotate: [-5, 5, -5]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <img 
        src="/lovable-uploads/2ad32f21-c100-4971-b366-231debdb7ab2.png"
        alt="Robot mascot"
        className="w-full h-full object-contain max-w-[30px] mx-auto" // Réduit à 30px
      />
    </motion.div>
  );
};