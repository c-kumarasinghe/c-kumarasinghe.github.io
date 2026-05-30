import React from 'react';
import { useRef, useState, type FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

interface ContactLink {
  icon: React.ReactElement;
  label: string;
  value: string;
  href: string;
  color: string;
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const contactLinks: ContactLink[] = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20 hover:border-indigo-500/50',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      label: 'LinkedIn',
      value: 'linkedin.com/in/chathurangak',
      href: personalInfo.linkedin,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20 hover:border-blue-500/50',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
      label: 'GitHub',
      value: 'github.com/chakuma8998',
      href: personalInfo.github,
      color: 'text-white/70 bg-white/5 border-white/10 hover:border-white/30',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20 hover:border-purple-500/50',
    },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <section id="contact" ref={ref} className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080c14] via-[#0d1117]/80 to-[#080c14] pointer-events-none" />

      {/* Gradient orbs */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="relative z-10 container-max">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono mb-4">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              05. contact.sh
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Have a challenging problem to solve or a product to scale? Whether it's a full-time role,
              consulting, or collaboration — let's have a conversation.
            </p>
          </motion.div>

          {/* Main grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Left — Contact links */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              {/* Contact links */}
              <div className="flex flex-col gap-3 flex-1">
                {contactLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.label !== 'Phone' && link.label !== 'Email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    whileHover={{ x: 4, scale: 1.01 }}
                    className={`flex items-center gap-4 p-4 glass-card border transition-all duration-200 group flex-1 ${link.color}`}
                  >
                    <div className="flex-shrink-0">{link.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-white/40 mb-0.5">{link.label}</div>
                      <div className="text-sm font-medium text-white/80 group-hover:text-white truncate transition-colors">
                        {link.value}
                      </div>
                    </div>
                    <svg
                      className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                ))}
              </div>

              {/* Download CV */}
              <motion.a
                href="/cv.pdf"
                download="Chathuranga-Kumarasinghe-Resume.pdf"
                whileHover={{ scale: 1.02, boxShadow: '0 0 24px rgba(99,102,241,0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </motion.a>
            </motion.div>

            {/* Right — Contact form */}
            <motion.div variants={itemVariants} className="flex flex-col">
              <div className="glass-card p-6 sm:p-8 border border-white/8 flex flex-col flex-1">
                <div className="terminal-header -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 rounded-t-xl">
                  <span className="terminal-dot bg-red-500" />
                  <span className="terminal-dot bg-yellow-500" />
                  <span className="terminal-dot bg-green-500" />
                  <span className="ml-2 text-xs text-white/40 font-mono">send_message.sh</span>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4"
                    >
                      <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white mb-2">Message Sent!</h3>
                    <p className="text-white/50 text-sm">
                      Thank you for reaching out. I'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }); }}
                      className="mt-4 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-white/40 mb-1.5">
                        {'// '}your_name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-indigo-500/50 rounded-lg text-white placeholder-white/20 text-sm outline-none transition-colors duration-200 focus:bg-white/8"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/40 mb-1.5">
                        {'// '}your_email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-indigo-500/50 rounded-lg text-white placeholder-white/20 text-sm outline-none transition-colors duration-200 focus:bg-white/8"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/40 mb-1.5">
                        {'// '}message
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Hi Chathuranga, I'd like to discuss..."
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-indigo-500/50 rounded-lg text-white placeholder-white/20 text-sm outline-none transition-colors duration-200 focus:bg-white/8 resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={!submitting ? { scale: 1.02 } : {}}
                      whileTap={!submitting ? { scale: 0.98 } : {}}
                      className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}