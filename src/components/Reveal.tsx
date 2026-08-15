import { useRef, useState, useEffect, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Scroll direction ──────────────────────────────────────────────────────
   Replaying the full staggered cascade on the way back up is too busy: the
   reader has already seen that content and is now travelling against it. So
   downward re-entry keeps the full reveal, and upward re-entry gets a short
   simultaneous fade instead — present, but quiet.

   One listener for the whole page, shared by every reveal on it, rather than
   one per component. */
type Dir = 'up' | 'down';

let scrollDir: Dir = 'down';
const dirSubscribers = new Set<(d: Dir) => void>();

if (typeof window !== 'undefined') {
  let last = window.scrollY;
  let queued = false;
  window.addEventListener(
    'scroll',
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const y = window.scrollY;
        // ignore jitter, and momentum bounce past the ends of the document
        if (Math.abs(y - last) < 6) return;
        const next: Dir = y > last ? 'down' : 'up';
        last = y;
        if (next !== scrollDir) {
          scrollDir = next;
          dirSubscribers.forEach((fn) => fn(next));
        }
      });
    },
    { passive: true }
  );
}

function useScrollDirection(): Dir {
  const [dir, setDir] = useState<Dir>(scrollDir);
  useEffect(() => {
    dirSubscribers.add(setDir);
    return () => {
      dirSubscribers.delete(setDir);
    };
  }, []);
  return dir;
}

/**
 * Counts up to a numeric value when scrolled into view.
 * Accepts decorated strings like "12+" and preserves the non-digit suffix.
 *
 * Deliberately `once: true` while the other reveals replay — a figure that
 * resets to 0 and recounts every time it is passed reads as a glitch, not as
 * motion, and the stat band is passed often.
 */
export function CountUp({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduced = useReducedMotion();

  const target = parseInt(value.replace(/\D/g, ''), 10) || 0;
  const suffix = value.replace(/[\d]/g, '');
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4); // easeOutQuart
      setAnimated(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, reduced]);

  // Reduced-motion users get the final number with no tween.
  const display = reduced ? target : animated;

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

/**
 * Masked word-by-word reveal — the signature motion of the page.
 * Each word sits in an overflow-hidden box and slides up from below the mask.
 *
 * Replays: `useInView` runs without `once`, so the words drop back behind the
 * mask on exit and reveal again on re-entry, in either scroll direction.
 */
export function SplitText({
  text,
  className = '',
  delay = 0,
  stagger = 0.045,
  duration = 0.9,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { margin: '-12% 0px' });
  const reduced = useReducedMotion();
  const up = useScrollDirection() === 'up';
  const words = text.split(' ');

  if (reduced) return <span className={className}>{text}</span>;

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          /* padding + negative margin lets descenders render while still masking the offset */
          className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] mr-[0.24em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: '115%' }}
            animate={inView ? { y: '0%' } : { y: '115%' }}
            /* Coming back up: every word moves at once, quickly, with no
               entrance delay — the shape of the reveal without the cascade. */
            transition={
              up
                ? { duration: 0.4, ease: EASE }
                : { duration, ease: EASE, delay: delay + i * stagger }
            }
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Generic fade-and-rise for blocks of content. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 22,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-8% 0px' });
  const reduced = useReducedMotion();
  const up = useScrollDirection() === 'up';

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      /* No rise and no stagger delay on the way up — the blocks simply come
         back, rather than re-performing in sequence. */
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: up ? 0 : y }}
      transition={up ? { duration: 0.3, ease: 'easeOut' } : { duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A hairline rule that draws itself from left to right when scrolled into view. */
export function RuleDraw({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-5% 0px' });
  const reduced = useReducedMotion();
  const up = useScrollDirection() === 'up';

  return (
    <div ref={ref} className={`h-px w-full bg-paper-400 origin-left ${className}`}>
      <motion.div
        className="h-px w-full bg-ink-900/25 origin-left"
        initial={reduced ? false : { scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: up ? 1 : 0 }}
        transition={up ? { duration: 0.25, ease: 'easeOut' } : { duration: 1.1, ease: EASE, delay }}
      />
    </div>
  );
}
