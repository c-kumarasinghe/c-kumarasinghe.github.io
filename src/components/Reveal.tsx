import { useRef, useState, useEffect, type ReactNode } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Counts up to a numeric value when scrolled into view.
 * Accepts decorated strings like "12+" and preserves the non-digit suffix.
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
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });
  const reduced = useReducedMotion();
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
            transition={{ duration, ease: EASE, delay: delay + i * stagger }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** One word of a ScrollHighlight — owns its own slice of the scroll range. */
function HighlightWord({
  children,
  progress,
  range,
  dim,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  dim: number;
}) {
  const opacity = useTransform(progress, range, [dim, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

/**
 * Scroll-linked word highlight. The line starts dimmed and each word lifts to
 * full strength as it crosses the viewport — driven continuously by scroll
 * position rather than by a one-shot in-view trigger like SplitText.
 *
 * Words stay inline (no inline-block wrappers), so text flow and hyphenation
 * are exactly as they'd be without the effect.
 *
 * Do NOT place this inside an `overflow-hidden` ancestor: Framer Motion
 * resolves the nearest scrolling ancestor as the scroll container, so an
 * overflow-hidden parent pins progress at 0 and nothing ever brightens.
 */
export function ScrollHighlight({
  text,
  className = '',
  dim = 0.22,
}: {
  text: string;
  className?: string;
  /** Resting opacity before a word is reached. */
  dim?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'end 0.35'],
  });

  const words = text.split(' ');
  const step = 1 / words.length;

  // Reduced motion: full contrast, no scroll binding.
  if (reduced) return <span className={className}>{text}</span>;

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <HighlightWord
          key={`${word}-${i}`}
          progress={scrollYProgress}
          /* Ranges overlap so a band of words brightens together rather than
             a single hard cursor sweeping across the line. */
          range={[i * step, Math.min(i * step + step * 2.5, 1)]}
          dim={dim}
        >
          {i < words.length - 1 ? `${word} ` : word}
        </HighlightWord>
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
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A hairline rule that draws itself from left to right when scrolled into view. */
export function RuleDraw({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className={`h-px w-full bg-paper-400 origin-left ${className}`}>
      <motion.div
        className="h-px w-full bg-ink-900/25 origin-left"
        initial={reduced ? false : { scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : undefined}
        transition={{ duration: 1.1, ease: EASE, delay }}
      />
    </div>
  );
}
