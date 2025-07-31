'use client';
import { useEffect, useRef, useState } from 'react';
import { Analytics } from "@vercel/analytics/next"
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, useAnimation, useScroll, useTransform } from 'framer-motion';
import { 
  FaLayerGroup, 
  FaRobot, 
  FaMapMarkedAlt, 
  FaChartLine, 
  FaChalkboardTeacher, 
  FaUserFriends, 
  FaCloud,
  FaPaperPlane, 
  FaBook, 
  FaGraduationCap, 
  FaLightbulb, 
  FaPencilAlt, 
  FaCalculator, 
  FaFlask, 
  FaMusic, 
  FaPalette, 
  FaGlobeAmericas,
  FaAtom,
  FaLaptopCode,
  FaHome,
  FaInfoCircle,
  FaUserTie,
  FaRocket
} from 'react-icons/fa';

import { useInView } from 'react-intersection-observer';
import Feature from './whychooseclassa/WhyChooseClassAFeature';
import Header from './components/Header';

// Import components with SSR disabled to avoid hydration issues
const School3DBackground = dynamic(() => import('./components/School3DBackground'), { ssr: false });
const ContactUs = dynamic(() => import('./contactus/page'), { ssr: false });
const OnePlatform = dynamic(() => import('./oneplatform/page'), { ssr: false });
const Offers = dynamic(() => import('./offers/page'), { ssr: false });
const WhyChooseClassA = dynamic(() => import('./whychooseclassa/page'), { ssr: false });

