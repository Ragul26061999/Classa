"use client";

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import ContactUs from '../contactus/page';
import Header from '../components/Header';

// Dynamically import the StickyScrollRevealDemo component with SSR disabled
const StickyScrollRevealDemo = dynamic(
  () => import('@/components/sticky-scroll-reveal-demo').then((mod) => mod.default),
  { ssr: false, loading: () => <div className="h-[40rem] w-full bg-gray-100 rounded-2xl animate-pulse"></div> }
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function TailoredPage() {
  const ContactUsRef = useRef<HTMLDivElement>(null);
  const [showTeams, setShowTeams] = useState(false);
  const [showContactUs, setShowContactUs] = useState(true);
  const TeamsRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="relative pt-12 md:pt-25">
          {/* Animated background elements */}
          <div className="fixed inset-0 overflow-hidden -z-10">
            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent"></div>
            <div className="absolute -bottom-1/2 -right-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-100/40 via-transparent to-transparent"></div>
          </div>
          
          {/* Page Header Section */}
          <header className="relative z-10 pb-16 px-4">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* <motion.div 
                className="inline-block mb-6 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/30"
                variants={itemVariants}
              >
                <span className="text-blue-300 text-sm font-medium"> </span>
              </motion.div> */}
              
              <motion.h1 
                className="text-xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                  Tailored for Every Role in Your Institution
                </span>
              </motion.h1>
              <motion.div 
                className="w-32 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full mb-8"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5, type: 'spring' }}
              />
              
              <motion.p 
                className=" text-slate-700 font-normal leading-relaxed max-w-2xl mx-auto"
                variants={itemVariants}
              >
                Edueron offers specialized features designed specifically to meet the unique needs of every member of your educational community, ensuring streamlined collaboration and enhanced productivity.
              </motion.p>
            </motion.div>
          </header>

          {/* Sticky Scroll Section */}
          <section className="relative z-10 -mt-20">
            <StickyScrollRevealDemo />
          </section>
         
        </div>
      </div>
      <div ref={ContactUsRef} className="min-h-screen w-full">
        {showContactUs && <ContactUs />}
      </div>
     </div>
    
  );
}