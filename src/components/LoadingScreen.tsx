import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onFinish: () => void;
}

const bootLines = [
  { text: '$ npm run portfolio', color: 'text-white/70', delay: 0 },
  { text: '> Starting development server...', color: 'text-white/40', delay: 300 },
  { text: '> Compiling TypeScript... ✓', color: 'text-green-400', delay: 700 },
  { text: '> Loading experience modules... ✓', color: 'text-green-400', delay: 1050 },
  { text: '> Initializing skill matrix... ✓', color: 'text-green-400', delay: 1350 },
  { text: '> Spinning up servers... ✓', color: 'text-green-400', delay: 1600 },
  { text: '', color: '', delay: 1800 },
  { text: '> Server running at http://localhost:3000', color: 'text-cyan-400', delay: 1900 },
  { text: '> Portfolio ready. 🚀', color: 'text-indigo-300', delay: 2100 },
];

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    bootLines.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleLines(i + 1), bootLines[i].delay)
      );
    });

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(p + 3, 100);
      });
    }, 60);

    timers.push(
      setTimeout(() => {
        setExiting(true);
        setTimeout(onFinish, 700);
      }, 2700)
    );

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(progressInterval);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#080c14] overflow-hidden"
        >
          {/* Grid background */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Animated orbs */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-[80px] pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md px-4">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 p-[2px] shadow-2xl glow-indigo">
                <img src="/profile.jpg" alt="CK" className="w-full h-full rounded-2xl object-cover" style={{ objectPosition: 'center 15%', transform: 'translateZ(0)' }} />
              </div>
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl border-2 border-indigo-500/40"
              />
            </motion.div>

            {/* Terminal window */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl"
            >
              {/* Terminal titlebar */}
              <div className="terminal-header">
                <span className="terminal-dot bg-red-500" />
                <span className="terminal-dot bg-yellow-400" />
                <span className="terminal-dot bg-green-500" />
                <span className="ml-3 text-xs text-white/40 font-mono flex-1">
                  zsh — portfolio — 80×24
                </span>
                <span className="text-xs text-white/20 font-mono">⌥⌘T</span>
              </div>

              {/* Terminal body */}
              <div className="bg-[#0a0e1a] p-5 font-mono text-sm min-h-[200px]">
                {bootLines.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`leading-relaxed ${line.color || 'text-white/30'}`}
                  >
                    {line.text}
                    {i === visibleLines - 1 && i < bootLines.length - 1 && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.7, repeat: Infinity }}
                        className="ml-0.5 text-white/70"
                      >
                        ▌
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full"
            >
              <div className="flex justify-between text-xs font-mono text-white/30 mb-2">
                <span>Initializing portfolio</span>
                <span>{Math.min(progress, 100)}%</span>
              </div>
              <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
