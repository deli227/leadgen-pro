import { motion } from "framer-motion";

interface RobotMascotProps {
  className?: string;
}

export const RobotMascot = ({ className }: RobotMascotProps) => {
  return (
    <motion.div
      className={`absolute right-[-100px] top-20 lg:right-0 w-[200px] h-[200px] z-10 ${className || ''}`}
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
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
};