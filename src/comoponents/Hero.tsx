'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen width
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Shrink image and text based on scroll
  const imageScale = useTransform(scrollYProgress, [0, 0.4], isMobile ? [1.7, 1.5] : [1.25, 1.75]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.6]);

  return (
    <div className="relative h-[120vh] sm:h-[150vh] bg-[#1a1a1a] overflow-clip">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center z-20">
        <motion.div
          style={{ scale: textScale }}
          className="text-center origin-center"
        >
          <h1 className="font-alfa text-[#fff5d1] leading-tight">
            <span className="block text-[50px] sm:text-[80px] md:text-[100px] lg:text-[150px] tracking-wide">
              Anuj Singh
            </span>
            <span className="block text-[40px] sm:text-[48px] md:text-[80px] lg:text-[112px]">
              Web Developer
            </span>
          </h1>
        </motion.div>
      </div>

      {/* Glow */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#fff5d1]/10 blur-3xl rounded-full z-30" />

      {/* Animated image */}
      <motion.img
        src="/mebw.png"
        alt="Anuj Singh"
        style={{ scale: imageScale, opacity: imageOpacity }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute -bottom-24 sm:-bottom-44 z-40 left-1/2 w-[250px] sm:w-[280px] md:w-[360px] lg:w-[400px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />
    </div>
  );
};

export default Hero;
