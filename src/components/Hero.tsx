import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { personalInfo, heroBadges } from '../data/portfolioData';
import DeployStatus from './DeployStatus';

// Floating code snippets that drift across the background
const codeSnippets = [
  'async deployService()',
  'const redis = new Redis()',
  '@Injectable() AuthGuard',
  'db.aggregate([pipeline])',
  'docker run -p 3000:3000',
  'git push origin main',
  'kubectl apply -f deploy.yaml',
  'npm run build:prod',
  'SELECT * FROM transactions',
  'socket.emit("reward:done")',
  'new BullMQ.Queue("jobs")',
  'rabbit.publish(exchange)',
];

function FloatingCode({ text, style }: { text: string; style: React.CSSProperties }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.1, 0.1, 0] }}
      transition={{
        duration: 14,
        delay: Math.random() * 10,
        repeat: Infinity,
        repeatDelay: Math.random() * 6 + 2,
      }}
    >
      <span className="font-mono text-xs text-indigo-400/60 whitespace-nowrap">
        {text}
      </span>
    </motion.div>
  );
}

function TerminalBoot() {
  const cmds = [
    { prompt: '$', text: ' npm run start', color: 'text-white/70' },
    { prompt: '▶', text: ' NestJS listening :3000', color: 'text-green-400' },
    { prompt: '▶', text: ' WebSocket server ready', color: 'text-green-400' },
    { prompt: '▶', text: ' BullMQ workers ×8 active', color: 'text-cyan-400' },
  ];
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= cmds.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 200 : 650);
    return () => clearTimeout(t);
  }, [step, cmds.length]);

  return (
    <div className="inline-block rounded-xl overflow-hidden border border-white/10 bg-[#0a0e1a]/90 backdrop-blur-sm shadow-2xl">
      <div className="terminal-header py-2">
        <span className="terminal-dot bg-red-500" />
        <span className="terminal-dot bg-yellow-400" />
        <span className="terminal-dot bg-green-500" />
        <span className="ml-2 text-xs text-white/30 font-mono">server.log</span>
      </div>
      <div className="px-4 py-3 font-mono text-xs space-y-1 min-w-[260px]">
        {cmds.slice(0, step).map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <span className={i === 0 ? 'text-indigo-400' : 'text-white/30'}>{c.prompt}</span>
            <span className={c.color}>{c.text}</span>
          </motion.div>
        ))}
        {step < cmds.length && (
          <div className="flex items-center gap-2">
            <span className="text-indigo-400">$</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-white/50"
            >▌</motion.span>
          </div>
        )}
      </div>
    </div>
  );
}

