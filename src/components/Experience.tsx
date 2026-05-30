import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experiences } from '../data/portfolioData';

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

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

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

function periodDuration(period: string): string {
  const [startStr, endStr] = period.split(' – ');
  const start = parseDate(startStr);
  const end = parseDate(endStr);
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  return formatDuration(Math.max(months, 1));
}

function groupDuration(entries: Exp[]): string {
  let earliest = new Date();
  let latest = new Date(0);
  for (const e of entries) {
    const [startStr, endStr] = e.period.split(' – ');
    const start = parseDate(startStr);
    const end = parseDate(endStr);
    if (start < earliest) earliest = start;
    if (end > latest) latest = end;
  }
  const months = (latest.getFullYear() - earliest.getFullYear()) * 12 + (latest.getMonth() - earliest.getMonth());
  return formatDuration(Math.max(months, 1));
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const groups = groupByCompany(experiences);

  return (
    <section id="experience" ref={ref} className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#080c14] via-[#0d1117]/70 to-[#080c14] pointer-events-none" />

      <div className="relative z-10 container-max">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {/* Section header */}
          <motion.div
            variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              03. experience.log
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Work <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              11+ years of building products that scale, leading teams that deliver, and solving problems that matter.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Main vertical line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }}
              className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/60 via-purple-500/40 to-transparent origin-top"
            />

            <div className="space-y-6">
              {groups.map((group, gi) => (
                <motion.div
                  key={group.company + gi}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.1 + gi * 0.12 }}
                  className="relative pl-12 md:pl-20"
                >
                  {/* Timeline node */}
                  <div className="absolute left-2 md:left-6 top-4 flex items-center justify-center">
                    <div className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                      group.entries[0].current
                        ? 'bg-indigo-500 border-indigo-300 shadow-lg shadow-indigo-500/50'
                        : 'bg-[#080c14] border-indigo-500/50'
                    }`} />
                    {group.entries[0].current && (
                      <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute w-5 h-5 rounded-full bg-indigo-500/30"
                      />
                    )}
                  </div>

                  {group.entries.length === 1 ? (
                    /* ── Single role card ── */
                    <motion.div
                      whileHover={{ y: -3, scale: 1.005 }}
                      className="glass-card p-5 sm:p-6 border border-white/8 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="text-base sm:text-lg font-semibold text-white">{group.entries[0].role}</h3>
                            {group.entries[0].current && (
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                Current
                              </span>
                            )}
                          </div>
                          <div className="text-indigo-300 font-medium text-sm">{group.company}</div>
                          <div className="flex items-center gap-1 text-white/40 text-xs mt-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {group.location}
                          </div>
                        </div>
                        <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono flex-shrink-0">
                          <span className="text-white/50">{group.entries[0].period}</span>
                          <span className="text-indigo-400/80"> ({periodDuration(group.entries[0].period)})</span>
                        </span>
                      </div>
                      <p className="text-sm text-white/60 leading-relaxed mb-4">{group.entries[0].description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {group.entries[0].technologies.map((tech) => (
                          <span key={tech} className="px-2 py-0.5 text-xs font-mono bg-indigo-500/8 text-indigo-300/80 border border-indigo-500/15 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    /* ── Grouped multi-role card ── */
                    <motion.div
                      whileHover={{ y: -3 }}
                      className="glass-card border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 overflow-hidden"
                    >
                      {/* Company header */}
                      <div className="px-5 py-4 bg-indigo-500/5 flex items-center justify-between">
                        <div>
                          <div className="text-white font-semibold text-base">{group.company}</div>
                          <div className="flex items-center gap-1 text-white/40 text-xs mt-0.5">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {group.location}
                          </div>
                        </div>
                        <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono flex-shrink-0">
                          <span className="text-white/50">{group.entries[group.entries.length - 1].period.split(' – ')[0]} – {group.entries[0].period.split(' – ')[1]}</span>
                          <span className="text-indigo-400/80"> ({groupDuration(group.entries)})</span>
                        </span>
                      </div>

                      {/* Roles */}
                      <div className="px-5 pt-5 pb-3">
                        {group.entries.map((exp, ri) => (
                          <div key={exp.id} className="relative flex gap-5">
                            <div className="flex flex-col items-center flex-shrink-0 w-4">
                              <div className="w-3.5 h-3.5 rounded-full border-2 border-indigo-400 bg-[#0d1117] mt-1.5 z-10 flex-shrink-0" />
                              {ri < group.entries.length - 1 && (
                                <div className="w-px flex-1 bg-indigo-500/30 mt-1 mb-1" />
                              )}
                            </div>
                            <div className={`flex-1 ${ri < group.entries.length - 1 ? 'pb-7' : 'pb-3'}`}>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 mb-2.5">
                                <h3 className="text-sm sm:text-base font-semibold text-white">{exp.role}</h3>
                                <span className="text-xs font-mono text-white/40 bg-white/5 px-2.5 py-1 rounded-lg border border-white/8 flex-shrink-0">
                                  {exp.period}
                                </span>
                              </div>
                              <p className="text-sm text-white/55 leading-relaxed mb-3">{exp.description}</p>
                              <div className="flex flex-wrap gap-1.5">
                                {exp.technologies.map((tech) => (
                                  <span key={tech} className="px-2 py-0.5 text-xs font-mono bg-indigo-500/8 text-indigo-300/80 border border-indigo-500/15 rounded">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
