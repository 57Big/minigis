import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Bosh sahifa' },
  { to: '/map', label: 'Xarita' },
  { to: '/history', label: 'Tarix' },
  { to: '/about', label: 'Loyiha haqida' },
];

const resources = [
  { label: 'OpenStreetMap', href: 'https://www.openstreetmap.org' },
  { label: 'Esri World Imagery', href: 'https://www.arcgis.com' },
  { label: 'OpenTopoMap', href: 'https://opentopomap.org' },
  { label: 'Nominatim API', href: 'https://nominatim.org' },
  { label: 'OpenAI Platform', href: 'https://platform.openai.com' },
];

const stack = ['React', 'Vite', 'Tailwind', 'Leaflet', 'Node.js', 'Express', 'MongoDB', 'GPT-4o'];

export default function Footer() {
  const { pathname } = useLocation();
  const isMap = pathname.startsWith('/map');

  if (isMap) {
    return (
      <footer className="border-t border-gray-200/80 bg-white/80 backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-2.5 text-xs text-ink-600 dark:text-slate-400 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>miniGIS · AI-powered GIS · {new Date().getFullYear()}</span>
          </div>
          <div className="text-[11px]">OSM · Esri · Nominatim · OpenAI</div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative overflow-hidden border-t border-gray-200/60 bg-white dark:border-slate-800 dark:bg-slate-950">
      {/* Animated background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="blob -left-20 top-10 h-72 w-72 bg-brand-200/50 dark:bg-brand-500/15" />
        <div className="blob right-0 top-20 h-72 w-72 bg-accent-200/40 animation-delay-2000 dark:bg-accent-500/15" />
        <div className="blob bottom-0 left-1/3 h-72 w-72 bg-sky-200/40 animation-delay-1000 dark:bg-sky-500/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="group flex items-center gap-2.5">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-500 via-brand-600 to-accent-600 text-white shadow-glow transition-transform duration-500 group-hover:rotate-[8deg]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M12 2c-4.4 0-8 3.6-8 8 0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" />
                </svg>
              </div>
              <div className="leading-tight">
                <div className="font-display text-base font-bold text-ink-800 dark:text-slate-100">
                  mini<span className="text-gradient-static">GIS</span>
                </div>
                <div className="-mt-0.5 text-[11px] text-ink-600 dark:text-slate-400">
                  AI-powered GIS platform
                </div>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-600 dark:text-slate-400">
              Interaktiv xarita, sun’iy yo‘ldosh tasvirlari va GPT asosidagi joy
              tahlilini birlashtirgan ochiq kodli geoaxborot platformasi.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 flex max-w-sm gap-2"
            >
              <input
                type="email"
                placeholder="Email manzilingiz"
                className="input"
                aria-label="Email"
              />
              <button type="submit" className="btn-primary shrink-0">
                Obuna
              </button>
            </form>

            <div className="mt-5 flex items-center gap-2">
              <SocialLink href="https://github.com" label="GitHub">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 .5z" />
                </svg>
              </SocialLink>
              <SocialLink href="https://twitter.com" label="X / Twitter">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M18.244 2H21l-6.52 7.45L22 22h-6.84l-4.78-6.26L4.8 22H2l7-8L1.5 2h6.96l4.32 5.71L18.244 2zm-2.4 18h1.7L7.24 4h-1.8l10.4 16z" />
                </svg>
              </SocialLink>
              <SocialLink href="https://t.me" label="Telegram">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M9.5 15.6l-.4 4c.5 0 .8-.2 1.1-.5l2.6-2.4 5.5 4c1 .5 1.7.3 2-1l3.6-16.8c.3-1.5-.5-2-1.6-1.7L1.6 8.7c-1.4.6-1.4 1.4-.3 1.7l5.5 1.7L19.6 4c.6-.4 1.2-.2.7.3L10 13.5z" />
                </svg>
              </SocialLink>
              <SocialLink href="mailto:hello@minigis.dev" label="Email">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 7 9-7" />
                </svg>
              </SocialLink>
            </div>
          </div>

          {/* Navigatsiya */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-500 dark:text-slate-400">
              Navigatsiya
            </h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group inline-flex items-center gap-1.5 text-sm text-ink-700 transition-all duration-200 hover:translate-x-0.5 hover:text-brand-700 dark:text-slate-300 dark:hover:text-brand-300"
                  >
                    <span className="h-px w-0 bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-300 group-hover:w-3" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resurslar */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-500 dark:text-slate-400">
              Resurslar
            </h4>
            <ul className="mt-4 space-y-2.5">
              {resources.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm text-ink-700 transition-all duration-200 hover:translate-x-0.5 hover:text-brand-700 dark:text-slate-300 dark:hover:text-brand-300"
                  >
                    {r.label}
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3 w-3 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack + status */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-500 dark:text-slate-400">
              Texnologiyalar
            </h4>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {stack.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-gray-200 bg-white/60 px-2 py-1 text-[11px] font-semibold text-ink-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:border-brand-500/50 dark:hover:text-brand-300"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-200/60 bg-emerald-50/80 px-3 py-2 backdrop-blur-sm dark:border-emerald-500/20 dark:bg-emerald-500/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                Barcha tizimlar ishlayapti
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-6 text-xs text-ink-500 dark:border-slate-800 dark:text-slate-400 sm:flex-row">
          <div>
            © {new Date().getFullYear()} miniGIS · BMI loyihasi · Barcha huquqlar
            himoyalangan
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-brand-700 dark:hover:text-brand-300">
              Maxfiylik
            </a>
            <a href="#" className="transition-colors hover:text-brand-700 dark:hover:text-brand-300">
              Foydalanish shartlari
            </a>
            <span className="font-mono">v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="group relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-gray-200/80 bg-white/80 text-ink-700 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-400 hover:text-brand-700 hover:shadow-glow dark:border-slate-700/80 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:border-brand-500/50 dark:hover:text-brand-300"
    >
      <span className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-500/0 to-accent-500/0 transition-all duration-500 group-hover:from-brand-500/15 group-hover:to-accent-500/15" />
      {children}
    </a>
  );
}
