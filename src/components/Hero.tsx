import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { personalInfo, stats, coreStack } from '../data/portfolioData';
import { SplitText, CountUp } from './Reveal';
import ShatterImage from './ShatterImage';

const EASE = [0.22, 1, 0.36, 1] as const;

/** The hero parallax/fade is a desktop flourish — on mobile the layout is
 *  stacked, so fading the block would fade the portrait while it is still
 *  on screen. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return isDesktop;
}

export default function Hero() {
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();
  const { scrollY } = useScroll();

  // The portrait sits whole at rest and breaks apart as you scroll away from the
  // hero — horizontal bands sliding sideways, deliberately a different reading
  // from the speaking band's vertical strips.
  const portraitBreak = useTransform(scrollY, [0, 760], [0, 1]);
  const textY = useTransform(scrollY, [0, 900], ['0%', '22%']);
  const textFade = useTransform(scrollY, [0, 520], [1, 0]);

  // The mobile portrait fades against its OWN position, not global scroll — it
  // stays solid while in view and only fades as it clears the top of the screen.
  // Driven from the element's rect rather than useScroll({ target }), because the
  // hero's `overflow-hidden` makes Framer resolve it as the scroll container, so
  // target-relative progress never advances.
  const mobileImgRef = useRef<HTMLDivElement>(null);
  const mobileImgFade = useMotionValue(1);

  useEffect(() => {
    const el = mobileImgRef.current;
    if (!el || reduced) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const height = rect.height || 1;
      const past = Math.min(Math.max(-rect.top, 0), height); // px hidden above the fold
      const progress = past / height; // 0 fully in view → 1 fully past
      const HOLD = 0.3; // stay fully opaque for the first third of the exit
      const next = progress <= HOLD ? 1 : 1 - (progress - HOLD) / (1 - HOLD);
      mobileImgFade.set(Math.min(1, Math.max(0, next)));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [reduced, mobileImgFade]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* ── Full-bleed portrait, hard-edged against the paper ── */}
      <motion.div
        initial={reduced ? false : { clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
        /* starts below the header so the nav never sits on top of the image */
        className="hidden lg:block absolute right-0 top-20 bottom-0 w-[44%] xl:w-[42%] overflow-hidden"
      >
        {reduced ? (
          <img
            src="/profile.jpg"
            alt="Chathuranga Kumarasinghe"
            className="w-full h-full object-cover portrait scale-[1.12] origin-top"
            style={{ objectPosition: 'center 18%' }}
            loading="eager"
          />
        ) : (
          /* scale-[1.12] from the top edge keeps the photographer's watermark
             cropped out — every slice has to carry it. */
          <ShatterImage
            src="/profile.jpg"
            alt="Chathuranga Kumarasinghe"
            progress={portraitBreak}
            stops={[0, 1]}
            amounts={[0, 38]}
            fan={[0, 4]}
            pieces={6}
            orientation="horizontal"
            className="absolute inset-0"
            imgClassName="portrait scale-[1.12] origin-top"
            objectPosition="center 18%"
          />
        )}
      </motion.div>

      {/* ── Vertical edge labels ── */}
      <div className="hidden lg:flex absolute left-5 top-0 bottom-0 z-20 items-center">
        <span className="vertical-label label">Lead Software Engineer</span>
      </div>
      <div className="hidden lg:flex absolute left-5 bottom-14 z-20 items-center">
        <span className="vertical-label font-mono text-[0.688rem] text-ink-400">2026</span>
      </div>

      <div className="shell relative z-10 flex-1 flex flex-col justify-center pt-32 pb-10 lg:pt-40 lg:pb-16">
        <motion.div
          style={reduced || !isDesktop ? undefined : { y: textY, opacity: textFade }}
          className="lg:max-w-[54%]"
        >
          {/* ── Stat pairs ── */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
            className="flex flex-wrap gap-x-10 gap-y-4 mb-10 lg:mb-14"
          >
            {stats.slice(0, 3).map((stat) => (
              <div key={stat.label}>
                <CountUp
                  value={stat.value}
                  className="block text-2xl sm:text-3xl font-light tracking-tight text-ink-900"
                />
                <div className="label mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* ── Headline ── */}
          <h1 className="text-hero font-display font-normal text-ink-900">
            <SplitText text="Hello." delay={0.35} duration={1.1} />
            <span className="sr-only">Chathuranga Kumarasinghe — Lead Software Engineer</span>
          </h1>

          {/* ── Intro line ── */}
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.95 }}
            className="mt-8 lg:mt-10 max-w-xl text-base sm:text-lg font-light leading-relaxed text-ink-600"
          >
            <span className="text-ink-900">&mdash; I&rsquo;m {personalInfo.name},</span> a Lead
            Software Engineer based in Dubai. I design scalable systems, solve complex engineering
            challenges, and lead teams to build reliable, high-impact products.
          </motion.p>

          {/* ── Actions ── */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() =>
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="btn-solid"
            >
              Selected work
            </button>
            <button
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="btn-ghost"
            >
              Get in touch
            </button>
          </motion.div>
        </motion.div>

        {/* ── Mobile portrait — full opacity in view, fades only as it scrolls past ── */}
        <motion.div
          ref={mobileImgRef}
          style={reduced ? undefined : { opacity: mobileImgFade }}
          className="lg:hidden mt-12 -mx-5 sm:-mx-8"
        >
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.4 }}
            className="overflow-hidden"
          >
            <img
              src="/profile.jpg"
              alt="Chathuranga Kumarasinghe"
              className="w-full aspect-[4/5] object-cover portrait scale-[1.12] origin-top"
              style={{ objectPosition: 'center 18%' }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom bar: animated scroll cue + stack ── */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="relative z-10 shell pb-8"
      >
        <div className="rule pt-5 flex flex-wrap items-center justify-between gap-4 lg:max-w-[54%]">
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="label flex items-center gap-3 hover:text-ink-900 transition-colors duration-300"
          >
            Scroll down
            <span className="relative block w-px h-7 bg-paper-400 overflow-hidden" aria-hidden>
              <motion.span
                className="absolute inset-x-0 top-0 h-3 bg-ink-900"
                animate={reduced ? undefined : { y: ['-120%', '340%'] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
          </button>
          <p className="font-mono text-[0.688rem] text-ink-400 hidden sm:block">
            {coreStack.slice(0, 6).join(' / ')}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
