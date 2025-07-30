"use client";

import { useEffect, useRef, useState } from 'react';

type Message = {
  id: number;
  text: string;
  sender: 'teacher' | 'student';
};

export default function LMS() {
  const [messages, setMessages] = useState<Message[]>([]);
  const messageIndex = useRef(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const isTeacherTurn = useRef(true);

  const lmsConversations = [
    { text: "Welcome to our LMS! How can I help you navigate our learning platform today?", sender: 'teacher' as const },
    { text: "Hi! I'm new to this LMS and trying to figure out how to access my course materials.", sender: 'student' as const },
    { text: "Great! Let me guide you. First, click on 'My Courses' in the main navigation bar.", sender: 'teacher' as const },
    { text: "I see it! There's a list of all my enrolled courses. How do I access the content?", sender: 'student' as const },
    { text: "Click on any course card to enter. Inside, you'll find organized modules with videos, documents, and quizzes.", sender: 'teacher' as const },
    { text: "This LMS interface is really intuitive! I love how everything is organized in one place.", sender: 'student' as const },
    { text: "Absolutely! The dashboard gives you a complete overview - upcoming assignments, grades, and announcements.", sender: 'teacher' as const },
    { text: "I noticed there's a discussion forum feature. Can I interact with other students there?", sender: 'student' as const },
    { text: "Yes! The discussion forums are perfect for peer learning. You can ask questions and share insights.", sender: 'teacher' as const },
    { text: "The progress tracking feature is amazing - I can see exactly which modules I've completed.", sender: 'student' as const },
    { text: "That's one of our favorite features! It helps both students and teachers track learning progress.", sender: 'teacher' as const },
    { text: "I uploaded my assignment through the LMS portal. How long does grading usually take?", sender: 'student' as const },
    { text: "Assignments are typically graded within 48 hours. You'll receive notifications when feedback is ready.", sender: 'teacher' as const },
    { text: "The mobile app works perfectly with this LMS. I can study anywhere, anytime!", sender: 'student' as const },
    { text: "Mobile learning is key! Our LMS is fully responsive and syncs seamlessly across all your devices.", sender: 'teacher' as const },
    { text: "I love how the calendar integrates with my personal schedule. No more missed deadlines!", sender: 'student' as const },
    { text: "The calendar integration is a game-changer. It sends reminders and syncs with popular calendar apps.", sender: 'teacher' as const },
    { text: "The video lectures are high quality and I can pause, rewind, or speed up as needed.", sender: 'student' as const },
    { text: "Interactive videos enhance learning! You control your pace and can revisit complex topics easily.", sender: 'teacher' as const },
    { text: "I appreciate the instant feedback on quizzes. It helps me understand concepts immediately.", sender: 'student' as const },
    { text: "Immediate feedback accelerates learning. Our LMS provides detailed explanations for every answer.", sender: 'teacher' as const },
    { text: "The resource library is incredible - so many supplementary materials beyond just the course content.", sender: 'student' as const },
    { text: "We curate extensive resources to support diverse learning styles and provide additional practice opportunities.", sender: 'teacher' as const },
    { text: "Group projects are so much easier with the collaboration tools built into this LMS.", sender: 'student' as const },
    { text: "Collaboration is seamless! Students can work together virtually using shared documents and video conferencing.", sender: 'teacher' as const },
    { text: "The gradebook gives me real-time insights into my performance across all courses.", sender: 'student' as const },
    { text: "Transparent grading helps students stay motivated. You can track your progress and identify areas for improvement.", sender: 'teacher' as const },
    { text: "This LMS has transformed my learning experience. I feel more engaged and organized than ever before!", sender: 'student' as const },
    { text: "We're thrilled to hear that! Our goal is to make learning accessible, engaging, and effective for every student.", sender: 'teacher' as const },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = messageIndex.current % lmsConversations.length;
      setMessages(prev => [...prev, { ...lmsConversations[currentIndex], id: Date.now() + messageIndex.current }]);
      messageIndex.current += 1;
      
      // Keep only the last 20 messages to prevent memory issues
      if (messages.length > 20) {
        setMessages(prev => prev.slice(-20));
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [messages.length]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#0A1A2F] relative overflow-hidden">
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
      {/* Header */}
      {/* <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">LMS</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">EduFlow</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors">Courses</a>
              <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors">Resources</a>
              <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors">Support</a>
              <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors">Profile</a>
            </nav>
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      {/* <section className="py-5 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Learning Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            
          </p>
        </div>
      </section> */}

      {/* Main Content */}
      <section className="px-4 pb-0 pt-30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* LMS Overview */}
            <div>
              <h1 className="text-3xl font-['Ubuntu'] font-bold text-yellow-200 mt-15 mb-8">Learning Management System</h1>
              <p className="text-yellow-200 text-sm">Your gateway to organized, engaging education</p>
              <div className="space-y-4">
                <div className="mt-5 flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
                  <p className="text-white">Experience seamless digital learning with our beautifully designed platform that brings education to life</p>
                </div>
                <div className="mt-5 flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
                  <p className="text-white">Seamless collaboration between students and educators</p>
                </div>
                <div className="mt-5 flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <p className="text-white">Organized course content with intuitive navigation</p>
                </div>
                <div className="mt-5 flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2"></div>
                  <p className="text-white">Active student participation and engagement tools</p>
                </div>
                <div className="mt-5 flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
                  <p className="text-white">Real-time progress tracking and feedback systems</p>
                </div>
              </div>
            </div>

            {/* Interactive Chat */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <div className="bg-[#FFFAA0] p-6 ">
                <h2 className="text-2xl font-bold text-black mb-2">Interactive Chat</h2>
                <p className="text-black/90 text-sm">Live demonstration of LMS features</p>
              </div>
              
              <div className="h-126 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
                <div className="p-6 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md ${message.sender === 'student' ? 'text-right' : 'text-left'}`}>
                        <p className="text-xs text-gray-500 mb-1">
                          {message.sender === 'student' ? 'Student' : 'Teacher'}
                        </p>
                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            message.sender === 'student'
                              ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-gray-800 rounded-br-none'
                              : 'bg-gradient-to-r from-indigo-100 to-blue-100 text-gray-800 rounded-bl-none'
                          } animate-slide-up shadow-sm`}
                        >
                          <p className="text-sm leading-relaxed">{message.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-white/50 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-600">© 2025 EduFlow LMS. Empowering education through technology.</p>
        </div>
      </footer> */}

      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(8px);
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
        .animate-float {
          animation: float 4s ease-in-out infinite;
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
        .animate-slide-up {
          animation: slideUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
