'use client';

import { motion } from 'framer-motion';
import { 
  FaBook, 
  FaGraduationCap, 
  FaLightbulb, 
  FaPencilAlt, 
  FaCalculator, 
  FaFlask, 
  FaPalette, 
  FaLaptopCode 
} from 'react-icons/fa';

const getRandomPosition = () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  rotate: Math.random() * 360,
  scale: 0.6 + Math.random() * 0.5
});

interface AnimatedIconProps {
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
  index: number;
}

const AnimatedIcon = ({ Icon, color, index }: AnimatedIconProps) => {
  const positions = Array(5).fill(0).map(getRandomPosition);
  
  return (
    <motion.div
      className="absolute text-4xl"
      initial={positions[0]}
      animate={{
        x: positions.map(p => `${p.x}%`),
        y: positions.map(p => `${p.y}%`),
        rotate: positions.map(p => p.rotate),
        scale: positions.map(p => p.scale)
      }}
      transition={{
        duration: 60 + Math.random() * 40,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse',
        times: [0, 0.25, 0.5, 0.75, 1],
        delay: index * 1.5
      }}
      style={{
        color,
        filter: 'drop-shadow(2px 4px 4px rgba(0,0,0,0.2))',
        zIndex: 10
      }}
    >
      <Icon />
    </motion.div>
  );
};

export const AnimatedIcons = () => {
  const icons = [
    { Icon: FaBook, color: '#10b981' },
    { Icon: FaGraduationCap, color: '#8b5cf6' },
    { Icon: FaLightbulb, color: '#f59e0b' },
    { Icon: FaPencilAlt, color: '#ec4899' },
    { Icon: FaCalculator, color: '#14b8a6' },
    { Icon: FaFlask, color: '#8b5cf6' },
    { Icon: FaPalette, color: '#f97316' },
    { Icon: FaLaptopCode, color: '#3b82f6' }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      {icons.map(({ Icon, color }, index) => (
        <AnimatedIcon key={index} Icon={Icon} color={color} index={index} />
      ))}
    </div>
  );
};

export default AnimatedIcons;
