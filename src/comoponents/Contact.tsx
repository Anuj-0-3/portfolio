"use client";

import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form); // Replace with API or email integration
    setSubmitted(true);
  };

  return (
    <section className="bg-[#0f0f0f] text-white py-20 px-6 sm:px-10 md:px-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#fff5d1] mb-12 text-center">
        Contact Me
      </h2>

      <div className="max-w-3xl mx-auto">
        {/* Social Links */}
        <div className="flex justify-center gap-8 text-3xl mb-10">
          <a
            href="https://github.com/anujsinghwd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#fff5d1] transition-transform hover:scale-110"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/anujsinghwd/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#fff5d1] transition-transform hover:scale-110"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:anujsinghwd@gmail.com"
            className="text-white hover:text-[#fff5d1] transition-transform hover:scale-110"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* Contact Form */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {["name", "email"].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-300"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    id={field}
                    value={form[field as keyof typeof form]}
                    onChange={handleChange}
                    required
                    className="w-full mt-2 p-3 rounded bg-[#1e1e1e] border border-[#333] focus:ring-2 focus:ring-[#fff5d1] focus:outline-none transition-all duration-200"
                    placeholder={`Enter your ${field}`}
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 p-3 rounded bg-[#1e1e1e] border border-[#333] focus:ring-2 focus:ring-[#fff5d1] focus:outline-none transition-all duration-200"
                  placeholder="Type your message here..."
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-[#fff5d1] text-black px-6 py-3 rounded-full font-semibold transition-all duration-300"
              >
                Send Message
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center text-green-400 text-lg mt-8"
            >
               Thank you! Your message has been sent.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Contact;
