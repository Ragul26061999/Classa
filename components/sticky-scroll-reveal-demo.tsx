"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "Principals & Admins",
    description: "Drive Efficiency and Innovation",
    cardColor: "from-blue-50 to-blue-100",
    iconColor: "text-blue-500",
    features: [
      {
        icon: "📊",
        text: "Oversee school operations from attendance to fee collection",
        animation: "hover:scale-110 hover:rotate-6 transition-transform duration-300"
      },
      {
        icon: "⚡",
        text: "Manage staff, timetable, hostel, transport, etc.",
        animation: "hover:scale-110 hover:rotate-3 transition-transform duration-300"
      },
      {
        icon: "📈",
        text: "View institution-wide reports and student analytics",
        animation: "hover:scale-110 hover:-rotate-6 transition-transform duration-300"
      }
    ],
    content: (
      <div className="flex flex-col h-[24em] w-full max-w-2xl p-4 md:p-6">
        <div className="flex-1 flex items-center justify-center">
          <img
            src="../image/1.png"
            alt="Admin Dashboard"
            className="h-auto w-full max-h-[80%] rounded-xl object-contain shadow-lg transition-all duration-300 hover:scale-[1.02]"
          />
        </div>
        <div className="mt-4 text-center text-sm font-medium text-gray-700">
          Comprehensive analytics dashboard for school administrators
        </div>
      </div>
    )
  },
  {
    title: "Teachers",
    description: "Empower your teaaching",
    cardColor: "from-emerald-50 to-emerald-100",
    iconColor: "text-emerald-500",
    features: [
      {
        icon: "📝",
        text: "Create assignments, conduct live classes, track student progress",
        animation: "hover:scale-125 hover:rotate-6 transition-transform duration-300"
      },
      {
        icon: "💬",
        text: "Use assessment tools and instant analytics",
        animation: "hover:scale-125 hover:-rotate-6 transition-transform duration-300"
      },
      {
        icon: "📚",
        text: "Personalize teaching based on student performance",
        animation: "hover:scale-125 hover:rotate-3 transition-transform duration-300"
      }
    ],
    content: (
      <div className="flex flex-col h-[24em] w-full max-w-2xl p-4 md:p-6">
        <div className="flex-1 flex items-center justify-center">
          <img
            src="../image/2.png"
            alt="Teacher Dashboard"
            className="h-auto w-full max-h-[80%] rounded-xl object-contain shadow-lg transition-all duration-300 hover:scale-[1.02]"
          />
        </div>
        <div className="mt-4 text-center text-sm font-medium text-gray-700">
          Intuitive interface for managing classes and student progress
        </div>
      </div>
    )
  },
  {
    title: "Students",
    description: "Learn Smarter not Harder",
    cardColor: "from-amber-50 to-amber-100",
    iconColor: "text-amber-500",
    features: [
      {
        icon: "💡",
        text: "Access structured lessons, digital notes, and flashcards",
        animation: "hover:scale-110 hover:rotate-12 transition-transform duration-300"
      },
      {
        icon: "🎯",
        text: "Attempt mock tests and view instant feedback",
        animation: "hover:scale-110 hover:-rotate-12 transition-transform duration-300"
      },
      {
        icon: "📋",
        text: "Track their own learning progress and performance",
        animation: "hover:scale-110 hover:rotate-6 transition-transform duration-300"
      }
    ],
    content: (
      <div className="flex flex-col h-[24em] w-full max-w-2xl p-4 md:p-6">
        <div className="flex-1 flex items-center justify-center">
          <img
            src="../image/3.png"
            alt="Student Dashboard"
            className="h-auto w-full max-h-[80%] rounded-xl object-contain shadow-lg transition-all duration-300 hover:scale-[1.02]"
          />
        </div>
        <div className="mt-4 text-center text-sm font-medium text-gray-700">
          Personalized learning dashboard for students
        </div>
      </div>
      
    )
  },
  {
    title: "Parents",
    description: "Stay Informed and Involved",
    cardColor: "from-purple-50 to-purple-100",
    iconColor: "text-purple-500",
    features: [
      {
        icon: "📊",
        text: "Receive real-time progress reports",
        animation: "hover:scale-125 hover:rotate-6 transition-transform duration-300"
      },
      {
        icon: "🔔",
        text: "Monitor assignments, test performance, and teacher feedback",
        animation: "hover:scale-125 hover:-rotate-6 transition-transform duration-300"
      },
      {
        icon: "💬",
        text: "Stay connected via communication tools",
        animation: "hover:scale-125 hover:rotate-3 transition-transform duration-300"
      }
    ],
    content: (
      <div className="flex flex-col h-[24em] w-full max-w-2xl p-4 md:p-6">
        <div className="flex-1 flex items-center justify-center">
          <img
            src="../image/4.png"
            alt="Parent Dashboard"
            className="h-auto w-full max-h-[80%] rounded-xl object-contain shadow-lg transition-all duration-300 hover:scale-[1.02]"
          />
        </div>
        <div className="mt-4 text-center text-sm font-medium text-gray-700">
          Stay updated with your child's academic journey
        </div>
      </div>
    )
  }
];

export default function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <StickyScroll content={content} />
      </div>
    </div>
  );
}
