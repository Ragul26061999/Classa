'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

export default function Header() {
  const contactSectionRef = useRef<HTMLDivElement>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <div className="relative h-10 w-32 md:h-12 md:w-40">
              <img
                src="/image/CLASSA-logo.png"
                alt="CLASSA Logo"
                sizes="(max-width: 768px) 8rem, 10rem"
                className="object-contain object-left"
              />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { 
                name: 'Home', 
                href: '/',
              },
              { 
                name: 'About Us', 
                href: '/whoweare',
              },
              { 
                name: 'CLASSA', 
                href: '/allinone',
              },
              { 
                name: 'Roles', 
                href: '/tailored',
              }
            ].map((item) => (
              <Link 
                href={item.href}
                key={item.name}
                className="block"
              >
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <div
                    className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 relative group flex items-center cursor-pointer"
                  >
                    <motion.span
                      className="relative z-10 flex items-center"
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                    >
                      <span>{item.name}</span>
                    </motion.span>
                    <motion.span 
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 group-hover:w-full"
                      layoutId="navUnderline"
                    />
                  </div>
                </motion.div>
              </Link>
            ))}
          </nav>
          
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-blue-200 hover:scale-[1.02] transition-all duration-300 transform hover:-translate-y-0.5 relative overflow-hidden group"
            >
              <span className="relative z-10">Contact Us <span className="inline-block transition-transform group-hover:translate-x-1">→</span></span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6 transform transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          {[
            { name: 'Home', href: '/' },
            { name: 'About Us', href: '/whoweare' },
            { name: 'CLASSA', href: '/allinone' },
            { name: 'Roles', href: '/tailored' }
          ].map((item) => (
            <Link 
              key={item.name}
              href={item.href}
              className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
