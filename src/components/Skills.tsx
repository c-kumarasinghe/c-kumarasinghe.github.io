import { skillCategories } from '../data/portfolioData';
import SectionIntro from './SectionIntro';
import { Reveal } from './Reveal';

export default function Skills() {
  return (
    <section id="skills" className="on-dark px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
      <div className="shell">
        <SectionIntro index="02" label="Capabilities" headline="The stack, end to end." tone="dark" />

        <div className="mt-10 lg:mt-12">
          {skillCategories.map((category, i) => (
            <Reveal key={category.id} delay={i * 0.04}>
              <div className="grid md:grid-cols-12 gap-y-1.5 md:gap-x-8 py-[1.15rem] border-t border-white/15 last:border-b">
                <h3 className="md:col-span-4 text-lg font-light tracking-tight text-paper-100">
                  {category.label}
                </h3>
                <p className="md:col-span-8 text-sm sm:text-base font-light leading-relaxed text-paper-500">
                  {category.skills.join('  ·  ')}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
