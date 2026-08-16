import { projects } from '../data/portfolioData';
import SectionIntro from './SectionIntro';
import { Reveal } from './Reveal';

export default function Projects() {
  /* Only some projects have a product shot, and that is unlikely to change for
     the ones under NDA. Rather than pad the gaps, the ones that have an image
     are featured and the rest stay as rows — an asymmetry by decision instead
     of by accident. Adding an `image` to any project promotes it. */
  const featured = projects.filter((p) => p.image);
  const listed = projects.filter((p) => !p.image);

  return (
    <section id="projects" className="on-dark section-pad">
      <div className="shell">
        <SectionIntro
          index="04"
          label="Selected work"
          headline="Systems built to scale."
          tone="dark"
        />

        {featured.map((project) => (
          <Reveal key={project.id} className="mt-12 lg:mt-16">
            <article className="grid lg:grid-cols-12 gap-y-8 lg:gap-x-12 items-center">
              <div className="lg:col-span-5 lg:order-2">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[0.688rem] text-accent">Featured</span>
                  <span className="font-mono text-[0.688rem] text-ink-500">{project.year}</span>
                </div>
                <h3 className="mt-4 text-3xl sm:text-4xl font-light tracking-tight text-ink-900">
                  {project.name}
                </h3>
                <p className="mt-4 text-base font-light leading-relaxed text-ink-600 max-w-md">
                  {project.description}
                </p>

                <div className="mt-6">
                  {project.highlights.slice(0, 3).map((h) => (
                    <div
                      key={h}
                      className="flex items-baseline gap-3 py-1.5 text-sm font-light text-ink-700"
                    >
                      <span className="w-1 h-1 rounded-full bg-ink-500 flex-shrink-0" />
                      {h}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                  {project.techStack.slice(0, 6).map((t) => (
                    <span key={t} className="text-sm font-light tracking-tight text-ink-500">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* The shot already carries its own browser chrome, so it needs a
                  frame around it rather than one drawn on top. */}
              <div className="lg:col-span-7 lg:order-1">
                <div className="overflow-hidden rounded-lg ring-1 ring-white/10 bg-paper-300">
                  <img
                    src={project.image}
                    alt={`${project.name} dashboard`}
                    className="w-full h-auto block"
                    loading="lazy"
                    width={1800}
                    height={857}
                  />
                </div>
              </div>
            </article>
          </Reveal>
        ))}

        <div className="mt-14 lg:mt-20">
          {listed.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.03}>
              <article className="grid md:grid-cols-12 gap-y-5 md:gap-x-8 py-8 lg:py-10 border-t border-white/15 last:border-b">
                <div className="md:col-span-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.688rem] text-ink-500">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-light tracking-tight text-ink-900">
                      {project.name}
                    </h3>
                    <span className="font-mono text-[0.688rem] text-ink-500">{project.year}</span>
                  </div>
                  <p className="mt-3 md:ml-8 text-sm font-light leading-relaxed text-ink-500 max-w-sm">
                    {project.description}
                  </p>
                </div>

                <div className="md:col-span-6 md:col-start-7">
                  {project.highlights.slice(0, 2).map((h) => (
                    <div
                      key={h}
                      className="flex items-baseline gap-3 py-1.5 text-sm font-light text-ink-700"
                    >
                      <span className="w-1 h-1 rounded-full bg-ink-500 flex-shrink-0" />
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
