import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal.js';

export default function AboutPage() {
  const headerRef = useReveal();
  const metaRef = useReveal();
  const missionRef = useReveal();
  const useCasesHeadRef = useReveal();
  const techHeadRef = useReveal();
  const pipelineHeadRef = useReveal();
  const apiHeadRef = useReveal();
  const pagesHeadRef = useReveal();
  const archRef = useReveal();
  const servicesHeadRef = useReveal();
  const securityHeadRef = useReveal();
  const roadmapHeadRef = useReveal();
  const ctaRef = useReveal();
  const apiTableRef = useReveal();

  return (
    <div className="relative h-full overflow-y-auto">
      {/* Decorative blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="blob -left-32 top-20 h-[28rem] w-[28rem] bg-brand-200/30 dark:bg-brand-500/10" />
        <div className="blob right-0 top-40 h-[26rem] w-[26rem] bg-accent-200/30 animation-delay-2000 dark:bg-accent-500/10" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div ref={headerRef} className="reveal">
          <span className="badge-gradient">📘 BMI · 2026 · AI-powered GIS</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink-800 dark:text-slate-100 sm:text-5xl">
            Loyiha <span className="text-gradient-static">haqida</span>
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-600 dark:text-slate-300">
            <b className="text-ink-800 dark:text-slate-100">miniGIS</b> — interaktiv
            xarita, sun’iy yo‘ldosh tasvirlari va GPT asosidagi avtomatik joy
            tahlilini birlashtirgan AI-powered GIS platformasi. Foydalanuvchi
            xarita ustida nuqta tanlaydi — OpenAI hudud turini, mamlakat,
            viloyat, tuman, relyef va tavsiya etilgan foydalanish ehtimolini
            avtomatik aniqlaydi va MongoDB’ga saqlash imkonini beradi.
          </p>
        </div>

        {/* META INFO */}
        <div ref={metaRef} className="reveal mt-8 grid gap-4 sm:grid-cols-3">
          <Meta label="Loyiha turi" value="Bitiruv malakaviy ishi" icon="🎓" />
          <Meta label="Yo‘nalish" value="GIS · AI · Web" icon="🛰️" delay={100} />
          <Meta label="Yil" value="2025–2026" icon="📅" delay={200} />
        </div>

        {/* MISSION */}
        <section ref={missionRef} className="reveal mt-14">
          <h2 className="font-display text-2xl font-bold text-ink-800 dark:text-slate-100">
            Loyiha <span className="text-gradient-static">maqsadi</span>
          </h2>
          <p className="mt-4 leading-relaxed text-ink-600 dark:text-slate-300">
            An’anaviy GIS tizimlari foydalanuvchidan maxsus bilim talab qiladi:
            koordinata tizimlari, layer’lar, attribut jadvallari va h.k.
            <b> miniGIS</b> esa shu murakkablikni yashiradi — siz xaritada
            shunchaki nuqta tanlaysiz, qolgan ishni AI bajaradi: joyni
            klassifikatsiya qiladi, mamlakat / viloyat / tumanni aniqlaydi,
            relyef va tavsiya etilgan foydalanish bo‘yicha tushunarli xulosa
            beradi. Maqsad —{' '}
            <i className="text-brand-700 dark:text-brand-300">
              geoaxborot tahlilini ommalashtirish
            </i>{' '}
            va talabalar, tadqiqotchilar, urbanistlar uchun tezkor instrument
            sifatida xizmat qilish.
          </p>
        </section>

        {/* USE CASES */}
        <section className="mt-16">
          <h2 ref={useCasesHeadRef} className="reveal font-display text-2xl font-bold text-ink-800 dark:text-slate-100">
            Kim <span className="text-gradient-static">foydalanishi</span> mumkin
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <UseCase icon="🎓" title="Talabalar va o‘qituvchilar" desc="Geografiya, urbanistika va GIS darslarida vizual demonstratsiya uchun." delay={0} />
            <UseCase icon="🏙" title="Urbanist va loyihachilar" desc="Hududni dastlabki baholash, foydalanish ssenariylarini tezkor ko‘rib chiqish." delay={80} />
            <UseCase icon="🛰" title="Tadqiqotchilar" desc="Sun’iy yo‘ldosh tasvirlari va relyef ma’lumotlari bilan ishlash uchun engil platform." delay={160} />
            <UseCase icon="🧭" title="Sayyohlik / kartograflar" desc="Yangi joylar haqida qisqa AI tavsiflari, manzil va koordinatalarni saqlash." delay={240} />
            <UseCase icon="📊" title="Data analitiklar" desc="MongoDB’ga saqlangan joylarni eksport qilib, keyingi tahlillarda foydalanish." delay={320} />
            <UseCase icon="💻" title="Dasturchilar" desc="Open source REST API + React stack — o‘z loyihangizga kengaytirish oson." delay={400} />
          </div>
        </section>

        {/* TECH STACK */}
        <section className="mt-16">
          <h2 ref={techHeadRef} className="reveal font-display text-2xl font-bold text-ink-800 dark:text-slate-100">
            Texnologik <span className="text-gradient-static">stek</span>
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Card title="Frontend" icon="💻" delay={0} items={[
              'React 18 + Vite (HMR dev-server)',
              'TailwindCSS (dark / light mode, class-based)',
              'React Leaflet 4 + LayersControl',
              'React Router DOM v6',
              'Axios (REST client)',
              'Custom hooks: useDebounce, useLocations, useTheme',
            ]} />
            <Card title="Backend" icon="⚙️" delay={120} items={[
              'Node.js 18+ va Express 4',
              'MongoDB + Mongoose 8 (ODM)',
              'OpenAI SDK (gpt-4o / gpt-4o-mini)',
              'express-rate-limit (AI endpoint himoyasi)',
              'CORS, Morgan, dotenv',
              'Markaziy errorHandler middleware',
            ]} />
            <Card title="Xarita layerlari" icon="🗺️" delay={240} items={[
              'OpenStreetMap (OSM) — asosiy ko‘cha xaritasi',
              'Esri World Imagery — sun’iy yo‘ldosh',
              'OpenTopoMap — relyef / topografiya',
              'CARTO Dark — tungi rejim uchun',
              'Esri Reference Labels (overlay)',
            ]} />
            <Card title="AI imkoniyatlari" icon="🤖" delay={360} items={[
              'POST /api/ai/analyze-location',
              'Hudud klassifikatsiyasi (shahar / qishloq / sanoat / ...)',
              'Mamlakat, viloyat, tuman aniqlash',
              'AI tomonidan generatsiya qilingan tavsif',
              'Tavsiya etilgan foydalanish (yashash, transport, ...)',
              'Relyef va ishonch (confidence) koeffitsiyenti',
            ]} />
          </div>
        </section>

        {/* AI PIPELINE */}
        <section className="mt-16">
          <div ref={pipelineHeadRef} className="reveal">
            <h2 className="font-display text-2xl font-bold text-ink-800 dark:text-slate-100">
              AI tahlil <span className="text-gradient-static">jarayoni</span>
            </h2>
            <p className="mt-2 text-ink-600 dark:text-slate-300">
              Foydalanuvchi xaritada bosgan paytdan natija chiqarguncha bo‘lgan zanjir:
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Step num="1" title="Marker qo‘yish" desc="Foydalanuvchi xaritada nuqta tanlaydi, latitude/longitude olinadi." delay={0} />
            <Step num="2" title="Reverse geocoding" desc="Nominatim API koordinatadan manzil va ma’muriy bo‘linmalarni qaytaradi." delay={100} />
            <Step num="3" title="OpenAI tahlili" desc="GIS prompt + manzil + koordinata GPT modeliga JSON-mode rejimida yuboriladi." delay={200} />
            <Step num="4" title="Normalize + UI" desc="Backend natijani tekshiradi, frontend AI panelida chiroyli ko‘rsatadi." delay={300} />
          </div>
        </section>

        {/* API ENDPOINTS */}
        <section className="mt-16">
          <h2 ref={apiHeadRef} className="reveal font-display text-2xl font-bold text-ink-800 dark:text-slate-100">
            REST API <span className="text-gradient-static">endpointlari</span>
          </h2>
          <div ref={apiTableRef} className="reveal mt-6 overflow-hidden rounded-2xl border border-gray-200/80 bg-white/80 shadow-card backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-800/60">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gradient-to-r from-brand-50 to-accent-50/60 dark:from-brand-500/10 dark:to-accent-500/10">
                  <tr className="text-left text-ink-700 dark:text-slate-300">
                    <th className="px-5 py-3 font-bold uppercase tracking-wider text-xs">Method</th>
                    <th className="px-5 py-3 font-bold uppercase tracking-wider text-xs">Endpoint</th>
                    <th className="px-5 py-3 font-bold uppercase tracking-wider text-xs">Maqsadi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-ink-700 dark:divide-slate-700/80 dark:text-slate-300">
                  <ApiRow method="GET" path="/api/locations" desc="Saqlangan joylar ro‘yxati" />
                  <ApiRow method="GET" path="/api/locations/:id" desc="Bitta joy yozuvini olish" />
                  <ApiRow method="POST" path="/api/locations" desc="Yangi joyni saqlash" />
                  <ApiRow method="DELETE" path="/api/locations/:id" desc="Yozuvni o‘chirish" />
                  <ApiRow method="POST" path="/api/ai/analyze-location" desc="OpenAI orqali joy tahlili" ai />
                  <ApiRow method="POST" path="/api/ai/reverse-geocode" desc="Server-side reverse geocoding" ai />
                  <ApiRow method="GET" path="/api/health" desc="Server holatini tekshirish" />
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-3 text-xs text-ink-500 dark:text-slate-400">
            <span className="badge mr-1 !bg-amber-100 !text-amber-800 !ring-amber-200 dark:!bg-amber-500/15 dark:!text-amber-300 dark:!ring-amber-500/30">
              AI
            </span>
            belgilangan endpointlar <b>express-rate-limit</b> bilan himoyalangan
            (har IP uchun daqiqasiga <code className="rounded bg-ink-100 px-1.5 py-0.5 font-mono text-[11px] dark:bg-slate-800">AI_RATE_LIMIT_PER_MIN</code> so‘rov).
          </p>
        </section>

        {/* PAGES */}
        <section className="mt-16">
          <h2 ref={pagesHeadRef} className="reveal font-display text-2xl font-bold text-ink-800 dark:text-slate-100">
            <span className="text-gradient-static">Sahifalar</span>
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <PageItem path="/" title="Bosh sahifa" desc="Loyiha taqdimoti, asosiy imkoniyatlar va xaritaga o‘tish tugmasi." delay={0} />
            <PageItem path="/map" title="Xarita" desc="Asosiy ish maydoni — qidiruv, layer almashtirish, marker, AI tahlili va saqlash." delay={100} />
            <PageItem path="/history" title="Tarix" desc="MongoDB’ga saqlangan joylar jadvali, qidiruv va o‘chirish." delay={200} />
            <PageItem path="/about" title="Loyiha haqida" desc="Texnologik stek, AI imkoniyatlari va arxitektura (joriy sahifa)." delay={300} />
          </div>
        </section>

        {/* ARCHITECTURE */}
        <section
          ref={archRef}
          className="reveal mt-16 overflow-hidden rounded-2xl border border-gray-100/80 bg-white/80 p-7 backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-800/60"
        >
          <h2 className="font-display text-xl font-bold text-ink-800 dark:text-slate-100">
            <span className="text-gradient-static">Arxitektura</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-slate-300">
            Frontend Vite dev-serveri orqali (port 5173) ishlaydi va REST API
            chaqiriqlarini Express backend (port 5000) ga yuboradi. Backend
            Mongoose yordamida MongoDB bilan ishlaydi. AI tahlili uchun OpenAI
            Chat Completions API (JSON mode) ishlatiladi; reverse geocoding
            uchun esa Nominatim. Tile’lar bevosita brauzerdan tashqi
            tile-serverlardan olinadi.
          </p>
          <pre className="mt-5 overflow-x-auto rounded-xl bg-gradient-to-br from-ink-900 to-slate-900 p-5 text-xs leading-relaxed text-emerald-200/95 shadow-inner-glow dark:from-slate-950 dark:to-slate-900">
{`Browser ──axios──► Express ──Mongoose──► MongoDB
   │               │
   │               ├──► OpenAI API   (AI joy tahlili, JSON mode)
   │               └──► Nominatim    (reverse geocoding)
   │
   └─tiles─► OSM / Esri / OpenTopoMap / CARTO Dark`}
          </pre>
        </section>

        {/* EXTERNAL SERVICES */}
        <section className="mt-16">
          <h2 ref={servicesHeadRef} className="reveal font-display text-2xl font-bold text-ink-800 dark:text-slate-100">
            Tashqi servislar va <span className="text-gradient-static">litsenziyalar</span>
          </h2>
          <ul className="mt-5 space-y-2.5 text-sm text-ink-600 dark:text-slate-300">
            <Service name="OpenStreetMap" license="ODbL" purpose="asosiy ko‘cha xaritasi tile’lari" delay={0} />
            <Service name="Esri World Imagery" license="attribution required" purpose="sun’iy yo‘ldosh tasvirlari" delay={80} />
            <Service name="OpenTopoMap" license="CC-BY-SA" purpose="relyef / topografik layer" delay={160} />
            <Service name="Nominatim" license="OSM Usage Policy" purpose="forward / reverse geocoding" delay={240} />
            <Service name="OpenAI API" license="Terms of Use" purpose="GPT modeli orqali joy tahlili" delay={320} />
          </ul>
        </section>

        {/* SECURITY */}
        <section ref={securityHeadRef} className="reveal mt-16">
          <h2 className="font-display text-2xl font-bold text-ink-800 dark:text-slate-100">
            Xato boshqaruv va <span className="text-gradient-static">himoya</span>
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-600 dark:text-slate-300">
            {[
              'AI endpoint rate limit: har IP uchun daqiqasiga belgilangan so‘rov soni.',
              'OpenAI 401 / 429 xatolari foydalanuvchiga tushunarli xabarga aylantiriladi.',
              'Prompt JSON mode\'da ishlatiladi — natija doimo to‘g‘ri JSON.',
              'Backend confidence ni 0–1 oralig‘iga clamp qiladi.',
              'Frontend AI request ID counter — eski natija yangisini bosib o‘tmaydi (race-safe).',
              'CORS orqali faqat ruxsat etilgan CLIENT_ORIGIN qabul qilinadi.',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-card">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ROADMAP */}
        <section className="mt-16">
          <div ref={roadmapHeadRef} className="reveal">
            <h2 className="font-display text-2xl font-bold text-ink-800 dark:text-slate-100">
              Kelgusidagi <span className="text-gradient-static">rejalar</span>
            </h2>
            <p className="mt-2 text-ink-600 dark:text-slate-300">
              miniGIS faol rivojlanishda — quyida yaqin va o‘rta muddatli rejalashtirilgan yo‘nalishlar:
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Plan
              icon="🗣"
              title="Ko‘p tilli interfeys"
              desc="UI uchun ingliz va rus tillari, AI javoblarini foydalanuvchi tanlagan tilda generatsiya qilish."
              status="yaqin"
              delay={0}
            />
            <Plan
              icon="👤"
              title="Foydalanuvchi hisoblari"
              desc="JWT autentifikatsiya, shaxsiy joylar to‘plami va saqlangan hududlarni ulashish (share link)."
              status="yaqin"
              delay={80}
            />
            <Plan
              icon="✏️"
              title="Chizish vositalari"
              desc="Polygon, chiziq va doira chizish, maydon/uzunlikni o‘lchash, GeoJSON eksport / import."
              status="yaqin"
              delay={160}
            />
            <Plan
              icon="🛰"
              title="Vaqt bo‘yicha tasvirlar"
              desc="Sun’iy yo‘ldosh tasvirlarining vaqt qatori (timeline) — hududning yillar bo‘yicha o‘zgarishi."
              status="o‘rta"
              delay={240}
            />
            <Plan
              icon="🌱"
              title="NDVI va iqlim"
              desc="O‘simlik qoplami indeksi (NDVI), harorat va yog‘in ma’lumotlari layer sifatida."
              status="o‘rta"
              delay={320}
            />
            <Plan
              icon="💬"
              title="AI suhbat-yordamchi"
              desc="Tabiiy tilda savol berish: «bu hududda nima qurish mumkin?», «yaqin atrofdagi suv havzalari?»"
              status="o‘rta"
              delay={400}
            />
            <Plan
              icon="📱"
              title="PWA va offline rejim"
              desc="Mobil qurilmalar uchun installable PWA, oxirgi tile’larni cache’lash, offline ko‘rish."
              status="yaqin"
              delay={480}
            />
            <Plan
              icon="🧊"
              title="3D relyef ko‘rinish"
              desc="MapLibre GL yoki Cesium asosida 3D terrain — tog‘lar va vodiylarni hajmda ko‘rish."
              status="uzoq"
              delay={560}
            />
            <Plan
              icon="🤝"
              title="Jamoaviy ish"
              desc="Loyihalar (workspaces), umumiy joylar to‘plami va kommentariya qoldirish imkoniyati."
              status="uzoq"
              delay={640}
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-ink-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <b className="text-ink-700 dark:text-slate-300">yaqin</b> — keyingi 1–2 oyda
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <b className="text-ink-700 dark:text-slate-300">o‘rta</b> — 3–6 oy ichida
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              <b className="text-ink-700 dark:text-slate-300">uzoq</b> — tadqiq qilinmoqda
            </span>
          </div>
        </section>

        {/* CTA */}
        <section
          ref={ctaRef}
          className="reveal relative isolate mt-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-700 via-brand-800 to-accent-800 p-10 text-center text-white shadow-glow-lg sm:p-14"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="blob -left-20 -top-20 h-72 w-72 bg-accent-500/40" />
            <div className="blob right-0 bottom-0 h-72 w-72 bg-sky-400/30 animation-delay-2000" />
          </div>
          <div className="relative">
            <h3 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Platformani sinab ko‘ring
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-white/85">
              Xaritada istalgan nuqtani tanlang — AI bir necha soniyada hudud
              haqida tushunarli xulosa beradi.
            </p>
            <Link
              to="/map"
              className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand-700 shadow-glow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-50"
            >
              Xaritaga o‘tish
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function Card({ title, items, icon, delay = 0 }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal group relative overflow-hidden rounded-2xl border border-gray-100/80 bg-white/80 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-300 hover:shadow-glow dark:border-slate-700/80 dark:bg-slate-800/60 dark:hover:border-brand-500/40"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gradient-to-br from-brand-500/10 to-accent-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex items-center gap-3">
        {icon && (
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 text-2xl shadow-card transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 dark:from-brand-500/20 dark:to-accent-500/20">
            {icon}
          </div>
        )}
        <h3 className="font-display font-bold text-ink-800 dark:text-slate-100">{title}</h3>
      </div>
      <ul className="relative mt-4 space-y-2 text-sm text-ink-700 dark:text-slate-300">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-brand-500 to-accent-500" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Meta({ label, value, icon, delay = 0 }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white/80 p-4 backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card dark:border-slate-700/80 dark:bg-slate-800/60 dark:hover:border-brand-500/40"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 text-lg dark:from-brand-500/20 dark:to-accent-500/20">
            {icon}
          </div>
        )}
        <div>
          <div className="text-[10.5px] font-bold uppercase tracking-wider text-ink-500 dark:text-slate-400">
            {label}
          </div>
          <div className="font-display text-sm font-bold text-ink-800 dark:text-slate-100">{value}</div>
        </div>
      </div>
    </div>
  );
}

function UseCase({ icon, title, desc, delay = 0 }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal group relative overflow-hidden rounded-2xl border border-gray-100/80 bg-white/80 p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-300 hover:shadow-glow dark:border-slate-700/80 dark:bg-slate-800/60 dark:hover:border-brand-500/40"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-brand-500/10 to-accent-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 text-xl shadow-card transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 dark:from-brand-500/20 dark:to-accent-500/20">
        {icon}
      </div>
      <h3 className="relative mt-4 font-display text-sm font-bold text-ink-800 dark:text-slate-100">
        {title}
      </h3>
      <p className="relative mt-1.5 text-xs leading-relaxed text-ink-600 dark:text-slate-400">{desc}</p>
    </div>
  );
}

