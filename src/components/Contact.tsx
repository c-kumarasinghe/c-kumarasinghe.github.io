import { personalInfo } from '../data/portfolioData';
import { SplitText, Reveal } from './Reveal';

/** Where to find me, once the ask has been made. */
const details = [
  { label: 'Based', value: `${personalInfo.location} · GMT+4` },
  { label: 'LinkedIn', value: '/in/chathurangak', href: personalInfo.linkedin },
  { label: 'GitHub', value: '@c-kumarasinghe', href: personalInfo.github },
];

export default function Contact() {
  return (
    /* Closes the page as a dark block. Projects is also `on-dark` and sits
       directly above, so this carries its own top hairline and a deeper ground
       to read as a separate panel rather than a continuation of that list. */
    <section id="contact" className="on-dark contact-close section-pad">
      <div className="shell">
        <Reveal>
          <div className="flex items-baseline gap-4 mb-9">
            <span className="font-mono text-[0.688rem] text-ink-500">(05)</span>
            <span className="label">Contact</span>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-y-12 lg:gap-x-12 items-end">
          {/* The ask */}
          <div className="lg:col-span-7">
            <h2 className="text-section font-extralight text-ink-900">
              <SplitText text="Let’s build something that lasts." />
            </h2>

            <Reveal delay={0.1}>
              <p className="mt-7 max-w-md text-base font-light leading-relaxed text-ink-500">
                Open to lead engineering roles, consulting and technical partnerships. Email
                reaches me fastest.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href={`mailto:${personalInfo.email}`} className="btn-solid">
                  Email me
                  <span aria-hidden className="text-xs">
                    &#8599;
                  </span>
                </a>
                <a href={`tel:${personalInfo.phone}`} className="btn-ghost">
                  Call {personalInfo.phoneDisplay}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Where I am, quietly */}
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
            {details.map((d) => {
              const value = d.href ? (
                <a
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-wipe text-ink-800 hover:text-ink-900 transition-colors duration-300"
                >
                  {d.value}
                </a>
              ) : (
                <span className="text-ink-700">{d.value}</span>
              );

              return (
                <div
                  key={d.label}
                  className="grid grid-cols-[5.5rem_1fr] items-baseline gap-x-4 py-4 border-t border-white/15 last:border-b"
                >
                  <span className="label">{d.label}</span>
                  <span className="min-w-0 break-words text-sm font-light">{value}</span>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
