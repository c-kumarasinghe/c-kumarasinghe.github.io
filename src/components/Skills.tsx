import { Fragment } from 'react';
import { skillCategories } from '../data/portfolioData';
import SectionIntro from './SectionIntro';
import { Reveal } from './Reveal';

export default function Skills() {
  return (
    <section id="skills" className="on-dark px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
      <div className="shell">
        <SectionIntro index="02" label="Capabilities" headline="The stack, end to end." tone="dark" />

        {/* One continuous field rather than a row per category. Seven labelled
            rows was the traditional part, and most of the height: the category
            now leads its own group inline and the whole stack reads as one
            block. */}
        <Reveal className="mt-8 lg:mt-10">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-3.5 max-w-5xl">
            {skillCategories.map((cat, ci) => (
              <Fragment key={cat.id}>
                {ci > 0 && (
                  <span aria-hidden className="w-1 h-1 rounded-full bg-accent/60 mx-1.5 self-center" />
                )}
                <span className="font-mono text-[0.688rem] uppercase tracking-[0.14em] text-accent mr-0.5">
                  {cat.label}
                </span>
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[0.688rem] uppercase tracking-[0.1em] text-ink-700 border-b border-white/15 pb-1 transition-colors duration-300 hover:text-ink-900 hover:border-accent"
                  >
                    {skill}
                  </span>
                ))}
              </Fragment>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
