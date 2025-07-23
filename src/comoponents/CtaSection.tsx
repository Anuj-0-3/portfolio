'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CtaSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="h-[30vh] flex flex-col items-center justify-center bg-gradient-to-tr from-[#1a1a1a] to-[#111111] text-white text-center px-6"
      aria-label="Call to Action"
    >
      <motion.p
        className="text-xl sm:text-2xl font-light mb-12 max-w-xl relative inline-block"
        initial={{ opacity: 0.85 }}
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        &quot;Turning ideas into interactive web experiences.&quot;
        <motion.span
          className="absolute left-0 bottom-0 w-full h-1 bg-yellow-400 rounded-full"
          layoutId="underline"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ transformOrigin: 'left center' }}
        />
      </motion.p>

      <motion.a
        href="#projects"
        className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-200 to-amber-200 text-black px-8 py-4 rounded-full font-semibold shadow-lg shadow-yellow-400/50 hover:shadow-yellow-500/70 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400 transition-transform"
        whileHover={{ scale: 1.12, boxShadow: '0 0 20px #ffd54f' }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            '0 0 10px #ffd54f',
            '0 0 20px #ffd54f',
            '0 0 10px #ffd54f',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }}
        aria-label="See My Work"
      >
        See My Work
        <motion.span
          initial={{ x: 0 }}
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowRight size={24} />
        </motion.span>
      </motion.a>
    </motion.section>
  );
};

export default CtaSection;
