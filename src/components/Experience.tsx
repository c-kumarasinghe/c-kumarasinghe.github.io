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

        <div className="mt-12 lg:mt-16">
          {groups.map((group, gi) => {
            const span = groupSpan(group.entries);
            return (
              <Reveal key={group.company + gi} delay={gi * 0.03}>
                <div className="grid md:grid-cols-12 gap-y-5 md:gap-x-8 py-8 lg:py-10 border-t border-paper-400 last:border-b">
                  {/* Left rail — dates */}
                  <div className="md:col-span-3">
                    <div className="font-mono text-[0.688rem] text-ink-900">{span.range}</div>
                    <div className="font-mono text-[0.688rem] text-ink-400 mt-1.5">
                      {span.duration}
                    </div>
                    {group.entries[0].current && (
                      <div className="flex items-center gap-2 mt-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span className="label">Current</span>
                      </div>
                    )}
                  </div>

                  {/* Right — company + roles */}
                  <div className="md:col-span-9">
                    <h3 className="text-xl sm:text-2xl font-light tracking-tight text-ink-900">
                      {group.company}
                    </h3>
                    <div className="label mt-1.5">{group.location}</div>

                    <div
                      className={`mt-6 max-w-2xl ${
                        group.entries.length > 1 ? 'relative pl-6' : ''
                      }`}
                    >
                      {/* Rail linking the roles into one continuous tenure */}
                      {group.entries.length > 1 && (
                        <span
                          aria-hidden
                          className="absolute left-[3px] top-2 bottom-2 w-px bg-paper-400"
                        />
                      )}

                      <div className="space-y-6">
                        {group.entries.map((exp, ri) => (
                          <div key={exp.id} className="relative">
                            {group.entries.length > 1 && (
                              <span
                                aria-hidden
                                className={`absolute -left-6 top-[0.4rem] w-[7px] h-[7px] rounded-full border ${
                                  ri === 0
                                    ? 'bg-ink-900 border-ink-900'
                                    : 'bg-paper-200 border-ink-400'
                                }`}
                              />
                            )}
                            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                              <h4 className="text-base font-medium text-ink-900">{exp.role}</h4>
                              <span className="font-mono text-[0.688rem] text-ink-400">
                                {exp.period}
                              </span>
                            </div>
                            <p className="mt-2 text-sm font-light leading-relaxed text-ink-600">
                              {exp.description}
                            </p>
                          </div>
                        ))}
                      </div>
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
