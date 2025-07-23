'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '#projects', label: 'Projects' },
    { href: '#techstack', label: 'Tech Stack' },
    { href: '#socialmedia', label: 'Social Media' },
  ];

  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-lg bg-white/10 border-b border-white/20'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between text-white">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-extrabold"
          >
            <Link href="/">
              <span className="text-[#fff5d1] tracking-wide relative">
                Portfolio
              </span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-6 text-sm font-medium">
            {navLinks.map(({ href, label }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="relative group transition-colors duration-300 hover:text-[#fff5d1]"
                >
                  {label}
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-[#fff5d1] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Contact Button (Desktop) */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hidden md:block"
          >
            <Link
              href="#contact"
              className="bg-[#fff5d1] font-alfa text-[#201A00] py-1 px-4 rounded-full shadow hover:shadow-yellow-100 transition-all"
            >
              Contact
            </Link>
          </motion.div>

          {/* Mobile Toggle */}
          <div className="md:hidden z-50">
            <motion.button
              whileTap={{ rotate: 90 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
              className="text-[#fff5d1]"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="fixed top-0 right-0 h-full w-[80%] sm:w-[60%] bg-white/10 backdrop-blur-lg border-l border-white/20 z-40 md:hidden"
            >
              <ul className="flex flex-col space-y-6 p-6 pt-20 text-left text-[#fff5d1] text-lg font-semibold">
                {navLinks.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block hover:text-yellow-300 transition"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-block mt-4 bg-[#fff5d1] text-[#201A00] py-1 px-4 rounded-full shadow hover:scale-105 transition-transform"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </AnimatePresence>
  );
};

export default Navbar;
