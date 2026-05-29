import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '../data/portfolioData';

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
    transition: { duration: 0.5 },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

const categoryColors: Record<string, { border: string; glow: string; badge: string; dot: string }> = {
  backend: {
    border: 'hover:border-indigo-500/50',
    glow: 'hover:shadow-indigo-500/10',
    badge: 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 hover:bg-indigo-500/20 hover:border-indigo-500/40',
    dot: 'bg-indigo-400',
  },
  frontend: {
    border: 'hover:border-purple-500/50',
    glow: 'hover:shadow-purple-500/10',
    badge: 'bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/40',
    dot: 'bg-purple-400',
  },
  databases: {
    border: 'hover:border-blue-500/50',
    glow: 'hover:shadow-blue-500/10',
    badge: 'bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/40',
    dot: 'bg-blue-400',
  },
  cloud: {
    border: 'hover:border-cyan-500/50',
    glow: 'hover:shadow-cyan-500/10',
    badge: 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/40',
    dot: 'bg-cyan-400',
  },
  architecture: {
    border: 'hover:border-violet-500/50',
    glow: 'hover:shadow-violet-500/10',
    badge: 'bg-violet-500/10 text-violet-300 border border-violet-500/20 hover:bg-violet-500/20 hover:border-violet-500/40',
    dot: 'bg-violet-400',
  },
  practices: {
    border: 'hover:border-emerald-500/50',
    glow: 'hover:shadow-emerald-500/10',
    badge: 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40',
    dot: 'bg-emerald-400',
  },
};

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" ref={ref} className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0d1117]/50 pointer-events-none" />
      <div className="absolute inset-0 dot-bg opacity-20 pointer-events-none" />

      {/* Gradient accent */}
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-4">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
              02. skills.json
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Technologies and tools I work with across the full stack, from system architecture to deployment.
            </p>
          </motion.div>

          {/* Skills grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillCategories.map((category) => {
              const colors = categoryColors[category.id] || categoryColors.backend;

              return (
                <motion.div
                  key={category.id}
                  variants={cardVariants}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className={`glass-card p-6 border border-white/10 ${colors.border} transition-all duration-300 hover:shadow-xl ${colors.glow} cursor-default group`}
                >
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-2 h-2 rounded-full ${colors.dot} group-hover:shadow-lg transition-shadow`} />
                    <span className="text-xl">{category.icon}</span>
                    <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider">
                      {category.label}
                    </h3>
                  </div>

                  {/* Skill badges */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="flex flex-wrap gap-2"
                  >
                    {category.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        variants={badgeVariants}
                        whileHover={{ scale: 1.05 }}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200 cursor-default ${colors.badge}`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom highlight */}
          <motion.div variants={cardVariants} className="text-center">
            <div className="inline-flex items-center gap-3 px-5 py-3 glass-card border border-white/5">
              <span className="text-lg">💡</span>
              <span className="text-sm text-white/60">
                Always learning · Currently exploring{' '}
                <span className="text-indigo-300 font-medium">Web3 & DeFi protocols</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
