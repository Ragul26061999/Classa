'use client';

import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { RotatingSpan } from './RotatingSpan';
import { Hero3DBackground } from './Hero3DBackground';

export const HeroSection = () => {
  const rotatingTexts = [
    "Learning",
    "Teaching",
    "Management-Tools"
  ];

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Hero3DBackground />
      
      <div className="max-w-7xl mx-auto w-full px-6 md:px-8 py-12 lg:py-24 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Animated Icons */}
          <AnimatePresence>
            {/* Removed AnimatedIcons in favor of 3D background */}
          </AnimatePresence>
          
          {/* Left Content */}
          <div className="flex-1">
            <div className="mb-6">
              <span className="inline-block text-blue-400 text-3xl mr-2 align-middle animate-pulse">✦</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-900 mb-6">
              Empowering Institutions with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(99,102,241,0.7)] animate-pulse">
                Smart
              </span>{' '}
              <RotatingSpan texts={rotatingTexts} />
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              A next-generation EdTech ecosystem that seamlessly integrates smart classrooms, institutional management, and data-driven insights to elevate learning outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a 
                href="#" 
                className="relative px-8 py-3.5 rounded-xl border-2 border-gray-900 bg-white text-gray-900 font-semibold flex items-center justify-center gap-2 overflow-hidden group"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    transform: 'perspective(500px) rotateX(0deg)',
                    transformStyle: 'preserve-3d',
                  }}
                />
                <motion.span 
                  className="relative z-10 flex items-center gap-2"
                  whileHover={{ scale: 1.03 }}
                >
                  Book a Demo
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </motion.span>
              </motion.a>

              <motion.a 
                href="#" 
                className="relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 overflow-hidden group"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <motion.span 
                  className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    transform: 'perspective(500px) rotateX(0deg)',
                    transformStyle: 'preserve-3d',
                  }}
                />
                <motion.span 
                  className="relative z-10 flex items-center gap-2"
                  whileHover={{ scale: 1.03 }}
                >
                  Learn More
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </motion.span>
              </motion.a>
            </div>
          </div>

          {/* Right Content - Placeholder for image or illustration */}
          <div className="flex-1 flex items-center justify-center relative min-h-[400px] lg:min-h-[500px]">
            {/* Background Circle with glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full z-0 blur-sm animate-pulse-glow" />
            
            {/* Placeholder for hero image */}
            <div className="relative z-10 w-full h-full max-w-md">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl backdrop-blur-sm" />
                <div className="absolute inset-4 border-2 border-dashed border-blue-300/50 rounded-2xl flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Hero Illustration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
