"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-[#0f0f0f] text-gray-400 pt-16 pb-10 px-6 sm:px-10 md:px-20 relative z-10 border-t border-white/10"
    >
      {/* Animated Divider */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm"
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-sm text-center md:text-left"
        >
          © {new Date().getFullYear()} Anuj Singh. All rights reserved.
        </motion.p>

        {/* Social Icons */}
        <motion.div
          className="flex space-x-5 text-xl"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {[
            {
              href: "https://github.com/anujsinghwd",
              icon: <FaGithub />,
              label: "GitHub",
            },
            {
              href: "https://linkedin.com/in/anujsinghwd",
              icon: <FaLinkedin />,
              label: "LinkedIn",
            },
            {
              href: "mailto:anujsinghwd@gmail.com",
              icon: <FaEnvelope />,
              label: "Email",
            },
          ].map(({ href, icon, label }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition transform hover:scale-110"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Navigation Links */}
        <motion.ul
          className="flex flex-wrap justify-center md:justify-end space-x-4 sm:space-x-6 text-sm"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {[
            { href: "/", label: "Home" },
            { href: "#projects", label: "Projects" },
            { href: "#techstack", label: "Tech Stack" },
            { href: "#contact", label: "Contact" },
          ].map(({ href, label }) => (
            <li key={label}>
              <Link href={href} className="hover:text-white transition">
                {label}
              </Link>
            </li>
          ))}
        </motion.ul>
      </div>
    </motion.footer>
  );
};

export default Footer;
