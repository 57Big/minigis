import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="relative grid h-full place-items-center overflow-hidden p-6">
      {/* Animated blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="blob -left-20 top-10 h-72 w-72 bg-brand-300/40 dark:bg-brand-500/20" />
        <div className="blob right-0 bottom-10 h-72 w-72 bg-accent-300/40 animation-delay-2000 dark:bg-accent-500/20" />
      </div>

      <div className="relative animate-fade-in-up text-center">
        <div className="relative inline-block">
          <span className="absolute inset-0 -z-10 animate-pulse-ring rounded-full bg-brand-400/40 blur-2xl" />
          <div className="text-8xl animate-float">🧭</div>
        </div>
        <div className="mt-6 font-display text-7xl font-extrabold tracking-tighter">
          <span className="text-gradient">404</span>
        </div>
        <h1 className="mt-2 font-display text-2xl font-bold text-ink-800 dark:text-slate-100 sm:text-3xl">
          Sahifa topilmadi
        </h1>
        <p className="mt-2 max-w-md text-ink-600 dark:text-slate-400">
          Bunday manzil mavjud emas. Bosh sahifaga qaytib, xaritani sinab ko‘ring.
        </p>
        <Link to="/" className="btn-primary mt-7">
          Bosh sahifaga qaytish
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
