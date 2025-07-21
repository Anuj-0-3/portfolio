'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutMe = () => {
  return (
    <section
      id="about"
      className="bg-[#1a1a1a] text-white px-6 py-20 sm:px-10 md:px-20 lg:px-32"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
        {/* Profile Image (hidden on mobile) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="hidden sm:block flex-shrink-0 pt-2"
        >
          <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-[#fff5d1] shadow-lg">
            <Image
              src="/mebw.png"
              alt="Anuj Singh"
              width={208}
              height={208}
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="text-left"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[#fff5d1]">
            About Me
          </h2>

          <p className="text-lg sm:text-xl leading-relaxed text-gray-300 mb-6">
            Hi, I’m <span className="font-semibold text-white">Anuj Singh</span> — a results-driven Full Stack Developer and Generative AI practitioner. I help businesses and startups turn ideas into fast, responsive, and scalable web applications using technologies like <strong>React.js</strong>, <strong>Next.js</strong>, <strong>Node.js</strong>, and <strong>MongoDB</strong>.
          </p>

          <p className="text-lg sm:text-xl leading-relaxed text-gray-300 mb-6">
            With hands-on experience in building real-time platforms (like auctions, dashboards, and OTP-based portals), I bring not just clean code but also clear communication and on-time delivery. I also integrate AI features using tools like <strong>Langchain</strong> and <strong>Huggingface</strong> to take your digital products to the next level.
          </p>

          <p className="text-lg sm:text-xl leading-relaxed text-gray-300 mb-6">
            Let’s build something your users will love — and your business will benefit from.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
