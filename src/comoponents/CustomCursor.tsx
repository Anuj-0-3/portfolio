'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const showCursor = () => setIsVisible(true);
    const hideCursor = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseenter', showCursor);
    window.addEventListener('mouseleave', hideCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseenter', showCursor);
      window.removeEventListener('mouseleave', hideCursor);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-2 h-2 rounded-full bg-white mix-blend-difference"
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
      />

      {/* Circle */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none w-8 h-8 rounded-full border-2 border-white mix-blend-difference"
        style={{
          translateX: cursorX,
          translateY: cursorY,
          marginLeft: '-1rem',
          marginTop: '-1rem',
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  );
};

export default CustomCursor;
