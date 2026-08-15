import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Work' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = [...navLinks.map((l) => l.href.slice(1)), 'contact'];
      for (const id of ids.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* Until the bar picks up its paper background it is sitting transparent on
     top of the dark hero, so everything in it has to invert. Once scrolled the
     bar is opaque paper again and the normal ink treatment applies. */
  const overHero = !scrolled;

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? 'bg-paper-200/85 backdrop-blur-md border-b border-paper-400' : 'bg-transparent'
        }`}
      >
        <div className="shell">
          <div className="flex items-center justify-between h-20">
            {/* Monogram */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 group"
            >
              <span
                className={`flex items-center justify-center w-9 h-9 rounded-full border text-xs font-medium tracking-tight transition-colors duration-300 ${
                  overHero
                    ? 'border-paper-100/30 text-paper-100 group-hover:bg-paper-100 group-hover:text-ink-900'
                    : 'border-ink-900/25 text-ink-900 group-hover:bg-ink-900 group-hover:text-paper-100'
                }`}
              >
                CK
              </span>
              <span
                className={`hidden sm:block text-sm font-medium tracking-tight transition-colors duration-300 ${
                  overHero ? 'text-paper-100' : 'text-ink-900'
                }`}
              >
                Chathuranga Kumarasinghe
              </span>
            </a>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-9">
              {navLinks.map((link) => {
                const active = activeSection === link.href.slice(1);
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative text-sm transition-colors duration-300 ${
                      active
                        ? overHero
                          ? 'text-paper-50'
                          : 'text-ink-900'
                        : overHero
                          ? 'text-paper-500 hover:text-paper-50'
                          : 'text-ink-500 hover:text-ink-900'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="navDot"
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavClick('#contact')}
                className={`hidden md:inline-flex items-center gap-1.5 text-sm link-wipe transition-colors duration-300 ${
                  overHero ? 'text-paper-100' : 'text-ink-900'
                }`}
              >
                Get in touch
                <span aria-hidden className="text-xs">&#8599;</span>
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                  className={`block w-5 h-px origin-center ${overHero ? 'bg-paper-100' : 'bg-ink-900'}`}
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                  className={`block w-5 h-px origin-center ${overHero ? 'bg-paper-100' : 'bg-ink-900'}`}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-20 left-0 right-0 z-40 md:hidden bg-paper-200 border-b border-paper-400"
          >
            <div className="shell py-4">
              {[...navLinks, { href: '#contact', label: 'Contact' }].map((link, i) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full flex items-baseline gap-4 py-4 text-left border-b border-paper-300 last:border-0"
                >
                  <span className="font-mono text-[0.688rem] text-ink-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xl font-light tracking-tight text-ink-900">{link.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
