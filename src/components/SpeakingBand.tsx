import { useRef } from 'react';
import { useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { SplitText } from './Reveal';
import ShatterImage from './ShatterImage';

/**
 * Full-bleed image band. The photo arrives broken into vertical strips that
 * close into one frame as the band crosses the viewport, then break apart
 * again on the way out — all while drifting slower than the page.
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
    <section
      ref={ref}
      className="relative h-[60vh] sm:h-[70vh] lg:h-[85vh] overflow-hidden bg-ink-900"
    >
      {reduced ? (
        <img
          src="/speaking.jpg"
          alt="Chathuranga Kumarasinghe speaking at Cinnamon Grand, Colombo"
          className="absolute inset-0 w-full h-full object-cover portrait"
          loading="lazy"
        />
      ) : (
        <ShatterImage
          src="/speaking.jpg"
          alt="Chathuranga Kumarasinghe speaking at Cinnamon Grand, Colombo"
          progress={scrollYProgress}
          stops={[0, 0.42, 0.62, 1]}
          amounts={[22, 0, 0, 18]}
          fan={[4, 0, 0, 3]}
          pieces={5}
          orientation="vertical"
          parallaxY={y}
          className="absolute inset-0"
          imgClassName="portrait"
        />
      )}

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