function Step({ num, title, desc, delay = 0 }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal group relative"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-brand-500/40 via-accent-500/40 to-brand-500/40 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative h-full rounded-2xl border border-gray-100/80 bg-white/95 p-5 backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-1 dark:border-slate-700/80 dark:bg-slate-800">
        <div className="absolute -top-3 -left-3 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 font-display text-sm font-extrabold text-white shadow-glow">
          {num}
        </div>
        <h4 className="mt-2 font-display text-sm font-bold text-ink-800 dark:text-slate-100">
          {title}
        </h4>
        <p className="mt-1.5 text-xs leading-relaxed text-ink-600 dark:text-slate-400">{desc}</p>
      </div>
    </div>
  );
}

function ApiRow({ method, path, desc, ai }) {
  const colors = {
    GET: 'bg-emerald-100 text-emerald-800 ring-emerald-200/60 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30',
    POST: 'bg-blue-100 text-blue-800 ring-blue-200/60 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-500/30',
    DELETE: 'bg-rose-100 text-rose-800 ring-rose-200/60 dark:bg-rose-500/15 dark:text-rose-300 dark:ring-rose-500/30',
  };
  return (
    <tr className="transition-colors hover:bg-brand-50/40 dark:hover:bg-slate-700/30">
      <td className="px-5 py-3">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ring-inset ${colors[method] || ''}`}>
          {method}
        </span>
      </td>
      <td className="px-5 py-3 font-mono text-xs">{path}</td>
      <td className="px-5 py-3">
        {desc}
        {ai && (
          <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800 ring-1 ring-inset ring-amber-200/60 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/30">
            AI
          </span>
        )}
      </td>
    </tr>
  );
}

function PageItem({ path, title, desc, delay = 0 }) {
  const ref = useReveal();
  return (
    <Link
      to={path}
      ref={ref}
      className="reveal group relative block overflow-hidden rounded-2xl border border-gray-100/80 bg-white/80 p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-300 hover:shadow-glow dark:border-slate-700/80 dark:bg-slate-800/60 dark:hover:border-brand-500/40"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-brand-500/10 to-accent-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex items-center justify-between">
        <h3 className="font-display font-bold text-ink-800 transition-colors group-hover:text-brand-700 dark:text-slate-100 dark:group-hover:text-brand-300">
          {title}
        </h3>
        <span className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-xs text-ink-500 transition-all group-hover:bg-brand-50 group-hover:text-brand-700 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-brand-500/15 dark:group-hover:text-brand-300">
          {path}
        </span>
      </div>
      <p className="relative mt-1.5 text-sm leading-relaxed text-ink-600 dark:text-slate-400">{desc}</p>
    </Link>
  );
}

function Plan({ icon, title, desc, status = 'yaqin', delay = 0 }) {
  const ref = useReveal();
  const statusStyles = {
    'yaqin': 'bg-emerald-100 text-emerald-800 ring-emerald-200/60 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30',
    'o‘rta': 'bg-amber-100 text-amber-800 ring-amber-200/60 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/30',
    'uzoq': 'bg-sky-100 text-sky-800 ring-sky-200/60 dark:bg-sky-500/15 dark:text-sky-300 dark:ring-sky-500/30',
  };
  return (
    <div
      ref={ref}
      className="reveal group relative overflow-hidden rounded-2xl border border-gray-100/80 bg-white/80 p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-300 hover:shadow-glow dark:border-slate-700/80 dark:bg-slate-800/60 dark:hover:border-brand-500/40"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-brand-500/10 to-accent-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex items-start justify-between gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 text-xl shadow-card transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 dark:from-brand-500/20 dark:to-accent-500/20">
          {icon}
        </div>
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${statusStyles[status] || statusStyles['yaqin']}`}>
          {status}
        </span>
      </div>
      <h3 className="relative mt-4 font-display text-sm font-bold text-ink-800 dark:text-slate-100">
        {title}
      </h3>
      <p className="relative mt-1.5 text-xs leading-relaxed text-ink-600 dark:text-slate-400">{desc}</p>
    </div>
  );
}

function Service({ name, license, purpose, delay = 0 }) {
  const ref = useReveal();
  return (
    <li
      ref={ref}
      className="reveal flex flex-wrap items-center gap-2 rounded-xl border border-gray-100/60 bg-white/60 px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:border-brand-300 hover:bg-white/90 dark:border-slate-700/50 dark:bg-slate-800/40 dark:hover:border-brand-500/40 dark:hover:bg-slate-800/70"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="font-display font-bold text-ink-800 dark:text-slate-100">{name}</span>
      <span className="badge !bg-ink-100 !text-ink-700 !ring-ink-200/60 dark:!bg-slate-700 dark:!text-slate-200 dark:!ring-slate-600">
        {license}
      </span>
      <span className="text-ink-500 dark:text-slate-400">— {purpose}</span>
    </li>
  );
}
