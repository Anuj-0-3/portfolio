"use client";

import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-gray-400 py-10 px-6 sm:px-10 md:px-20 ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10 pt-6">
        <p className="text-sm">© {new Date().getFullYear()} Anuj Singh. All rights reserved.</p>

        <div className="flex space-x-5 text-xl">
          <a
            href="https://github.com/anujsinghwd"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/anujsinghwd"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:anujsinghwd@gmail.com"
            className="hover:text-white transition"
          >
            <FaEnvelope />
          </a>
        </div>

        <ul className="flex space-x-6 text-sm mt-4 md:mt-0">
          <li>
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="#projects" className="hover:text-white transition">
              Projects
            </Link>
          </li>
          <li>
            <Link href="#techstack" className="hover:text-white transition">
              Tech Stack
            </Link>
          </li>
          <li>
            <Link href="#contact" className="hover:text-white transition">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;