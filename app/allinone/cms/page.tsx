"use client";

import { useState, useEffect, useRef } from 'react';
import { ChevronRight, Upload, BookOpen, FileText, Share2, Database, Clock, Users } from 'lucide-react';

// Ultra-Visible Shooting Stars Component
const ShootingStars = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Shooting Star 1 */}
      <div 
        className="absolute top-5 right-5 w-1 h-1 bg-white rounded-full shadow-[0_0_20px_5px_rgba(255,255,255,1),0_0_40px_10px_rgba(255,255,255,0.8)]"
        style={{
          animation: 'shoot1 5s linear 0s infinite',
        }}
      >
        <div className="absolute top-0 left-0 w-32 h-0.5 bg-gradient-to-r from-white via-white/80 to-transparent origin-right -translate-x-full" />
      </div>
      
      {/* Shooting Star 2 */}
      <div 
        className="absolute top-8 right-8 w-2 h-2 bg-white rounded-full shadow-[0_0_20px_5px_rgba(255,255,255,1),0_0_40px_10px_rgba(255,255,255,0.8)]"
        style={{
          animation: 'shoot2 6s linear 2s infinite',
        }}
      >
        <div className="absolute top-0 left-0 w-40 h-1 bg-gradient-to-r from-white via-white/70 to-transparent origin-right -translate-x-full" />
      </div>
      
      {/* Shooting Star 3 */}
      <div 
        className="absolute top-3 right-3 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_20px_5px_rgba(255,255,255,1),0_0_40px_10px_rgba(255,255,255,0.8)]"
        style={{
          animation: 'shoot3 4.5s linear 1s infinite',
        }}
      >
        <div className="absolute top-0 left-0 w-36 h-0.5 bg-gradient-to-r from-white via-white/75 to-transparent origin-right -translate-x-full" />
      </div>
      
      {/* Shooting Star 4 */}
      <div 
        className="absolute top-12 right-12 w-1 h-1 bg-white rounded-full shadow-[0_0_20px_5px_rgba(255,255,255,1),0_0_40px_10px_rgba(255,255,255,0.8)]"
        style={{
          animation: 'shoot4 5.5s linear 3s infinite',
        }}
      >
        <div className="absolute top-0 left-0 w-28 h-0.5 bg-gradient-to-r from-white via-white/80 to-transparent origin-right -translate-x-full" />
      </div>
      
      {/* Shooting Star 5 */}
      <div 
        className="absolute top-15 right-15 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_20px_5px_rgba(255,255,255,1),0_0_40px_10px_rgba(255,255,255,0.8)]"
        style={{
          animation: 'shoot5 4s linear 4s infinite',
        }}
      >
        <div className="absolute top-0 left-0 w-34 h-1 bg-gradient-to-r from-white via-white/70 to-transparent origin-right -translate-x-full" />
      </div>
      
      {/* Shooting Star 6 */}
      <div 
        className="absolute top-6 right-6 w-1 h-1 bg-white rounded-full shadow-[0_0_20px_5px_rgba(255,255,255,1),0_0_40px_10px_rgba(255,255,255,0.8)]"
        style={{
          animation: 'shoot6 5s linear 5s infinite',
        }}
      >
        <div className="absolute top-0 left-0 w-30 h-0.5 bg-gradient-to-r from-white via-white/80 to-transparent origin-right -translate-x-full" />
      </div>

      <style jsx global>{`
        @keyframes shoot1 {
          0% { transform: translate(0, 0) rotate(-45deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(-120vw, 120vh) rotate(-45deg); opacity: 0; }
        }
        @keyframes shoot2 {
          0% { transform: translate(0, 0) rotate(-45deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(-140vw, 140vh) rotate(-45deg); opacity: 0; }
        }
        @keyframes shoot3 {
          0% { transform: translate(0, 0) rotate(-45deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(-130vw, 130vh) rotate(-45deg); opacity: 0; }
        }
        @keyframes shoot4 {
          0% { transform: translate(0, 0) rotate(-45deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(-110vw, 110vh) rotate(-45deg); opacity: 0; }
        }
        @keyframes shoot5 {
          0% { transform: translate(0, 0) rotate(-45deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(-125vw, 125vh) rotate(-45deg); opacity: 0; }
        }
        @keyframes shoot6 {
          0% { transform: translate(0, 0) rotate(-45deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(-115vw, 115vh) rotate(-45deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};


interface Document {
  id: number;
  type: string;
  title: string;
  timestamp: string;
  sender: 'admin' | 'student';
}

export default function CMSPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [activeChat, setActiveChat] = useState<'admin' | 'student'>('admin');
  const [isAnimating, setIsAnimating] = useState(false);
  const adminChatEndRef = useRef<HTMLDivElement>(null);
  const studentChatEndRef = useRef<HTMLDivElement>(null);

  const documentTypes = [
    { type: 'knowledge', title: 'Knowledge Hub', icon: '📚' },
    { type: 'upload', title: 'Custom Content Upload', icon: '📁' },
    { type: 'notes', title: 'Taking Notes', icon: '📝' },
    { type: 'sharing', title: 'Notes Sharing', icon: '🔄' },
  ];

  // Simulate document upload animation
  useEffect(() => {
    const uploadInterval = setInterval(() => {
      if (currentDocIndex < documentTypes.length) {
        setIsAnimating(true);
        
        // Admin uploads document
        const newDoc: Document = {
          id: Date.now() + currentDocIndex,
          type: documentTypes[currentDocIndex].type,
          title: documentTypes[currentDocIndex].title,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sender: 'admin',
        };
        
        setDocuments(prev => [...prev, newDoc]);
        setActiveChat('admin');
        
        // After admin uploads, switch to student view
        setTimeout(() => {
          const studentDoc: Document = {
            id: Date.now() + currentDocIndex + 1000,
            type: documentTypes[currentDocIndex].type,
            title: documentTypes[currentDocIndex].title,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sender: 'student',
          };
          
          setDocuments(prev => [...prev, studentDoc]);
          setActiveChat('student');
          
          setTimeout(() => {
            setCurrentDocIndex(prev => prev + 1);
            setIsAnimating(false);
          }, 2000);
        }, 3000);
      } else {
        // Reset animation cycle
        setCurrentDocIndex(0);
        setDocuments([]);
      }
    }, 8000);

    return () => clearInterval(uploadInterval);
  }, [currentDocIndex]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (activeChat === 'admin') {
      adminChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      studentChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [documents, activeChat]);

  const getDocumentIcon = (type: string) => {
    const doc = documentTypes.find(d => d.type === type);
    return doc?.icon || '📄';
  };

  return (
    <>
      <ShootingStars />
      <div className="min-h-screen bg-[#0A1A2F] relative overflow-hidden -mb-40">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-blue-300/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-pink-300/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-indigo-300/20 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
        </div>
      
      {/* Floating particles */}
      {/* <div className="absolute inset-0">
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
      </div> */}
      {/* Header */}
      {/* <header className="bg-white/90 backdrop-blur-md border-b border-rose-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-pink-400 rounded-xl flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent">
                EduCMS
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-rose-600 transition-colors">Features</a>
              <a href="#" className="text-gray-700 hover:text-rose-600 transition-colors">Pricing</a>
              <a href="#" className="text-gray-700 hover:text-rose-600 transition-colors">About</a>
              <button className="bg-gradient-to-r from-rose-400 to-pink-400 text-white px-6 py-2 rounded-full hover:from-rose-500 hover:to-pink-500 transition-all transform hover:scale-105">
                Get Started
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {/* <section className="relative py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100/30 via-pink-100/30 to-fuchsia-100/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent">
            Content Management System
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Transform your educational content management with our intuitive, powerful, and beautifully designed platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-rose-400 to-pink-400 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-rose-500 hover:to-pink-500 transition-all transform hover:scale-105 shadow-lg">
              Start Free Trial
            </button>
            <button className="border-2 border-rose-400 text-rose-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-400 hover:text-white transition-all flex items-center space-x-2">
              <span>Watch Demo</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>  */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - CMS Features */}
          <div className="space-y-6">
            <div className="rounded-2xl p-8">
              <h1 className="text-3xl font-bold text-blue-300 mb-6 font-['Ubuntu']">Content Management System</h1>
              <p className="text-blue-200 text-sm mb-6 font-['Ubuntu']">
                Empowering education through seamless content management
              </p>
              
              <div className="space-y-5">
                <p className="text-white leading-relaxed">
                  Our CMS module simplifies content management and delivery, offering students, 
                  teachers, and administrators organized access to quality educational materials.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-3 rounded-lg bg-navy-900/30 hover:bg-navy-900/50 transition-colors">
                    <div className="flex items-center space-x-3 mb-1">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-sky-500/20">
                        <Database className="w-5 h-5 text-sky-400" />
                      </div>
                      <h3 className="font-semibold text-sky-300">Centralized Repository</h3>
                    </div>
                    <p className="text-sm text-sky-100/80 pl-12">All content in one secure location</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-navy-900/30 hover:bg-navy-900/50 transition-colors">
                    <div className="flex items-center space-x-3 mb-1">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-emerald-500/20">
                        <Share2 className="w-5 h-5 text-emerald-400" />
                      </div>
                      <h3 className="font-semibold text-emerald-300">Easy Sharing</h3>
                    </div>
                    <p className="text-sm text-emerald-100/80 pl-12">Share content with one click</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-navy-900/30 hover:bg-navy-900/50 transition-colors">
                    <div className="flex items-center space-x-3 mb-1">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-amber-500/20">
                        <FileText className="w-5 h-5 text-amber-400" />
                      </div>
                      <h3 className="font-semibold text-amber-300">Multi-Format Support</h3>
                    </div>
                    <p className="text-sm text-amber-100/80 pl-12">Support for all file formats</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-navy-900/30 hover:bg-navy-900/50 transition-colors">
                    <div className="flex items-center space-x-3 mb-1">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-purple-500/20">
                        <Clock className="w-5 h-5 text-purple-400" />
                      </div>
                      <h3 className="font-semibold text-purple-300">Real-Time Updates</h3>
                    </div>
                    <p className="text-sm text-purple-100/80 pl-12">Instant updates across devices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Animated Chat Boxes */}
          <div className="">
            {/* Admin Chat Box */}
            <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden transition-all duration-600 ${
              activeChat === 'admin' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 h-0'
            }`}>
              <div className="bg-[#007DC6] p-6 rounded-xl mb-6">
                <h3 className="text-2xl font-bold text-black mb-2">Admin Model</h3>
                <p className="text-black/90 text-sm">Uploading documents to students</p>
              </div>
              
              <div className="p-6 space-y-5 h-[400px] overflow-y-auto">
                <div className="space-y-3">
                  {documents.filter(doc => doc.sender === 'admin').map((doc) => (
                    <div key={doc.id} className="flex items-start space-x-3 animate-slide-up">
                      <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-600">👨‍💼</span>
                      </div>
                      <div className="flex-1">
                        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl px-4 py-3 rounded-br-none">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-lg">{getDocumentIcon(doc.type)}</span>
                            <span className="font-medium text-gray-800">{doc.title}</span>
                          </div>
                          <p className="text-xs text-gray-600">Uploaded at {doc.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isAnimating && activeChat === 'admin' && (
                    <div className="flex items-start space-x-3">
                      <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-600">👨‍💼</span>
                      </div>
                      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl px-4 py-3 rounded-br-none">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                          <span className="text-sm text-gray-600">Uploading...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={adminChatEndRef} />
                </div>
              </div>
            </div>

            {/* Student Chat Box */}
            <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden transition-all duration-600 ${
              activeChat === 'student' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 h-0'
            }`}>
              <div className="bg-gradient-to-r from-blue-400 to-blue-400 p-6 rounded-xl mb-6">
                <h3 className="text-2xl font-bold text-black mb-2">Student Model</h3>
                <p className="text-black/90 text-sm">Receiving and viewing documents</p>
              </div>
              
              <div className="p-6 space-y-5 h-[400px] overflow-y-auto">
                <div className="space-y-3">
                  {documents.filter(doc => doc.sender === 'student').map((doc) => (
                    <div key={doc.id} className="flex items-start space-x-3 animate-slide-up">
                      <div className="w-9 h-9 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-pink-600">👩‍🎓</span>
                      </div>
                      <div className="flex-1">
                        <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl px-4 py-3 rounded-bl-none">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-lg">{getDocumentIcon(doc.type)}</span>
                            <span className="font-medium text-gray-800">{doc.title}</span>
                          </div>
                          <p className="text-xs text-gray-600">Received at {doc.timestamp}</p>
                          <div className="mt-2 flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-xs text-green-600">Viewed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isAnimating && activeChat === 'student' && (
                    <div className="flex items-start space-x-3">
                      <div className="w-9 h-9 bg-pink-100 rounded-full flex items-center justify-center">
                        <span className="text-pink-600">👩‍🎓</span>
                      </div>
                      <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl px-4 py-3 rounded-bl-none">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                          <span className="text-sm text-gray-600">Viewing document...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={studentChatEndRef} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="bg-white/90 backdrop-blur-md border-t border-rose-100/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent">
                  EduCMS
                </span>
              </div>
              <p className="text-gray-600 mb-4 max-w-md">
                Empowering education through innovative content management solutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-rose-600 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-rose-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-rose-600 transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-rose-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-rose-600 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-rose-600 transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-rose-100/50 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 EduCMS. All rights reserved.</p>
          </div>
        </div>
      </footer> */}

      <style jsx global>{`
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
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0, -8px, 0);
          }
          70% {
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
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
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-bounce {
          animation: bounce 1s ease-in-out;
        }
        .animate-slide-up {
          animation: slideUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
    </>
  );
}