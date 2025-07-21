"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Ubuy - Realtime Auction Platform",
    description:
      "A feature-rich bidding system with live auction updates using WebSockets (Socket.IO/Pusher), admin controls, user dashboard, and Cashfree payment integration.",
    tech: ["Next.js", "Node.js", "MongoDB", "Pusher", "Cashfree"],
    images: [
      "/projects/ubuy1.png",
      "/projects/ubuy2.png",
      "/projects/ubuy3.png"
    ],
    link: "https://ubuy-theta.vercel.app/"
  },
  {
    title: "AI Blog Generator",
    description:
      "Generate SEO-optimized blog posts using OpenAI and Langchain. Supports dynamic prompt templates, user input, and clean UI for content marketers.",
    tech: ["React.js", "Langchain", "OpenAI", "Express.js"],
    images: [
      "/projects/aiblog1.png",
      "/projects/aiblog2.png"
    ],
    link: "https://aiblog.techsaviour.in"
  },
  {
    title: "OTP Auth Portal",
    description:
      "Mobile-first user authentication system using Firebase for OTP verification. Integrated with custom email templates and responsive UI.",
    tech: ["Firebase", "React.js", "Tailwind CSS"],
    images: [
      "/projects/otp1.png",
      "/projects/otp2.png"
    ],
    link: "https://auth.techsaviour.in"
  },
  {
    title: "IntelliPage - AI Notion Clone",
    description:
      "A collaborative Notion-like workspace with AI support for smart suggestions and dynamic page generation using Langchain and OpenAI.",
    tech: ["Next.js", "MongoDB", "Langchain", "ShadCN UI"],
    images: [
      "/projects/intellipage1.png",
      "/projects/intellipage2.png"
    ],
    link: "https://intellipage.techsaviour.in"
  },
  {
    title: "Coaching Institute Website",
    description:
      "A responsive, multi-page website for a coaching institute and play school, showcasing programs, contact, and admission sections.",
    tech: ["HTML", "CSS", "JavaScript", "Swiper.js"],
    images: [
      "/projects/institute1.png",
      "/projects/institute2.png"
    ],
    link: "https://school.techsaviour.in"
  },
  {
    title: "Password Manager",
    description:
      "A full-stack password manager using React, Vite, and MongoDB. Supports secure CRUD operations and modern UI.",
    tech: ["React", "Vite", "MongoDB", "Node.js"],
    images: [
      "/projects/password1.png",
      "/projects/password2.png"
    ],
    link: "https://password.techsaviour.in"
  }
];


const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % project.images.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [project.images.length]);

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-[#111] border border-[#2a2a2a] rounded-xl overflow-hidden shadow-md"
    >
      <a href={project.link} target="_blank" rel="noopener noreferrer">
        <Image
          src={project.images[currentImageIndex]}
          alt={project.title}
          width={600}
          height={350}
          className="w-full object-cover h-48 sm:h-56"
        />
        <div className="p-5">
          <h3 className="text-xl font-semibold text-white mb-2">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-3">
            {project.description}
          </p>
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
  return (
    <section
      id="projects"
      className="bg-[#1a1a1a] text-white py-20 px-6 sm:px-10 md:px-20"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-[#fff5d1] mb-12">
        Projects
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      <div className="text-center mt-10">
        <Link
          href="/projects"
          className="inline-block bg-[#fff5d1] text-black px-6 py-3 rounded-full font-medium transition hover:scale-105"
        >
          View All Projects
        </Link>
      </div>
    </section>
  );
};

export default Projects;
