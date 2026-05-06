import { NavLink, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useTheme from '../hooks/useTheme.js';

const links = [
  { to: '/', label: 'Bosh sahifa', end: true },
  { to: '/map', label: 'Xarita' },
  { to: '/history', label: 'Tarix' },
  { to: '/about', label: 'Loyiha haqida' },
];

function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Mavzuni almashtirish"
      title={isDark ? 'Yorug‘ rejim' : 'Tungi rejim'}
      className="group relative ml-1 grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-gray-200/80 bg-white/80 text-ink-700 backdrop-blur-md transition-all duration-300 hover:border-brand-300 hover:shadow-glow dark:border-slate-700/80 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:border-brand-500/50"
    >
      <span className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-500/0 to-accent-500/0 transition-all duration-500 group-hover:from-brand-500/15 group-hover:to-accent-500/15" />
      <span className="relative block h-4 w-4">
        <svg
          viewBox="0 0 24 24"
          className={`absolute inset-0 h-4 w-4 transition-all duration-500 ${
            isDark ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
          }`}
          fill="currentColor"
        >
          <path
            d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="4" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className={`absolute inset-0 h-4 w-4 transition-all duration-500 ${
            isDark ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
          }`}
          fill="currentColor"
        >
          <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
        </svg>
      </span>
    </button>
  );
}

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <div className="relative">
        <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-brand-400 to-accent-500 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-70" />
        <div className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-500 via-brand-600 to-accent-600 text-white shadow-glow transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <svg viewBox="0 0 24 24" className="relative h-5 w-5" fill="currentColor">
            <path d="M12 2c-4.4 0-8 3.6-8 8 0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" />
          </svg>
        </div>
      </div>
      <div className="leading-tight">
        <div className="font-display text-base font-bold tracking-tight text-ink-800 dark:text-slate-100">
          mini<span className="text-gradient-static">GIS</span>
        </div>
        <div className="-mt-0.5 text-[10.5px] font-medium tracking-wide text-ink-500 dark:text-slate-400">
          AI-powered GIS platform
        </div>
      </div>
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        scrolled
          ? 'border-b border-gray-200/80 bg-white/75 shadow-card backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-950/75'
          : 'border-b border-transparent bg-white/40 backdrop-blur-md dark:bg-slate-950/40'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `group relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'text-brand-700 dark:text-brand-300'
                    : 'text-ink-700 hover:text-brand-700 dark:text-slate-200 dark:hover:text-brand-300'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10">{l.label}</span>
                  <span
                    className={`absolute inset-0 -z-0 rounded-lg bg-gradient-to-r from-brand-50 to-accent-50/60 transition-opacity duration-300 dark:from-brand-500/15 dark:to-accent-500/10 ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                    }`}
                  />
                  <span
                    className={`absolute -bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-300 ${
                      isActive ? 'w-6' : 'w-0 group-hover:w-4'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
          <Link to="/map" className="btn-primary ml-2">
            <span>Xaritani ochish</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-gray-200/80 bg-white/80 text-ink-700 backdrop-blur-md transition-all hover:border-brand-300 dark:border-slate-700/80 dark:bg-slate-800/70 dark:text-slate-200"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menyu"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 transition-transform duration-300"
              style={{ transform: open ? 'rotate(90deg)' : 'rotate(0)' }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`grid overflow-hidden border-gray-200 bg-white/95 backdrop-blur-xl transition-all duration-300 ease-smooth dark:border-slate-700 dark:bg-slate-950/95 md:hidden ${
          open ? 'grid-rows-[1fr] border-t' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-1 p-3">
            {links.map((l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${i * 60}ms` }}
                className={({ isActive }) =>
                  `${open ? 'animate-fade-in-up' : ''} rounded-lg px-3.5 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-50 to-accent-50/50 text-brand-700 dark:from-brand-500/15 dark:to-accent-500/10 dark:text-brand-300'
                      : 'text-ink-700 hover:bg-gray-50 dark:text-slate-200 dark:hover:bg-slate-800'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/map"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              Xaritani ochish
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
