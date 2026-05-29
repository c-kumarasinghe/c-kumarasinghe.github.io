import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experiences } from '../data/portfolioData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" ref={ref} className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080c14] via-[#0d1117]/70 to-[#080c14] pointer-events-none" />

      <div className="relative z-10 container-max">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              03. experience.log
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Work <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              11+ years of building products that scale, leading teams that deliver, and solving problems that matter.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }}
              className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/60 via-purple-500/40 to-transparent origin-top"
            />

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <ExperienceCard
                  key={exp.id}
                  exp={exp}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface ExperienceCardProps {
  exp: (typeof experiences)[0];
  index: number;
  isInView: boolean;
}

function ExperienceCard({ exp, index, isInView }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.12 }}
      className="relative pl-12 md:pl-20"
    >
      {/* Timeline node */}
      <div className="absolute left-2 md:left-6 top-4 flex items-center justify-center">
        <div
          className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
            exp.current
              ? 'bg-indigo-500 border-indigo-300 shadow-lg shadow-indigo-500/50'
              : 'bg-[#080c14] border-indigo-500/50'
          }`}
        />
        {exp.current && (
          <motion.div
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute w-5 h-5 rounded-full bg-indigo-500/30"
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -3, scale: 1.005 }}
        className="glass-card p-5 sm:p-6 border border-white/8 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5"
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            {/* Role */}
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-base sm:text-lg font-semibold text-white">{exp.role}</h3>
              {exp.current && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Current
                </span>
              )}
            </div>
            {/* Company */}
            <div className="text-indigo-300 font-medium text-sm">{exp.company}</div>
            {/* Location */}
            <div className="flex items-center gap-1 text-white/40 text-xs mt-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {exp.location}
            </div>
          </div>

          {/* Period badge */}
          <div className="flex-shrink-0">
            <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/50 text-xs font-mono">
              {exp.period}
            </span>
          </div>
        </div>

        {/* Description bullets */}
        <ul className="space-y-2 mb-4">
          {exp.description.map((point, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-white/65 leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500/60 flex-shrink-0" />
              {point}
            </li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {exp.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs font-mono bg-indigo-500/8 text-indigo-300/80 border border-indigo-500/15 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}