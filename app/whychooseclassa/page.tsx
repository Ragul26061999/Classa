import React from "react";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { FaLayerGroup, FaRobot, FaMapMarkedAlt, FaChartLine, FaChalkboardTeacher, FaUserFriends, FaCloud } from "react-icons/fa";

// Background gradient colors
const backgroundGradients = [
  'from-blue-50 via-white to-purple-50',
  'from-purple-50 via-white to-blue-50',
];

// Define the color palette with subtle gradients
const cardColors = [
  "#93C5FD", "#6EE7B7", "#FCA5A5", "#FEE2E2", "#FDE68A", "#C4B5FD", "#F9A8D4"
];

// Enhanced features array with animations and styles
// Define a type for the animation configuration to ensure type safety
import type { Variant } from 'framer-motion';

type FeatureAnimation = {
  x?: number | number[];
  y?: number | number[];
  scale?: number | number[];
  rotate?: number | number[];
  opacity?: number | number[];
  transition?: {
    duration: number;
    repeat: number;
    ease: 'easeIn' | 'easeOut' | 'easeInOut' | 'linear' | [number, number, number, number];
  };
};

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  animation: FeatureAnimation;
}

const features: Feature[] = [
  {
    icon: <FaLayerGroup className="text-blue-600 text-3xl" />,
    title: "All-in-One Platform",
    description: "One login for learning, assessment, management, and communication.",
    animation: { y: [0, -5, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } }
  },
  {
    icon: <FaRobot className="text-emerald-600 text-3xl" />,
    title: "AI That Works for You",
    description: "Our SENSAI assistant answers doubts, personalized learning, and automates tasks—24/7.",
    animation: { rotate: [0, 10, -10, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
  },
  {
    icon: <FaMapMarkedAlt className="text-amber-500 text-3xl" />,
    title: "Built for India",
    description: "Aligned with NEET, & NCERT. Local focus, global quality.",
    animation: { scale: [1, 1.1, 1], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } }
  },
  {
    icon: <FaChartLine className="text-rose-600 text-3xl" />,
    title: "Boost Results",
    description: "Improve academic scores by 20% with adaptive paths & real-time feedback.",
    animation: { x: [0, 5, 0, -5, 0], transition: { duration: 5, repeat: Infinity, ease: [0.42, 0, 0.58, 1] } }
  },
  {
    icon: <FaChalkboardTeacher className="text-violet-600 text-3xl" />,
    title: "Teachers Love It",
    description: "Create tests in minutes, track performance instantly, and teach smarter—not harder.",
    animation: { y: [0, -8, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } }
  },
  {
    icon: <FaUserFriends className="text-fuchsia-600 text-3xl" />,
    title: "Parents Stay Connected",
    description: "Transparent progress reports and real-time updates, anytime, anywhere.",
    animation: { rotate: [0, 10, -10, 0], transition: { duration: 6, repeat: Infinity, ease: [0.42, 0, 0.58, 1] } }
  },
  {
    icon: <FaCloud className="text-sky-500 text-3xl" />,
    title: "Cloud-Powered Learning",
    description: "Access your learning materials and progress from any device, anywhere, anytime.",
    animation: { scale: [1, 1.15, 1], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
  }
];

const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-gradient-to-br from-blue-100 to-purple-100"
        style={{
          width: `${Math.random() * 200 + 100}px`,
          height: `${Math.random() * 200 + 100}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: 0.3,
          filter: 'blur(40px)'
        }}
        animate={{
          x: [0, Math.random() * 200 - 100],
          y: [0, Math.random() * 200 - 100],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 20 + Math.random() * 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

const AnimatedImage = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 50, stiffness: 500 };
  
  // Smooth spring animation for x and y
  const xSmooth = useSpring(x, springConfig);
  const ySmooth = useSpring(y, springConfig);
  
  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate position relative to center (-1 to 1 range)
    const xPos = (e.clientX - centerX) / 30; // Reduced sensitivity
    const yPos = (e.clientY - centerY) / 30;
    
    x.set(xPos);
    y.set(yPos);
  };
  
  // Reset on mouse leave
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      className="w-28 h-28  md:w-80 md:h-80 relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: 'perspective(1000px)'
      }}
    >
      <motion.div
        className="w-full h-full  relative"
        style={{
          transform: useMotionTemplate`
            translateZ(50px)
            rotateX(${useTransform(ySmooth, [-20, 20], [5, -5])}deg)
            rotateY(${useTransform(xSmooth, [-20, 20], [-5, 5])}deg)
            scale(1.05)
          `,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-purple-200/20 mt-80 rounded-full"
          style={{
            transform: 'translateZ(20px)'
          }}
        />
        <Image 
          src="/image/thinking2.png" 
          alt="ClassA Logo" 
          fill 
          className="object-contain"
          priority
          style={{
            filter: 'drop-shadow(0 20px 15px rgba(0,0,0,0.1))',
            transform: 'translateZ(50px)'
          }}
        />
        
      </motion.div>
      {/* Subtle reflection effect */}
      <motion.div 
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20"
        style={{
          background: 'radial-gradient(circle at 30% 30%, white, transparent 50%)',
          transform: 'translateZ(60px)',
          transition: 'opacity 0.3s ease'
        }}
      />
    </motion.div>
  );
};

const MinimalistClassAPage = () => {
  const [scrollY, setScrollY] = useState(0);
  type VisibilityState = {
    [key: `feature-${number}`]: boolean;
    hero?: boolean; // Add other possible keys if needed
  };

  const [isVisible, setIsVisible] = useState<VisibilityState>({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // Initial animation trigger for the hero section
    setTimeout(() => setIsVisible(prev => ({...prev, hero: true})), 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Removed the useEffect for IntersectionObserver on individual feature cards
  // as the new card layout is positioned absolutely and doesn't rely on scroll visibility
  // for animation in the same way.

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#F0F4F8' }}> {/* Soft, light blue-gray background */}
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/40 to-purple-200/40 rounded-full blur-3xl"
          style={{
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`,
            opacity: Math.max(0.4, 1 - scrollY * 0.001)
          }}
        />
        <div
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-200/40 to-cyan-200/40 rounded-full blur-3xl"
          style={{
            transform: `translate(${-scrollY * 0.15}px, ${scrollY * 0.08}px)`,
            opacity: Math.max(0.4, 1 - scrollY * 0.001)
          }}
        />
        <div
          className="absolute top-1/2 left-3/4 w-64 h-64 bg-gradient-to-r from-rose-200/40 to-amber-200/40 rounded-full blur-3xl"
          style={{
            transform: `translate(${scrollY * 0.08}px, ${-scrollY * 0.12}px)`,
            opacity: Math.max(0.4, 1 - scrollY * 0.001)
          }}
        />
      </div>

      {/* Hero Section */}
      <div className="pt-10 pb-20 px-6 relative overflow-hidden">
        {/* Decorative Elements - Left */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-64 bg-gradient-to-r from-blue-300 to-transparent rounded-r-full opacity-70"
          initial={{ x: -100, opacity: 0 }}
          animate={isVisible.hero ? { x: 0, opacity: 0.7 } : { x: -100, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
        
        {/* Decorative Elements - Right */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-64 bg-gradient-to-l from-purple-300 to-transparent rounded-l-full opacity-70"
          initial={{ x: 100, opacity: 0 }}
          animate={isVisible.hero ? { x: 0, opacity: 0.7 } : { x: 100, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        
        {/* Connecting Lines */}
        <motion.div
          className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={isVisible.hero ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <svg width="100%" height="100%" className="overflow-visible">
            {/* Main connecting line */}
            <motion.line
              x1="10%"
              x2="90%"
              y1="50%"
              y2="50%"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              strokeDasharray="0 1"
              initial={{ pathLength: 0 }}
              animate={isVisible.hero ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }}
            />
            {/* Dashed lines */}
            {[20, 30, 40, 50, 60, 70, 80].map((yOffset, i) => (
              <motion.line
                key={i}
                x1="15%"
                x2="85%"
                y1={`${yOffset}%`}
                y2={`${yOffset}%`}
                stroke="url(#lineGradient)"
                strokeWidth="0.5"
                strokeDasharray="4 2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isVisible.hero ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1 + (i * 0.1),
                  ease: 'easeOut'
                }}
              />
            ))}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute left-1/4 top-1/4 w-20 h-20 rounded-full bg-blue-200/50 blur-xl"
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute right-1/4 bottom-1/4 w-20 h-20 rounded-full bg-purple-200/50 blur-xl"
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 7,
            delay: 1,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            className="text-5xl md:text-7xl font-light text-slate-800 mb-4 tracking-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={isVisible.hero ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            Why Choose
          </motion.h1>
          <motion.div
            className="text-5xl md:text-7xl font-light bg-gradient-to-r from-blue-600 via-purple-600 to-red-500 bg-clip-text text-transparent mb-12 tracking-tight"
            style={{ fontFamily: 'Blinker, sans-serif' }}
            initial={{ y: 30, opacity: 0 }}
            animate={isVisible.hero ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            CLASSA
          </motion.div>
          <motion.div
            className="w-12 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={isVisible.hero ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </div>
      </div>

      {/* NEW Feature Cards - Infographic Style */}
      <div className="min-h-screen flex items-center justify-center p-4 font-sans text-white">
        <div className="relative w-full max-w-5xl aspect-[16/10] flex flex-col items-center justify-center">
          {/* Main title and description for the infographic section */}

          {/* Central Image */}
          <motion.div 
            className="relative w-120 h-120 md:w-80 md:h-80 flex items-center justify-center z-20 group"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { 
                duration: 0.5, 
                delay: 0.5, 
                type: "spring", 
                stiffness: 100 
              } 
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            {/* Animated gradient background */}
            <motion.div 
              className="absolute inset-0 rounded-full"
              initial={{
                background: 'linear-gradient(45deg, #93C5FD, #C4B5FD, #F9A8D4)'
              }}
              animate={{
                background: [
                  'linear-gradient(45deg, #93C5FD, #C4B5FD, #F9A8D4)',
                  'linear-gradient(135deg, #C4B5FD, #F9A8D4, #93C5FD)',
                  'linear-gradient(225deg, #F9A8D4, #93C5FD, #C4B5FD)',
                  'linear-gradient(315deg, #93C5FD, #C4B5FD, #F9A8D4)'
                ]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                filter: 'blur(20px)',
                opacity: 0.7,
                transform: 'rotate(3deg)'
              }}
            />
            
            {/* 3D Animated Image Component */}
            <AnimatedImage />
            
            {/* Subtle floating animation */}
            <motion.div 
              className="absolute inset-0 rounded-full"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 1, 0, -1, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </motion.div>

          {/* Feature Cards - positioned absolutely around the lightbulb */}
          {features.map((feature, index) => {
            // Calculate positions for each card to mimic the infographic layout
            // These are approximate values and may need fine-tuning for perfect alignment
            const positions = [
              { top: '53.5%', left: '-11%' },   // 01 Bottom-left
              { top: '22%', left: '-11%' },   // 02 Mid-left
              { top: '-10%', left: '-11%' },   // 03 Top-left
              { top: '-10%', left: '37.5%', transform: 'translateX(-50%)' }, // 04 Top-center
              { top: '-10%', right: '-11%' },  // 05 Top-right
              { top: '22%', right: '-11%' },  // 06 Mid-right
              { top: '53.5%', right: '-11%' }    // 07 Bottom-right
            ];

            const currentPosition = positions[index];

            return (
              <motion.div 
                key={index}
                className="absolute w-56 md:w-72"
                style={{
                  top: currentPosition.top,
                  left: currentPosition.left,
                  right: currentPosition.right,
                  transform: currentPosition.transform || 'none',
                }}
                // whileHover={{ y: -5, boxShadow: '0 20px 30px -10px rgba(140, 165, 233, 0.98)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: [1, 4, 1],
                  scale: [1, 1.05, 1],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: features.length * 1.5,
                    delay: index * 1.5,
                    ease: 'easeInOut'
                  }
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative">
                  <svg viewBox="0 0 400 280" className="w-full h-auto">
                    <path
                      d="M375 0H25C11.1929 0 0 11.1929 0 25V220C0 233.807 11.1929 245 25 245H375C388.807 245 400 233.807 400 220V25C400 11.1929 388.807 0 375 0ZM75 245L50 270L25 245H75Z"
                      fill={cardColors[index]}
                      className="drop-shadow-lg"
                      style={{ opacity: 0.9 }} />
                  </svg>
                  <div className="absolute inset-0 p-6 flex flex-col h-full">
                    <div className="flex items-start mb-4 w-full">
                      <motion.div
                        className="p-2.5 rounded-lg bg-white/70 shadow-sm mr-3.5 flex-shrink-0"
                        animate={feature.animation}
                      >
                        {feature.icon}
                      </motion.div>
                      <h3 className="text-base md:text-lg font-bold text-slate-800 mt-0.5">{feature.title}</h3>
                    </div>
                    <p className="text-sm md:text-[0.9rem] text-slate-700 leading-relaxed mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .message-box {
          position: relative;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          overflow: visible;
        }
        
        /* Left side boxes (point right) */
        .message-box--left::after {
          content: '';
          position: absolute;
          right: -12px;
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          width: 0;
          height: 0;
          border: 10px solid transparent;
          border-left-color: inherit;
          border-right: 0;
          filter: drop-shadow(2px 0 2px rgba(0,0,0,0.1));
        }
        
        /* Right side boxes (point left) */
        .message-box--right::after {
          content: '';
          position: absolute;
          left: -12px;
          top: 50%;
          transform: translateY(-50%) rotate(90deg);
          width: 0;
          height: 0;
          border: 10px solid transparent;
          border-right-color: inherit;
          border-left: 0;
          filter: drop-shadow(-2px 0 2px rgba(0,0,0,0.1));
        }
        
        /* Top center box (point down) */
        .message-box--top::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -12px;
          transform: translateX(-50%) rotate(0deg);
          width: 0;
          height: 0;
          border: 10px solid transparent;
          border-top-color: inherit;
          border-bottom: 0;
          filter: drop-shadow(0 2px 2px rgba(0,0,0,0.1));
        }
        
        .message-box:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 5px 15px rgba(0,0,0,0.15);
        }
      `}</style>
    </main>
  );
};

export default MinimalistClassAPage;