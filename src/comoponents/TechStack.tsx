'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, BrainCircuit, Cpu } from 'lucide-react';

const techStacks = {
  core: [
    { name: 'React.js', logo: '/tech/react.svg' },
    { name: 'Next.js', logo: '/tech/nextjs.svg' },
    { name: 'TypeScript', logo: '/tech/typescript.svg' },
    { name: 'Tailwind CSS', logo: '/tech/tailwind.svg' },
    { name: 'Firebase', logo: '/tech/firebase.svg' },
    { name: 'MongoDB', logo: '/tech/mongo.svg' },
    { name: 'Node.js', logo: '/tech/nodejs.svg' },
    { name: 'Express.js', logo: '/tech/express.svg' },
    { name: 'Vercel', logo: '/tech/vercel.svg' },
    { name: 'Netlify', logo: '/tech/netlify.svg' },
    { name: 'GitHub', logo: '/tech/github.svg' },
  ],
  specialty: [
    { name: 'LangChain', logo: '/tech/langchain.svg' },
    { name: 'OpenAI', logo: '/tech/openai.svg' },
    { name: 'Socket.IO', logo: '/tech/socket.svg' },
    { name: 'Framer Motion', logo: '/tech/framer.svg' },
    { name: 'ShadCN UI', logo: '/tech/shadcn.svg' },
    { name: 'Cashfree', logo: '/tech/cashfree.svg' },
    { name: 'Swiper.js', logo: '/tech/swiper.svg' },
    { name: 'Figma', logo: '/tech/figma.svg' },
  ],
};

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5,ease: [0.42, 0, 0.58, 1] as [number, number, number, number] } },
};

const TechCard = ({ tech }: { tech: { name: string; logo: string } }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ scale: 1.1, boxShadow: '0 4px 15px rgba(255, 245, 209, 0.5)' }}
    className="group flex flex-col items-center justify-center w-24 shrink-0 p-3 bg-white/5 backdrop-blur-md rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-300"
    role="img"
    aria-label={tech.name}
  >
    <Image
      src={tech.logo}
      alt={tech.name}
      width={40}
      height={40}
      className="mb-2"
      title={tech.name}
      priority
    />
    <span className="text-sm text-white text-center opacity-80 group-hover:opacity-100 transition">
      {tech.name}
    </span>
  </motion.div>
);

const Row = ({ items }: { items: { name: string; logo: string }[] }) => {
  const duplicated = [...items, ...items, ...items]; // triple for seamless scrolling

  return (
    <div className="overflow-hidden w-full py-4" aria-label="Scrolling technology logos">
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: items.length * 2.5,
          ease: 'linear',
        }}
        aria-hidden="true"
      >
        {duplicated.map((tech, i) => (
          <TechCard key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </motion.div>
    </div>
  );
};

const TechStack = () => {
  return (
    <section
      className="relative bg-gradient-to-b from-[#1a1a1a] to-[#111] py-20 px-6 sm:px-10 md:px-20 overflow-hidden"
      id="techstack"
      aria-labelledby="techstack-title"
    >
      {/* Glowing Blobs */}
      <div className="absolute w-60 h-60 bg-purple-500/20 rounded-full blur-3xl top-10 left-10 z-0 animate-pulse" />
      <div className="absolute w-40 h-40 bg-yellow-500/10 rounded-full blur-2xl bottom-10 right-10 z-0 animate-pulse" />

      <motion.h2
        id="techstack-title"
        className="flex items-center gap-3 text-3xl sm:text-4xl font-bold text-[#fff5d1] mb-12 relative z-10 select-none"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Cpu className="w-8 h-8 text-gray-300" />
        What I Build With
      </motion.h2>

      <div className="space-y-16 relative z-10">
        {/* Core Tech */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2 mb-2 text-[#fff5d1]">
            <Sparkles className="w-5 h-5 text-yellow-300" aria-hidden="true" />
            <h3 className="text-xl font-semibold">Core Tech Stack (Client-Ready)</h3>
          </div>
          <p className="text-sm text-white/70 max-w-3xl mb-2">
            These are my go-to tools for building full-stack web applications, landing pages, dashboards, and MVPs that scale and ship fast.
          </p>
          <Row items={techStacks.core} />
        </motion.div>

        {/* Specialty Tech */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2 mb-2 text-[#fff5d1]">
            <BrainCircuit className="w-5 h-5 text-purple-300" aria-hidden="true" />
            <h3 className="text-xl font-semibold">Advanced & Specialized Stack</h3>
          </div>
          <p className="text-sm text-white/70 max-w-3xl mb-2">
            From real-time applications to AI integrations and creative UI enhancements, these tools allow me to deliver truly next-gen experiences.
          </p>
          <Row items={techStacks.specialty} />
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
