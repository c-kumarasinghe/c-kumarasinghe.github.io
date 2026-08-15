import { experiences } from '../data/portfolioData';
import SectionIntro from './SectionIntro';
import { Reveal } from './Reveal';

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
function groupStack(entries: Exp[], limit = 9): string[] {
  const seen = new Set<string>();
  for (const e of entries) for (const t of e.technologies) seen.add(t);
  return [...seen].slice(0, limit);
}

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

  return (
    <section id="experience" className="section-pad">
      <div className="shell">
        <SectionIntro index="03" label="Experience" headline="Twelve years, five companies." />

        {/* Tenures alternate across a centre rail. Below lg the rail moves to
            the left edge and everything stacks in one readable column. */}
        <div className="relative mt-12 lg:mt-20">
          <span
            aria-hidden
            className="absolute top-2 bottom-2 w-px bg-paper-400 left-[3px] lg:left-1/2 lg:-translate-x-1/2"
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
              <Reveal key={group.company + gi} delay={gi * 0.04}>
                <div className="relative pl-8 lg:pl-0 py-9 lg:py-14 grid lg:grid-cols-2 lg:gap-x-20 gap-y-6">
                  <span
                    aria-hidden
                    className={`absolute top-[2.9rem] lg:top-[4.15rem] w-[9px] h-[9px] rounded-full -translate-x-1/2 left-[3px] lg:left-1/2 border ${
                      current ? 'bg-accent border-accent' : 'bg-paper-200 border-ink-400'
                    }`}
                  />

                  {/* ── Company ── */}
                  <div
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
                  </div>

                  {/* ── Roles + stack ── */}
                  <div
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
                            <p className="mt-2 text-sm font-light leading-relaxed text-ink-600">
                              {exp.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Stack was already in the data and had never been shown. */}
                    <div
                      className="mt-6 flex flex-wrap gap-1.5"
                    >
                      {stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[0.625rem] tracking-[0.08em] text-ink-600 border border-paper-400 px-2.5 py-1"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
