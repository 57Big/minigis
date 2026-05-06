import { useEffect, useState } from 'react';

function Row({ label, value, mono = false }) {
  if (value == null || value === '') return null;
  return (
    <div className="flex items-start justify-between gap-3 py-1.5">
      <span className="text-[11px] uppercase tracking-wide text-ink-600 dark:text-slate-400">
        {label}
      </span>
      <span
        className={`text-sm text-right text-ink-800 dark:text-slate-100 ${
          mono ? 'font-mono' : 'font-medium'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function ClassificationBadge({ value }) {
  if (!value) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-3 py-1 text-xs font-semibold text-white shadow-soft">
      🤖 {value}
    </span>
  );
}

function UsagePill({ label }) {
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30">
      {label}
    </span>
  );
}

function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200/80 dark:bg-slate-700/60 ${className}`}
    />
  );
}

function ConfidenceBar({ value = 0 }) {
  const pct = Math.round((value || 0) * 100);
  const color =
    pct >= 75 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-rose-500';
  return (
    <div className="mt-1">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
        <div
          className={`h-full ${color} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-1 text-right text-[10px] text-ink-600 dark:text-slate-400">
        ishonch: {pct}%
      </div>
    </div>
  );
}

export default function AIAnalysisPanel({
  loading,
  error,
  analysis,
  onRetry,
  isSaved = false,
  collapsible = false,
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const isOpen = collapsible ? open : true;

  // AI tahlil ishga tushganda yoki natija/xato kelganda panelni avtomatik ochamiz.
  useEffect(() => {
    if (collapsible && (loading || analysis || error)) setOpen(true);
  }, [collapsible, loading, analysis, error]);
  return (
    <section className="card relative shrink-0 overflow-hidden p-4 dark:border-slate-700 dark:bg-slate-800">
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-brand-400/30 to-purple-500/20 blur-2xl" />
      <header
        className={`relative flex items-center justify-between ${isOpen ? 'mb-3' : ''} ${
          collapsible ? 'cursor-pointer' : ''
        }`}
        onClick={collapsible ? () => setOpen((v) => !v) : undefined}
        role={collapsible ? 'button' : undefined}
        aria-expanded={collapsible ? isOpen : undefined}
        tabIndex={collapsible ? 0 : undefined}
        onKeyDown={
          collapsible
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setOpen((v) => !v);
                }
              }
            : undefined
        }
      >
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 text-white shadow-soft">
            <span className="text-sm">✨</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-ink-800 dark:text-slate-100">
              AI Joy Tahlili
            </h3>
            <p className="text-[11px] text-ink-600 dark:text-slate-400">
              GPT asosida hudud tasnifi
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {analysis?.confidence != null && !loading && (
            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
              AI
            </span>
          )}
          {collapsible && (
            <span
              className={`text-ink-600 dark:text-slate-400 transition-transform ${
                isOpen ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            >
              ▾
            </span>
          )}
        </div>
      </header>
      {isOpen && (
        <>
      {loading && (
        <div className="relative space-y-3">
          <div className="flex items-center gap-2 text-xs text-ink-600 dark:text-slate-400">
            <span className="spinner dark" />
            AI hudud tahlili tayyorlanmoqda...
          </div>
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-4/6" />
          <div className="flex gap-2 pt-1">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-14" />
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="relative space-y-2">
          <div className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
            ⚠️ {error}
          </div>
          {onRetry && (
            <button onClick={onRetry} className="btn-ghost text-xs">
              Qayta urinish
            </button>
          )}
        </div>
      )}

      {!loading && !error && !analysis && (
        <div className="relative grid place-items-center py-8 text-center text-xs text-ink-600 dark:text-slate-400">
          <div className="mb-2 text-2xl">🛰️</div>
          <p className="mb-3">
            {isSaved
              ? 'Bu joy uchun saqlangan AI tahlili yo‘q.'
              : 'Bu joyni AI tahlil qilish uchun tugmani bosing.'}
          </p>
          {onRetry && (
            <button onClick={onRetry} className="btn-primary text-xs">
              ✨ Tahlil qilish
            </button>
          )}
        </div>
      )}

      {!loading && !error && analysis && (
        <div className="relative space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <ClassificationBadge value={analysis.classification} />
            {analysis.terrain && analysis.terrain !== 'noma\'lum' && (
              <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30">
                ⛰️ {analysis.terrain}
              </span>
            )}
          </div>

          {analysis.placeName && (
            <p className="text-sm font-semibold text-ink-800 dark:text-slate-100">
              {analysis.placeName}
            </p>
          )}

          {analysis.description && (
            <p className="text-[13px] leading-relaxed text-ink-700 dark:text-slate-300">
              {analysis.description}
            </p>
          )}

          <div className="rounded-xl bg-gray-50 p-3 dark:bg-slate-900/40">
            <Row label="Mamlakat" value={analysis.country} />
            <Row label="Viloyat" value={analysis.region} />
            <Row label="Tuman / shahar" value={analysis.district} />
            {analysis.coordinates && (
              <Row
                label="Koordinata"
                value={`${analysis.coordinates.latitude.toFixed(5)}, ${analysis.coordinates.longitude.toFixed(5)}`}
                mono
              />
            )}
          </div>

          {Array.isArray(analysis.suggestedUsage) && analysis.suggestedUsage.length > 0 && (
            <div>
              <div className="mb-1.5 text-[11px] uppercase tracking-wide text-ink-600 dark:text-slate-400">
                Tavsiya etilgan foydalanish
              </div>
              <div className="flex flex-wrap gap-1.5">
                {analysis.suggestedUsage.map((u) => (
                  <UsagePill key={u} label={u} />
                ))}
              </div>
            </div>
          )}

          {analysis.confidence != null && <ConfidenceBar value={analysis.confidence} />}
        </div>
      )}
        </>
      )}
    </section>
  );
}
