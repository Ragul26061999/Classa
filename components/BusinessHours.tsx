import React from 'react';
import { motion } from 'framer-motion';

const BusinessHours = () => {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const times = [
    '9:00 AM - 9:00 PM',
    '9:00 AM - 9:00 PM',
    '9:00 AM - 9:00 PM',
    '9:00 AM - 9:00 PM',
    '9:00 AM - 10:00 PM',
    '9:00 AM - 10:00 PM',
    '9:00 AM - 11:00 PM',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-blue-100"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <svg
          className="w-6 h-6 mr-2 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Business Hours
      </h3>
      <div className="space-y-4">
        {days.map((day, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b border-blue-100 last:border-0"
          >
            <span className="text-gray-700 font-medium">{day}</span>
            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
              {times[index]}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-blue-700 flex items-center">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Extended hours available for special events and private bookings
        </p>
      </div>
    </motion.div>
  );
};

export default BusinessHours;
