import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const WhyChooseClassAFeature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="text-4xl mb-4 text-blue-500">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
      <div className="mt-4 text-green-500">
        <FaCheckCircle className="text-xl" />
      </div>
    </div>
  );
};

export default WhyChooseClassAFeature;
