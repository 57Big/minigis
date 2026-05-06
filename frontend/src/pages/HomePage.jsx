import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal.js';

const features = [
  {
    icon: '🛰️',
    title: 'Sun’iy yo‘ldosh va Terrain',
    desc: 'OSM, Esri Satellite va OpenTopoMap layerlari — bir tugma orqali almashtiring.',
    accent: 'from-sky-500/20 to-cyan-500/20',
  },
  {
    icon: '🤖',
    title: 'AI joy tahlili',
    desc: 'Tanlangan koordinata uchun GPT asosida hudud tasnifi, mamlakat, viloyat va tavsiya etilgan foydalanish.',
    accent: 'from-violet-500/20 to-fuchsia-500/20',
  },
  {
    icon: '🔎',
    title: 'Aqlli qidiruv',
    desc: 'Nominatim API orqali joy nomi bo‘yicha tezkor qidirish va xarita uchish animatsiyasi.',
    accent: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    icon: '📍',
    title: 'Reverse geocoding',
    desc: 'Tanlangan koordinata avtomatik joy nomi va manziliga aylantiriladi.',
    accent: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: '💾',
    title: 'Saqlash va tarix',
    desc: 'Joylar MongoDB’ga saqlanadi va Tarix sahifasida qayta ko‘rib chiqiladi.',
    accent: 'from-rose-500/20 to-pink-500/20',
  },
  {
    icon: '🌗',
    title: 'Yorug‘ va tungi rejim',
    desc: 'Professional GIS dashboard, dark/light mode va to‘liq responsiv dizayn.',
    accent: 'from-indigo-500/20 to-blue-500/20',
  },
];

const steps = [
  {
    n: '01',
    title: 'Xaritani oching',
    desc: 'Bosh sahifadan “Xaritani ochish” tugmasi orqali interaktiv Leaflet xaritasiga o‘ting.',
  },
  {
    n: '02',
    title: 'Nuqta tanlang',
    desc: 'Xarita ustida istalgan joyga bosing yoki qidiruv orqali manzil toping. Marker avtomatik qo‘yiladi.',
  },
  {
    n: '03',
    title: 'AI tahlilini oling',
    desc: 'GPT-4o tanlangan koordinatani tahlil qilib, hudud turi, davlat, viloyat va relyefni aniqlaydi.',
  },
  {
    n: '04',
    title: 'Saqlang va qayting',
    desc: 'Natijani MongoDB’ga saqlang. Tarix sahifasida har qachon qayta ko‘rib chiqing.',
  },
];

const useCases = [
  { icon: '🏙️', title: 'Urbanistika va shaharsozlik', desc: 'Yangi qurilish maydonlarini tahlil qilish, infratuzilma rejalashtirish.' },
  { icon: '🌾', title: 'Qishloq xo‘jaligi', desc: 'Yer turi, relyef va iqlim sharoitiga qarab ekin maydonlarini baholash.' },
  { icon: '🎓', title: 'Ta’lim va tadqiqot', desc: 'Talabalar va tadqiqotchilar uchun GIS, kartografiya va AI o‘rganish vositasi.' },
  { icon: '🚧', title: 'Logistika', desc: 'Yo‘l, transport va omborxonalar uchun mos joyni tezkor tahlil qilish.' },
  { icon: '🌋', title: 'Tabiiy resurslar', desc: 'Tog‘, suv havzasi va o‘rmon hududlarini sun’iy yo‘ldosh tasvirlari orqali kuzatish.' },
  { icon: '🛡️', title: 'Favqulodda vaziyatlar', desc: 'Suv toshqini, yong‘in va boshqa hodisalar zonalarini operativ baholash.' },
];

const aiCategories = [
  'Shahar markazi',
  'Turar joy',
  'Sanoat zonasi',
  'Qishloq xo‘jaligi',
  'O‘rmon',
  'Tog‘li hudud',
  'Suv havzasi',
  'Cho‘l',
  'Aeroport',
  'Transport tugun',
];

