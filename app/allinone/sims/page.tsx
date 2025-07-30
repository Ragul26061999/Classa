'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'student' | 'senseai';
  timestamp: Date;
}

export default function SenseAIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [autoStarted, setAutoStarted] = useState(false);

  // Sample questions for grades 10-12
  const gradeQuestions = {
    grade10: [
      "What is the difference between speed and velocity?",
      "Explain the process of photosynthesis.",
      "What are the three states of matter?",
      "What is the Pythagorean theorem?",
      "Explain the causes of World War I."
    ],
    grade11: [
      "What are Newton's laws of motion?",
      "Explain the structure of an atom.",
      "What is the quadratic formula and how is it used?",
      "Describe the process of cellular respiration.",
      "What are the main themes in Shakespeare's Macbeth?"
    ],
    grade12: [
      "Explain the theory of relativity.",
      "What is DNA replication and why is it important?",
      "How do you solve differential equations?",
      "Explain the concept of limits in calculus.",
      "What are the main economic theories of John Maynard Keynes?"
    ]
  };

  // Firebase configuration
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "your-project",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
  };

  // Initialize Firebase and authenticate user
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if Firebase is available
        if (typeof window !== 'undefined' && (window as any).firebase) {
          const app = (window as any).firebase.initializeApp(firebaseConfig);
          const auth = (window as any).firebase.auth();
          
          // Use anonymous authentication
          const userCredential = await auth.signInAnonymously();
          
          setUserId(userCredential.user.uid);
        } else {
          // Fallback user ID for development
          setUserId(`user_${Date.now()}`);
        }
        
        // Add welcome message
        setMessages([
          {
            id: '1',
            text: "Hello! I'm SenseAI, your intelligent assistant. How can I help you today with your academic content?",
            sender: 'senseai',
            timestamp: new Date()
          }
        ]);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Authentication error:', error);
        setUserId(`user_${Date.now()}`);
        setMessages([
          {
            id: '1',
            text: "Hello! I'm SenseAI, your intelligent assistant. How can I help you today with your academic content?",
            sender: 'senseai',
            timestamp: new Date()
          }
        ]);
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-send questions automatically
  useEffect(() => {
    if (!autoStarted && messages.length <= 1) {
      // Start with the welcome message
      setMessages([{
        id: '1',
        text: "Hello! I'm SenseAI, your intelligent assistant. I'll help you with questions from grades 10-12. Let's begin!",
        sender: 'senseai',
        timestamp: new Date()
      }]);
      setAutoStarted(true);
    }

    // Start the auto-question sequence after a short delay
    if (autoStarted && messages.length < 20) { // Limit to 10 questions (2 messages per question)
      const sendNextQuestion = async () => {
        // Determine which grade's questions to use based on message count
        let grade: keyof typeof gradeQuestions;
        if (messages.length < 10) {
          grade = 'grade10';
        } else if (messages.length < 15) {
          grade = 'grade11';
        } else {
          grade = 'grade12';
        }
        
        const questionIndex = messages.length % gradeQuestions[grade].length;
        const question = gradeQuestions[grade][questionIndex];
        
        // Simulate typing delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Send the question as if from student
        const newMessage: Message = {
          id: Date.now().toString(),
          text: question,
          sender: 'student',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, newMessage]);
        setIsTyping(true);
        
        // Get predefined response
        const response = getPredefinedResponse(question);
        
        // Add slight delay before responding
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          text: response,
          sender: 'senseai',
          timestamp: new Date()
        }]);
        
        setIsTyping(false);
      };
      
      const timer = setTimeout(sendNextQuestion, 3000);
      return () => clearTimeout(timer);
    }
  }, [messages, autoStarted]);

  // Predefined responses for common questions
  const getPredefinedResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Grade 10 responses
    if (lowerMessage.includes('speed') && lowerMessage.includes('velocity')) {
      return "Speed is a scalar quantity that refers to how fast an object is moving, while velocity is a vector quantity that includes both speed and direction. For example, a car going 60 km/h has a speed of 60 km/h, but its velocity would be 60 km/h north if that's the direction it's moving.";
    } else if (lowerMessage.includes('photosynthesis')) {
      return "Photosynthesis is the process by which green plants, algae, and some bacteria convert light energy, usually from the sun, into chemical energy stored in glucose. The overall reaction is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. This process occurs in the chloroplasts of plant cells.";
    } else if (lowerMessage.includes('states of matter')) {
      return "The three fundamental states of matter are: 1) Solid - has definite shape and volume, 2) Liquid - has definite volume but takes the shape of its container, and 3) Gas - has neither definite shape nor volume, expands to fill its container.";
    } else if (lowerMessage.includes('pythagorean theorem')) {
      return "The Pythagorean theorem states that in a right-angled triangle, the square of the length of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the lengths of the other two sides. The formula is: a² + b² = c², where c is the length of the hypotenuse.";
    } else if (lowerMessage.includes('world war i') || lowerMessage.includes('wwi')) {
      return "World War I (1914-1918) was caused by several factors including: 1) Militarism - the arms race between European powers, 2) Alliances - complex defense agreements between nations, 3) Imperialism - competition for colonies, 4) Nationalism - intense pride in one's nation, and 5) The immediate trigger was the assassination of Archduke Franz Ferdinand of Austria-Hungary.";
    
    // Grade 11 responses
    } else if (lowerMessage.includes('newton') && lowerMessage.includes('laws')) {
      return "Newton's three laws of motion are: 1) An object in motion stays in motion, and an object at rest stays at rest unless acted upon by an external force (Inertia). 2) Force equals mass times acceleration (F=ma). 3) For every action, there is an equal and opposite reaction.";
    } else if (lowerMessage.includes('structure of an atom')) {
      return "An atom consists of a small, dense nucleus containing protons (positively charged) and neutrons (neutral), surrounded by electrons (negatively charged) in electron clouds or orbitals. The nucleus makes up most of the atom's mass, while electrons determine its chemical properties.";
    } else if (lowerMessage.includes('quadratic formula')) {
      return "The quadratic formula is used to find the roots of a quadratic equation in the form ax² + bx + c = 0. The formula is: x = [-b ± √(b² - 4ac)] / (2a). The discriminant (b² - 4ac) determines the nature of the roots.";
    } else if (lowerMessage.includes('cellular respiration')) {
      return "Cellular respiration is the process by which cells convert glucose and oxygen into carbon dioxide, water, and ATP (energy). The overall equation is: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP. It occurs in three main stages: glycolysis, the Krebs cycle, and the electron transport chain.";
    } else if (lowerMessage.includes('macbeth')) {
      return "The main themes in Shakespeare's Macbeth include: 1) The corrupting nature of unchecked ambition, 2) The relationship between cruelty and masculinity, 3) The difference between kingship and tyranny, 4) The role of fate vs. free will, and 5) The disruption of the natural order.";
    
    // Grade 12 responses
    } else if (lowerMessage.includes('relativity')) {
      return "Einstein's theory of relativity consists of two parts: 1) Special Relativity (1905) which deals with objects moving at constant speed, introducing concepts like time dilation and length contraction, and 2) General Relativity (1915) which describes gravity as the curvature of spacetime caused by mass and energy.";
    } else if (lowerMessage.includes('dna replication')) {
      return "DNA replication is the process by which a cell makes an identical copy of its DNA before cell division. It's semi-conservative, meaning each new DNA molecule contains one original strand and one new strand. The process involves enzymes like DNA helicase (unwinds DNA), DNA polymerase (adds nucleotides), and DNA ligase (joins Okazaki fragments).";
    } else if (lowerMessage.includes('differential equations')) {
      return "Differential equations involve functions and their derivatives. To solve them: 1) Identify the type (ordinary/partial, linear/nonlinear, order), 2) Use appropriate methods like separation of variables, integrating factors, or series solutions, 3) Apply initial/boundary conditions, and 4) Verify the solution by substitution. The general solution includes arbitrary constants equal to the order of the equation.";
    } else if (lowerMessage.includes('limits in calculus')) {
      return "In calculus, a limit describes the value that a function approaches as the input approaches some value. Key concepts include: 1) One-sided limits, 2) Limits at infinity, 3) Continuity, and 4) The formal (ε-δ) definition. Limits are fundamental to defining derivatives and integrals.";
    } else if (lowerMessage.includes('keynes') || lowerMessage.includes('economic')) {
      return "John Maynard Keynes' main economic theories include: 1) The idea that aggregate demand drives economic activity, 2) The paradox of thrift (saving can be harmful in a recession), 3) The need for government intervention during economic downturns, 4) The concept of the multiplier effect, and 5) The importance of expectations in economic decision-making.";
    
    // Default response
    } else {
      const defaultResponses = [
        "That's an interesting question! Could you provide more details?",
        "I'd be happy to help with that. Could you rephrase your question?",
        "I'm designed to help with academic questions. Could you try asking about a specific topic?",
        "I'm not sure I understand. Could you ask in a different way?",
        "That's a great question! I'm still learning, but I'll do my best to help."
      ];
      return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'student',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    // Get predefined response
    const response = getPredefinedResponse(inputText);
    
    // Add slight delay before responding
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'senseai',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SenseAI...</p>
        </div>
      </div>
    );
  }



  return (
    <div className="h-full screen bg-[#0A1A2F] relative overflow-hidden p-0 m-0">
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
      <style jsx global>{`
        .chat-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .chat-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .chat-scroll::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .chat-scroll::-webkit-scrollbar-thumb:hover {
          background: #555;
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
      `}</style>
      <style jsx>{`
        .chat-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .chat-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .chat-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .chat-scroll::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in-message {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>

      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100%-1rem)]">
          {/* Left Column - Information Box */}
          <div>
            <div>
              <h1 className="text-3xl lg:text-5xl font-['Ubuntu'] font-bold text-purple-300 mt-20 mb-2">
                SENSEAI
              </h1>
              <p className="text-purple-200">
                Your Intelligent Learning Assistant
              </p>
            </div>
            <h2 className="text-xl lg:text-2xl text-white mb-6 mt-10">
              SenseAI Assistant
            </h2>
            <p className="text-white leading-relaxed mb-4">
              SENSAI, CLASSA's intelligent AI assistant, transforms how students interact with academic content. 
              Designed specifically for educational environments, SENSAI provides immediate assistance, 
              enhancing learning efficiency and engagement.
            </p>
            <div className="mt-4 p-4 rounded-lg shadow-inner">
              <span className="text-sm text-white">User ID: </span>
              <span className="text-sm font-mono text-blue-600 break-all">{userId}</span>
            </div>
          </div>

          {/* Right Column - Chat Interface */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl h-full flex flex-col border border-white/20 overflow-hidden">
            <div className="relative bg-[#A422D0CC] p-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-black overflow-hidden">
                  <img src="/image/senseai.png" alt="senseai" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black">
                    SenseAI Chat
                  </h3>
                  <p className="text-sm text-black/90">Online • Ready to help</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col h-[70vh] bg-white rounded-lg shadow-inner">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`fade-in-message mb-4 ${
                        message.sender === 'student' ? 'text-right' : 'text-left'
                      }`}
                    >
                      <div
                        className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          message.sender === 'student'
                            ? 'bg-[#A422D0CC] text-white'
                            : 'bg-gray-100 text-gray-800 border border-gray-200'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-75 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-left mb-4"
                  >
                    <div className="inline-block px-4 py-2 rounded-2xl bg-gray-200 text-gray-800">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <p className="text-sm ml-2">SenseAI is typing...</p>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="flex space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    disabled={isTyping || autoStarted}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isTyping || !inputText.trim() || autoStarted}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
