'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence, Variants } from 'framer-motion';
import WhatWeDo from '../whatwedo/page';
import Teams from '../teams/page';
import ContactUs from '../contactus/page';
import { div } from 'framer-motion/client';
import Header from '../components/Header';

// Reusable AnimatedText component for smooth letter-by-letter animation with sequential paragraph reveal
const AnimatedText = ({ 
  text, 
  className = '',
  delay = 0,
  isActive = true
}: { 
  text: string; 
  className?: string;
  delay?: number;
  isActive?: boolean;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [visibleChars, setVisibleChars] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Handle the animation sequence
  useEffect(() => {
    if (!isActive) {
      setVisibleChars(0);
      setHasAnimated(false);
      return;
    }

    if (hasAnimated) return;

    const totalChars = text.replace(/\s+/g, '').length;
    let currentChar = 0;
    
    const animate = () => {
      if (currentChar <= totalChars) {
        setVisibleChars(currentChar);
        currentChar++;
        setTimeout(animate, Math.random() * 15 + 15); // Faster animation for better flow
      } else {
        setHasAnimated(true);
      }
    };
    
    const timer = setTimeout(animate, 300 + delay); // Add delay based on paragraph position
    
    return () => clearTimeout(timer);
  }, [isActive, text, delay, hasAnimated]);

  // Render characters with animation
  let charCount = -1;
  return (
    <span ref={ref} className={`inline-block ${className} overflow-hidden`}>
      {text.split('').map((char, index) => {
        if (char.trim() !== '') charCount++;
        const isVisible = char.trim() === '' ? true : charCount < visibleChars;
        
        return (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 10,
            }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      })}
    </span>
  );
};

// Wrapper component to handle paragraph sequencing (kept as is, not directly part of vision/mission changes)
const AnimatedParagraphs = ({ items }: { items: string[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  // Handle automatic progression to next paragraph
  useEffect(() => {
    if (!isInView) {
      setActiveIndex(0);
      return;
    }

    const timer = setTimeout(() => {
      setActiveIndex(prev => Math.min(prev + 1, items.length - 1));
    }, 1500); // Time before showing next paragraph

    return () => clearTimeout(timer);
  }, [isInView, activeIndex, items.length]);

  return (
    <div ref={containerRef} className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="overflow-hidden">
          <AnimatedText 
            text={item} 
            delay={index * 300} 
            isActive={index <= activeIndex}
          />
        </div>
      ))}
    </div>
  );
};

// Animation variants for staggered appearance of features
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // Slightly faster stagger for a snappier feel
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1]
    } 
  }
};

