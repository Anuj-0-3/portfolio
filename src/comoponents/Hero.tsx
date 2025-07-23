'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHoveringName, setIsHoveringName] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = document.getElementById('heroParticles') as HTMLCanvasElement | null;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const particles: { x: number; y: number; dx: number; dy: number; size: number }[] = [];
    const numParticles = 50;
    const connectDistance = 100;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 1,
        dy: (Math.random() - 0.5) * 1,
        size: Math.random() * 2 + 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = '#fff5d1';
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectDistance) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 245, 209, 0.1)';
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 30 - 15;
    const y = ((e.clientY - rect.top) / rect.height) * 30 - 15;
    setTilt({ x: y, y: -x });
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setCursorPos({ x: 0, y: 0 });
  };

  const springX = useSpring(tilt.x, { stiffness: 70, damping: 20 });
  const springY = useSpring(tilt.y, { stiffness: 70, damping: 20 });

  const imageScale = useTransform(scrollYProgress, [0, 0.4], isMobile ? [1.7, 1.5] : [1.25, 1.75]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.6]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="relative h-[120vh] sm:h-[150vh] bg-[#1a1a1a] overflow-hidden">
      {/* Canvas Particles */}
      <canvas
        id="heroParticles"
        className="absolute inset-0 -z-10 w-full h-full"
      />

      <div
        className="sticky top-0 h-screen flex flex-col items-center justify-center z-20"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute sm:hidden bottom-50 left-1/2  w-12 h-12 opacity-10 blur-3xl bg-amber-200 rounded-full top-40 right-10 z-0 animate-pulse" />

        <motion.div
          style={{
            scale: textScale,
            opacity: textOpacity,
            rotateX: springX,
            rotateY: springY,
            transformStyle: 'preserve-3d',
          }}
          className="flex flex-col items-center text-center origin-center max-w-[90vw] select-none"
        >
          <motion.h1
            className="font-alfa text-[#fff5d1] leading-tight cursor-default relative"
            onMouseEnter={() => setIsHoveringName(true)}
            onMouseLeave={() => setIsHoveringName(false)}
          >
            <div className="text-[50px] sm:text-[80px] md:text-[100px] lg:text-[150px] tracking-wide select-text">
              Anuj Singh
            </div>

            <div className="text-[40px] sm:text-[48px] md:text-[80px] lg:text-[112px] mt-2 select-text">
              Web Developer
            </div>

            <motion.span
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-12 rounded-full pointer-events-none bg-yellow-300/30 blur-3xl mix-blend-screen"
              animate={{
                x: isHoveringName ? cursorPos.x - window.innerWidth / 2 : 0,
                y: isHoveringName ? cursorPos.y - window.innerHeight / 2 : 0,
                opacity: isHoveringName ? 1 : 0,
                scale: isHoveringName ? 1 : 0.8,
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            />
          </motion.h1>
        </motion.div>
      </div>

      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#fff5d1]/10 blur-3xl rounded-full z-30" />

      <motion.img
        src="/mebw.png"
        alt="Anuj Singh"
        style={{ scale: imageScale, opacity: imageOpacity }}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-24 sm:-bottom-44 z-40 left-1/2 w-[250px] sm:w-[280px] md:w-[360px] lg:w-[400px] -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full shadow-lg"
      />
    </div>
  );
};

export default Hero;
