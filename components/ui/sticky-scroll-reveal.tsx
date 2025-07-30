"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Feature {
  icon: string;
  text: string;
  animation?: string;
}

interface ContentItem {
  title: string;
  description?: string;
  subtitle?: string;
  cardColor?: string;
  iconColor?: string;
  features?: Feature[];
  content?: React.ReactNode;
}

interface StickyScrollProps {
  content: ContentItem[];
  contentClassName?: string;
}

const getPastelColor = (index: number, type: 'header' | 'bg' | 'text' | 'border' | 'icon') => {
  const colors = [
    // Soft pastel colors with good contrast on white
    { 
      header: 'from-pink-300 to-pink-400', 
      bg: 'bg-pink-50', 
      text: 'text-pink-600',
      border: 'border-pink-200',
      icon: 'text-pink-500'
    },
    { 
      header: 'from-blue-300 to-blue-400', 
      bg: 'bg-blue-50', 
      text: 'text-blue-600',
      border: 'border-blue-200',
      icon: 'text-blue-500'
    },
    { 
      header: 'from-green-300 to-green-400', 
      bg: 'bg-green-50', 
      text: 'text-green-600',
      border: 'border-green-200',
      icon: 'text-green-500'
    },
    { 
      header: 'from-yellow-300 to-yellow-400', 
      bg: 'bg-yellow-50', 
      text: 'text-yellow-600',
      border: 'border-yellow-200',
      icon: 'text-yellow-500'
    },
    { 
      header: 'from-purple-300 to-purple-400', 
      bg: 'bg-purple-50', 
      text: 'text-purple-600',
      border: 'border-purple-200',
      icon: 'text-purple-500'
    },
    { 
      header: 'from-cyan-300 to-cyan-400', 
      bg: 'bg-cyan-50', 
      text: 'text-cyan-600',
      border: 'border-cyan-200',
      icon: 'text-cyan-500'
    },
  ];
  
  const colorSet = colors[index % colors.length];
  return colorSet[type];
};

export const StickyScroll = ({
  content,
  contentClassName,
}: StickyScrollProps) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  // Background colors are now defined in the content array for each card
  const [backgroundGradient, setBackgroundGradient] = useState(
    `linear-gradient(45deg, ${content[0].cardColor || 'blue'}, ${content[0].cardColor || 'blue'})`,
  );

  useEffect(() => {
    setBackgroundGradient(`linear-gradient(45deg, ${content[activeCard].cardColor || 'blue'}, ${content[activeCard].cardColor || 'blue'})`);
  }, [activeCard]);

  return (
    <div className="relative w-full min-h-screen flex">
      {/* Fixed Image Container */}
      <div className="sticky top-0 h-[calc(100vh-7.5rem)] w-1/2 flex items-center justify-center p-10">
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">
          {content[activeCard]?.content || (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
              <span className="text-gray-400 text-lg">Preview Content</span>
            </div>
          )}
        </div>
      </div>

      {/* Scrolling Content */}
      <div 
        className="w-1/2 overflow-y-auto custom-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        ref={ref}
      >
        <div className="py-20 px-4 md:px-10 space-y-12">
          {content.map((item, index) => (
            <motion.div 
              key={item.title + index} 
              className="relative w-full group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px 0px 0px 0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={`relative z-10 bg-white rounded-3xl shadow-xl overflow-hidden border ${getPastelColor(index, 'border')} transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1`}>
                {/* Header with gradient */}
                <div className={`h-3 bg-gradient-to-r ${getPastelColor(index, 'header')}`}></div>
                
                {/* Content */}
                <div className="p-8 md:p-10">
                  {/* Title and Subtitle */}
                  <div className="mb-8">
                    {item.subtitle && (
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${getPastelColor(index, 'bg')} ${getPastelColor(index, 'text')}`}>
                        {item.subtitle}
                      </span>
                    )}
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      {item.title}
                    </h2>
                    {item.description && (
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                  
                  {/* Features Grid */}
                  {item.features && (
                    <div className="space-y-4">
                      {item.features.map((feature, i) => (
                        <motion.div 
                          key={i}
                          className={`p-6 rounded-lg border-l-4 ${getPastelColor(index, 'border').replace('border-', 'border-l-')} bg-white hover:bg-gray-50 transition-all duration-300 ${feature.animation || ''}`}
                          whileHover={{ 
                            x: 5,
                            boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.05)'
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-30px 0px 0px 0px" }}
                          transition={{ 
                            delay: 0.05 * i,
                            duration: 0.4,
                            ease: [0.16, 1, 0.3, 1]
                          }}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-md ${getPastelColor(index, 'bg').replace('bg-', 'bg-opacity-30')} flex-shrink-0`}>
                              <span className={`text-xl ${getPastelColor(index, 'icon')}`}>
                                {feature.icon}
                              </span>
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-700 leading-relaxed">
                                {feature.text}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 w-64 h-64 rounded-full bg-blue-100 opacity-30 -top-32 -right-32 mix-blend-multiply filter blur-3xl"></div>
              <div className="absolute -z-10 w-64 h-64 rounded-full bg-cyan-100 opacity-30 -bottom-16 -left-16 mix-blend-multiply filter blur-3xl"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
