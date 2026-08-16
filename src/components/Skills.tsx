import { skillCategories } from '../data/portfolioData';
import SectionIntro from './SectionIntro';
import { Reveal } from './Reveal';

export default function Skills() {
  return (
    <section id="skills" className="on-dark px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
      <div className="shell">
        <SectionIntro index="02" label="Capabilities" headline="The stack, end to end." tone="dark" />

        {/* A row per category, so the groups stay separated — but each skill is
            its own element rather than one run-on string. Hierarchy is tone
            only — no accent, no rules, no caps — so the row separators are the
            single structural device left. */}
        <div className="mt-8 lg:mt-10">
          {skillCategories.map((category, i) => (
            <Reveal key={category.id} delay={i * 0.035}>
              <div className="grid md:grid-cols-12 gap-y-2 md:gap-x-8 py-3.5 border-t border-white/15 last:border-b">
                <h3 className="md:col-span-3 text-sm font-normal tracking-tight text-ink-900 md:pt-0.5">
                  {category.label}
                </h3>
                <div className="md:col-span-9 flex flex-wrap gap-x-5 gap-y-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm font-light tracking-tight text-ink-700 transition-colors duration-300 hover:text-ink-900"
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
