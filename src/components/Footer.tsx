import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pb-10">
      <div className="shell">
        <div className="border-t border-paper-400 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="label">
            &copy; {year} {personalInfo.name}
          </div>

          <div className="flex items-center gap-8">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="label hover:text-ink-900 transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="label hover:text-ink-900 transition-colors duration-300"
            >
              GitHub
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="label hover:text-ink-900 transition-colors duration-300"
            >
              Email
            </a>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="label flex items-center gap-2 hover:text-ink-900 transition-colors duration-300"
          >
            Back to top
            <span aria-hidden>&uarr;</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
