import { personalInfo, stats, education, certifications } from '../data/portfolioData';
import SectionIntro from './SectionIntro';
import { Reveal, CountUp } from './Reveal';

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="shell">
        <SectionIntro index="01" label="About" headline="Architecting systems. Driving innovation." />

        <div className="mt-10 lg:mt-12 grid lg:grid-cols-12 gap-y-10 lg:gap-x-12">
          {/* Bio */}
          <Reveal className="lg:col-span-6">
            <p className="text-lg sm:text-xl font-light leading-relaxed text-ink-800">
              {personalInfo.bio}
            </p>
            <p className="mt-5 text-base font-light leading-relaxed text-ink-600">
              Currently leading backend engineering at{' '}
              <span className="text-ink-900">SoftBuilders</span> &mdash; designing microservice
              architecture, mentoring engineers and setting standards that scale.
            </p>
            <p className="mt-5 text-base font-light leading-relaxed text-ink-600">
              Recent work centres on{' '}
              <span className="text-ink-900">AI-powered products</span> &mdash; LLM integrations,
              RAG pipelines and conversational assistants built into real production systems.
            </p>
            <div className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-ink-900">
              {personalInfo.title}
            </div>
          </Reveal>

          {/* Education, then certifications kept deliberately quiet beneath it.
              Pulled up on wide screens only — it reclaims some of the empty
              space beside the headline without top-aligning to it. */}
          <Reveal className="lg:col-span-5 lg:col-start-8 lg:-mt-8" delay={0.1}>
            <div className="label mb-4">Education</div>
            {education.map((edu) => (
              <div
                key={edu.degree}
                className="flex items-start gap-4 py-4 border-t border-paper-400 last:border-b"
              >
                {edu.logo && (
                  /* University marks are third-party artwork drawn for white
                     stationery — navy and crimson on transparent — so they go
                     muddy straight onto the dark ground. They get their own
                     light plate instead. The colour is a literal rather than a
                     token: it must stay light whatever the page theme does. */
                  <span className="flex-shrink-0 mt-0.5 w-11 h-11 rounded-md bg-[#F4F3F0] flex items-center justify-center p-1.5 ring-1 ring-white/10">
                    <img
                      src={edu.logo}
                      alt={edu.institution}
                      className="max-w-full max-h-full object-contain"
                    />
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="text-base font-normal leading-snug text-ink-900">
                    {edu.degree}
                  </div>
                  <div className="text-sm font-light text-ink-700 mt-1.5">
                    {edu.institution}, {edu.countryShort ?? edu.country} &middot; {edu.year}
                  </div>
                </div>
              </div>
            ))}

            <div className="label mt-7 mb-3">Certifications</div>
            {certifications.map((cert) => (
              <div key={cert.title} className="py-3.5 border-t border-paper-400 last:border-b">
                <div className="text-sm font-light leading-snug text-ink-700">{cert.title}</div>
                <div className="label mt-1">
                  {cert.issuer} &middot; {cert.year}
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Stat band */}
        <Reveal className="mt-12 lg:mt-14">
          <div className="grid grid-cols-2 lg:grid-cols-5 border-t border-paper-400">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                /* Only cells that follow a divider get the left inset: every
                   second cell in the 2-up mobile grid, everything but the
                   first in the 4-up desktop one. */
                className={`py-7 pr-6 border-b lg:border-b-0 border-paper-400 lg:border-r last:border-r-0 ${
                  i % 2 === 1 ? 'pl-6' : ''
                } ${i === 0 ? 'lg:pl-0' : 'lg:pl-8'}`}
              >
                <CountUp
                  value={stat.value}
                  className="block text-3xl sm:text-4xl font-extralight tracking-tight text-ink-900"
                />
                <div className="label mt-2.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
