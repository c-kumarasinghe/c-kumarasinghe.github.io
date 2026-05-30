import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolioData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55 },
  },
};

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const displayed = projects;

  return (
    <section id="projects" ref={ref} className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0d1117]/60 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="relative z-10 container-max">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {/* Section header */}
          <motion.div variants={cardVariants} className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-4">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
              04. projects.yaml
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Production systems serving thousands to millions of users, built with modern architectures.
            </p>
          </motion.div>

          {/* Projects grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayed.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} isInView={isInView} />
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
  isInView: boolean;
}

function ProjectCard({ project, index, isInView }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`relative group flex flex-col glass-card border overflow-hidden transition-all duration-300 ${
        project.featured
          ? 'border-indigo-500/30 hover:border-indigo-500/60 hover:shadow-xl hover:shadow-indigo-500/10'
          : 'border-white/8 hover:border-white/20 hover:shadow-xl hover:shadow-white/5'
      }`}
    >
      {/* Hover gradient overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Terminal header */}
      <div className="terminal-header border-b border-white/5 flex-shrink-0">
        <span className="terminal-dot bg-red-500" />
        <span className="terminal-dot bg-yellow-500" />
        <span className="terminal-dot bg-green-500" />
        <span className="ml-2 text-xs text-white/40 font-mono flex-1 truncate">
          {project.id}.config.ts
        </span>
        {project.featured && (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/25 text-indigo-400 text-xs font-medium flex-shrink-0">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Featured
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Project name */}
        <h3 className="text-base font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/55 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-1.5 mb-4">
          {project.highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-white/50">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500/50 flex-shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        {/* Spacer pushes tech tags to bottom */}
        <div className="flex-1" />

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs font-mono bg-white/5 text-white/50 border border-white/8 rounded hover:bg-indigo-500/10 hover:text-indigo-300 hover:border-indigo-500/20 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

      </div>
    </motion.div>
  );
}
