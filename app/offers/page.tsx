'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const OffersPage = () => {
  

  return (
    <div className="bg-[#e7e5e4]">
      {/* Head Content */}
      <div className="relative pt-20 pb-1 bg-[#e7e5e4] overflow-hidden">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div 
            className="text-center pb-8 w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 drop-shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              What We Offer
            </motion.h1>
            <motion.div 
              className="w-24 h-1.5 bg-yellow-600 mx-auto rounded-full mb-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
          <p className="text-lg md:text-xl text-gray-800 mb-8">
            Discover our range of tailored solutions designed to help your business grow, innovate, and succeed. From strategy to execution, we’re here to partner with you every step of the way.
          </p>
        </div>
          {/* Modules Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* CMS */}
        <motion.div
          className="relative h-full rounded-2xl shadow-lg overflow-hidden"
          whileHover="hover"
          initial="rest"
          animate="rest"
          style={{ perspective: '1200px' }}
        >
          <motion.div 
            className="relative h-full bg-[#87CEEB] at 40% p-6 flex flex-col items-center text-center rounded-2xl"
            variants={{
              rest: { 
                rotateY: 0,
                transition: { duration: 0.5, ease: [0.2, 0.8, 0.4, 1] } 
              },
              hover: { 
                rotateY: 20,
                scale: 1.03,
                transition: { 
                  rotateY: { duration: 0.5, ease: [0.2, 0.8, 0.4, 1] },
                  scale: { duration: 0.3, ease: [0.2, 0.8, 0.4, 1] }
                }
              }
            }}
          >
            <motion.div 
              className="relative z-10 w-full h-full flex flex-col items-center"
              variants={{
                rest: { y: 0 },
                hover: { y: -10 }
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-52 h-32 bg-white/30 backdrop-blur-sm rounded-2xl p-3 mb-4 shadow-lg">
                <img src="../image/all.png" alt="CMS" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Management System</h2>
              <div className="text-sm text-gray-600 mb-4 font-medium bg-white/50 px-3 py-1 rounded-full">
                Simplify Teaching. Personalize Learning.
              </div>
              <p className="text-gray-700 text-base">
                Give students access to NCERT-aligned notes, flashcards, summaries, and mnemonics. Teachers can upload custom content and students can take notes directly within the platform.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
        {/* LMS */}
        <motion.div 
          className="relative h-full rounded-2xl overflow-hidden"
          whileHover="hover"
          initial="rest"
          style={{ perspective: '1200px' }}
        >
          <motion.div 
            className="relative h-full bg-[#F0E68C] at 20% p-6 flex flex-col items-center text-center rounded-2xl"
            variants={{
              rest: { 
                rotateX: 0,
                transition: { duration: 0.5, ease: [0.2, 0.8, 0.4, 1] } 
              },
              hover: { 
                rotateX: 10,
                scale: 1.03,
                boxShadow: "0 20px 40px rgba(244,63,94,0.15)",
                transition: { 
                  rotateX: { duration: 0.5, ease: [0.2, 0.8, 0.4, 1] },
                  scale: { duration: 0.3, ease: [0.2, 0.8, 0.4, 1] },
                  boxShadow: { duration: 0.3 }
                }
              }
            }}
          >
            <motion.div 
              className="relative z-10 w-full h-full flex flex-col items-center"
              variants={{
                rest: { y: 0 },
                hover: { y: -10 }
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-52 h-32 bg-white/30 backdrop-blur-sm rounded-2xl p-3 mb-4 shadow-lg">
                <img src="../image/ai.png" alt="LMS" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Learning Management System</h2>
              <div className="text-sm text-gray-600 mb-4 font-medium bg-white/50 px-3 py-1 rounded-full">
                All Your Educational Resources—Organized and On Demand
              </div>
              <p className="text-gray-700 text-base mb-4">
                Deliver engaging online classes, assign homework, manage student diaries, and track progress in real-time. A structured and collaborative digital classroom—made simple.
              </p>
            </motion.div>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-2xl"
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1 }
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
        {/* AMS */}
        <motion.div 
          className="relative h-full rounded-2xl overflow-hidden"
          whileHover="hover"
          initial="rest"
          style={{ perspective: '1200px' }}
        >
          <motion.div 
            className="relative h-full bg-[#98FB98] p-6 flex flex-col items-center text-center rounded-2xl"
            variants={{
              rest: { 
                rotateY: 0,
                transition: { duration: 0.5, ease: [0.2, 0.8, 0.4, 1] } 
              },
              hover: { 
                rotateY: -15,
                scale: 1.03,
                boxShadow: "0 20px 40px rgba(253,224,71,0.15)",
                transition: { 
                  rotateY: { duration: 0.5, ease: [0.2, 0.8, 0.4, 1] },
                  scale: { duration: 0.3, ease: [0.2, 0.8, 0.4, 1] },
                  boxShadow: { duration: 0.3 }
                }
              }
            }}
          >
            <motion.div 
              className="relative z-10 w-full h-full flex flex-col items-center"
              variants={{
                rest: { y: 0 },
                hover: { y: -10 }
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-52 h-32 bg-white/30 backdrop-blur-sm rounded-2xl p-3 mb-4 shadow-lg">
                <img src="../image/build.png" alt="AMS" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Assessment Management System</h2>
              <div className="text-sm text-gray-600 mb-4 font-medium bg-white/50 px-3 py-1 rounded-full">
                Smarter Tests. Sharper Insights.
              </div>
              <p className="text-gray-700 text-base mb-4">
                Create adaptive tests, auto-grade responses, and get instant performance insights. Easily track concept mastery and exam readiness with powerful analytics.
              </p>
            </motion.div>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-amber-500/10 rounded-2xl"
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1 }
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
        {/* SENSAI */}
        <motion.div 
          className="relative h-full rounded-2xl overflow-hidden"
          whileHover="hover"
          initial="rest"
          style={{ perspective: '1200px' }}
        >
          <motion.div 
            className="relative h-full bg-[#DDA0DD] p-6 flex flex-col items-center text-center rounded-2xl"
            variants={{
              rest: { 
                rotateX: 0,
                transition: { duration: 0.5, ease: [0.2, 0.8, 0.4, 1] } 
              },
              hover: { 
                rotateX: -12,
                scale: 1.03,
                boxShadow: "0 20px 40px rgba(16,185,129,0.12)",
                transition: { 
                  rotateX: { duration: 0.5, ease: [0.2, 0.8, 0.4, 1] },
                  scale: { duration: 0.3, ease: [0.2, 0.8, 0.4, 1] },
                  boxShadow: { duration: 0.3 }
                }
              }
            }}
          >
            <motion.div 
              className="relative z-10 w-full h-full flex flex-col items-center"
              variants={{
                rest: { y: 0 },
                hover: { y: -10 }
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-52 h-32 bg-white/30 backdrop-blur-sm rounded-2xl p-3 mb-4 shadow-lg">
                <img src="../image/boost.png" alt="SENSAI" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">SENSEI – AI Learning Assistant</h2>
              <div className="text-sm text-gray-600 mb-4 font-medium bg-white/50 px-3 py-1 rounded-full">
                Instant Answers. Continuous Support.
              </div>
              <p className="text-gray-700 text-base mb-4">
                Answer doubts instantly, get concept explanations, and convert handwritten notes into digital files. SENSAI offers 24/7 learning support using smart AI tools.
              </p>
            </motion.div>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl"
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1 }
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
        {/* SMS */}
        <motion.div 
          className="relative h-full rounded-2xl overflow-hidden"
          whileHover="hover"
          initial="rest"
          style={{ perspective: '1200px' }}
        >
          <motion.div 
            className="relative h-full bg-[#FFDAB9] p-6 flex flex-col items-center text-center rounded-2xl"
            variants={{
              rest: { 
                rotateX: 0,
                rotateY: 0,
                transition: { duration: 0.5, ease: [0.2, 0.8, 0.4, 1] } 
              },
              hover: { 
                rotateX: 8,
                rotateY: 8,
                scale: 1.03,
                boxShadow: "0 20px 40px rgba(252,165,165,0.15)",
                transition: { 
                  rotateX: { duration: 0.5, ease: [0.2, 0.8, 0.4, 1] },
                  rotateY: { duration: 0.5, ease: [0.2, 0.8, 0.4, 1] },
                  scale: { duration: 0.3, ease: [0.2, 0.8, 0.4, 1] },
                  boxShadow: { duration: 0.3 }
                }
              }
            }}
          >
            <motion.div 
              className="relative z-10 w-full h-full flex flex-col items-center"
              variants={{
                rest: { y: 0 },
                hover: { y: -10 }
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-52 h-32 bg-white/30 backdrop-blur-sm rounded-2xl p-3 mb-4 shadow-lg">
                <img src="../image/teachers.png" alt="SMS" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">School Management System</h2>
              <div className="text-sm text-gray-600 mb-4 font-medium bg-white/50 px-3 py-1 rounded-full">
                Run Your Institution with Confidence and Control
              </div>
              <p className="text-gray-700 text-base mb-4">
                Automate daily school operations—attendance, fees, transport, staff, library, hostel, and more. All-in-one admin control with real-time data and reports.
              </p>
            </motion.div>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-red-400/10 to-rose-500/10 rounded-2xl"
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1 }
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
        {/* Admission Management System */}
        <motion.div 
          className="relative h-full rounded-2xl overflow-hidden"
          whileHover="hover"
          initial="rest"
          style={{ perspective: '1200px' }}
        >
          <motion.div 
            className="relative h-full bg-[#FFCCCC] p-6 flex flex-col items-center text-center rounded-2xl"
            variants={{
              rest: { 
                rotateX: 0,
                rotateY: 0,
                transition: { duration: 0.5, ease: [0.2, 0.8, 0.4, 1] } 
              },
              hover: { 
                rotateX: -8,
                rotateY: -8,
                scale: 1.03,
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.15)",
                transition: { 
                  rotateX: { duration: 0.5, ease: [0.2, 0.8, 0.4, 1] },
                  rotateY: { duration: 0.5, ease: [0.2, 0.8, 0.4, 1] },
                  scale: { duration: 0.3, ease: [0.2, 0.8, 0.4, 1] },
                  boxShadow: { duration: 0.3 }
                }
              }
            }}
          >
            <motion.div 
              className="relative z-10 w-full h-full flex flex-col items-center"
              variants={{
                rest: { y: 0 },
                hover: { y: -10 }
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-52 h-32 bg-white/30 backdrop-blur-sm rounded-2xl p-3 mb-4 shadow-lg">
                <img src="../image/parents.png" alt="Admission" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Admission Management System</h2>
              <div className="text-sm text-gray-600 mb-4 font-medium bg-white/50 px-3 py-1 rounded-full">
                Convert Leads. Simplify Enrollment.
              </div>
              <p className="text-gray-700 text-base mb-4">
                Capture and manage inquiries, engage leads through an AI chatbot, and streamline enrollment. Speed up the admission process from inquiry to onboarding—effortlessly.
              </p>
            </motion.div>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-2xl"
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1 }
              }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>  
    </div>
  );
};

export default OffersPage;