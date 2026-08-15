import { SplitText, Reveal } from './Reveal';

/** Shared editorial section opener: index label + masked headline. */
export default function SectionIntro({
  index,
  label,
  headline,
  tone = 'light',
  className = '',
}: {
  index: string;
  label: string;
  headline: string;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const dark = tone === 'dark';

  return (
    <div className={className}>
      <Reveal>
        <div className="flex items-baseline gap-4">
          <span className={`font-mono text-[0.688rem] ${dark ? 'text-paper-500' : 'text-accent'}`}>
            ({index})
          </span>
          <span className="label">{label}</span>
        </div>
      </Reveal>
      <h2
        className={`text-section font-extralight mt-6 max-w-3xl ${
          dark ? 'text-paper-100' : 'text-ink-900'
        }`}
      >
        <SplitText text={headline} />
      </h2>
    </div>
  );
}