// Animated SVG network lines in background
function NetworkLines() {
  const pairs = [
    [15, 20, 40, 55],
    [40, 55, 70, 30],
    [70, 30, 85, 65],
    [85, 65, 55, 80],
    [55, 80, 15, 20],
    [40, 55, 85, 65],
  ];
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
      {pairs.map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={i}
          x1={`${x1}%`} y1={`${y1}%`}
          x2={`${x2}%`} y2={`${y2}%`}
          stroke="#6366f1"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 5, delay: i * 0.8, repeat: Infinity, repeatDelay: 4 }}
        />
      ))}
      {[[15,20],[40,55],[70,30],[85,65],[55,80]].map(([cx, cy], i) => (
        <motion.circle
          key={`n${i}`}
          cx={`${cx}%`} cy={`${cy}%`} r="3"
          fill="#6366f1"
          animate={{ r: [3, 5, 3], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, delay: i * 0.5, repeat: Infinity }}
        />
      ))}
    </svg>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Hero() {
  const positions = codeSnippets.map((_, i) => ({
    left: `${(i * 13 + 5) % 80}%`,
    top: `${(i * 17 + 8) % 85}%`,
  }));

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 grid-bg"
        animate={{ backgroundPositionY: ['0px', '60px'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ opacity: 0.35 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080c14]/10 to-[#080c14]/50 pointer-events-none" />

      {/* Network lines */}
      <NetworkLines />

      {/* Floating code */}
      {codeSnippets.map((text, i) => (
        <FloatingCode key={i} text={text} style={positions[i]} />
      ))}

      {/* Ambient orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.28, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 -right-20 w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 container-max section-padding w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

          {/* ── Left ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 flex flex-col gap-6 text-center lg:text-left max-w-2xl"
          >
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
              <TerminalBoot />
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-white/40 font-mono text-xs sm:text-sm tracking-widest uppercase mb-3">
                Hello, World —
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
                <span className="block text-white/90 mb-1">I'm</span>
                <span className="block shimmer-text leading-tight">Chathuranga</span>
                <span className="block shimmer-text leading-tight">Kumarasinghe</span>
              </h1>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 flex-shrink-0">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
                <span className="text-indigo-400 font-mono text-xs">role</span>
              </div>
              <div className="text-sm sm:text-base font-mono font-semibold text-white/80 min-h-[1.6rem]">
                <TypeAnimation
                  sequence={[
                    'Senior Software Engineer', 2200,
                    'Team Lead (15+ engineers)', 2200,
                    'Blockchain Developer', 2000,
                  ]}
                  wrapper="span"
                  speed={55}
                  repeat={Infinity}
                />
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="ml-0.5 text-indigo-400"
                >|</motion.span>
              </div>
            </motion.div>

            <motion.p variants={itemVariants} className="text-white/55 text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
              {personalInfo.summary}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(99,102,241,0.5)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/30"
              >
                View Projects
              </motion.button>

              <motion.a
                href="/cv.pdf"
                download="Chathuranga-Kumarasinghe-Resume.pdf"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-indigo-500/40 transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download CV
              </motion.a>

              <motion.a
                href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.08, boxShadow: '0 0 16px rgba(99,102,241,0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 hover:bg-indigo-500/10 border border-white/10 hover:border-indigo-500/40 transition-all duration-200"
              >
                <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </motion.a>

              <motion.a
                href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.08, boxShadow: '0 0 16px rgba(59,130,246,0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/40 transition-all duration-200"
              >
                <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.a>
            </motion.div>

            {/* Deploy status */}
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
              <DeployStatus />
            </motion.div>

            {/* Glowing tech badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {heroBadges.map((badge, i) => (
                <motion.span
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.07 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md border cursor-default transition-all duration-200 hover:shadow-sm ${badge.color}`}
                >
                  {badge.label}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Profile ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex-shrink-0"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4 rounded-full bg-gradient-to-r from-indigo-500/15 via-transparent to-purple-500/15 blur-sm pointer-events-none"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-2 rounded-full border border-dashed border-indigo-500/15 pointer-events-none"
            />

            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
            >
              <div
                className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-500 p-[3px]"
                style={{ boxShadow: '0 0 40px rgba(99,102,241,0.25), 0 0 80px rgba(99,102,241,0.08)' }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-[#0d1117]">
                  <img
                    src="/profile.jpg"
                    alt="Chathuranga Kumarasinghe"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 30%', transform: 'translateZ(0)', willChange: 'transform', imageRendering: 'auto' }}
                    loading="eager"
                  />
                </div>
              </div>

              {[
                { label: '11+ yrs', sub: 'Experience', cls: 'absolute -left-14 top-6' },
                { label: '15+', sub: 'Team Size', cls: 'absolute -right-12 top-12' },
                { label: '20+', sub: 'Projects', cls: 'absolute -left-10 bottom-14' },
              ].map((card, i) => (
                <motion.div
                  key={card.sub}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.2, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.08, y: -3 }}
                  className={`${card.cls} glass-card px-3 py-2 text-center min-w-[76px] cursor-default`}
                >
                  <div className="text-sm font-bold gradient-text">{card.label}</div>
                  <div className="text-xs text-white/50">{card.sub}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 glass-card whitespace-nowrap border border-green-500/20"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-mono text-green-400">Open to Opportunities</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-xs text-white/25 font-mono tracking-widest uppercase">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-indigo-400/70 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
