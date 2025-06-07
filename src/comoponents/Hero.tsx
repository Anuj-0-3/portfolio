'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen width on mount and resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Set on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dynamic scale based on device
  const scale = useTransform(
    scrollYProgress,
    [0, 0.4],
    isMobile ? [1.7, 1.5] : [1.5, 1]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <div className="relative h-[120vh] sm:h-[150vh] bg-[#1a1a1a] overflow-clip">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center z-20">
        <div className="text-center">
          <h1 className="font-alfa text-[#fff5d1] leading-tight">
            <span className="block text-[40px] sm:text-[60px] md:text-[100px] lg:text-[150px] tracking-wide">
              Anuj Singh
            </span>
            <span className="block text-[32px] sm:text-[48px] md:text-[80px] lg:text-[112px]">
              Web Developer
            </span>
          </h1>
        </div>
      </div>

      {/* Animated image */}
      <motion.img
        src="/mebw.png"
        alt="Anuj Singh"
        style={{ scale, opacity }}
        className="absolute -bottom-24 sm:-bottom-44 z-40 left-1/2 w-[320px] md:w-[400px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />
    </div>
  );
};

export default Hero;