function RotatingSpan() {
  const rotatingTexts = [
    "Learning",
    "Teaching",
    "Management-Tools"
  ];

  const [visibleIdx, setVisibleIdx] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * rotatingTexts.length);
      } while (nextIdx === visibleIdx && rotatingTexts.length > 1);
      setVisibleIdx(nextIdx);
    }, 3000); // Increased duration for better animation visibility
    
    return () => clearInterval(interval);
  }, [visibleIdx, rotatingTexts.length]);
  
  return (
    <div className="relative h-20 overflow-hidden flex items-center">
     
      <AnimatePresence mode="wait">
        <motion.div 
          key={visibleIdx}
          className="flex space-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {rotatingTexts[visibleIdx].split('').map((char, index) => (
            <motion.span
              key={`${visibleIdx}-${index}`}
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ 
                y: 50, 
                rotateX: -90,
                opacity: 0,
                textShadow: '0 0 8px rgba(147, 51, 234, 0.8)'
              }}
              animate={{ 
                y: 0, 
                rotateX: 0,
                opacity: 1,
                textShadow: '0 0 0px rgba(147, 51, 234, 0)'
              }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1],
                rotateX: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
              }}
              style={{
                display: 'inline-block',
                transformStyle: 'preserve-3d',
                transformOrigin: 'bottom center',
                backfaceVisibility: 'hidden',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const features = [
  {
    icon: <FaLayerGroup className="text-blue-500" />, 
    title: "All-in-One Platform", 
    description: "One login for learning, assessment, management, and communication."
  },
  {
    icon: <FaRobot className="text-purple-500" />,
    title: "AI That Works for You",
    description: "Our SENSAI assistant answers doubts, personalised learning, and automates tasks—24/7."
  },
  {
    icon: <FaMapMarkedAlt className="text-green-500" />,
    title: "Built for India",
    description: "Aligned with NEET, & NCERT. Local focus, global quality."
  },
  {
    icon: <FaChartLine className="text-pink-500" />,
    title: "Boost Results",
    description: "Improve academic scores by 20% with adaptive paths & real-time feedback."
  },
  {
    icon: <FaChalkboardTeacher className="text-yellow-500" />,
    title: "Teachers Love It",
    description: "Create tests in minutes, track performance instantly, and teach smarter—not harder."
  },
  {
    icon: <FaUserFriends className="text-cyan-500" />,
    title: "Parents Stay Connected",
    description: "Transparent progress reports and real-time updates, anytime, anywhere."
  },
  {
    icon: <FaCloud className="text-indigo-500" />,
    title: "Scalable & Secure",
    description: "Cloud-native, mobile-first, and enterprise-ready."
  },
];

// Animated Floating Button Component
const AnimatedFloatingButton = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
  };

  // Calculate button position based on scroll
  const buttonY = Math.min(scrollY * 0.1, 100);

  return (
    <motion.div
      ref={buttonRef}
      className="fixed bottom-6 right-6 z-50"
      style={{
        transform: `translateY(${buttonY}px)`,
      }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ 
        scale: 1, 
        rotate: 0,
        y: buttonY
      }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        duration: 0.8
      }}
    >
      <motion.button
        onClick={handleClick}
        className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center text-white text-xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden"
        animate={isClicked ? {
          scale: [1, 1.5, 0.8, 1.2, 1],
          rotate: [0, 180, -90, 45, 0],
          boxShadow: [
            "0 10px 30px rgba(59, 130, 246, 0.5)",
            "0 20px 60px rgba(147, 51, 234, 0.8)",
            "0 30px 80px rgba(59, 130, 246, 0.6)",
            "0 15px 40px rgba(147, 51, 234, 0.4)",
            "0 10px 30px rgba(59, 130, 246, 0.5)"
          ]
        } : {}}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 15px 40px rgba(59, 130, 246, 0.6)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={isClicked ? {
            scale: [1, 2, 0.5, 1.5, 1],
            opacity: [1, 0.8, 0.3, 0.9, 1]
          } : {}}
          transition={{ duration: 0.6 }}
        >
          <FaRocket />
        </motion.div>
        
        {/* Burst particles */}
        {isClicked && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 1
                }}
                animate={{
                  x: Math.cos((i * Math.PI * 2) / 8) * 40,
                  y: Math.sin((i * Math.PI * 2) / 8) * 40,
                  scale: [0, 1, 0],
                  opacity: [1, 0.8, 0]
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

function HomeContent() {
  const [showOnePlatform, setShowOnePlatform] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const [showWhyChooseClassA, setShowWhyChooseClassA] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);
  
  const [onePlatformRef, onePlatformInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [offersRef, offersInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [whyChooseClassARef, whyChooseClassAInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const [contactUsRef, contactUsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (onePlatformInView) {
      setShowOnePlatform(true);
    }
  }, [onePlatformInView]);

  useEffect(() => {
    if (offersInView) {
      setShowOffers(true);
    }
  }, [offersInView]);
  
  useEffect(() => {
    if (whyChooseClassAInView) {
      setShowWhyChooseClassA(true);
    }
  }, [whyChooseClassAInView]);
  
  useEffect(() => {
    if (contactUsInView) {
      setShowContactUs(true);
    }
  }, [contactUsInView]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#edf0ff] to-[#ffffff] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-xl" />
      
      {/* Header */}
      <Header />
      
      {/* Add padding to account for fixed header */}
      <div className="h-16 md:h-20"></div>
      
      {/* Hero Section */}
      <main className="flex flex-1 flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto w-full px-6 md:px-8 py-8 lg:py-12 gap-12 lg:gap-16 relative z-10">
        {/* Left Side */}
        <div className="flex-1 flex flex-col items-start justify-center max-w-2xl">
          <div className="mb-6">
            <span className="inline-block text-blue-400 text-3xl mr-2 align-middle animate-pulse">✦</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-tight text-gray-900 mb-6">
            Empowering Institutions with{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(99,102,241,0.7)] animate-pulse">Smart</span>{' '}
            <RotatingSpan />
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            A next-generation EdTech ecosystem that seamlessly integrates smart classrooms, institutional management, and data-driven insights to elevate learning outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
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
                Explore Modules
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </motion.span>
              <motion.span 
                className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-xl transition-all duration-300"
                style={{
                  transform: 'translateZ(10px)',
                  boxShadow: '0 10px 30px -10px rgba(79, 70, 229, 0.5)'
                }}
              />
            </motion.a>
          </div>
        </div>
        
        {/* Right Side */}
        <div className="flex-1 flex items-center justify-center relative min-h-[400px] lg:min-h-[500px]">
          {/* Background Circle with glow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full z-0 blur-sm animate-pulse-glow" />
          
          {/* Additional decorative circles */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 lg:w-72 lg:h-72 bg-white/40 rounded-full z-0" />
          
          {/* Student Images */}
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="relative">
              {/* Animated gradient background */}
              <motion.div 
                className="absolute -inset-2 rounded-full blur-xl"
                animate={{
                  background: [
                    'linear-gradient(135deg, #93C5FD 0%, #93C5FD 50%, #93C5FD 100%)',
                    'linear-gradient(135deg, #6EE7B7 0%, #6EE7B7 50%, #6EE7B7 100%)',
                    'linear-gradient(135deg, #FCA5A5 0%, #FCA5A5 50%, #FCA5A5 100%)',
                    'linear-gradient(135deg, #FDE68A 0%, #FDE68A 50%, #FDE68A 100%)',
                    'linear-gradient(135deg, #C4B5FD 0%, #C4B5FD 50%, #C4B5FD 100%)',
                    'linear-gradient(135deg, #F9A8D4 0%, #F9A8D4 50%, #F9A8D4 100%)',
                  ]
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <div className="absolute -inset-2 rounded-full bg-white/30 backdrop-blur-sm" />
              <img
                src="/image/1.jpeg"
                alt="Joyful School Child"
                className="w-56 h-56 lg:w-80 lg:h-80 object-cover object-center rounded-full border-8 border-white shadow-2xl bg-white relative z-10 hover:shadow-3xl hover:shadow-blue-400/50 transition-all duration-500 hover:scale-105 animate-float"
              />
              
              {/* Floating Icons with enhanced styling */}
              <div className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6 animate-float-slow">
                <div className="w-10 h-10 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 4.5A2.5 2.5 0 016.5 7H20v10H6.5A2.5 2.5 0 014 14.5v-10z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 animate-float-medium">
                <div className="w-10 h-10 lg:w-14 lg:h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                    <rect x="6" y="4" width="4" height="16" rx="2"/>
                    <rect x="14" y="4" width="4" height="16" rx="2"/>
                  </svg>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 animate-float-fast">
                <div className="w-10 h-10 lg:w-14 lg:h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <svg width="30" height="30" fill="white" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 animate-float-slow">
                <div className="w-10 h-10 lg:w-14 lg:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 19h8a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* One Platform Section */}
      <div ref={onePlatformRef} className="min-h-screen w-full">
        {showOnePlatform && <OnePlatform />}
      </div>
      <div ref={whyChooseClassARef} className="min-h-screen w-full">
        {showWhyChooseClassA && <WhyChooseClassA />}
      </div>
      <div 
        ref={node => {contactUsRef(node);if (node) contactSectionRef.current = node;}} 
        className="min-h-screen w-full">
        {showContactUs && <ContactUs />}
      </div>
    </div> 
  );
}


const Home = () => {
  return (
    <div className="relative min-h-screen">
      <School3DBackground />
      <HomeContent />
      <AnimatePresence>
        {/* {showIcons && <AnimatedIcons />} */}
      </AnimatePresence>
    </div>
  );
};


export default Home;
