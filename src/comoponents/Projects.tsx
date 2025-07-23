'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Ubuy - Realtime Auction Platform',
    description:
      'Live bidding system with WebSockets (Socket.IO/Pusher), real-time updates, admin/user dashboards, and Cashfree integration.',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Pusher', 'Cashfree'],
    images: ['/projects/ubuy1.png', '/projects/ubuy2.png', '/projects/ubuy3.png'],
    link: 'https://ubuy-theta.vercel.app/',
  },
  {
    title: 'IntelliPage - AI Notion Clone',
    description:
      'AI-powered Notion-like platform using Langchain and OpenAI. Supports collaborative editing and dynamic page generation.',
    tech: ['Next.js', 'MongoDB', 'Langchain', 'ShadCN UI'],
    images: ['/projects/ip1.png', '/projects/intellipage2.png'],
    link: 'https://intellipage.techsaviour.in',
  },
  {
    title: 'Banquet Hall Website',
    description:
      'Multi-page responsive site for a Banquet hall event booking  with clean design and framer motion.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Framer Motion'],
    images: ['/projects/bqh1.png', '/projects/bqh2.png', '/projects/bqh3.png','/projects/bqh4.png'],
    link: 'banquethall-one.vercel.app',
  },
  {
    title: 'Password Manager',
    description:
      'Secure CRUD-based password manager built with React and Vite. Clean UI, MongoDB-backed, easy-to-use.',
    tech: ['React', 'Vite', 'MongoDB', 'Node.js'],
    images: ['/projects/password1.png', '/projects/password2.png'],
    link: 'https://password.techsaviour.in',
  },
];

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [project.images.length, hovered]);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.04, boxShadow: '0 8px 20px rgba(255, 245, 209, 0.4)' }}
      transition={{ duration: 0.3 }}
      className="bg-[#111] border border-[#2a2a2a] rounded-xl overflow-hidden shadow-md cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <motion.div
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={project.images[currentImageIndex]}
            alt={`${project.title} screenshot`}
            width={600}
            height={350}
            className="w-full object-cover h-48 sm:h-56 rounded-t-xl"
            priority
          />
        </motion.div>
        <div className="p-5">
          <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
          <p className="text-gray-400 text-sm mb-3">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs bg-[#fff5d1] text-black px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </a>
    </motion.div>
  );
};

const Projects = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section
      id="projects"
      className="bg-[#1a1a1a] text-white py-20 px-6 sm:px-10 md:px-20"
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-[#fff5d1] mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Projects
      </motion.h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {(showAll ? projects : projects.slice(0, 3)).map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => setShowAll(!showAll)}
          className="inline-block bg-[#fff5d1] text-black px-6 py-3 rounded-full font-medium transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fff5d1]"
        >
          {showAll ? 'Show Less' : 'View All Projects'}
        </button>
      </div>
    </section>
  );
};

export default Projects;
