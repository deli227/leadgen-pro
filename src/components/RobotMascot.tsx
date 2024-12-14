import { motion } from "framer-motion";

interface RobotMascotProps {
  className?: string;
}

export const RobotMascot = ({ className }: RobotMascotProps) => {
  return (
    <motion.div
      className={`relative w-full h-full ${className || ''}`}
      initial={{ y: 20, rotate: -5 }}
      animate={{ 
        y: [20, -20, 20],
        rotate: [-5, 5, -5]
      }}
      transition={{ 
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <img 
        src="/lovable-uploads/2ad32f21-c100-4971-b366-231debdb7ab2.png"
        alt="Robot mascot"
        className="w-full h-full object-contain max-w-[300px] mx-auto"
      />
    </motion.div>
  );
};