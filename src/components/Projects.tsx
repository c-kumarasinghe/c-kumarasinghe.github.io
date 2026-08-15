import { projects } from '../data/portfolioData';
import SectionIntro from './SectionIntro';
import { Reveal, ScrollHighlight } from './Reveal';

export default function Projects() {
  return (
    <section id="projects" className="on-dark section-pad">
      <div className="shell">
        <SectionIntro
          index="04"
          label="Selected work"
          headline="Systems built to scale."
          tone="dark"
        />

        <div className="mt-12 lg:mt-16">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.03}>
              <article className="grid md:grid-cols-12 gap-y-5 md:gap-x-8 py-8 lg:py-10 border-t border-white/15 last:border-b">
                {/* Title */}
                <div className="md:col-span-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.688rem] text-paper-500">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-light tracking-tight text-paper-100">
                      {project.name}
                    </h3>
                    <span className="font-mono text-[0.688rem] text-paper-500">{project.year}</span>
                  </div>
                  <p className="mt-3 md:ml-8 text-sm font-light leading-relaxed text-paper-500 max-w-sm">
                    {/* Higher floor than on paper — pale text on ink disappears below ~0.3 */}
                    <ScrollHighlight text={project.description} dim={0.35} />
                  </p>
                </div>

                {/* Two strongest outcomes only */}
                <div className="md:col-span-6 md:col-start-7">
                  {project.highlights.slice(0, 2).map((h) => (
                    <div
                      key={h}
                      className="flex items-baseline gap-3 py-1.5 text-sm font-light text-paper-300"
                    >
                      <span className="w-1 h-1 rounded-full bg-paper-500 flex-shrink-0" />
                      {h}
                    </div>
                  ))}
                  <p className="mt-3 font-mono text-[0.688rem] leading-relaxed text-ink-400">
                    {project.techStack.slice(0, 5).join('  ·  ')}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
