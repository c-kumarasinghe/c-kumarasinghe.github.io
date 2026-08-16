import { skillCategories } from '../data/portfolioData';
import SectionIntro from './SectionIntro';
import { Reveal } from './Reveal';

export default function Skills() {
  return (
    <section id="skills" className="on-dark px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
      <div className="shell">
        <SectionIntro index="02" label="Capabilities" headline="The stack, end to end." tone="dark" />

        {/* A row per category, so the groups stay separated — but each skill is
            its own hairline label rather than one run-on string, which is what
            made the old version read as a plain list. Hierarchy here is tone
            only; the accent is spent elsewhere on the page. */}
        <div className="mt-8 lg:mt-10">
          {skillCategories.map((category, i) => (
            <Reveal key={category.id} delay={i * 0.035}>
              <div className="grid md:grid-cols-12 gap-y-3 md:gap-x-8 py-4 border-t border-white/15 last:border-b">
                <h3 className="md:col-span-3 text-sm font-normal tracking-tight text-ink-900 md:pt-0.5">
                  {category.label}
                </h3>
                <div className="md:col-span-9 flex flex-wrap gap-x-4 gap-y-3">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm font-light tracking-tight text-ink-700 border-b border-white/15 pb-1 transition-colors duration-300 hover:text-ink-900 hover:border-ink-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
