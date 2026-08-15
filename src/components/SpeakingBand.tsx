import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';
import { SplitText } from './Reveal';

/**
 * Full-bleed image band. The photo enters as an inset frame and opens out to
 * the full width as the band crosses the viewport, while drifting slower than
 * the page — so it reads as depth rather than decoration.
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

  // Opens from an inset frame to full bleed over the first half of the pass,
  // then closes again on the way out. Interpolating numbers and composing the
  // clip-path via template avoids relying on string-shape interpolation.
  const insetX = useTransform(scrollYProgress, [0, 0.45, 0.72, 1], [26, 0, 0, 14]);
  const insetY = useTransform(scrollYProgress, [0, 0.45, 0.72, 1], [10, 0, 0, 5]);
  const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}%)`;

  return (
    <section
      ref={ref}
      className="relative h-[60vh] sm:h-[70vh] lg:h-[85vh] overflow-hidden bg-ink-900"
    >
      <motion.div className="absolute inset-0" style={reduced ? undefined : { clipPath }}>
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
      </motion.div>

      {/* Scrim keeps the caption legible over a busy frame */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/70 to-ink-900/30" />

      <div className="relative z-10 h-full shell flex items-end pb-12 lg:pb-16">
        <div className="max-w-2xl">
          <div className="label text-paper-500 mb-4">Leadership &amp; speaking</div>
          <p className="text-display font-extralight text-paper-50">
            <SplitText text="Good architecture is only half of it — the rest is the team." />
          </p>
        </div>
      </div>
    </section>
  );
}
