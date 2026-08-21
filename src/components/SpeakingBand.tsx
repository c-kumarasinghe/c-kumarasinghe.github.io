import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { SplitText } from './Reveal';

/**
 * Full-bleed image band. The photo sits in a clipped frame and drifts
 * slower than the page, so it reads as depth rather than decoration.
 */
export default function SpeakingBand() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Oversize the image by 20% and travel within that headroom — no gaps at either edge.
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section ref={ref} className="relative h-[60vh] sm:h-[70vh] lg:h-[85vh] overflow-hidden bg-paper-100">
      <motion.div
        style={reduced ? undefined : { y }}
        className="absolute inset-x-0 -top-[10%] h-[120%]"
      >
        <img
          src="/speaking.jpg"
          alt="Chathuranga Kumarasinghe speaking at Cinnamon Grand, Colombo"
          className="w-full h-full object-cover portrait"
          loading="lazy"
        />
      </motion.div>

      {/* Scrim keeps the caption legible over a busy frame */}
      <div className="absolute inset-0 bg-gradient-to-t from-paper-100 via-paper-100/45 to-paper-100/10" />

      <div className="relative z-10 h-full shell flex items-end pb-12 lg:pb-16">
        <div className="max-w-2xl">
          <div className="label text-ink-500 mb-4">Leadership &amp; speaking</div>
          <p className="text-display font-extralight text-ink-900">
            <SplitText text="Good architecture is only half of it — the rest is the team." />
          </p>
        </div>
      </div>
    </section>
  );
}
