import React from 'react';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo, stats, education, certifications } from '../data/portfolioData';

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

const terminalCode = `const developer = {
  name: "Chathuranga Kumarasinghe",
  title: "Senior Software Engineer",
  location: "Dubai, UAE 🇦🇪",
  experience: "11+ years",
  teamLead: true,
  specializations: [
    "Blockchain & DeFi",
    "Microservices Architecture",
    "Full Stack Development",
    "Cloud & DevOps"
  ],
  currentFocus: "DeFi360 at SoftBuilders",
  openToWork: true,
};`;

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} className="relative section-padding overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080c14] via-[#0d1117]/50 to-[#080c14] pointer-events-none" />

      <div className="relative z-10 container-max">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-4">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
              01. about_me.ts
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              A passionate engineer who loves building elegant solutions to complex problems.
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass-card p-6 text-center neon-border group cursor-default"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main content */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Terminal code block */}
            <motion.div variants={itemVariants} className="order-2 lg:order-1">
              <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                {/* Terminal header */}
                <div className="terminal-header">
                  <span className="terminal-dot bg-red-500" />
                  <span className="terminal-dot bg-yellow-500" />
                  <span className="terminal-dot bg-green-500" />
                  <span className="ml-2 text-xs text-white/40 font-mono flex-1">about_me.ts</span>
                  <span className="text-xs text-indigo-400/60 font-mono">TypeScript</span>
                </div>
                {/* Code */}
                <div className="bg-[#0d1117]/80 p-5 font-mono text-sm leading-relaxed overflow-x-auto">
                  {terminalCode.split('\n').map((line, i) => (
                    <div key={i} className="flex">
                      <span className="text-white/20 select-none w-6 text-right mr-4 flex-shrink-0">
                        {i + 1}
                      </span>
                      <span>
                        {line.includes('"') || line.includes("'") ? (
                          <LineRenderer line={line} />
                        ) : (
                          <span className="text-blue-300">{line}</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Summary text */}
            <motion.div variants={itemVariants} className="order-1 lg:order-2 space-y-5">
              <p className="text-white/70 leading-relaxed text-base">
                {personalInfo.summary}
              </p>
              <p className="text-white/60 leading-relaxed text-base">
                Currently leading backend development at{' '}
                <span className="text-indigo-300 font-medium">SoftBuilders Software Design LLC</span> in
                Dubai, where I architect blockchain-driven platforms and real-time microservice systems
                for DeFi applications.
              </p>
              <p className="text-white/60 leading-relaxed text-base">
                My passion lies at the intersection of clean architecture, high-performance systems, and
                developer experience. I'm deeply committed to mentoring teams, establishing engineering
                best practices, and delivering software that scales.
              </p>

              {/* Location / availability */}
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-2 px-3 py-2 glass-card text-sm text-white/70">
                  <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Dubai, UAE
                </div>
                <div className="flex items-center gap-2 px-3 py-2 glass-card text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400">Available for opportunities</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Education */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="text-indigo-400 font-mono text-sm">{'//>'}</span>
              Education
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="glass-card p-5 neon-border group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{edu.icon}</div>
                    <div>
                      <div className="font-semibold text-white text-sm sm:text-base">{edu.degree}</div>
                      <div className="text-indigo-300 text-sm mt-0.5">{edu.institution}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-white/40">{edu.country}</span>
                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                        <span className="text-xs text-white/40">{edu.year}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="text-indigo-400 font-mono text-sm">{'//>'}</span>
              Certifications
            </h3>
            <div className="flex flex-wrap gap-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="glass-card px-4 py-3 neon-border flex items-center gap-3"
                >
                  <span className="text-xl">{cert.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-white/90">{cert.title}</div>
                    <div className="text-xs text-white/40 mt-0.5">
                      {cert.issuer} · {cert.year}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Helper: syntax highlight a single line
function LineRenderer({ line }: { line: string }) {
  const parts: React.ReactElement[] = [];
  const keywordColor = 'text-purple-400';
  const stringColor = 'text-emerald-400';
  const propColor = 'text-blue-300';
  const boolColor = 'text-orange-400';

  let remaining = line;
  let idx = 0;

  // Highlight keywords
  const keywords = ['const', 'true', 'false', 'null'];
  for (const kw of keywords) {
    if (remaining.includes(kw)) {
      const before = remaining.slice(0, remaining.indexOf(kw));
      const after = remaining.slice(remaining.indexOf(kw) + kw.length);
      parts.push(<span key={idx++} className={propColor}>{before}</span>);
      parts.push(<span key={idx++} className={kw === 'true' || kw === 'false' ? boolColor : keywordColor}>{kw}</span>);
      remaining = after;
    }
  }

  // Split remaining by quotes
  const pieces = remaining.split(/(["'][^"']*["'])/g);
  for (const piece of pieces) {
    if ((piece.startsWith('"') && piece.endsWith('"')) || (piece.startsWith("'") && piece.endsWith("'"))) {
      parts.push(<span key={idx++} className={stringColor}>{piece}</span>);
    } else {
      parts.push(<span key={idx++} className={propColor}>{piece}</span>);
    }
  }

  return <>{parts}</>;
}