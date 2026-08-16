import { projects } from '../data/portfolioData';
import SectionIntro from './SectionIntro';
import { Reveal } from './Reveal';
import ProjectCover from './ProjectCover';

export default function Projects() {
  /* Two to a row, every card the same shape. The cover is a real product shot
     where one exists and a seeded abstract otherwise — both cropped to the
     same 16:9 frame so the grid holds a line across the row. */
  return (
    <section id="projects" className="on-dark section-pad">
      <div className="shell">
        <SectionIntro
          index="04"
          label="Selected work"
          headline="Systems built to scale."
          tone="dark"
        />

        <div className="mt-10 lg:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-7 gap-y-10 lg:gap-y-12">
          {projects.map((project, i) => (
            <Reveal key={project.id} className="h-full" delay={(i % 3) * 0.06}>
              {/* Full height + an auto margin on the stack line pins the last
                  row of every card in a row to the same baseline, so the grid
                  keeps a horizontal read despite uneven copy. */}
              <article className="group h-full flex flex-col">
                <div className="aspect-[16/9] overflow-hidden rounded-lg ring-1 ring-white/10 bg-paper-300 transition-shadow duration-500 group-hover:ring-white/20">
                  {/* Pushing in slightly on hover reads as looking closer at
                      the schematic, which is all there is to look at here. */}
                  <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`${project.name} interface`}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                        width={1800}
                        height={857}
                      />
                    ) : (
                      <ProjectCover id={project.id} />
                    )}
                  </div>
                </div>

                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-mono text-[0.688rem] text-ink-500 transition-colors duration-300 group-hover:text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg sm:text-xl font-light tracking-tight text-ink-900">
                    {project.name}
                  </h3>
                  <span className="ml-auto font-mono text-[0.688rem] text-ink-500">
                    {project.year}
                  </span>
                </div>

                {/* Three lines of room, so the bullets below start level
                    across a row whether the copy runs to two lines or three. */}
                <p className="mt-2 sm:min-h-[4.3rem] text-sm font-light leading-relaxed text-ink-600">
                  {project.description}
                </p>

                <div className="mt-3">
                  {project.highlights.slice(0, 2).map((h) => (
                    <div
                      key={h}
                      className="flex items-baseline gap-2.5 py-1 text-sm font-light text-ink-700"
                    >
                      <span className="w-1 h-1 rounded-full bg-ink-500 flex-shrink-0" />
                      {h}
                    </div>
                  ))}
                </div>

                <p className="mt-auto pt-3 font-mono text-[0.688rem] leading-relaxed text-ink-400">
                  {project.techStack.slice(0, 4).join('  ·  ')}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
