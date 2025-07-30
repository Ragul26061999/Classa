"use client";

import { motion } from 'framer-motion';

interface TailoredProps {}

export default function Tailored({}: TailoredProps) {
  const roles = [
    {
      title: "Students",
      description: "Personalized learning paths, interactive content, and real-time feedback to enhance your educational journey.",
      features: ["Adaptive Learning", "Progress Tracking", "Interactive Content", "Peer Collaboration"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Teachers",
      description: "Comprehensive tools for lesson planning, student assessment, and classroom management.",
      features: ["Lesson Planning", "Student Analytics", "Grade Management", "Communication Tools"],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Administrators",
      description: "Institutional oversight, resource allocation, and strategic planning capabilities.",
      features: ["User Management", "Resource Allocation", "Analytics Dashboard", "Policy Management"],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Parents",
      description: "Stay connected with your child's educational progress and communicate with teachers.",
      features: ["Progress Monitoring", "Communication Portal", "Attendance Tracking", "Performance Reports"],
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Tailored Solutions for Every Role
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how Edueron adapts to meet the unique needs of each member in your educational community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {roles.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${role.color} mb-6`}>
                <span className="text-2xl font-bold text-white">
                  {role.title[0]}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {role.title}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {role.description}
              </p>
              
              <div className="space-y-3">
                {role.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${role.color} mt-2 mr-3 flex-shrink-0`} />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
