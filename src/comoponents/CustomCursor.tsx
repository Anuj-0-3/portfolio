'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useAnimation } from 'framer-motion';

const CustomCursor = () => {
  const mouseX = useMotionValue(-100); // start offscreen
  const mouseY = useMotionValue(-100);

  // Outer ring lags behind mouse with spring
  const springConfig = { damping: 20, stiffness: 150 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  const [isVisible, setIsVisible] = useState(true);
  const [, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Controls for hover animation on ring
  const ringControls = useAnimation();

  useEffect(() => {
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
        setIsVisible(true);
      });
    };

    const showCursor = () => setIsVisible(true);
    const hideCursor = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseenter', showCursor);
    window.addEventListener('mouseleave', hideCursor);

    // Hover detection on interactive elements
    const interactiveEls = ['a', 'button', 'input', 'textarea', 'select', 'label'];

    const handleHoverEvents = (e: Event) => {
      if ((e.target as HTMLElement).closest(interactiveEls.join(','))) {
        setIsHovering(true);
        ringControls.start({
          scale: 2,
          borderColor: '#fff5d1',
          backgroundColor: 'rgba(255, 245, 209, 0.15)',
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        });
      }
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
      ringControls.start({
        scale: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      });
    };

    document.querySelectorAll(interactiveEls.join(',')).forEach((el) => {
      el.addEventListener('mouseenter', handleHoverEvents);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseenter', showCursor);
      window.removeEventListener('mouseleave', hideCursor);
      cancelAnimationFrame(animationFrameId);

      document.querySelectorAll(interactiveEls.join(',')).forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverEvents);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [mouseX, mouseY, ringControls]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Small solid dot cursor */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-[#fff5d1] pointer-events-none z-[9999]"
        style={{
          translateX: mouseX,
          translateY: mouseY,
          marginLeft: '-0.375rem',
          marginTop: '-0.375rem',
          opacity: isVisible ? 1 : 0,
          willChange: 'transform, opacity',
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 50 }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 pointer-events-none z-[9998]"
        style={{
          translateX: ringX,
          translateY: ringY,
          marginLeft: '-1rem',
          marginTop: '-1rem',
          opacity: isVisible ? 1 : 0,
          willChange: 'transform, opacity, border-color, background-color',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }}
        animate={ringControls}
        initial={{
          scale: 1,
          borderColor: 'rgba(255, 255, 255, 0.3)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }}
      />
    </>
  );
};

export default CustomCursor;
