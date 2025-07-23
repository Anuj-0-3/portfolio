'use client';

import React, { useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [width, height] = useWindowSize();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.email || !form.message) {
      setError(true);
      return;
    }

    // Simulate API call here, replace with your actual call
    console.log('Form submitted:', form);
    setSubmitted(true);
  };

  // Animation variants
  const inputVariants = {
    focused: { borderColor: '#fff5d1', boxShadow: '0 0 8px #fff5d1' },
    unfocused: { borderColor: '#333', boxShadow: 'none' },
  };

  const labelVariants = {
    focused: { scale: 0.8, y: -28, color: '#fff5d1' },
    unfocused: { scale: 1, y: 0, color: '#ccc' },
  };

  return (
    <section
      className="bg-[#0f0f0f] text-white py-20 px-6 sm:px-10 md:px-20 relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {submitted && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={150}
        />
      )}

      <h2
        id="contact-heading"
        className="text-3xl sm:text-4xl font-bold text-[#fff5d1] mb-12 text-center select-none"
      >
        Contact Me
      </h2>

      <div className="max-w-3xl mx-auto">
        {/* Social Links */}
        <div className="flex justify-center gap-8 text-3xl mb-12">
          {[
            {
              href: 'https://github.com/anujsinghwd',
              Icon: Github,
              label: 'GitHub',
            },
            {
              href: 'https://www.linkedin.com/in/anujsinghwd/',
              Icon: Linkedin,
              label: 'LinkedIn',
            },
            {
              href: 'mailto:anujsinghwd@gmail.com',
              Icon: Mail,
              label: 'Email',
            },
          ].map(({ href, Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-white"
              whileHover={{ scale: 1.2, color: '#fff5d1' }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300 }}
              tabIndex={0}
            >
              <Icon size={36} />
            </motion.a>
          ))}
        </div>

        {/* Contact Form */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={
                error
                  ? { x: [0, -10, 10, -10, 10, 0], opacity: 1, y: 0 }
                  : { opacity: 1, y: 0 }
              }
              exit={{ opacity: 0, y: -20 }}
              transition={
                error
                  ? { type: 'spring', stiffness: 500, damping: 20 }
                  : { duration: 0.5 }
              }
              noValidate
              aria-live="assertive"
              aria-atomic="true"
            >
              {['name', 'email'].map((field) => {
                const isFocused = form[field as keyof typeof form].length > 0;
                return (
                  <div key={field} className="relative">
                    <motion.label
                      htmlFor={field}
                      className="absolute left-4 top-4 pointer-events-none font-medium select-none"
                      variants={labelVariants}
                      initial="unfocused"
                      animate={isFocused ? 'focused' : 'unfocused'}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </motion.label>
                    <motion.input
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      id={field}
                      value={form[field as keyof typeof form]}
                      onChange={handleChange}
                      required
                      placeholder=" "
                      className="w-full p-4 rounded bg-[#1e1e1e] border border-[#333] text-white placeholder-transparent focus:outline-none"
                      variants={inputVariants}
                      initial="unfocused"
                      animate={isFocused ? 'focused' : 'unfocused'}
                      whileFocus="focused"
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      aria-required="true"
                      aria-describedby={error ? 'error-message' : undefined}
                    />
                  </div>
                );
              })}

              <div className="relative">
                <motion.label
                  htmlFor="message"
                  className="absolute left-4 top-4 pointer-events-none font-medium select-none"
                  variants={labelVariants}
                  initial="unfocused"
                  animate={form.message.length > 0 ? 'focused' : 'unfocused'}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  Message
                </motion.label>
                <motion.textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="w-full p-4 rounded bg-[#1e1e1e] border border-[#333] text-white placeholder-transparent resize-none focus:outline-none"
                  variants={inputVariants}
                  initial="unfocused"
                  animate={form.message.length > 0 ? 'focused' : 'unfocused'}
                  whileFocus="focused"
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  aria-required="true"
                  aria-describedby={error ? 'error-message' : undefined}
                />
              </div>

              <motion.button
                type="submit"
                className="bg-[#fff5d1] text-black px-8 py-3 rounded-full font-semibold shadow-lg shadow-yellow-200/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#fff5d1]"
                whileHover={{ scale: 1.1, boxShadow: '0 0 15px #fff5d1' }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 0 10px #fff5d1',
                    '0 0 20px #fff5d1',
                    '0 0 10px #fff5d1',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }}
                aria-label="Send Message"
              >
                Send Message
              </motion.button>

              {error && (
                <motion.p
                  id="error-message"
                  className="text-red-400 mt-2 text-center select-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  role="alert"
                >
                  Please fill in all fields.
                </motion.p>
              )}
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center text-green-400 text-xl mt-12 font-semibold select-none"
              role="alert"
              tabIndex={-1}
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
