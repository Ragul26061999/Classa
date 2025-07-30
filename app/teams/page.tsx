
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  image: string;
  content: string;
}

const AnimatedTooltip = ({
  items,
  selectedId,
  onSelect,
}: {
  items: TeamMember[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );
  
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  );
  
  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const target = event.target as HTMLImageElement;
    const halfWidth = target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  const handleClick = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    onSelect(id === selectedId ? null : id);
  };

  return (
    <div className="flex flex-wrap justify-center p-8">
      {items.map((item) => (
        <div
          className="group relative mb-2"
          key={item.id}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="wait">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
              >
                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                <div className="relative z-30 text-base font-bold text-white">
                  {item.name}
                </div>
                <div className="text-xs text-white">{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <img
            onMouseMove={handleMouseMove}
            height={100}
            width={100}
            src={item.image}
            alt={item.name}
            className={`relative h-24 w-24 rounded-full border-2 border-white object-cover object-top transition duration-500 group-hover:z-30 group-hover:scale-110 cursor-pointer ${selectedId === item.id ? 'ring-4 ring-blue-500' : ''}`}
            onClick={(e) => handleClick(item.id, e)}
          />
          {selectedId === item.id && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-64 p-4 bg-white rounded-lg shadow-lg text-center text-gray-800"
            >
              <h3 className="font-bold text-lg mb-2">{item.name}</h3>
              <p className="text-sm mb-2 text-blue-600">{item.designation}</p>
              <p className="text-sm">{item.content}</p>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    content: "John is a full-stack developer with 8 years of experience in building scalable web applications. He specializes in React, Node.js, and cloud architecture."
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    content: "Robert leads our product strategy with 10+ years of experience in the tech industry. He's passionate about creating user-centric products that solve real problems."
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    content: "Jane specializes in machine learning and data analysis. She holds a PhD in Computer Science and has published several papers on AI ethics."
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    content: "Emily is our lead UX designer with a keen eye for detail. She's passionate about creating intuitive and accessible user experiences."
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    content: "Tyler specializes in creating unique soap-based solutions. With years of experience in the industry, he brings a fresh perspective to our team."
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    content: "Dora loves exploring new technologies and bringing innovative ideas to the table. Her curiosity and enthusiasm are contagious!"
  },
];

export default function TeamsPage() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [centeredMember, setCenteredMember] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const scrollPosition = useRef(0);
  const isPaused = useRef(false);
  const lastScrollTime = useRef(0);
  
  // Auto-scroll animation
  useEffect(() => {
    if (!carouselRef.current) return;
    
    const carousel = carouselRef.current;
    const container = carousel.parentElement;
    if (!container) return;
    
    const scrollWidth = carousel.scrollWidth / 2; // Since we duplicate the content
    const duration = 40000; // 40 seconds for one full loop
    let animationFrameId: number;
    let startTime: number | null = null;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      if (!isPaused.current) {
        scrollPosition.current = (elapsed / duration) % 1;
        const scrollX = scrollPosition.current * scrollWidth;
        carousel.scrollLeft = scrollX;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    // Pause on hover
    const handleMouseEnter = () => {
      isPaused.current = true;
    };
    
    const handleMouseLeave = () => {
      isPaused.current = false;
      lastScrollTime.current = performance.now();
      startTime = performance.now() - (scrollPosition.current * duration);
    };
    
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  // Function to center the hovered member's content
  const centerMemberContent = (memberId: number) => {
    if (!carouselRef.current) return;
    
    const container = carouselRef.current;
    const contentItems = container.querySelectorAll('[data-member-id]');
    const targetItem = Array.from(contentItems).find(
      item => parseInt(item.getAttribute('data-member-id') || '0') === memberId
    ) as HTMLElement;
    
    if (targetItem) {
      const containerWidth = container.offsetWidth;
      const itemLeft = targetItem.offsetLeft;
      const itemWidth = targetItem.offsetWidth;
      const scrollTo = itemLeft - (containerWidth / 2) + (itemWidth / 2);
      
      container.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };
  
  // Handle member hover with debounce
  const handleMemberHover = (memberId: number | null) => {
    setHoveredMember(memberId);
    if (memberId !== null) {
      setCenteredMember(memberId);
      setSelectedMember(memberId); // Update selected member to match hover
      centerMemberContent(memberId);
    } else {
      setCenteredMember(null);
    }
  };

  // Close the content when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setSelectedMember(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const selectedMemberData = teamMembers.find(member => member.id === selectedMember);

  return (
    <main className="min-h-1/2 bg-blue-100 relative py-7">
      <div className="container mx-auto px-4 ">
        <h1 className="mt-16 pb-8 text-center text-4xl font-bold text-black md:text-5xl">
          Our CLASSA Team
        </h1>
        {/* Team Members with Connected Content */}
        <div className="relative py-4 overflow-hidden">
          {/* Images Row */}
          <div className="flex justify-center mb-16 relative z-10">
            <div className="flex space-x-(-2) px-4">
              {teamMembers.map((member) => (
                <div 
                  key={`img-${member.id}`} 
                  className="relative group flex flex-col items-center"
                  onMouseEnter={() => handleMemberHover(member.id)}
                  onMouseLeave={() => handleMemberHover(null)}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-4 cursor-pointer transition-all duration-300 ${
                      selectedMember === member.id 
                        ? 'border-blue-500 scale-110' 
                        : hoveredMember === member.id
                          ? 'border-blue-300 scale-105'
                          : 'border-white'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMember(member.id === selectedMember ? null : member.id);
                    }}
                  />
                  <div 
                    className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-0.5 transition-all duration-300 ${
                      selectedMember === member.id 
                        ? 'bg-blue-500 h-14' 
                        : hoveredMember === member.id
                          ? 'bg-blue-300 h-10'
                          : 'bg-blue-200 h-8'
                    }`}
                  ></div>
                  <div className="absolute -bottom-16 text-center">
                    <p className="text-sm font-medium text-white whitespace-nowrap">
                      {member.name}
                    </p>
                    <p className="text-xs text-blue-100">
                      {member.designation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Content Carousel */}
          <div className="relative py-16 overflow-visible">
            <div 
              ref={carouselRef}
              className="flex space-x-8 py-8 overflow-x-auto scrollbar-hide"
              style={{
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
                paddingLeft: '50%',
                paddingRight: '50%',
              }}
            >
              {[...teamMembers, ...teamMembers].map((member, index) => (
                <motion.div 
                  key={`carousel-${member.id}-${index}`}
                  data-member-id={member.id}
                  className={`flex-shrink-0 w-80 p-6 bg-white rounded-2xl shadow-xl cursor-pointer transition-all duration-300 ${
                    selectedMember === member.id ? 'ring-4 ring-blue-400' : ''
                  }`}
                  style={{
                    scrollSnapAlign: 'center',
                    transform: hoveredMember === member.id ? 'translateY(-10px) scale(1.05)' : 'none',
                    boxShadow: hoveredMember === member.id 
                      ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                      : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                  onClick={() => setSelectedMember(member.id)}
                  onMouseEnter={() => {
                    setHoveredMember(member.id);
                    centerMemberContent(member.id);
                  }}
                  onMouseLeave={() => setHoveredMember(null)}
                  whileHover={{
                    zIndex: 10,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="flex items-center mb-4">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-blue-500 mr-3"
                      animate={{
                        scale: hoveredMember === member.id ? 1.5 : 1,
                        backgroundColor: hoveredMember === member.id ? '#3b82f6' : '#3b82f6'
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.h3 
                      className="text-lg font-semibold text-gray-800"
                      animate={{
                        color: hoveredMember === member.id ? '#1e40af' : '#1f2937'
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {member.name}
                    </motion.h3>
                  </div>
                  <motion.p 
                    className="text-gray-600 text-sm"
                    animate={{
                      opacity: hoveredMember === member.id ? 1 : 0.9
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {member.content}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Gradient fades */}
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#] to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#] to-transparent pointer-events-none"></div>
        </div>
        
        {/* Popup content has been removed */}
      </div>
    </main>
  );
}