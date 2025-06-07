'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const { scrollYProgress } = useScroll();

  // Zoom-out and fade-in animation
  const scale = useTransform(scrollYProgress, [0, 0.2], [1.5, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <div className="relative h-[200vh] bg-[#1a1a1a] ">
      {/* Sticky container (text stays centered during scroll) */}
      <div className="sticky top-0 h-screen flex items-center justify-center z-20">
        <div className="text-center">
          <h1 className="font-alfa text-5xl md:text-7xl text-[#fff5d1] leading-tight">
            <span className="block text-8xl tracking-wide ">Anuj Singh</span>
            <span className="block">Web Developer</span>
          </h1>
        </div>
      </div>

      {/* Background image with motion animation */}
      <motion.img
        src="/me.png"
        alt="Anuj Singh"
        style={{ scale, opacity }}
        className="absolute -bottom-72  z-40 left-1/2 w-[320px] md:w-[400px] -translate-x-1/2 -translate-y-1/2  pointer-events-none"
      />
    </div>
  );
};

export default Hero;

