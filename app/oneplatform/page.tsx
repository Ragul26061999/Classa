'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Play, Check, ArrowRight, BookOpen, ClipboardCheck, Users, BarChart2 } from 'lucide-react';

// Add these styles to your global CSS
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .animate-float-delay-1 {
    animation: float 7s ease-in-out 1s infinite;
  }
  .animate-float-delay-2 {
    animation: float 8s ease-in-out 2s infinite;
  }
`;

const OnePlatform = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: 'Unified Learning',
      description: 'Seamless integration of all learning materials and resources in one place.',
      color: 'from-blue-50 to-blue-100',
      hoverColor: 'hover:from-blue-100 hover:to-blue-200',
      delay: 0.1,
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      icon: <ClipboardCheck className="w-8 h-8 text-purple-600" />,
      title: 'Smart Assessment',
      description: 'Automated grading and detailed performance analytics.',
      color: 'from-purple-50 to-purple-100',
      hoverColor: 'hover:from-purple-100 hover:to-purple-200',
      delay: 0.2,
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: 'Collaboration Hub',
      description: 'Connect and collaborate with students and educators effortlessly.',
      color: 'from-green-50 to-green-100',
      hoverColor: 'hover:from-green-100 hover:to-green-200',
      delay: 0.3,
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-orange-500" />,
      title: 'Data Insights',
      description: 'Actionable insights to track and improve learning outcomes.',
      color: 'from-orange-50 to-orange-100',
      hoverColor: 'hover:from-orange-100 hover:to-orange-200',
      delay: 0.4,
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
  ];

  const benefits = [
    {
      group: 'Educators',
      items: [
        'Streamlined course management',
        'Automated grading system',
        'Real-time student progress tracking',
      ],
      color: 'from-blue-500 to-blue-700',
    },
    {
      group: 'Students',
      items: [
        'Personalized learning paths',
        '24/7 access to materials',
        'Interactive learning tools',
      ],
      color: 'from-purple-500 to-purple-700',
    },
    {
      group: 'Administrators',
      items: [
        'Comprehensive analytics',
        'Resource optimization',
        'Simplified reporting',
      ],
      color: 'from-green-500 to-green-700',
    },
  ];

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play and loop the video
  useEffect(() => {
    if (videoRef.current) {
      // Mute is required for autoplay in most browsers
      videoRef.current.muted = true;
      videoRef.current.loop = true;
      
      const playPromise = videoRef.current.play();
      
      // Handle autoplay promise
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Autoplay failed, trying with user interaction', error);
          // Fallback: Play on user interaction
          const handleFirstInteraction = () => {
            videoRef.current?.play();
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
          };
          
          document.addEventListener('click', handleFirstInteraction);
          document.addEventListener('touchstart', handleFirstInteraction);
        });
      }
      
      setIsPlaying(true);
    }
    
    // Cleanup
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <div ref={ref} className="min-h-screen -pt-15 bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
      <style jsx global>{styles}</style>
      
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ y: y1, opacity: 0.2 }}
      >
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delay-1"></div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative py-5 md:py-14 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10"
        ></motion.div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight leading-tight">
                One Platform for All Your Learning Needs
              </h1>
              <p className="text-xl text-gray-600 mb-0 font-normal leading-relaxed max-w-3xl mx-auto">
                Transform your educational experience with our comprehensive learning platform designed for students and educators alike.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium transition-all hover:bg-blue-700"
                >
                  Get Started
                </motion.button> */}
                {/* <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(249, 250, 251, 1)' }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  Learn More
                </motion.button> */}
              </div>
            </motion.div>
          </motion.div>

          {/* Platform Preview */}
          <motion.div 
            className="relative mt-20 w-full max-w-7xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-500"
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ 
              y: -5,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
          >
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex gap-2">
              <motion.div 
                className="w-3 h-3 rounded-full bg-red-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
              />
              <motion.div 
                className="w-3 h-3 rounded-full bg-yellow-400"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ delay: 0.2, repeat: Infinity, duration: 2, repeatType: "reverse" }}
              />
              <motion.div 
                className="w-3 h-3 rounded-full bg-green-400"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ delay: 0.4, repeat: Infinity, duration: 2, repeatType: "reverse" }}
              />
            </div>
            
            <div className="relative overflow-hidden">
              <motion.div 
                className="absolute top-0 right-0 w-full h-full bg-white"
                style={{
                  clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 40% 100%)',
                  zIndex: 1
                }}
                initial={{ x: '100%' }}
                whileInView={{ x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50"></div>
              </motion.div>
              
              <div className="relative z-10 flex flex-col md:flex-row">
                <motion.div 
                  className="w-full md:w-1/2 p-8 md:p-12"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">Experience Seamless Learning</h3>
                  <p className="text-gray-600 mb-6 font-normal leading-relaxed">Our platform brings together all your educational tools in one intuitive interface, making learning more efficient and enjoyable.</p>
                  <motion.ul className="space-y-3">
                    {[
                      'Unified dashboard for all courses',
                      'Real-time collaboration tools',
                      'Smart progress tracking'
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.span 
                          className="mr-2"
                          whileHover={{ scale: 1.2 }}
                        >
                          <Check className="w-5 h-5 text-green-500" />
                        </motion.span>
                        <span className="font-normal text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
                
                <motion.div 
                  className="w-full md:w-1/2 flex items-center justify-center p-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <motion.div 
                    className="relative w-full h-64 bg-white rounded-lg shadow-inner border border-gray-200 flex items-center justify-center overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ 
                        background: [
                          'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)',
                          'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                          'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)'
                        ]
                      }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        ease: "linear"
                      }}
                    >
                      <motion.div 
                        className="text-center p-4"
                        animate={{ 
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut"
                        }}
                      >
                        <div className="relative">
                          <motion.div 
                            className="w-full max-w-2xl mx-auto overflow-hidden rounded-xl shadow-2xl"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <div className="relative aspect-video w-full max-w-4xl mx-auto">
                              <video 
                                ref={videoRef}
                                className="w-full h-full rounded-xl object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                                poster="/video/teacher-poster.jpg"
                              >
                                <source src="/video/teacher.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          </motion.div>
                          <p className="mt-4 text-center text-gray-500 font-medium">Interactive Platform Preview</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{ y: y2 }}
        >
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-2000"></div>
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.span 
              className="inline-block px-4 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 rounded-full mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Features
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Powerful Features for <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Better Learning</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Everything you need to enhance your learning experience in one place.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`relative bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-transparent overflow-hidden group ${feature.hoverColor}`}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { 
                    delay: feature.delay, 
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }}
                viewport={{ once: true, margin: "-50px 0px" }}
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
              >
                {/* Background Image - Hidden by default, shown on hover */}
                <motion.div 
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-0"
                  style={{
                    backgroundImage: `url(${feature.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10">
                  <motion.div 
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">{feature.title}</h3>
                  <motion.p 
                    className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {feature.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-rose-50 via-amber-50 to-cyan-50 text-gray-800">
        {/* Animated background elements */}
        <motion.div 
          className="absolute inset-0 opacity-40"
          style={{ y: y2 }}
        >
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-100 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-2000"></div>
        </motion.div>
        
        <div className="relative z-10">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="max-w-4xl mx-auto"
            >
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.1, duration: 0.8 }
                }}
                viewport={{ once: true }}
              >
                Transform Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-amber-500">Educational Experience</span> Today
              </motion.h2>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.2, duration: 0.8 }
                }}
                viewport={{ once: true }}
              >
                Join thousands of educational institutions already using CLASSA to enhance their learning experience with our all-in-one platform.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.3, duration: 0.8 }
                }}
                viewport={{ once: true }}
              >
                <motion.button 
                  className="relative group bg-rose-600 hover:bg-rose-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  whileHover={{ 
                    y: -2,
                    boxShadow: '0 10px 25px -5px rgba(225, 29, 72, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started for Free
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </motion.button>
                
                <motion.button 
                  className="relative group bg-white/90 hover:bg-white text-rose-700 font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-sm border border-rose-100"
                  whileHover={{ 
                    y: -2,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Schedule a Demo
                    <Play className="w-4 h-4" />
                  </span>
                </motion.button>
              </motion.div>
              
              {/* <motion.div 
                className="mt-8 text-sm text-blue-100/80"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.4, duration: 0.6 }
                }}
                viewport={{ once: true }}
              >
                No credit card required • 14-day free trial • Cancel anytime
              </motion.div> */}
            </motion.div>
          </div>
          
          {/* Floating elements */}
          <motion.div 
            className="absolute -bottom-20 left-1/4 w-48 h-48 bg-amber-200 rounded-full opacity-20 mix-blend-multiply filter blur-2xl"
            animate={{
              y: [0, 20, 0],
              x: [0, 15, 0],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div 
            className="absolute -top-10 right-1/4 w-40 h-40 bg-rose-200 rounded-full opacity-20 mix-blend-multiply filter blur-2xl"
            animate={{
              y: [0, -25, 0],
              x: [0, -15, 0],
              rotate: [0, -15, 0]
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5
            }}
          />
          <motion.div 
            className="absolute bottom-10 right-1/3 w-32 h-32 bg-cyan-200 rounded-full opacity-15 mix-blend-multiply filter blur-2xl"
            animate={{
              y: [0, -15, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.8
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default OnePlatform;