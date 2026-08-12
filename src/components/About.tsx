import { personalInfo, stats, education, certifications } from '../data/portfolioData';
import SectionIntro from './SectionIntro';
import { Reveal, CountUp } from './Reveal';

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="shell">
        <SectionIntro index="01" label="About" headline="Architecting systems. Leading delivery." />

        <div className="mt-10 lg:mt-12 grid lg:grid-cols-12 gap-y-10 lg:gap-x-12">
          {/* Bio */}
          <Reveal className="lg:col-span-6">
            <p className="text-lg sm:text-xl font-light leading-relaxed text-ink-800">
              {personalInfo.bio}
            </p>
            <p className="mt-5 text-base font-light leading-relaxed text-ink-600">
              Currently leading backend engineering at{' '}
              <span className="text-ink-900">SoftBuilders</span> in Dubai &mdash; designing
              microservice architecture, mentoring engineers and setting standards that scale.
            </p>
            <p className="mt-5 text-base font-light leading-relaxed text-ink-600">
              Recent work centres on{' '}
              <span className="text-ink-900">AI-powered products</span> &mdash; LLM integrations,
              RAG pipelines and conversational assistants built into real production systems.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-900">
              <span>{personalInfo.title}</span>
              <span className="w-10 h-px bg-ink-400" aria-hidden />
              <span>{personalInfo.location}</span>
            </div>
          </Reveal>

          {/* Education, then certifications kept deliberately quiet beneath it */}
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <div className="label mb-4">Education</div>
            {education.map((edu) => (
              <div
                key={edu.degree}
                className="flex items-start gap-4 py-4 border-t border-paper-400 last:border-b"
              >
                {edu.logo && (
                  <img
                    src={edu.logo}
                    alt={edu.institution}
                    className="w-10 h-10 object-contain flex-shrink-0 mt-0.5"
                  />
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
          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-paper-400">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="py-6 pr-6 border-b lg:border-b-0 border-paper-400 lg:border-r last:border-r-0"
              >
                <CountUp
                  value={stat.value}
                  className="block text-3xl sm:text-4xl font-extralight tracking-tight text-ink-900"
                />
                <div className="label mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