const techStack = [
  { name: 'React 18', color: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300' },
  { name: 'Vite', color: 'bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300' },
  { name: 'TailwindCSS', color: 'bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300' },
  { name: 'Leaflet', color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' },
  { name: 'Node.js', color: 'bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-300' },
  { name: 'Express', color: 'bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-200' },
  { name: 'MongoDB', color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' },
  { name: 'Mongoose', color: 'bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300' },
  { name: 'OpenAI GPT-4o', color: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300' },
  { name: 'Nominatim', color: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300' },
  { name: 'Axios', color: 'bg-purple-50 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300' },
  { name: 'OSM / Esri', color: 'bg-teal-50 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300' },
];

const faqs = [
  { q: 'miniGIS bepulmi?', a: 'Ha, miniGIS — ochiq kodli ta’lim loyihasi. Faqat OpenAI API kaliti uchun token sarfi hisobga olinadi.' },
  { q: 'AI tahlili qancha aniq?', a: 'GPT-4o modeli koordinata atrofidagi ma’lumotlar asosida 80–95% ishonch bilan hudud turini aniqlaydi. Har bir natija uchun ishonch koeffitsiyenti ko‘rsatiladi.' },
  { q: 'Qanday xarita layerlari mavjud?', a: 'OpenStreetMap, Esri World Imagery (sun’iy yo‘ldosh), OpenTopoMap (relyef) va CARTO Dark — jami 4+ layer bir tugma orqali almashtiriladi.' },
  { q: 'Ma’lumotlar qayerda saqlanadi?', a: 'Saqlangan barcha joylar MongoDB ma’lumotlar bazasida koordinata, AI tahlili va vaqt yorlig‘i bilan birga saqlanadi.' },
];

export default function HomePage() {
  return (
    <div className="h-full overflow-y-auto">
      {/* HERO */}
      <Hero />

      {/* METRICS BAR */}
      <Metrics />

      {/* FEATURES */}
      <Features />

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* USE CASES */}
      <UseCases />

      {/* AI CATEGORIES */}
      <AICategories />

      {/* TECH STACK */}
      <TechStack />

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <CTA />
    </div>
  );
}

/* ─────────────  HERO  ───────────── */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-ink-900 via-brand-900 to-ink-900 text-white">
      {/* Animated gradient blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="blob -left-32 -top-20 h-[28rem] w-[28rem] bg-brand-500/30" />
        <div className="blob right-0 -top-10 h-[26rem] w-[26rem] bg-accent-500/30 animation-delay-2000" />
        <div className="blob bottom-0 left-1/3 h-[24rem] w-[24rem] bg-sky-500/25 animation-delay-1000" />
      </div>

      {/* Grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 60% 80% at 50% 30%, black 40%, transparent 80%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="badge-gradient animate-fade-in-down border border-white/20 !bg-white/15 !text-white !ring-white/20 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              BMI · 2026 · AI-powered
            </span>

            <h1 className="mt-5 animate-fade-in-up font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              AI yordamida{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-brand-200 via-white to-accent-200 bg-clip-text text-transparent" style={{ backgroundSize: '200% 200%' }}>
                  joy tahlili
                </span>
                <svg
                  viewBox="0 0 200 12"
                  className="absolute -bottom-2 left-0 w-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 Q 50 2, 100 6 T 198 5"
                    stroke="url(#heroLine)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="heroLine">
                      <stop offset="0%" stopColor="#5a86ff" />
                      <stop offset="100%" stopColor="#e879f9" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>{' '}
              va sun’iy yo‘ldosh GIS platformasi
            </h1>

            <p className="mt-6 max-w-xl animate-fade-in-up text-base text-white/75 animation-delay-200 sm:text-lg">
              <span className="font-semibold text-white">miniGIS</span> — interaktiv
              xarita, sun’iy yo‘ldosh tasvirlari va GPT asosidagi avtomatik joy
              tahlilini birlashtirgan ochiq kodli geoaxborot platformasi. Xarita
              ustida nuqta tanlang — AI hudud turini, mamlakatni, relyefni va
              foydalanish ehtimolini aniqlaydi.
            </p>

            <div className="mt-9 flex animate-fade-in-up flex-wrap gap-3 animation-delay-300">
              <Link
                to="/map"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand-700 shadow-glow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-lg">🚀</span>
                  Xaritani ochish
                  <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-brand-200/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/20"
              >
                Loyiha haqida
              </Link>
            </div>

            <div className="mt-12 grid max-w-md animate-fade-in-up grid-cols-3 gap-3 animation-delay-500">
              <Stat value="4+" label="Xarita layer" />
              <Stat value="GPT-4" label="AI tahlil" />
              <Stat value="MongoDB" label="Saqlash" />
            </div>
          </div>

          {/* HERO MOCKUP */}
          <div className="relative animate-fade-in-up animation-delay-300">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-brand-400/40 via-accent-500/40 to-brand-600/40 opacity-70 blur-3xl" />
            <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-2xl backdrop-blur-md transition-transform duration-700 hover:-rotate-1 hover:scale-[1.02]">
              {/* Tile collage */}
              <div className="relative grid aspect-[4/3] grid-cols-2 grid-rows-2">
                {[
                  'https://tile.openstreetmap.org/6/40/24.png',
                  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/6/24/40',
                  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/6/24/41',
                  'https://tile.openstreetmap.org/6/41/24.png',
                ].map((url, i) => (
                  <div
                    key={url}
                    className="bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${url}')`, transitionDelay: `${i * 80}ms` }}
                  />
                ))}

                {/* Floating marker pin */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce-soft">
                  <div className="relative">
                    <span className="absolute inset-0 -m-2 animate-pulse-ring rounded-full bg-accent-500/60" />
                    <div className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-accent-500 to-accent-700 text-white shadow-glow-accent ring-4 ring-white/30">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                        <path d="M12 2c-4.4 0-8 3.6-8 8 0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom info bar */}
              <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-ink-900/70 p-4 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-sm font-medium">OSM + Satellite + AI</span>
                </div>
                <span className="font-mono text-xs text-white/70">41.31°N · 69.27°E</span>
              </div>

              {/* Floating tag */}
              <div className="absolute -right-3 -top-3 flex animate-float items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-brand-700 shadow-glow">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                Live AI
              </div>
              <div className="absolute -bottom-3 -left-3 animate-float-slow rounded-full bg-gradient-to-br from-accent-500 to-accent-700 px-3 py-1.5 text-xs font-bold text-white shadow-glow-accent">
                ⚡ Real-time
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave fade */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#f6f8fc] to-transparent dark:from-[#050813]" />
    </section>
  );
}

/* ─────────────  METRICS  ───────────── */
function Metrics() {
  const ref = useReveal();
  return (
    <section
      ref={ref}
      className="reveal relative border-y border-gray-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/40"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-4 sm:px-6 lg:px-8">
        {[
          { v: '10+', l: 'AI hudud turi' },
          { v: '4', l: 'Xarita layeri' },
          { v: '< 3s', l: 'O‘rtacha tahlil vaqti' },
          { v: '100%', l: 'Responsiv dizayn' },
        ].map((m, i) => (
          <div key={m.l} className="reveal text-center" style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="bg-gradient-to-br from-brand-600 via-brand-500 to-accent-600 bg-clip-text text-3xl font-extrabold text-transparent dark:from-brand-300 dark:via-brand-400 dark:to-accent-300 sm:text-4xl">
              {m.v}
            </div>
            <div className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-slate-400 sm:text-sm">
              {m.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────  FEATURES  ───────────── */
function Features() {
  const headRef = useReveal();
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div ref={headRef} className="reveal mx-auto max-w-2xl text-center">
        <span className="badge-gradient">✨ Imkoniyatlar</span>
        <h2 className="section-title mt-4 font-display">
          Asosiy <span className="text-gradient-static">imkoniyatlar</span>
        </h2>
        <p className="mt-3 text-ink-600 dark:text-slate-400">
          miniGIS zamonaviy GIS dashboard tajribasini React, Leaflet, MongoDB va
          OpenAI asosida birlashtiradi.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <FeatureCard key={f.title} f={f} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ f, delay }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal group relative overflow-hidden rounded-2xl border border-gray-100/80 bg-white/80 p-6 backdrop-blur-sm transition-all duration-500 ease-smooth hover:-translate-y-2 hover:border-brand-200 hover:shadow-glow dark:border-slate-700/80 dark:bg-slate-800/60 dark:hover:border-brand-500/40"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gradient-to-br ${f.accent} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`} />
      <div className="relative">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50 text-3xl shadow-card transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 dark:from-brand-500/20 dark:to-accent-500/20">
          {f.icon}
        </div>
        <h3 className="mt-5 font-display text-lg font-bold text-ink-800 transition-colors group-hover:text-brand-700 dark:text-slate-100 dark:group-hover:text-brand-300">
          {f.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-slate-400">{f.desc}</p>
      </div>
    </div>
  );
}

/* ─────────────  HOW IT WORKS  ───────────── */
function HowItWorks() {
  const headRef = useReveal();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50/80 via-brand-50/30 to-gray-50/80 py-20 dark:from-slate-900/60 dark:via-slate-900/40 dark:to-slate-900/60">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headRef} className="reveal mx-auto max-w-2xl text-center">
          <span className="badge-gradient">🚀 4 oddiy qadam</span>
          <h2 className="section-title mt-4 font-display">
            Qanday <span className="text-gradient-static">ishlaydi</span>?
          </h2>
          <p className="mt-3 text-ink-600 dark:text-slate-400">
            Bir necha bosqichda xaritadan AI tahliligacha — barchasi bitta interfeysda.
          </p>
        </div>

        <div className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connector line */}
          <div aria-hidden className="pointer-events-none absolute left-0 right-0 top-10 hidden h-0.5 bg-gradient-to-r from-transparent via-brand-300 to-transparent dark:via-brand-500/40 lg:block" />
          {steps.map((s, i) => (
            <StepCard key={s.n} step={s} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, delay }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal group relative"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-brand-500/40 via-accent-500/40 to-brand-500/40 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative h-full rounded-2xl border border-gray-100/80 bg-white/95 p-6 backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-1 dark:border-slate-700/80 dark:bg-slate-800">
        <div className="relative">
          <div className="bg-gradient-to-br from-brand-200 via-brand-400 to-accent-400 bg-clip-text font-display text-4xl font-extrabold text-transparent dark:from-brand-300 dark:via-brand-500 dark:to-accent-400">
            {step.n}
          </div>
          <div className="absolute right-0 top-1 grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white opacity-0 shadow-glow transition-all duration-500 group-hover:opacity-100">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <h3 className="mt-3 font-display text-lg font-bold text-ink-800 dark:text-slate-100">
          {step.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-slate-400">{step.desc}</p>
      </div>
    </div>
  );
}

/* ─────────────  USE CASES  ───────────── */
function UseCases() {
  const headRef = useReveal();
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div ref={headRef} className="reveal mx-auto max-w-2xl text-center">
        <span className="badge-gradient">🌍 Kim foydalanadi?</span>
        <h2 className="section-title mt-4 font-display">
          Foydalanish <span className="text-gradient-static">sohalari</span>
        </h2>
        <p className="mt-3 text-ink-600 dark:text-slate-400">
          miniGIS turli sohalarda — urbanistikadan tabiatni muhofaza qilishgacha — qo‘l keladi.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {useCases.map((u, i) => (
          <UseCaseCard key={u.title} u={u} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}

function UseCaseCard({ u, delay }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal group relative flex gap-4 overflow-hidden rounded-2xl border border-gray-100/80 bg-white/80 p-6 backdrop-blur-sm transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-brand-300 hover:shadow-glow dark:border-slate-700/80 dark:bg-slate-800/60 dark:hover:border-brand-500/40"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-gradient-to-br from-brand-500/10 to-accent-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50 text-2xl shadow-card transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 dark:from-brand-500/20 dark:to-accent-500/20">
        {u.icon}
      </div>
      <div className="relative">
        <h3 className="font-display font-bold text-ink-800 transition-colors group-hover:text-brand-700 dark:text-slate-100 dark:group-hover:text-brand-300">
          {u.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-600 dark:text-slate-400">{u.desc}</p>
      </div>
    </div>
  );
}

/* ─────────────  AI CATEGORIES  ───────────── */
function AICategories() {
  const ref = useReveal();
  const cardRef = useReveal();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50/60 via-white to-accent-50/40 py-20 dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-950">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="blob -left-20 top-10 h-72 w-72 bg-brand-300/30 dark:bg-brand-500/20" />
        <div className="blob right-10 bottom-10 h-72 w-72 bg-accent-300/30 animation-delay-2000 dark:bg-accent-500/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div ref={ref} className="reveal">
            <span className="badge-gradient">🤖 AI klassifikatsiya</span>
            <h2 className="section-title mt-4 font-display">
              AI <span className="text-gradient-static">10+ hudud turini</span> aniqlaydi
            </h2>
            <p className="mt-4 text-ink-600 dark:text-slate-400">
              GPT-4o modeli tanlangan koordinata atrofidagi geografik kontekstni
              tahlil qilib, quyidagi turlarning birini tayinlaydi va ishonch
              koeffitsiyentini ko‘rsatadi.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {aiCategories.map((c, i) => (
                <span
                  key={c}
                  className="reveal cursor-default rounded-full border border-brand-200/80 bg-white/80 px-3.5 py-1.5 text-sm font-semibold text-brand-700 shadow-card backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:bg-brand-50 hover:shadow-glow dark:border-slate-700 dark:bg-slate-800/70 dark:text-brand-300 dark:hover:border-brand-500/60 dark:hover:bg-slate-800"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div ref={cardRef} className="reveal relative" style={{ transitionDelay: '120ms' }}>
            <div className="absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-br from-brand-500/40 via-accent-500/40 to-brand-700/40 opacity-60 blur-2xl" />
            <div className="relative rounded-2xl border border-gray-100/80 bg-white/95 p-7 shadow-soft backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-800/90">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-slate-700">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-500 dark:text-slate-400">
                  AI tahlil — namuna
                </span>
                <span className="badge animate-glow-pulse">GPT-4o</span>
              </div>
              <dl className="mt-5 space-y-3 text-sm">
                <Row k="Koordinata" v="41.3111°N · 69.2797°E" mono />
                <Row k="Mamlakat" v="🇺🇿 O‘zbekiston" />
                <Row k="Viloyat" v="Toshkent shahri" />
                <Row k="Hudud turi" v="Shahar markazi" />
                <Row k="Relyef" v="Tekislik (478 m)" />
                <Row k="Tavsiya" v="Yashash, biznes, transport" />
                <Row k="Ishonch" v="92%" highlight />
              </dl>
              <Link to="/map" className="btn-primary mt-6 w-full justify-center">
                O‘zingiz sinab ko‘ring
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────  TECH STACK  ───────────── */
function TechStack() {
  const ref = useReveal();
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div ref={ref} className="reveal mx-auto max-w-2xl text-center">
        <span className="badge-gradient">⚙️ Stack</span>
        <h2 className="section-title mt-4 font-display">
          <span className="text-gradient-static">Texnologiyalar</span>
        </h2>
        <p className="mt-3 text-ink-600 dark:text-slate-400">
          Zamonaviy ochiq kodli vositalar asosida qurilgan.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2.5">
        {techStack.map((t, i) => (
          <TechBadge key={t.name} t={t} delay={i * 40} />
        ))}
      </div>
    </section>
  );
}

function TechBadge({ t, delay }) {
  const ref = useReveal();
  return (
    <span
      ref={ref}
      className={`reveal cursor-default rounded-xl px-4 py-2 text-sm font-bold shadow-card transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-glow ${t.color}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {t.name}
    </span>
  );
}

/* ─────────────  FAQ  ───────────── */
function FAQ() {
  const ref = useReveal();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50/80 via-white to-gray-50/80 py-20 dark:from-slate-900/60 dark:via-slate-900/40 dark:to-slate-900/60">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal text-center">
          <span className="badge-gradient">💬 FAQ</span>
          <h2 className="section-title mt-4 font-display">
            Tez-tez beriladigan <span className="text-gradient-static">savollar</span>
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <FaqItem key={f.q} f={f} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ f, delay }) {
  const ref = useReveal();
  return (
    <details
      ref={ref}
      className="reveal group rounded-2xl border border-gray-100/80 bg-white/80 p-5 backdrop-blur-sm transition-all duration-300 open:border-brand-300 open:shadow-glow hover:border-brand-200 dark:border-slate-700/80 dark:bg-slate-800/60 dark:open:border-brand-500/50 dark:hover:border-brand-500/30"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-bold text-ink-800 dark:text-slate-100">
        <span>{f.q}</span>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-card transition-all duration-300 group-open:rotate-45">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </span>
      </summary>
      <div className="grid grid-rows-[0fr] transition-all duration-300 group-open:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <p className="mt-4 text-sm leading-relaxed text-ink-600 dark:text-slate-400">{f.a}</p>
        </div>
      </div>
    </details>
  );
}

/* ─────────────  CTA  ───────────── */
function CTA() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-700 via-brand-800 to-accent-800 p-10 text-center text-white shadow-glow-lg sm:p-14">
        {/* Animated blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="blob -left-20 -top-20 h-72 w-72 bg-accent-500/40" />
          <div className="blob right-0 bottom-0 h-72 w-72 bg-sky-400/30 animation-delay-2000" />
        </div>

        {/* Grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3.5 py-1 text-xs font-bold backdrop-blur-md">
            <span className="text-base">✨</span> Tayyormisiz?
          </span>
          <h3 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Xaritani sinab ko‘ring.
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Marker qo‘ying — AI shu joyni avtomatik tahlil qiladi.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/map"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand-700 shadow-glow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-50"
            >
              Xaritaga o‘tish
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              to="/history"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/20"
            >
              Tarixni ko‘rish
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────  HELPERS  ───────────── */
function Stat({ value, label }) {
  return (
    <div className="group rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/15">
      <div className="font-display text-lg font-extrabold transition-transform group-hover:scale-105 sm:text-xl">
        {value}
      </div>
      <div className="text-[10.5px] font-semibold uppercase tracking-wider text-white/70">{label}</div>
    </div>
  );
}

function Row({ k, v, mono, highlight }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-gray-50 pb-2.5 last:border-0 last:pb-0 dark:border-slate-700/50">
      <dt className="text-ink-500 dark:text-slate-400">{k}</dt>
      <dd
        className={`text-right font-semibold ${
          highlight
            ? 'rounded-md bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent'
            : 'text-ink-800 dark:text-slate-100'
        } ${mono ? 'font-mono text-xs' : ''}`}
      >
        {v}
      </dd>
    </div>
  );
}
