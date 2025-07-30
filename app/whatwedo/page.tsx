'use client';

import React, { useRef, ReactNode, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { FaChalkboardTeacher, FaGraduationCap, FaClipboardCheck, FaCogs, FaUsers, FaHome, FaInfoCircle, FaGraduationCap as FaGradCap, FaUserTie } from 'react-icons/fa';
import { Mesh } from 'three';
import Image from 'next/image';


// Define types for props
interface AnimatedSphereProps {
  color: string;
  position?: [number, number, number];
  scale?: number;
}

// 3D Sphere Component
const AnimatedSphere = ({ color, position = [0, 0, 0], scale = 1 }: AnimatedSphereProps) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <Sphere args={[1, 100, 200]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.3}
          metalness={0.4}
        />
      </Sphere>
    </mesh>
  );
};

// 3D Background Component
const ThreeDBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 opacity-20">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedSphere color="#3b82f6" position={[0, 0, 0]} scale={2} />
        <AnimatedSphere color="#8b5cf6" position={[3, 2, -5]} scale={2} />
        <AnimatedSphere color="#ec4899" position={[-3, -1, -3]} scale={2} />
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
    </div>
  );
};

// Feature Item Component
interface FeatureItemProps {
  icon: React.ReactElement<{ className?: string }>;
  className?: string;
  title: string;
  description: string;
  index: number;
  isInView: boolean;
  featuresLength: number;
}

interface FeatureItemProps {
  icon: React.ReactElement<{ className?: string }>;
  title: string;
  description: string;
  index: number;
  isInView: boolean;
  featuresLength: number;
  imageUrl?: string;
  className?: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ 
  icon, 
  title, 
  description, 
  index, 
  isInView, 
  featuresLength,
  imageUrl = '',
  className = '' 
}: FeatureItemProps) => {
  const colors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-red-500 to-red-600',
    'from-yellow-500 to-yellow-600'
  ];
  const gradient = colors[index % colors.length];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 20,
        transition: { 
          duration: 0.6, 
          delay: index * 0.1,
          type: 'spring',
          stiffness: 100
        }
      }}
      whileHover={{ 
        y: -10,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        transition: { 
          type: 'spring',
          stiffness: 300,
          damping: 15
        }
      }}
      className={`relative group ${className || ''} overflow-hidden rounded-2xl bg-white shadow-lg`}
      style={{
        width: '240px',
        height: '280px',
        zIndex: featuresLength - index,
      }}
    >
      {/* Background image - shown on hover */}
      {imageUrl && (
        <motion.div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0,
          }}
          initial={{ opacity: 0 }}
          whileHover={{ 
            opacity: 0.2,
            transition: { duration: 0.3 }
          }}
        />
      )}
      
      {/* Header with gradient */}
      <div className={`h-2 bg-gradient-to-r ${gradient} relative z-10`}></div>
      
      {/* Card content */}
      <div className="p-6 h-full flex flex-col relative z-10">
        <div className="mb-4 flex justify-center">
          <div className={`p-3 rounded-full bg-gradient-to-br ${gradient} text-white`}>
            {React.cloneElement(icon, { 
              className: 'w-8 h-8' 
            })}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3 text-center group-hover:text-gray-900 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 text-center flex-grow group-hover:text-gray-700 transition-colors">
          {description}
        </p>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500 text-center group-hover:text-gray-600 transition-colors">
            Learn more →
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function WhatWeDo() {
  const TeamsRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  
  const features: Array<{
    icon: React.ReactElement<{ className?: string }>;
    title: string;
    description: string;
    imageUrl: string;
  }> = [
    {
      icon: <FaChalkboardTeacher className="text-3xl" />,
      title: 'Teach Better',
      description: 'Conduct live classes, share assignments, and track progress—all from one dashboard.',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <FaGraduationCap className="text-3xl" />,
      title: 'Learn Smarter',
      description: 'Students get structured content, instant feedback, and personalized learning paths.',
      imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <FaClipboardCheck className="text-3xl" />,
      title: 'Assess Easily',
      description: 'Create tests in minutes, auto-grade them, and get deep insights into student performance.',
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <FaCogs className="text-3xl" />,
      title: 'Manage Seamlessly',
      description: 'Automate attendance, fee collection, staff schedules, transport, and more.',
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: 'Engage Everyone',
      description: 'Keep parents, students, and teachers connected with real-time updates and reports.',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <main>
        <div className="min-h-screen bg-gradient-to-b from-[#BFD8C1] py-16 px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden relative">
          <ThreeDBackground />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                What We Do
              </motion.h1>
              <motion.div 
                className="w-32 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5, type: 'spring' }}
              />
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                CLASSA turns complex school tasks into simple, smart, and efficient workflows.
              </motion.p>
            </motion.div>

            <div className="relative w-full py-12">
              <div ref={ref} className="w-full max-w-6xl mx-auto py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="card absolute cursor-pointer"
                    initial={{ opacity: 0, transform: 'translateY(50px) rotate(0deg)' }}
                    animate={{
                      opacity: isInView ? 1 : 0,
                      transform: isInView 
                        ? `translateY(-90px) rotate(${-60 + index * 30}deg) translateX(${mousePosition.x * 30 * (index - 2)}px)` 
                        : 'translateY(50px) rotate(0deg)',
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      type: 'spring',
                      stiffness: 100,
                    }}
                    style={{
                      transformOrigin: 'bottom center',
                      marginLeft: '-40px',
                      zIndex: index,
                      left: `${160 + index * 200}px`,
                    }}
                    whileHover={{ 
                      scale: 1.15, 
                      y: -110,
                      transition: { duration: 0.3, type: 'spring', stiffness: 300 }
                    }}
                    onClick={() => setSelectedCard(index)}
                  >
                    <FeatureItem 
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                      index={index}
                      isInView={isInView}
                      featuresLength={features.length}
                    />
                  </motion.div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Card Detail Modal */}
        <AnimatePresence>
          {selectedCard !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedCard(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 bg-gradient-to-br ${
                    ['from-rose-200 to-rose-300', 'from-sky-200 to-sky-300', 'from-emerald-200 to-emerald-300', 'from-violet-200 to-violet-300', 'from-amber-200 to-amber-300'][selectedCard]
                  }`}>
                    {React.cloneElement(features[selectedCard].icon, { className: 'text-2xl' })}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{features[selectedCard].title}</h3>
                    <p className="text-gray-600">{features[selectedCard].description}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Key Features</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Advanced analytics and reporting</li>
                      <li>• Real-time collaboration tools</li>
                      <li>• Mobile-responsive design</li>
                      <li>• 24/7 customer support</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Benefits</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Increased efficiency and productivity</li>
                      <li>• Enhanced user experience</li>
                      <li>• Streamlined workflow management</li>
                      <li>• Comprehensive data insights</li>
                    </ul>
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedCard(null)}
                  className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
  );
}