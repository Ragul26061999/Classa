import React from 'react';
import { FaLayerGroup, FaRobot, FaMapMarkedAlt, FaChartLine, FaChalkboardTeacher, FaUserFriends, FaCloud } from 'react-icons/fa';
import Feature from './WhyChooseClassAFeature';

const WhyChooseClassA = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Class A?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Feature 
            icon={<FaLayerGroup className="w-8 h-8 mb-4" />}
            title="Comprehensive Learning"
            description="Access a wide range of courses and learning materials all in one place."
          />
          <Feature 
            icon={<FaRobot className="w-8 h-8 mb-4" />}
            title="AI-Powered"
            description="Leverage artificial intelligence to enhance your learning experience."
          />
          <Feature 
            icon={<FaMapMarkedAlt className="w-8 h-8 mb-4" />}
            title="Structured Path"
            description="Follow a clear learning path designed by industry experts."
          />
          <Feature 
            icon={<FaChartLine className="w-8 h-8 mb-4" />}
            title="Track Progress"
            description="Monitor your learning journey with detailed analytics."
          />
          <Feature 
            icon={<FaChalkboardTeacher className="w-8 h-8 mb-4" />}
            title="Expert Instructors"
            description="Learn from industry professionals and subject matter experts."
          />
          <Feature 
            icon={<FaUserFriends className="w-8 h-8 mb-4" />}
            title="Community Support"
            description="Join a community of learners and get help when you need it."
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseClassA;
