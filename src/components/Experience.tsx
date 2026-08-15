import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from 'framer-motion';
import { experiences } from '../data/portfolioData';
import SectionIntro from './SectionIntro';
import { useScrollDirection } from '../hooks/useScrollDirection';

type Exp = (typeof experiences)[0];

interface Group {
  company: string;
  location: string;
  entries: Exp[];
}

function groupByCompany(exps: Exp[]): Group[] {
  const groups: Group[] = [];
  for (const exp of exps) {
    const last = groups[groups.length - 1];
    if (last && last.company === exp.company) {
      last.entries.push(exp);
    } else {
      groups.push({ company: exp.company, location: exp.location, entries: [exp] });
    }
  }
  return groups;
}

/** Merged, de-duplicated stack for a whole tenure — roles at one company
 *  repeat most of their tools, so listing them per role is just noise. */
function groupStack(entries: Exp[], limit = 12): string[] {
  const seen = new Set<string>();
  for (const e of entries) for (const t of e.technologies) seen.add(t);
  return [...seen].slice(0, limit);
}

const EASE = [0.22, 1, 0.36, 1] as const;

/* Each tenure arrives as a short ladder: the marker pops on the rail, then the
   company, then the roles beside it. Coming back up the sequence collapses to
   a single quick fade — the reader has already seen it. */
const ROW: Variants = {
  hidden: {},
  down: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
  up: { transition: { staggerChildren: 0 } },
};

const RISE: Variants = {
  hidden: { opacity: 0, y: 26 },
  down: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
  up: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
};

const POP: Variants = {
  hidden: { scale: 0, opacity: 0 },
  down: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 480, damping: 22 } },
  up: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parseDate(s: string): Date {
  if (s === 'Present') return new Date();
  const [mon, yr] = s.split(' ');
  return new Date(parseInt(yr), MONTHS.indexOf(mon), 1);
}

function formatDuration(totalMonths: number): string {
  const yrs = Math.floor(totalMonths / 12);
  const mos = totalMonths % 12;
  if (yrs === 0) return `${mos} mo${mos !== 1 ? 's' : ''}`;
  if (mos === 0) return `${yrs} yr${yrs !== 1 ? 's' : ''}`;
  return `${yrs} yr${yrs !== 1 ? 's' : ''} ${mos} mo${mos !== 1 ? 's' : ''}`;
}

function groupSpan(entries: Exp[]): { range: string; duration: string } {
  let earliest = new Date();
  let latest = new Date(0);
  for (const e of entries) {
    const [startStr, endStr] = e.period.split(' – ');
    const start = parseDate(startStr);
    const end = parseDate(endStr);
    if (start < earliest) earliest = start;
    if (end > latest) latest = end;
  }
  const months =
    (latest.getFullYear() - earliest.getFullYear()) * 12 + (latest.getMonth() - earliest.getMonth());
  const first = entries[entries.length - 1].period.split(' – ')[0];
  const last = entries[0].period.split(' – ')[1];
  return { range: `${first} — ${last}`, duration: formatDuration(Math.max(months, 1)) };
}

