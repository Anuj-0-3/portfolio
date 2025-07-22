'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue} from 'framer-motion';

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = mouseX;
  const cursorY = mouseY;


  const [, setIsVisible] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch devices and disable the cursor
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (hasTouch) {
      setIsTouchDevice(true);
      return;
    }

    let animationFrameId: number;

    const moveCursor = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      });
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
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <>

      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] backdrop-blur-md bg-white/10 border border-white/20 shadow-md"
        style={{
          translateX: cursorX,
          translateY: cursorY,
          marginLeft: '-1.25rem',
          marginTop: '-1.25rem',
          willChange: 'transform',
        }}
      />

    </>
  );
};

export default CustomCursor;
