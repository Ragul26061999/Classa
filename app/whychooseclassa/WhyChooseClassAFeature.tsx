import React from "react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  blobClass?: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, blobClass }) => (
  <div className="relative flex items-center mb-8 group">
    {/* Blob background */}
    <div className={`absolute -left-6 -top-4 w-20 h-20 bg-gradient-to-tr ${blobClass ? blobClass : 'from-blue-300 via-purple-200 to-pink-200'} rounded-full blur-lg opacity-60 group-hover:scale-110 transition-transform duration-300`}></div>
    <div className="z-10 flex-shrink-0 w-12 h-12 flex items-center justify-center text-3xl bg-white/80 rounded-full shadow-lg mr-6 border border-gray-200">
      {icon}
    </div>
    <div className="z-10">
      <div className="font-bold text-lg text-gray-800 mb-1">{title}</div>
      <div className="text-gray-600 text-base leading-snug">{description}</div>
    </div>
  </div>
);

export default Feature;