export default function Experience() {
  const groups = groupByCompany(experiences);
  const reduced = useReducedMotion();
  const show = useScrollDirection() === 'up' ? 'up' : 'down';

  /* The rail draws itself as the section passes. Safe to use a target-relative
     scroll here — nothing between this element and the document scroller sets
     `overflow-hidden`, which would otherwise be resolved as the scroll
     container and pin progress at 0. */
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 0.8', 'end 0.55'],
  });
  const railDraw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="section-pad">
      <div className="shell">
        <SectionIntro index="03" label="Experience" headline="Twelve years, five companies." />

        {/* Tenures alternate across a centre rail. Below lg the rail moves to
            the left edge and everything stacks in one readable column. */}
        <div ref={railRef} className="relative mt-12 lg:mt-20">
          <span
            aria-hidden
            className="absolute top-2 bottom-2 w-px bg-paper-400 left-[3px] lg:left-1/2 lg:-translate-x-1/2"
          />
          {/* the lit portion, tracking how far down the section you are */}
          <motion.span
            aria-hidden
            style={reduced ? undefined : { scaleY: railDraw }}
            className="absolute top-2 bottom-2 w-px bg-ink-400 origin-top left-[3px] lg:left-1/2 lg:-translate-x-1/2"
          />

          {groups.map((group, gi) => {
            const span = groupSpan(group.entries);
            const stack = groupStack(group.entries);
            const current = group.entries[0].current;
            // More than one role at the same company is a promotion ladder.
            const ladder = group.entries.length > 1;
            // Odd tenures mirror, so the column reads as a zig-zag down the rail.
            const flip = gi % 2 === 1;

            return (
              <motion.div
                key={group.company + gi}
                variants={ROW}
                initial={reduced ? false : 'hidden'}
                whileInView={show}
                viewport={{ margin: '-12% 0px' }}
                className="relative pl-8 lg:pl-0 py-9 lg:py-11 grid lg:grid-cols-2 lg:gap-x-20 gap-y-6"
              >
                <motion.span
                  aria-hidden
                  variants={POP}
                  className={`absolute top-[2.9rem] lg:top-[4.15rem] w-[9px] h-[9px] rounded-full -translate-x-1/2 left-[3px] lg:left-1/2 border ${
                    current ? 'bg-accent border-accent' : 'bg-paper-200 border-ink-400'
                  }`}
                />

                  {/* ── Company ── */}
                  <motion.div
                    variants={RISE}
                    className={
                      flip
                        ? 'lg:order-2 lg:text-left lg:pl-4'
                        : 'lg:order-1 lg:text-right lg:pr-4'
                    }
                  >
                    <div className="font-mono text-[0.688rem] text-ink-500">{span.range}</div>
                    <h3 className="mt-3 text-2xl sm:text-3xl font-medium tracking-tight leading-[1.05] text-ink-900 uppercase">
                      {group.company}
                    </h3>
                    <div
                      className={`mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 label ${
                        flip ? 'lg:justify-start' : 'lg:justify-end'
                      }`}
                    >
                      <span>{group.location}</span>
                      <span aria-hidden className="w-4 h-px bg-paper-500" />
                      <span>{span.duration}</span>
                    </div>
                    {current && (
                      <div
                        className={`mt-3 flex items-center gap-2 ${
                          flip ? 'lg:justify-start' : 'lg:justify-end'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span className="label text-accent">Current</span>
                      </div>
                    )}

                    {/* The stack belongs to the tenure, not to the last role, so it
                        sits under the company — which also fills the column the
                        roles would otherwise leave empty. */}
                    <div
                      className={`mt-7 flex flex-wrap gap-x-5 gap-y-3 ${flip ? 'lg:justify-start' : 'lg:justify-end'}`}
                    >
                      {stack.map((tech) => (
                        <span
                          key={tech}
                          /* Hairline-underlined labels rather than boxed chips:
                             the page carries its layout on rules, not borders. */
                          className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-600 border-b border-paper-400 pb-1"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* ── Roles ── */}
                  <motion.div
                    variants={RISE}
                    className={flip ? 'lg:order-1 lg:pr-4' : 'lg:order-2 lg:pl-4'}
                  >
                    {/* Roles run newest-first, so a tenure with more than one
                        is a promotion ladder: a rail links them, and only the
                        most recent carries a filled marker. */}
                    <div className={ladder ? 'relative pl-6' : ''}>
                      {ladder && (
                        <span
                          aria-hidden
                          className="absolute left-[3px] top-2 bottom-2 w-px bg-paper-400"
                        />
                      )}

                      {group.entries.map((exp, ri) => (
                        <div key={exp.id} className={ri > 0 ? 'mt-5' : ''}>
                          <div className="relative">
                            {ladder && (
                              <span
                                aria-hidden
                                className={`absolute left-[-21px] top-[0.42rem] w-[7px] h-[7px] rounded-full -translate-x-1/2 border ${
                                  ri === 0
                                    ? 'bg-ink-900 border-ink-900'
                                    : 'bg-paper-200 border-ink-400'
                                }`}
                              />
                            )}
                            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                              <h4 className="text-base font-medium text-ink-900">{exp.role}</h4>
                              <span className="font-mono text-[0.688rem] text-ink-400">
                                {exp.period}
                              </span>
                            </div>
                            {/* Bullets replace the summary rather than joining
                                it — carrying both says the same thing twice and
                                costs the height of an extra paragraph per role. */}
                            {exp.highlights?.length ? (
                              <ul className="mt-2.5 max-w-2xl">
                                {exp.highlights.map((h) => (
                                  <li
                                    key={h}
                                    className="flex items-baseline gap-3 py-[0.2rem] text-sm font-light leading-relaxed text-ink-600"
                                  >
                                    <span
                                      aria-hidden
                                      className="w-1 h-1 rounded-full bg-ink-400 flex-shrink-0"
                                    />
                                    <span>{h}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="mt-2 text-sm font-light leading-relaxed text-ink-600">
                                {exp.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
