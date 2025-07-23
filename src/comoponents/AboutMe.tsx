'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeSlide = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] as [number, number, number, number], } },
};

const AboutMe = () => {
  return (
    <section
      id="about"
      className="bg-[#1a1a1a] text-white px-6 py-20 sm:px-10 md:px-20 lg:px-32"
    >
      <motion.div
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Profile Image with fadeSlide left */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] } },
          }}
          className="hidden sm:block flex-shrink-0 pt-2"
          aria-label="Profile Image of Anuj Singh"
        >
          <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-[#fff5d1] shadow-lg transition-transform hover:scale-105">
            <Image
              src="/mebw.png"
              alt="Anuj Singh"
              width={208}
              height={208}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </motion.div>

        {/* Text Content with fadeSlide right */}
        <motion.div
          variants={fadeSlide}
          className="text-left"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[#fff5d1] select-none">
            About Me
          </h2>

          <p className="text-lg sm:text-xl leading-relaxed text-gray-300 mb-6">
            I’m <span className="font-semibold text-white">Anuj Singh</span>, a Full Stack Developer and Generative AI practitioner. I specialize in building lightning-fast, scalable, and user-first applications using <strong>React.js</strong>, <strong>Next.js</strong>, <strong>MongoDB</strong>, and <strong>Node.js</strong>.
          </p>

          <p className="text-lg sm:text-xl leading-relaxed text-gray-300 mb-6">
            From real-time auction platforms to AI-integrated tools, I transform ideas into production-grade products. My work is powered by tools like <strong>Langchain</strong>, <strong>Huggingface</strong>, <strong>Pusher</strong>, and <strong>Cashfree</strong> — always with clean UI, optimized performance, and clear delivery timelines.
          </p>

          <p className="text-lg sm:text-xl leading-relaxed text-gray-300 mb-6 italic">
            Let&apos;s create software that doesn&apos;t just work, but <span className="text-[#fff5d1] font-semibold">wins</span>.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutMe;
