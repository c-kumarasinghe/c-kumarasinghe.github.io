import { personalInfo } from '../data/portfolioData';
import { SplitText, Reveal } from './Reveal';

const socials = [
  { label: 'LinkedIn', href: personalInfo.linkedin },
  { label: 'GitHub', href: personalInfo.github },
];

export default function Contact() {
  return (
    <section id="contact" className="section-pad">
      <div className="shell">
        <Reveal>
          <div className="flex items-baseline gap-4 mb-8">
            <span className="font-mono text-[0.688rem] text-accent">(05)</span>
            <span className="label">Contact</span>
          </div>
        </Reveal>

        {/* Headline and details sit side by side on one baseline — keeps the section short */}
        <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-12 items-end border-t border-paper-400 pt-10">
          <h2 className="lg:col-span-6 text-section font-extralight text-ink-900">
            <SplitText text="Let’s build something that lasts." />
          </h2>

          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            {/* Primary — email */}
            <div>
              <a
                href={`mailto:${personalInfo.email}`}
                className="group inline-flex items-baseline gap-3 max-w-full"
              >
                <span className="text-xl sm:text-2xl font-light tracking-tight text-ink-900 break-all border-b border-paper-500 group-hover:border-ink-900 transition-colors duration-500">
                  {personalInfo.email}
                </span>
                <span
                  aria-hidden
                  className="flex-shrink-0 text-sm text-ink-400 transition-all duration-300 group-hover:text-ink-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  &#8599;
                </span>
              </a>
            </div>

            {/* Secondary — phone, a step down from the email */}
            <div className="mt-4">
              <a
                href={`tel:${personalInfo.phone}`}
                className="group inline-flex items-baseline gap-3"
              >
                <span className="text-base sm:text-lg font-light tracking-tight text-ink-700 border-b border-transparent group-hover:border-ink-900 group-hover:text-ink-900 transition-colors duration-300">
                  {personalInfo.phoneDisplay}
                </span>
                <span
                  aria-hidden
                  className="flex-shrink-0 text-xs text-ink-400 transition-all duration-300 group-hover:text-ink-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  &#8599;
                </span>
              </a>
            </div>

            {/* Tertiary — social */}
            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label link-wipe hover:text-ink-900 transition-colors duration-300"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