export default function App() {
  const [showWhatWeDo, setShowWhatWeDo] = useState(true);
  const [showTeams, setShowTeams] = useState(true);
  const [showContactUs, setShowContactUs] = useState(true);
  
  // Function to toggle between views
  const toggleView = (view: 'whatwedo' | 'teams' | 'contactus') => {
    setShowWhatWeDo(view === 'whatwedo');
    setShowTeams(view === 'teams');
    setShowContactUs(view === 'contactus');
  };
  const WhatWeDoRef = useRef<HTMLDivElement>(null);
  const TeamsRef = useRef<HTMLDivElement>(null);
  const ContactUsRef = useRef<HTMLDivElement>(null);

  // Parallax effect for the background overlay
  const { scrollYProgress } = useScroll();
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]); // Increased parallax depth

  // Define features data with inline SVG icons
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
        </svg>
      ),
      bg: "bg-blue-50",
      title: "Smart Learning",
      description: "Personalized learning paths powered by AI to enhance student engagement and outcomes.",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M20 17.0001H4C3.44772 17.0001 3 16.5524 3 16.0001V5.00006C3 4.44778 3.44772 4.00006 4 4.00006H20C20.5523 4.00006 21 4.44778 21 5.00006V16.0001C21 16.5524 20.5523 17.0001 20 17.0001Z"/>
          <path d="M2 17L22 17"/>
        </svg>
      ),
      bg: "bg-purple-50",
      title: "Seamless Integration",
      description: "One platform for all your educational needs, from attendance to assessments.",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M12 2a3 3 0 0 0-3 3v.5a3 3 0 0 0-3 3V12a3 3 0 0 0 3 3h.5a3 3 0 0 0 3 3V22"/>
          <path d="M12 22a3 3 0 0 0 3-3v-.5a3 3 0 0 0 3-3V12a3 3 0 0 0-3-3h-.5a3 3 0 0 0-3-3V2"/>
        </svg>
      ),
      bg: "bg-green-50",
      title: "AI-Powered",
      description: "Advanced analytics and insights to drive better educational decisions.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      bg: "bg-pink-50",
      title: "Secure & Reliable",
      description: "Enterprise-grade security to protect your data and privacy.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Main page container with a subtle fade-in animation for the entire page */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Initial state for page entry
        animate={{ opacity: 1, y: 0 }}   // Animate to full visibility
        transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition for page load
        className="font-inter antialiased pt-16 md:pt-20" // Apply Inter font and anti-aliasing and padding for fixed header
      >
      {/* Main section with a subtle gradient background */}
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden relative">
        {/* Premium Animated Background */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          {/* Ultra-smooth gradient base */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-slate-100" />
          
          {/* Sophisticated animated orbs */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl"
              animate={{
                x: [0, 30, 0],
                y: [0, -30, 0],
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-purple-400/20 to-pink-400/20 blur-3xl"
              animate={{
                x: [0, -40, 0],
                y: [0, 40, 0],
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
            <motion.div
              className="absolute top-[30%] left-[60%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-indigo-400/15 to-cyan-400/15 blur-3xl"
              animate={{
                x: [0, -20, 0],
                y: [0, 20, 0],
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4
              }}
            />
          </div>
          
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
          
          {/* Elegant floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
              style={{
                left: `${15 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
          ))}
          
          {/* Premium wave divider */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/80 to-transparent backdrop-blur-sm" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10"> {/* Ensure content is above background */}
          {/* Spacer to push content down */}
          <div className="h-16 sm:h-24"></div> {/* Increased spacer for better top padding */}

          {/* Who We Are Header */}
          <motion.div
            className="text-center pb-8" // Increased bottom padding
            initial={{ opacity: 0, y: -30 }} // More pronounced initial animation
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4" // Darker, more prominent text
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            >
              Who We Are
            </motion.h1>
            <motion.div
              className="w-28 h-1.5 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full" // Gradient divider
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>

          {/* Hero Section - CLASSA Tagline */}
          <motion.div
            className="text-center pt-3 pb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight" // Darker text for main heading
              initial={{ y: 40, opacity: 0 }} // More pronounced animation
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
            >
              CLASSA – <span className="text-blue-700">Smarter Learning.</span><br /> {/* Stronger blue for emphasis */}
              <span className="text-purple-700">Seamless Management.</span> {/* Stronger purple for emphasis */}
            </motion.h1>

            <div className="w-full max-w-5xl mx-auto mb-16 space-y-10 sm:"> {/* Increased bottom margin */}
              <motion.p
                className="text-lg text-gray-700 leading-relaxed" // Standardized text color for readability
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              >
                CLASSA is a next-generation education technology platform designed to streamline
                academic delivery, student support, and school management with one unified AI-driven
                system.
              </motion.p>

              {/* Vision Section - Enhanced Design */}
              <div className="relative w-full min-h-[400px] md:min-h-[450px] overflow-hidden rounded-3xl shadow-2xl mt-24">
                {/* Background with a more dynamic split */}
                <div className="absolute inset-0 flex flex-col md:flex-row">
                  {/* Left content area background */}
                  <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 p-8 md:p-12 flex items-center justify-center relative z-10">
                    <motion.div 
                      className="space-y-8 text-left"
                      initial={{ opacity: 0, x: -100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    >
                      <motion.div 
                        className="space-y-4"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{}}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                      >
                        <motion.div
                          className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg"
                          initial={{ scale: 0, opacity: 0, rotate: -180 }}
                          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                          viewport={{}}
                          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                          whileHover={{ scale: 1.1, rotate: 15 }}
                        >
                          <motion.svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="28" 
                            height="28" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="text-white"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{}}
                            transition={{ duration: 1, delay: 0.5 }}
                          >
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </motion.svg>
                        </motion.div>
                        <motion.h3 
                          className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{}}
                          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        >
                          Our Vision
                        </motion.h3>
                        <motion.div 
                          className="h-1 w-16 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: 64 }}
                          viewport={{}}
                          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                        />
                      </motion.div>
                      
                      <motion.div 
                        className="space-y-4 text-slate-700"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{}}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                      >
                        <motion.p 
                          className="text-lg leading-relaxed"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{}}
                          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                        >
                          Revolutionize education with AI that makes learning personalized and accessible for every student.
                        </motion.p>
                        <motion.p 
                          className="text-lg leading-relaxed"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{}}
                          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                        >
                          Bridge traditional education with future-ready skills for evolving world success.
                        </motion.p>
                        <motion.p 
                          className="text-lg leading-relaxed"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{}}
                          transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                        >
                          Transform education from information access to intelligent, adaptive experiences.
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  {/* Right image area with enhanced animations */}
                  <motion.div 
                    className="w-full md:w-1/2 relative overflow-hidden flex-shrink-0"
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-indigo-600/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{}}
                      transition={{ duration: 1.2, delay: 0.4 }}
                    />
                    <motion.img
                      src="../image/visson image.png"
                      alt="Vision"
                      className="w-full h-full object-cover object-center"
                      initial={{ scale: 1.2, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{}}
                      transition={{ duration: 1.5, delay: 0.3 }}
                    />
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={`vision-particle-${i}`}
                        className="absolute w-2 h-2 bg-white/60 rounded-full"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${15 + (i % 3) * 25}%`,
                        }}
                        animate={{
                          y: [0, -30, 0],
                          opacity: [0, 0.8, 0],
                          scale: [0.5, 1.2, 0.5]
                        }}
                        transition={{
                          duration: 3 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                      />
                    ))}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-tl from-white/20 to-transparent clip-vision-angled"
                      initial={{ x: "100%" }}
                      whileInView={{ x: 0 }}
                      viewport={{}}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </motion.div>
                </div>
              </div>
              
              <style jsx>{`
                .clip-vision-angled {
                  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 15% 100%); /* Angled bottom-left */
                }
                @media (max-width: 768px) {
                  .clip-vision-angled {
                    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); /* No clip on mobile for full image */
                  }
                }
                .clip-mission-angled {
                  clip-path: polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%); /* Angled top-left */
                }
                @media (max-width: 768px) {
                  .clip-mission-angled {
                    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); /* No clip on mobile for full image */
                  }
                }
              `}</style>

              {/* Mission Section - Enhanced Design (Mirrored from Vision) */}
              <div className="relative w-full min-h-[400px] md:min-h-[450px] overflow-hidden rounded-3xl shadow-2xl mt-24">
                {/* Background with a more dynamic split */}
                <div className="absolute inset-0 flex flex-col md:flex-row">
                  {/* Right image area with enhanced animations */}
                  <motion.div 
                    className="w-full md:w-1/2 relative overflow-hidden flex-shrink-0"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tl from-yellow-400/30 to-amber-600/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{}}
                      transition={{ duration: 1.2, delay: 0.4 }}
                    />
                    <motion.img
                      src="../image/mission image.png"
                      alt="Mission"
                      className="w-full h-full object-cover object-center"
                      initial={{ scale: 1.2, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{}}
                      transition={{ duration: 1.5, delay: 0.3 }}
                    />
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={`mission-particle-${i}`}
                        className="absolute w-2 h-2 bg-white/60 rounded-full"
                        style={{
                          right: `${20 + i * 15}%`,
                          top: `${15 + (i % 3) * 25}%`,
                        }}
                        animate={{
                          y: [0, -30, 0],
                          opacity: [0, 0.8, 0],
                          scale: [0.5, 1.2, 0.5]
                        }}
                        transition={{
                          duration: 3 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                      />
                    ))}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent clip-mission-angled"
                      initial={{ x: "-100%" }}
                      whileInView={{ x: 0 }}
                      viewport={{}}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </motion.div>

                  {/* Right content area background */}
                  <div className="w-full md:w-1/2 bg-gradient-to-br from-yellow-50 to-amber-100 p-8 md:p-12 flex items-center justify-center relative z-10">
                    <motion.div 
                      className="space-y-8 text-left"
                      initial={{ opacity: 0, x: 100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    >
                      <motion.div 
                        className="space-y-4"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{}}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                      >
                        <motion.div
                          className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg"
                          initial={{ scale: 0, opacity: 0, rotate: 180 }}
                          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                          viewport={{}}
                          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                          whileHover={{ scale: 1.1, rotate: -15 }}
                        >
                          <motion.svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="28" 
                            height="28" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="text-white"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{}}
                            transition={{ duration: 1, delay: 0.5 }}
                          >
                            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                            <path d="M2 17l10 5 10-5"></path>
                            <path d="M2 12l10 5 10-5"></path>
                          </motion.svg>
                        </motion.div>
                        <motion.h3 
                          className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-amber-600"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{}}
                          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        >
                          Our Mission
                        </motion.h3>
                        <motion.div 
                          className="h-1 w-16 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: 64 }}
                          viewport={{}}
                          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                        />
                      </motion.div>
                      
                      <motion.div 
                        className="space-y-4 text-slate-700"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{}}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                      >
                        <motion.p 
                          className="text-lg leading-relaxed"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{}}
                          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                        >
                          Empower educators with intelligent tools that amplify their impact.
                        </motion.p>
                        <motion.p 
                          className="text-lg leading-relaxed"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{}}
                          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                        >
                          Create seamless experiences where technology fades into the background.
                        </motion.p>
                        <motion.p 
                          className="text-lg leading-relaxed"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{}}
                          transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                        >
                          Build bridges between ambition and achievement for every learner.
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 px-4"
            variants={containerVariants} // Use the defined container variants
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }} // Animate once when 20% visible
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 shadow-md flex flex-col items-center text-center group"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Background image - shown on hover */}
                {feature.imageUrl && (
                  <motion.div 
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                      backgroundImage: `url(${feature.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      opacity: 0,
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ 
                      opacity: 0.4,
                      transition: { duration: 0.3 }
                    }}
                  />
                )}
                
                <div className={`relative z-10 w-16 h-16 ${feature.bg} rounded-xl flex items-center justify-center mb-4 shadow-md`}>
                  {feature.icon}
                </div>
                <h3 className="relative z-10 text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                  {feature.title}
                </h3>
                <p className="relative z-10 text-gray-700 text-base group-hover:text-gray-600 transition-colors">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      </motion.div>
      <div className="relative w-full">
      <div ref={WhatWeDoRef} className="w-full">
        {showWhatWeDo && <WhatWeDo />}
      </div>
      <div ref={TeamsRef} className="min-h-screen w-full">
        {showTeams && <Teams />}
      </div>
      <div ref={ContactUsRef} className="min-h-screen w-full">
        {showContactUs && <ContactUs />}
      </div>
      </div>
    </div>
  );
}
