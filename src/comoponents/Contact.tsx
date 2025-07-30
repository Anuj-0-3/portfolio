'use client';

import React, { useState } from 'react';
import { Github, Linkedin, Mail, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EMAIL = 'anujsingh.devx@gmail.com';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '', company: '' }); // +honeypot
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false); // new
  const [width, height] = useWindowSize();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast.success('Email copied!');
    } catch {
      toast.info('Select and copy the address manually.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      toast.error('Please enter a valid email address.');
      return;
    }

    // Honeypot: if bots fill this, silently "succeed" without sending
    if (form.company?.trim()) {
      setSubmitted(true);
      setForm({ name: '', email: '', message: '', company: '' });
      toast.success('🎉 Your message has been sent!');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          query: form.message.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to send message');
      }

      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      setSubmitted(true);
      toast.success('🎉 Your message has been sent!');
      setForm({ name: '', email: '', message: '', company: '' });
    } catch (err) {
      if (err instanceof Error) toast.error(err.message || 'Something went wrong.');
      else toast.error('Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

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
      id="contact"
      aria-labelledby="contact-heading"
    >
      {submitted && (
        <Confetti width={width} height={height} recycle={false} numberOfPieces={150} />
      )}

      <h2
        id="contact-heading"
        className="text-3xl sm:text-4xl font-bold text-[#fff5d1] mb-12 text-center select-none"
      >
        Contact Me
      </h2>

      <div className="max-w-3xl mx-auto">
        {/* Social Links */}
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="flex justify-center gap-8 text-3xl">
            {[
              { href: 'https://github.com/Anuj-0-3', Icon: Github, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/anuj-singh-1b448a314/', Icon: Linkedin, label: 'LinkedIn' },
              { href: `mailto:${EMAIL}?subject=Contact%20via%20Portfolio`, Icon: Mail, label: 'Email' }, // mailto here
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
          <div className="flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-white/5">
            <a
              href={`mailto:${EMAIL}?subject=Contact%20via%20Portfolio`}
              className="hover:underline select-all"
              aria-label="Email Anuj Singh"
            >
              {EMAIL}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="ml-1 rounded px-2 py-1 hover:bg-white/10"
              aria-label="Copy email address"
              title="Copy"
            >
              <Copy size={14} />
            </button>
          </div>
        </div>

        {/* Contact Form */}
        {!submitted && (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            noValidate
            aria-live="assertive"
            aria-atomic="true"
            autoComplete="on"
          >
            {/* Honeypot (hidden) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={form.company}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {(['name', 'email'] as const).map((field) => {
              const isFocused = form[field].length > 0;
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
                    value={(form)[field]}
                    onChange={handleChange}
                    placeholder=" "
                    className="w-full p-4 rounded bg-[#1e1e1e] border border-[#333] text-white placeholder-transparent focus:outline-none"
                    variants={inputVariants}
                    initial="unfocused"
                    animate={isFocused ? 'focused' : 'unfocused'}
                    whileFocus="focused"
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    aria-required="true"
                    required
                    autoComplete={field === 'email' ? 'email' : 'name'}
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
                placeholder=" "
                className="w-full p-4 rounded bg-[#1e1e1e] border border-[#333] text-white placeholder-transparent resize-none focus:outline-none"
                variants={inputVariants}
                initial="unfocused"
                animate={form.message.length > 0 ? 'focused' : 'unfocused'}
                whileFocus="focused"
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                aria-required="true"
                required
                autoComplete="off"
              />
            </div>

            <motion.button
              type="submit"
              disabled={submitting}
              className={`bg-[#fff5d1] text-black px-8 py-3 rounded-full font-semibold shadow-lg shadow-yellow-200/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#fff5d1] ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              whileHover={{ scale: submitting ? 1 : 1.1, boxShadow: '0 0 15px #fff5d1' }}
              whileTap={{ scale: submitting ? 1 : 0.95 }}
              animate={{
                boxShadow: ['0 0 10px #fff5d1', '0 0 20px #fff5d1', '0 0 10px #fff5d1'],
              }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }}
              aria-label="Send Message"
            >
              {submitting ? 'Sending…' : 'Send Message'}
            </motion.button>
          </motion.form>
        )}

        <ToastContainer
          position="bottom-center"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </section>
  );
};

export default Contact;
