"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const techStacks = {
  frontend: [
    { name: "HTML", logo: "/tech/html.svg" },
    { name: "CSS", logo: "/tech/css.svg" },
    { name: "JavaScript", logo: "/tech/javascript.svg" },
    { name: "TypeScript", logo: "/tech/typescript.svg" },
    { name: "React.js", logo: "/tech/react.svg" },
    { name: "Next.js", logo: "/tech/nextjs.svg" },
    { name: "Tailwind CSS", logo: "/tech/tailwind.svg" },
    { name: "ShadCN UI", logo: "/tech/shadcn.png" },
    { name: "Framer Motion", logo: "/tech/framer-motion.svg" },
    { name: "Lucide Icons", logo: "/tech/lucide.svg" },
    { name: "Swiper.js", logo: "/tech/swiperjs.svg" },
    { name: "Chart.js", logo: "/tech/chartjs.svg" }
  ],
  backend: [
    { name: "Node.js", logo: "/tech/nodejs.svg" },
    { name: "Express.js", logo: "/tech/express.svg" },
    { name: "MongoDB", logo: "/tech/mongodb.svg" },
    { name: "Mongoose", logo: "/tech/mongoose.svg" },
    { name: "Firebase", logo: "/tech/firebase.svg" },
    { name: "Postman", logo: "/tech/postman.svg" },
    { name: "Nodemailer", logo: "/tech/nodemailer.svg" },
    { name: "GitHub", logo: "/tech/github.svg" },
    { name: "VS Code", logo: "/tech/vscode.svg" },
    { name: "Vercel", logo: "/tech/vercel.svg" },
    { name: "Netlify", logo: "/tech/netlify.svg" },
    { name: "Render", logo: "/tech/render.svg" },
    { name: "Cloudflare", logo: "/tech/cloudflare.svg" }
  ],
  ai: [
    { name: "Langchain", logo: "/tech/langchain.png" },
    { name: "Huggingface", logo: "/tech/huggingface.svg" },
    { name: "OpenAI", logo: "/tech/openai.svg" },
    { name: "RAG Pipelines", logo: "/tech/rag.svg" },
    { name: "Socket.IO", logo: "/tech/socketio.svg" },
    { name: "Pusher", logo: "/tech/pusher.svg" },
    { name: "Cashfree", logo: "/tech/cashfree.svg" },
    { name: "Figma", logo: "/tech/figma.svg" },
    { name: "Conda", logo: "/tech/conda.svg" },
    { name: "Python", logo: "/tech/python.svg" }
  ]
};

const Row = ({ items }: { items: { name: string; logo: string }[] }) => {
  return (
    <div className="overflow-hidden w-full py-4">
      <motion.div
        className="flex w-max animate-slide gap-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        {[...items, ...items].map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="flex flex-col items-center justify-center w-24 shrink-0"
          >
            <Image
              src={tech.logo}
              alt={tech.name}
              width={40}
              height={40}
              className="mb-1"
            />
            <span className="text-sm text-white text-center opacity-80">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const TechStack = () => {
  return (
    <section className="bg-[#1a1a1a] py-16 px-6 sm:px-10 md:px-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#fff5d1] mb-8">
        Tech Stack
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl text-[#fff5d1] font-semibold mb-2">
           Frontend
          </h3>
          <Row items={techStacks.frontend} />
        </div>
        <div>
          <h3 className="text-xl text-[#fff5d1] font-semibold mb-2">
            Backend & Tools
          </h3>
          <Row items={techStacks.backend} />
        </div>
        <div>
          <h3 className="text-xl text-[#fff5d1] font-semibold mb-2">
            AI / Realtime / Extras
          </h3>
          <Row items={techStacks.ai} />
        </div>
      </div>
    </section>
  );
};

export default TechStack;
