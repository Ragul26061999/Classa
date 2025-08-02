"use client";

import React, { useEffect, useRef } from 'react';

export default function SchoolManagementSystem() {
  const busRef = useRef<HTMLDivElement>(null);
  const adminRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (busRef.current) {
      // Reset animation
      busRef.current.style.animation = 'none';
      busRef.current.offsetHeight; // Trigger reflow
      busRef.current.style.animation = 'moveBus 12s linear infinite';
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1A2F] relative overflow-hidden pt-17 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-blue-300/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-pink-300/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-indigo-300/20 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      <div className="max-w-7xl mx-auto">
        {/* <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          School Management System
        </h1> */}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - SMS Overview */}
          <div>
            <h1 className="text-3xl font-['Ubuntu'] font-bold text-orange-300 mb-4 mt-10">School Management System</h1>
            <p className="text-orange-200 text-sm mb-4">
              Streamline your school's operations with comprehensive management tools
            </p>
            
            <p className="text-white text-lg leading-relaxed mb-6">
              Our comprehensive School Management System simplifies administrative tasks, enhances communication, 
              and improves the overall educational experience for students, parents, and staff.
            </p>
            
            <div className="space-y-4">
              {[
                 "Monitor school buses in real-time with our advanced GPS tracking system.",
                 "Ensure student safety and optimize routes with live location updates."
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <p className="ml-3 text-white">{feature}</p>
                </div>
              ))}
            </div>
            

            <div className="mt-15 grid grid-cols-2 gap-6 mb-6">
              <div className="">
                <div className="text-2xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-blue-500">Schools</div>
              </div>
              <div className="">
                <div className="text-2xl font-bold text-green-600">50K+</div>
                <div className="text-sm text-green-500">Students</div>
              </div>
              <div className="">
                <div className="text-2xl font-bold text-purple-600">1000+</div>
                <div className="text-sm text-purple-500">Buses</div>
              </div>
              <div className="">
                <div className="text-2xl font-bold text-orange-600">99.9%</div>
                <div className="text-sm text-orange-500">Uptime</div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Bus Tracking */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="bg-[#F2955399] p-6 rounded-xl mb-6">
              <h2 className="text-2xl font-bold text-black mb-2">Live Bus Tracking</h2>
              <p className="text-black/90 text-sm">
                Monitor school buses in real-time with GPS tracking
              </p>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
             
            </p>
            
            {/* Interactive Map Container */}
            <div className="relative h-96 bg-gray-50 rounded-xl overflow-hidden border-2 border-gray-100">
              {/* Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'linear-gradient(to right, #9ca3af 1px, transparent 1px), linear-gradient(to bottom, #9ca3af 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }}></div>
                
                {/* School Building */}
                <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-2xl">🏫</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-700">School</span>
                  </div>
                </div>
                
                {/* Bus Stops */}
                {[
                  { left: '10%', top: '30%', name: 'Stop A' },
                  { left: '30%', top: '70%', name: 'Stop B' },
                  { left: '50%', top: '40%', name: 'Stop C' },
                  { left: '70%', top: '60%', name: 'Stop D' },
                  { left: '90%', top: '30%', name: 'Stop E' },
                ].map((stop, index) => (
                  <div 
                    key={index}
                    className="absolute w-3 h-3 bg-yellow-400 rounded-full border-2 border-yellow-600"
                    style={{ left: stop.left, top: stop.top }}
                  >
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {stop.name}
                      <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-gray-800 transform -translate-x-1/2 translate-y-1/2 rotate-45"></div>
                    </div>
                  </div>
                ))}
                
                {/* Bus Route */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path 
                    ref={pathRef}
                    d="M10,30 Q25,30 25,50 Q25,70 40,70 Q55,70 55,50 Q55,30 70,30 Q85,30 90,50" 
                    fill="none" 
                    stroke="#4f46e5" 
                    strokeWidth="1" 
                    strokeDasharray="5,3"
                  />
                </svg>
                
                {/* Admin Panel */}
                <div 
                  ref={adminRef}
                  className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md flex items-center space-x-2 z-10 animate-slideIn"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">👤</span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold">Admin</div>
                    <div className="text-xs text-green-500">• Online</div>
                  </div>
                </div>
                
                {/* Bus */}
                <div 
                  ref={busRef}
                  className="absolute w-12 h-6 bg-blue-500 rounded-md flex items-center justify-center text-white font-bold text-sm shadow-lg transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    animation: 'moveBus 12s linear infinite',
                    left: '0%',
                    top: '30%',
                  }}
                >
                  <span className="mr-1">🚌</span>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Bus #42
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-black transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Bus Info Panel */}
             <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xs text-gray-500">Current Bus</div>
                      <div className="font-semibold">Bus #42</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Next Stop</div>
                      <div className="font-semibold">Stop C</div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600">On Time</span>
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Departed: 7:30 AM</span>
                    <span>Next Stop: 8:05 AM</span>
                  </div>
                </div>
            
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes moveBus {
          0% { left: 10%; top: 30%; transform: translate(-50%, -50%) rotate(0deg); }
          25% { left: 25%; top: 70%; transform: translate(-50%, -50%) rotate(90deg); }
          50% { left: 55%; top: 40%; transform: translate(-50%, -50%) rotate(180deg); }
          75% { left: 70%; top: 60%; transform: translate(-50%, -50%) rotate(270deg); }
          100% { left: 90%; top: 30%; transform: translate(-50%, -50%) rotate(360deg); }
            top: 30%;
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
