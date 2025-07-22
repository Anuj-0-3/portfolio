'use client';

import { motion } from 'framer-motion';

const CtaSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="h-[30vh] flex items-center justify-center bg-[#1a1a1a] text-white text-center px-4"
    >
      <div>
        <p className="text-xl sm:text-2xl font-light mb-6">
          &quot;Turning ideas into interactive web experiences.&quot;
        </p>
        <a
          href="#projects"
          className="inline-block bg-[#fff5d1] text-black px-6 py-3 rounded-full font-medium transition hover:scale-105"
        >
          See My Work
        </a>
      </div>
    </motion.section>
  );
};

export default CtaSection;
