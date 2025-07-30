"use client";

import { useState, useEffect } from 'react';
import CMSPage from './cms/page';
import LMSPage from './lms/page';
import AMSPage from './ams/page';
import SMSPage from './sms/page';
import SIMSPage from './sims/page';
import ADMSPage from './adms/page';
import ContactUs from '../contactus/page';
import Header from '../components/Header';


export default function AllInOnePage() {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = [
    <CMSPage key="cms" />,
    <LMSPage key="lms" />,
    <AMSPage key="ams" />,
    <SMSPage key="sms" />,
    <SIMSPage key="sims" />,
    <ADMSPage key="adms" />,
    <ContactUs key="contact" />
  ];

  // Prevent default scroll behavior
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        setCurrentSection(prev => Math.min(prev + 1, sections.length - 1));
      } else {
        setCurrentSection(prev => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="relative w-full pt-16 md:pt-20">
        <div className="w-full">
          {sections[currentSection]}
        </div>
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-50">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSection(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSection === index ? 'bg-blue-500 scale-125' : 'bg-gray-400'
              }`}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
    
  );
}