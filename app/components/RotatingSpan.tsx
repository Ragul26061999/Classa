'use client';

import { useEffect, useState } from 'react';

interface RotatingSpanProps {
  texts: string[];
  interval?: number;
}

export const RotatingSpan = ({ 
  texts, 
  interval = 3000 
}: RotatingSpanProps) => {
  const [visibleIdx, setVisibleIdx] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleIdx((prevIdx) => (prevIdx + 1) % texts.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <span className="inline-block min-w-[200px] text-blue-600">
      {texts[visibleIdx]}
    </span>
  );
};

export default RotatingSpan;
