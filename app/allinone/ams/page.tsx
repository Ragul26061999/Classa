"use client";

import React, { useState, useEffect } from 'react';

interface Student {
  id: number;
  name: string;
  image: string;
  grade: string;
  score: number;
  subject: string;
  trend: 'up' | 'down' | 'stable';
  avatar: string;
  color: string;
}

export default function AssessmentManagementSystem() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [animatedGrades, setAnimatedGrades] = useState<Student[]>([]);

  const students: Student[] = [
    {
      id: 1,
      name: "Emma",
      image: "👩‍🎓",
      grade: "A+",
      score: 98,
      subject: "Mathematics",
      trend: 'up',
      avatar: "https://pixabay.com/images/search/school%20girl",
      color: "from-purple-400 to-pink-400"
    },
    {
      id: 2,
      name: "Liam",
      image: "👨‍🎓",
      grade: "A",
      score: 95,
      subject: "Science",
      trend: 'up',
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      color: "from-blue-400 to-cyan-400"
    },
    {
      id: 3,
      name: "Sophia",
      image: "👩‍🎓",
      grade: "A-",
      score: 92,
      subject: "English",
      trend: 'stable',
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      color: "from-green-400 to-emerald-400"
    },
    {
      id: 4,
      name: "Williams",
      image: "👨‍🎓",
      grade: "B+",
      score: 89,
      subject: "History",
      trend: 'up',
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      color: "from-orange-400 to-red-400"
    },
    {
      id: 5,
      name: "Ava",
      image: "👩‍🎓",
      grade: "A",
      score: 96,
      subject: "Physics",
      trend: 'up',
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      color: "from-indigo-400 to-purple-400"
    },
    {
      id: 6,
      name: "Ethan",
      image: "👨‍🎓",
      grade: "B",
      score: 85,
      subject: "Chemistry",
      trend: 'down',
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      color: "from-yellow-400 to-orange-400"
    }
  ];

  const [blinkingCards, setBlinkingCards] = useState<number[]>([]);

  useEffect(() => {
    // Animate grades loading
    const timer = setTimeout(() => {
      setAnimatedGrades(students);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Synchronized blinking animation for two cards
    const blinkInterval = setInterval(() => {
      const pairs = [[0, 1], [2, 3], [4, 5]];
      const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
      setBlinkingCards(randomPair);
      
      setTimeout(() => {
        setBlinkingCards([]);
      }, 1500);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  const getGradeColor = (grade: string) => {
    switch (grade.charAt(0)) {
      case 'A': return 'from-green-400 to-green-600';
      case 'B': return 'from-blue-400 to-blue-600';
      case 'C': return 'from-yellow-400 to-yellow-600';
      case 'D': return 'from-orange-400 to-orange-600';
      case 'F': return 'from-red-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1A2F] -mb-20 -mt-5 pt-6 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - AMS Overview */}
          <div>
            <h1 className="text-3xl font-['Ubuntu'] font-bold text-green-300 mt-10 mb-4">Assessment Management System</h1>
            <p className="text-green-200 text-sm">
              Edueron's Assessment Management system revolutionizes testing
            </p>
            
            <div className="space-y-6">
              <p className="text-white mt-4 text-lg leading-relaxed">
                Evaluation with intelligent, adaptive assessments that deliver immediate feedback and actionable insights.
              </p>
              
              <div className="space-y-4">
                {[
                  "AI-powered adaptive testing that adjusts difficulty based on student performance",
                  "Real-time analytics and detailed performance insights for educators",
                  "Immediate feedback with personalized learning recommendations",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    </div>
                    <p className="ml-3 text-white">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Key Metrics */}
            <div className="mt-15 flex flex-wrap gap-4 mb-6">
              <div className="">
                <div className="text-2xl font-bold text-green-600">98.5%</div>
                <div className="text-sm text-green-500">Accuracy Rate</div>
              </div>
              <div className="">
                <div className="text-2xl font-bold text-blue-600">2.3M+</div>
                <div className="text-sm text-blue-500">Assessments</div>
              </div>
              <div className="">
                <div className="text-2xl font-bold text-purple-600">45%</div>
                <div className="text-sm text-purple-500">Time Saved</div>
              </div>
              <div className="">
                <div className="text-2xl font-bold text-orange-600">24/7</div>
                <div className="text-sm text-orange-500">Support</div>
              </div>
            </div>
            {/* Performance Summary */}
            {/* <div className="mt-15 ">
              <h4 className="font-semibold text-white mb-3">Class Performance Summary</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">91.2%</div>
                  <div className="text-xs text-green-500">Average Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">A</div>
                  <div className="text-xs text-blue-500">Average Grade</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">85%</div>
                  <div className="text-xs text-purple-500">Improvement Rate</div>
                </div>
              </div>
            </div> */}
          </div>

          {/* Right Side - Student Grades */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 pb-8">
            <div className="bg-[#B5EAD7] p-6 rounded-xl mb-4">
              <h2 className="text-2xl font-bold text-black mb-2 mt-">Student Performance</h2>
              <p className="text-black/90 text-sm">
                Live grade tracking 
              </p>
            </div>

            {/* Student Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 -mb-6">
              {animatedGrades.map((student, index) => (
                <div
                  key={student.id}
                  className={`relative group transform transition-all duration-500 hover:scale-105 animate-fadeIn ${
                    blinkingCards.includes(index) ? 'animate-blinking' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedStudent(student)}
                >
                  {/* 3D Animated Card */}
                  <div className={`relative bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                    blinkingCards.includes(index) ? 'animate-cardBlink' : ''
                  }`}>
                    {/* Animated Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${student.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300 ${
                      blinkingCards.includes(index) ? 'animate-pulse opacity-20' : ''
                    }`}></div>
                    
                    {/* Glowing Border Effect */}
                    <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300 ${
                      blinkingCards.includes(index) ? 'border-gradient-to-r from-purple-200 to-pink-200 animate-pulse' : ''
                    }`}></div>
                    
                    {/* Animated Grade Badge */}
                    <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${getGradeColor(student.grade)} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-2xl animate-glow z-10 ${
                      blinkingCards.includes(index) ? 'animate-pulse scale-105' : ''
                    }`}>
                      {student.grade}
                    </div>

                    {/* Student Image */}
                    <div className="relative p-6">
                      <div className="flex items-center space-x-4">
                        {/* Real Student Image */}
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                            <img 
                              src={student.avatar} 
                              alt={student.name}
                              className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          {/* Status Indicator */}
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                            student.trend === 'up' ? 'bg-green-400' : 
                            student.trend === 'down' ? 'bg-red-400' : 'bg-yellow-400'
                          } animate-pulse`}></div>
                        </div>
                        
                        {/* Student Info */}
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-lg">{student.name}</h3>
                          <p className="text-sm text-gray-600 font-medium">{student.subject}</p>
                          <div className="flex items-center space-x-3 mt-2">
                            <span className="text-lg font-bold text-indigo-600">{student.score}%</span>
                            <span className="text-2xl animate-bounce">{getTrendIcon(student.trend)}</span>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <div 
                                  key={i} 
                                  className={`w-1 h-4 rounded-full transition-all duration-300 ${
                                    i < Math.floor(student.score / 20) 
                                      ? 'bg-gradient-to-t from-green-400 to-green-600' 
                                      : 'bg-gray-300'
                                  }`}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    
                    {/* Floating Particles */}
                    <div className="absolute top-2 right-2 flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i}
                          className="w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping"
                          style={{ animationDelay: `${i * 200}ms` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Student View */}
            {selectedStudent && (
              <div className="mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Detailed View</h3>
                  <button 
                    onClick={() => setSelectedStudent(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-4xl">{selectedStudent.image}</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{selectedStudent.name}</h4>
                    <p className="text-gray-600">{selectedStudent.subject}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600">{selectedStudent.score}%</div>
                    <div className="text-sm text-gray-600">Current Score</div>
                  </div>
                  <div className={`bg-white p-4 rounded-lg`}>
                    <div className={`text-2xl font-bold ${selectedStudent.grade.charAt(0) === 'A' ? 'text-green-600' : 'text-blue-600'}`}>
                      {selectedStudent.grade}
                    </div>
                    <div className="text-sm text-gray-600">Grade</div>
                  </div>
                </div>

                <div className="mt-4 bg-white p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Performance Trend</span>
                    <span className="text-lg">{getTrendIcon(selectedStudent.trend)}</span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-1000"
                      style={{ width: `${selectedStudent.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes moveBus {
          0% { left: 10%; top: 30%; transform: translate(-50%, -50%) rotate(0deg); }
          25% { left: 25%; top: 70%; transform: translate(-50%, -50%) rotate(90deg); }
          50% { left: 55%; top: 40%; transform: translate(-50%, -50%) rotate(180deg); }
          75% { left: 70%; top: 60%; transform: translate(-50%, -50%) rotate(270deg); }
          100% { left: 90%; top: 30%; transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes glow {
          0%, 100% { 
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(147, 51, 234, 0.3); 
          }
          50% { 
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(147, 51, 234, 0.6), 0 0 40px rgba(236, 72, 153, 0.4); 
          }
        }
        
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes float {
          0% {
            transform: translateY(0px) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0px) scale(1);
            opacity: 0.3;
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes cardBlink {
          0%, 100% { 
            transform: scale(1); 
            box-shadow: 0 0 0 rgba(255, 255, 255, 0); 
          }
          25% { 
            transform: scale(1.02); 
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3); 
          }
          50% { 
            transform: scale(1.05); 
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.6); 
          }
          75% { 
            transform: scale(1.02); 
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3); 
          }
        }
        
        @keyframes blinking {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        .animate-cardBlink {
          animation: cardBlink 2s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
      `}</style>
    </div>
  );
}