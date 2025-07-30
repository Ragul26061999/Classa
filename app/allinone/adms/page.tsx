'use client';

import { useState, useEffect } from 'react';
import ContactForm from '../../contactus/page';

interface Message {
  id: number;
  text: string;
  sender: 'ai' | 'parent';
  timestamp: string;
}

interface Student {
  // Basic Information
  name: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  
  // Academic Information
  class: string;
  previousSchool: string;
  subjects: string[];
  
  // Contact Information
  address: string;
  city: string;
  state: string;
  pincode: string;
  parentName: string;
  parentContact: string;
  alternateContact: string;
  email: string;
  
  // Medical Information
  hasMedicalConditions: boolean;
  medicalConditions: string;
  
  // Admission Details
  admissionDate: string;
  admissionNumber: string;
  documentsSubmitted: string[];
}

export default function AdmissionManagementSystem() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student>({
    // Basic Information
    name: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    
    // Academic Information
    class: '',
    previousSchool: '',
    subjects: [],
    
    // Contact Information
    address: '',
    city: '',
    state: '',
    pincode: '',
    parentName: '',
    parentContact: '',
    alternateContact: '',
    email: '',
    
    // Medical Information
    hasMedicalConditions: false,
    medicalConditions: '',
    
    // Admission Details
    admissionDate: '',
    admissionNumber: '',
    documentsSubmitted: []
  });
  const [isTyping, setIsTyping] = useState(false);

  const startConversation = () => {
    const conversation = [
      // Basic Information
      { sender: 'ai' as const, text: "Hello! I'm here to help you with the admission process. May I know your child's full name?" },
      { sender: 'parent' as const, text: "My child's name is Aarav Sharma" },
      { sender: 'ai' as const, text: "Thank you, Mr./Mrs. Sharma. Could you please share Aarav's date of birth? (DD/MM/YYYY)" },
      { sender: 'parent' as const, text: "15/08/2015" },
      { sender: 'ai' as const, text: "What is Aarav's gender? (Male/Female/Other)" },
      { sender: 'parent' as const, text: "Male" },
      { sender: 'ai' as const, text: "Could you share Aarav's blood group if known? (e.g., A+, B+, O+)" },
      { sender: 'parent' as const, text: "B+ve" },
      
      // Academic Information
      { sender: 'ai' as const, text: "Which class would you like to admit Aarav to?" },
      { sender: 'parent' as const, text: "Class 5th" },
      { sender: 'ai' as const, text: "Which school is Aarav currently attending?" },
      { sender: 'parent' as const, text: "Sunshine Public School" },
      { sender: 'ai' as const, text: "What are Aarav's preferred subjects? (e.g., Math, Science, English)" },
      { sender: 'parent' as const, text: "Math, Science, and Computer Science" },
      
      // Contact Information
      { sender: 'ai' as const, text: "Could you please share your full name as the parent/guardian?" },
      { sender: 'parent' as const, text: "Rahul Sharma" },
      { sender: 'ai' as const, text: "Thank you, Mr. Sharma. What is your contact number?" },
      { sender: 'parent' as const, text: "9876543210" },
      { sender: 'ai' as const, text: "Do you have an alternate contact number?" },
      { sender: 'parent' as const, text: "Yes, 9876512345" },
      { sender: 'ai' as const, text: "What is your email address?" },
      { sender: 'parent' as const, text: "sharma.family@email.com" },
      { sender: 'ai' as const, text: "Please provide your complete address." },
      { sender: 'parent' as const, text: "123, Green Park, New Delhi" },
      { sender: 'ai' as const, text: "Which city and state is this in?" },
      { sender: 'parent' as const, text: "New Delhi, Delhi" },
      { sender: 'ai' as const, text: "What is your area's pincode?" },
      { sender: 'parent' as const, text: "110016" },
      
      // Medical Information
      { sender: 'ai' as const, text: "Does Aarav have any medical conditions we should be aware of? (Yes/No)" },
      { sender: 'parent' as const, text: "No" },
      
      // Admission Details
      { sender: 'ai' as const, text: "When would you prefer the admission date?" },
      { sender: 'parent' as const, text: "Next Monday, 15th January" },
      
      // Confirmation
      { sender: 'ai' as const, text: "Admission confirmed for Aarav Sharma - Class 5th on 15th January. You'll receive confirmation via SMS and email." }
    ];

    // Set initial student data with all collected information
    setCurrentStudent({
      // Basic Information
      name: 'Aarav Sharma',
      dateOfBirth: '15/08/2015',
      gender: 'Male',
      bloodGroup: 'B+ve',
      
      // Academic Information
      class: '5th',
      previousSchool: 'Sunshine Public School',
      subjects: ['Math', 'Science', 'Computer Science'],
      
      // Contact Information
      address: '123, Green Park',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110016',
      parentName: 'Rahul Sharma',
      parentContact: '9876543210',
      alternateContact: '9876512345',
      email: 'sharma.family@email.com',
      
      // Medical Information
      hasMedicalConditions: false,
      medicalConditions: '',
      
      // Admission Details
      admissionDate: '15th January 2024',
      admissionNumber: 'ADM' + Math.floor(1000 + Math.random() * 9000),
      documentsSubmitted: ['Birth Certificate', 'Previous School TC', 'Aadhar Card']
    });

    setIsTyping(true);
    conversation.forEach((msg, index) => {
      setTimeout(() => {
        setMessages(prev => [...prev, { ...msg, id: Date.now() + index, timestamp: new Date().toLocaleTimeString() }]);
        if (msg.sender === 'ai') {
          // Update specific fields based on the AI's message
          setCurrentStudent(prev => {
            // Start with previous state
            const updated = { ...prev };
            
            // Update fields based on message content
            if (msg.text.includes('Aarav')) updated.name = 'Aarav Sharma';
            if (msg.text.includes('gender')) updated.gender = 'Male';
            if (msg.text.includes('address')) updated.address = '123, Green Park, New Delhi';
            if (msg.text.includes('pincode')) updated.pincode = '110016';
            if (msg.text.includes('Class')) updated.class = '5th';
            if (msg.text.includes('school')) updated.previousSchool = 'Sunshine Public School';
            if (msg.text.includes('subjects')) updated.subjects = ['Math', 'Science', 'Computer Science'];
            if (msg.text.includes('parent')) updated.parentName = 'Rahul Sharma';
            if (msg.text.includes('contact')) updated.parentContact = '9876543210';
            if (msg.text.includes('alternate')) updated.alternateContact = '9876512345';
            if (msg.text.includes('@')) updated.email = 'sharma.family@email.com';
            if (msg.text.includes('date of birth')) updated.dateOfBirth = '15/08/2015';
            if (msg.text.includes('blood group')) updated.bloodGroup = 'B+ve';
            if (msg.text.includes('medical conditions')) {
              updated.hasMedicalConditions = false;
              updated.medicalConditions = '';
            }
            if (msg.text.includes('admission date')) updated.admissionDate = '15th January 2024';
            
            return updated;
          });
        }
        if (index === conversation.length - 1) {
          setIsTyping(false);
        }
      }, index * 2000);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startConversation();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.sender === 'ai' && lastMessage.text.includes('Admission confirmed')) {
      const timer = setTimeout(() => {
        setIsFormCompleted(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setIsFormCompleted(false);
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#0A1A2F] relative overflow-hidden pt-5 -pb-10 px-4 sm:px-6 lg:px-8">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Admission Management System Overview */}
          <div>
            <h1 className="text-3xl font-['Ubuntu'] font-bold text-red-300 mb-6 mt-15">Admission Management System</h1>
            <p className="text-red-200 mb-4">
              Streamlines your entire admissions process
            </p>
            
            <div className="space-y-6">
              <p className="text-white mt-6 leading-relaxed">
                Admission Management System streamlines your entire admissions process, turning leads into enrolled students swiftly and efficiently. Enhance inquiry management, automate enrollment tasks, and create seamless experiences for both students and parents.
              </p>
                
                <div className="space-y-4">
                  {[
                    "Intelligent inquiry capture and lead qualification",
                    "Automated follow-up sequences and reminders",
                    "Real-time application status tracking",
                    "Document management and verification",

                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      </div>
                      <p className="ml-3 text-white">{feature}</p>
                    </div>
                  ))}
                </div>

                {/* Key Metrics */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="p-4 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">95%</div>
                    <div className="text-sm text-red-700">Conversion Rate</div>
                  </div>
                  <div className="p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">50K+</div>
                    <div className="text-sm text-blue-700">Applications</div>
                  </div>
                  <div className="p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">70%</div>
                    <div className="text-sm text-purple-700">Time Saved</div>
                  </div>
                  <div className=" p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">24/7</div>
                    <div className="text-sm text-orange-700">Support</div>
                  </div>
                </div>
            </div>
          </div>
          <div className="space-y-6">
            {/* Right Side - Animated Conversation Interface */}
            {/* <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-xl mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Live Conversation</h2>
              <p className="text-white/90 text-sm">
                AI-powered admission conversations
              </p>
            </div> */}

            {/* Conversation Container */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[80vh] w-full">
              {/* Header */}
              <div className="bg-[#E75C5C66] p-8 flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-black font-semibold">Live Chat</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {isFormCompleted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h3>
                    <p className="text-gray-600 mb-6">We've received your details. Our team will contact you shortly.</p>
                    <button 
                      onClick={() => window.location.reload()}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Start New Admission
                    </button>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'} animate-fadeIn`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          message.sender === 'ai'
                            ? 'bg-gradient-to-r from-indigo-100 to-purple-100 text-gray-800'
                            : 'bg-gradient-to-r from-green-100 to-emerald-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                      </div>
                    </div>
                  ))
                )}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Student Info Display - Only show when form is completed */}
            {isFormCompleted && currentStudent.name && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-800">Student Details</h4>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {currentStudent.admissionNumber}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {/* Basic Information */}
                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-700 border-b pb-1">Basic Information</h5>
                      <div><span className="text-gray-600">Full Name:</span> <span className="font-medium">{currentStudent.name}</span></div>
                      <div><span className="text-gray-600">Date of Birth:</span> <span className="font-medium">{currentStudent.dateOfBirth}</span></div>
                      <div><span className="text-gray-600">Gender:</span> <span className="font-medium">{currentStudent.gender}</span></div>
                      <div><span className="text-gray-600">Blood Group:</span> <span className="font-medium">{currentStudent.bloodGroup || 'N/A'}</span></div>
                    </div>
                    
                    {/* Academic Information */}
                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-700 border-b pb-1">Academic Information</h5>
                      <div><span className="text-gray-600">Class:</span> <span className="font-medium">{currentStudent.class}</span></div>
                      <div><span className="text-gray-600">Previous School:</span> <span className="font-medium">{currentStudent.previousSchool}</span></div>
                      <div>
                        <span className="text-gray-600">Preferred Subjects:</span>{' '}
                        <span className="font-medium">{currentStudent.subjects?.join(', ') || 'N/A'}</span>
                      </div>
                    </div>
                    
                    {/* Contact Information */}
                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-700 border-b pb-1">Contact Information</h5>
                      <div><span className="text-gray-600">Parent/Guardian:</span> <span className="font-medium">{currentStudent.parentName}</span></div>
                      <div><span className="text-gray-600">Primary Contact:</span> <span className="font-medium">{currentStudent.parentContact}</span></div>
                      <div><span className="text-gray-600">Alternate Contact:</span> <span className="font-medium">{currentStudent.alternateContact || 'N/A'}</span></div>
                      <div><span className="text-gray-600">Email:</span> <span className="font-medium">{currentStudent.email}</span></div>
                      <div className="space-y-1">
                        <div><span className="text-gray-600">Address:</span></div>
                        <div className="font-medium pl-2">
                          <div>{currentStudent.address}</div>
                          <div>{currentStudent.city}, {currentStudent.state}</div>
                          <div>Pincode: {currentStudent.pincode}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Admission & Medical */}
                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-700 border-b pb-1">Admission Details</h5>
                      <div><span className="text-gray-600">Admission Date:</span> <span className="font-medium">{currentStudent.admissionDate}</span></div>
                      
                      <div className="mt-2">
                        <h5 className="font-medium text-gray-700 border-b pb-1">Medical Information</h5>
                        <div><span className="text-gray-600">Medical Conditions:</span>{' '}
                          <span className="font-medium">
                            {currentStudent.hasMedicalConditions ? currentStudent.medicalConditions || 'Yes' : 'None reported'}
                          </span>
                        </div>
                      </div>
                      
                      {currentStudent.documentsSubmitted && currentStudent.documentsSubmitted.length > 0 && (
                        <div className="mt-2">
                          <h5 className="font-medium text-gray-700 border-b pb-1">Documents Submitted</h5>
                          <ul className="list-disc pl-5">
                            {currentStudent.documentsSubmitted.map((doc, index) => (
                              <li key={index} className="font-medium">{doc}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div> 
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Contact Form Section */}
      {/* <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Contact Us</h2>
          <ContactForm />
        </div>
      </div> */}
      
      {/* Contact Form Section */}
      {/* <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Need Help with Admissions?
          </h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <ContactForm />
          </div>
        </div>
      </div> */}
    

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
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}