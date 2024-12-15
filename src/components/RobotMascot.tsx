import { motion } from "framer-motion";

interface RobotMascotProps {
  className?: string;
}

export const RobotMascot = ({ className }: RobotMascotProps) => {
  return (
    <motion.div
      className={`inline-block ${className || ''}`}
      initial={{ rotate: -10 }}
      animate={{ 
        rotate: [0, -10, 0],
      }}
      transition={{ 
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <img 
        src="/lovable-uploads/2ad32f21-c100-4971-b366-231debdb7ab2.png"
        alt="Robot mascot"
        className="w-full h-full object-contain max-w-[25px]"
      />
    </motion.div>
  );
};