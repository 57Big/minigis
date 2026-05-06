import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import useLocations from '../hooks/useLocations.js';
import useReveal from '../hooks/useReveal.js';
import AIAnalysisPanel from '../components/AIAnalysisPanel.jsx';

export default function HistoryPage() {
  const { items, loading, error, remove, load } = useLocations(true);
  const [q, setQ] = useState('');
  const [busyId, setBusyId] = useState(null);
  const [viewing, setViewing] = useState(null);
  const headerRef = useReveal();
  const tableRef = useReveal();

  useEffect(() => {
    if (!viewing) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setViewing(null);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [viewing]);

  const filtered = useMemo(() => {
    if (!q.trim()) return items;
    const needle = q.toLowerCase();
    return items.filter(
      (x) =>
        x.name?.toLowerCase().includes(needle) ||
        String(x.latitude).includes(needle) ||
        String(x.longitude).includes(needle)
    );
  }, [items, q]);

  async function handleDelete(id) {
    if (!confirm('Ushbu yozuvni o‘chirishni tasdiqlaysizmi?')) return;
    setBusyId(id);
    try {
      await remove(id);
    } catch (e) {
      alert(e.message);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="relative h-full overflow-y-auto">
      {/* Decorative blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="blob -left-20 top-20 h-[24rem] w-[24rem] bg-brand-200/30 dark:bg-brand-500/10" />
        <div className="blob right-0 top-40 h-[22rem] w-[22rem] bg-accent-200/30 animation-delay-2000 dark:bg-accent-500/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div ref={headerRef} className="reveal flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="badge-gradient">📜 Tarix</span>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink-800 dark:text-slate-100 sm:text-4xl">
              Saqlangan <span className="text-gradient-static">joylar</span>
            </h1>
            <p className="mt-2 text-sm text-ink-600 dark:text-slate-400">
              MongoDB’da saqlangan barcha tanlangan joylar.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
              </svg>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Qidirish..."
                className="input !pl-10 sm:w-72"
              />
            </div>
            <button
              onClick={load}
              className="btn-ghost"
              title="Yangilash"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M3 12a9 9 0 0115.5-6.4L21 8M21 3v5h-5M21 12a9 9 0 01-15.5 6.4L3 16M3 21v-5h5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Yangilash</span>
            </button>
            <Link to="/map" className="btn-primary">
              Xaritaga
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        <div
          ref={tableRef}
          className="reveal mt-7 overflow-hidden rounded-2xl border border-gray-100/80 bg-white/80 shadow-card backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-800/60"
        >
          {loading ? (
            <SkeletonTable />
          ) : error ? (
            <ErrorState message={error} />
          ) : filtered.length === 0 ? (
            <EmptyState empty={items.length === 0} />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-brand-50 to-accent-50/60 dark:from-brand-500/10 dark:to-accent-500/10">
                  <tr>
                    <Th>#</Th>
                    <Th>Joy nomi</Th>
                    <Th>AI tahlili</Th>
                    <Th>Latitude</Th>
                    <Th>Longitude</Th>
                    <Th>Sana</Th>
                    <Th className="text-right">Amallar</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/80 dark:divide-slate-700/60">
                  {filtered.map((row, idx) => (
                    <tr
                      key={row._id}
                      className="group animate-fade-in transition-colors hover:bg-brand-50/40 dark:hover:bg-slate-700/30"
                      style={{ animationDelay: `${Math.min(idx * 30, 600)}ms` }}
                    >
                      <Td className="w-12 text-ink-500 dark:text-slate-400">
                        <span className="font-mono text-xs">{idx + 1}</span>
                      </Td>
                      <Td>
                        <div className="flex max-w-md flex-wrap items-center gap-2">
                          {row.label && (
                            <span className="inline-flex shrink-0 items-center rounded-full bg-gradient-to-r from-brand-50 to-accent-50 px-2.5 py-0.5 text-[10.5px] font-bold text-brand-700 ring-1 ring-brand-200/50 dark:from-brand-500/20 dark:to-accent-500/20 dark:text-brand-300 dark:ring-brand-500/30">
                              {row.label}
                            </span>
                          )}
                          <span className="font-medium text-ink-800 line-clamp-2 transition-colors group-hover:text-brand-700 dark:text-slate-100 dark:group-hover:text-brand-300">
                            {row.name}
                          </span>
                        </div>
                      </Td>
                      <Td>
                        <AISummaryCell analysis={row.aiAnalysis} />
                      </Td>
                      <Td className="font-mono text-xs text-ink-700 dark:text-slate-200">
                        {row.latitude.toFixed(5)}
                      </Td>
                      <Td className="font-mono text-xs text-ink-700 dark:text-slate-200">
                        {row.longitude.toFixed(5)}
                      </Td>
                      <Td className="text-xs text-ink-600 dark:text-slate-400">
                        {new Date(row.createdAt).toLocaleString('uz-UZ')}
                      </Td>
                      <Td className="text-right">
                        <div className="inline-flex gap-2">
                          <button
                            type="button"
                            onClick={() => setViewing(row)}
                            disabled={!row.aiAnalysis}
                            className="grid h-8 w-8 place-items-center rounded-lg border border-gray-200 bg-white text-ink-700 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 hover:shadow-card disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:border-gray-200 disabled:hover:text-ink-700 disabled:hover:shadow-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-500/50 dark:hover:text-brand-300 dark:disabled:hover:border-slate-700 dark:disabled:hover:text-slate-300"
                            title={
                              row.aiAnalysis
                                ? 'AI tahlilini ko‘rish'
                                : 'AI tahlili saqlanmagan'
                            }
                          >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3z" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M5 17l.8 2 2 .8-2 .8L5 23l-.8-2L2 20.2l2-.8L5 17z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                          <Link
                            to={`/map`}
                            state={{ focus: row }}
                            className="grid h-8 w-8 place-items-center rounded-lg border border-gray-200 bg-white text-ink-700 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 hover:shadow-card dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-500/50 dark:hover:text-brand-300"
                            title="Xaritada ko‘rish"
                          >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M9 20l-5-2.2V5l5 2.2m0 12.8V7.2m0 12.8l6-2m-6-10.6l6-2m0 13l5 2.2V7.2L15 5m0 13V5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleDelete(row._id)}
                            disabled={busyId === row._id}
                            className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-rose-500 to-red-600 text-white transition-all hover:-translate-y-0.5 hover:shadow-card disabled:cursor-not-allowed disabled:opacity-60"
                            title="O‘chirish"
                          >
                            {busyId === row._id ? (
                              <span className="spinner" />
                            ) : (
                              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M10 11v6M14 11v6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-ink-600 dark:text-slate-400">
          <span>
            Jami yozuvlar:{' '}
            <span className="font-display font-bold text-ink-800 dark:text-slate-100">
              {items.length}
            </span>
          </span>
          {q && (
            <span>
              Topildi:{' '}
              <span className="font-display font-bold text-brand-700 dark:text-brand-300">
                {filtered.length}
              </span>
            </span>
          )}
        </div>
      </div>

      {viewing && (
        <AnalysisModal row={viewing} onClose={() => setViewing(null)} />
      )}
    </div>
  );
}

function AISummaryCell({ analysis }) {
  if (!analysis) {
    return (
      <span className="text-[11px] text-ink-400 dark:text-slate-500">—</span>
    );
  }
  const confidencePct =
    typeof analysis.confidence === 'number'
      ? Math.round(analysis.confidence * 100)
      : null;
  return (
    <div className="flex max-w-[220px] flex-wrap items-center gap-1.5">
      {analysis.classification && (
        <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-brand-500/90 to-purple-600/90 px-2 py-0.5 text-[10.5px] font-semibold text-white shadow-soft">
          ✨ {analysis.classification}
        </span>
      )}
      {analysis.terrain && analysis.terrain !== "noma'lum" && (
        <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[10.5px] font-medium text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30">
          {analysis.terrain}
        </span>
      )}
      {confidencePct != null && (
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10.5px] font-medium text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30">
          {confidencePct}%
        </span>
      )}
      {!analysis.classification && !analysis.terrain && confidencePct == null && (
        <span className="inline-flex items-center rounded-full bg-brand-50 px-2 py-0.5 text-[10.5px] font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
          ✨ Saqlangan
        </span>
      )}
    </div>
  );
}

function AnalysisModal({ row, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm dark:bg-black/60" />
      <div
        className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-card dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-gray-100 px-5 py-4 dark:border-slate-700">
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-wide text-ink-500 dark:text-slate-400">
              Saqlangan AI tahlili
            </div>
            <div className="mt-1 truncate font-display text-base font-bold text-ink-800 dark:text-slate-100">
              {row.name}
            </div>
            <div className="mt-0.5 font-mono text-[11px] text-ink-500 dark:text-slate-400">
              {row.latitude.toFixed(5)}, {row.longitude.toFixed(5)}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-gray-200 bg-white text-ink-700 transition-all hover:-translate-y-0.5 hover:border-rose-300 hover:text-rose-600 hover:shadow-card dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-rose-500/50 dark:hover:text-rose-300"
            title="Yopish"
            aria-label="Yopish"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <AIAnalysisPanel analysis={row.aiAnalysis} isSaved />
          <div className="mt-3 text-right text-[11px] text-ink-500 dark:text-slate-400">
            Saqlangan: {new Date(row.createdAt).toLocaleString('uz-UZ')}
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonTable() {
  return (
    <div className="space-y-2 p-6">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="shimmer h-12 rounded-xl bg-gray-100 dark:bg-slate-700/40"
        />
      ))}
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="grid place-items-center p-16 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-rose-100 dark:bg-rose-500/15">
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 9v4m0 4h.01M10.3 3.86l-8.4 14.5A2 2 0 003.6 21h16.7a2 2 0 001.7-2.64l-8.4-14.5a2 2 0 00-3.4 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="mt-4 font-display font-bold text-rose-600 dark:text-rose-300">
        Xatolik yuz berdi
      </div>
      <div className="mt-1 max-w-sm text-sm text-ink-600 dark:text-slate-400">{message}</div>
    </div>
  );
}

function EmptyState({ empty }) {
  return (
    <div className="grid place-items-center p-16 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50 text-3xl shadow-card dark:from-brand-500/15 dark:to-accent-500/15">
        {empty ? '🗺️' : '🔎'}
      </div>
      <div className="mt-4 font-display text-lg font-bold text-ink-800 dark:text-slate-100">
        {empty ? 'Hali yozuv yo‘q' : 'Hech narsa topilmadi'}
      </div>
      <div className="mt-1 max-w-sm text-sm text-ink-600 dark:text-slate-400">
        {empty
          ? 'Xaritada joy tanlab, AI tahlilini saqlang. Bu yerda paydo bo‘ladi.'
          : 'Qidiruv shartlariga mos yozuv mavjud emas. Boshqa kalit so‘zlar bilan urinib ko‘ring.'}
      </div>
      {empty && (
        <Link to="/map" className="btn-primary mt-5">
          Xaritani ochish
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}
    </div>
  );
}

function Th({ children, className = '' }) {
  return (
    <th
      className={`px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-ink-600 dark:text-slate-300 ${className}`}
    >
      {children}
    </th>
  );
}

function Td({ children, className = '' }) {
  return <td className={`px-5 py-3.5 text-sm align-middle ${className}`}>{children}</td>;
}
