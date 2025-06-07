'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-lg bg-white/10 border-b border-white/20'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between text-white">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-extrabold"
          >
            <Link href="/">
              <span className="text-[#fff5d1] text-xl  tracking-wide ">Portfolio</span>
            </Link>
          </motion.div>

          {/* Nav Links */}
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden md:flex space-x-6 text-sm"
          >
            <li>
              <Link href="/" className="hover:text-[#fff5d1] transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="#projects" className="hover:text-[#fff5d1] transition">
                Projects
              </Link>
            </li>
            <li>
              <Link href="#techstack" className="hover:text-[#fff5d1] transition">
                Tech Stack
              </Link>
            </li>
            <li>
              <Link href="#socialmedia" className="hover:text-[#fff5d1] transition">
                Social Media
              </Link>
            </li>
          </motion.ul>

          {/* Contact Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="#contact"
              className="bg-[#fff5d1] font-alfa text-[#201A00] py-1 px-4 rounded-full shadow hover:scale-105 transition-transform"
            >
              Contact
            </Link>
          </motion.div>
        </nav>
      </motion.header>
    </AnimatePresence>
  );
};

export default Navbar;
