import { useState } from 'react';
import { Link } from 'react-router-dom';
import AIAnalysisPanel from './AIAnalysisPanel.jsx';

function Row({ label, value, mono = false }) {
  return (
    <div className="flex items-start justify-between gap-3 py-1.5">
      <span className="text-xs uppercase tracking-wide text-ink-600 dark:text-slate-400">
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

function CollapsibleCard({ title, defaultOpen = true, badge, children, className = '' }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`card shrink-0 overflow-hidden dark:border-slate-700 dark:bg-slate-800 ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-slate-700/40"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-ink-800 dark:text-slate-100">{title}</h3>
          {badge}
        </div>
        <span
          className={`text-ink-600 dark:text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>
      {open && <div className="border-t border-gray-100 px-4 py-3 dark:border-slate-700">{children}</div>}
    </div>
  );
}

const QUICK_LABELS = ['Uy', 'Ishxona', 'O‘qish', 'Sevimli'];

export default function Sidebar({
  selected,
  reverseLoading,
  onSave,
  saving,
  saveError,
  recent,
  onRecentClick,
  onClear,
  label,
  onLabelChange,
  // AI
  aiLoading,
  aiError,
  aiAnalysis,
  onAIRetry,
}) {
  const isSaved = !!selected?.savedId;
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <aside className="flex w-full h-10 shrink-0 items-stretch border-t border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900 lg:h-full lg:w-10 lg:flex-initial lg:self-stretch lg:border-l lg:border-t-0">
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          className="flex h-full w-full items-center justify-center text-ink-700 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800"
          title="Panelni ochish"
          aria-label="Panelni ochish"
        >
          <span className="hidden lg:inline text-lg">‹</span>
          <span className="lg:hidden text-lg">⌃</span>
        </button>
      </aside>
    );
  }

  return (
    <aside className="flex w-full min-h-0 flex-1 flex-col gap-3 overflow-y-auto border-t border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 lg:h-full lg:flex-initial lg:self-stretch lg:border-l lg:border-t-0 lg:w-[400px]">
      <div className="flex shrink-0 items-center justify-between gap-2">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-ink-800 dark:text-slate-100">
            Tanlangan joy
          </h2>
          <p className="text-xs text-ink-600 dark:text-slate-400">
            Bo‘limlarni ochish uchun bosing.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="badge">GIS · AI</span>
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="grid h-8 w-8 place-items-center rounded-md text-ink-600 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800"
            title="Panelni yopish"
            aria-label="Panelni yopish"
          >
            <span className="hidden lg:inline text-lg">›</span>
            <span className="lg:hidden text-lg">⌄</span>
          </button>
        </div>
      </div>

      <CollapsibleCard
        title="Joy ma’lumotlari"
        defaultOpen
        badge={
          isSaved ? (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              saqlangan
            </span>
          ) : null
        }
      >
        {!selected ? (
          <div className="grid place-items-center py-10 text-center text-sm text-ink-600 dark:text-slate-400">
            <div className="mb-2 grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
              📌
            </div>
            Hali joy tanlanmagan.
            <br />
            Xarita ustiga bosing yoki qidiruvdan foydalaning.
          </div>
        ) : (
          <>
            <Row
              label="Joy nomi"
              value={
                reverseLoading ? (
                  <span className="inline-flex items-center gap-2 text-ink-600 dark:text-slate-400">
                    <span className="spinner dark" /> Aniqlanmoqda...
                  </span>
                ) : (
                  selected.name || 'Noma’lum'
                )
              }
            />
            <Row label="Latitude" value={selected.lat.toFixed(6)} mono />
            <Row label="Longitude" value={selected.lng.toFixed(6)} mono />
            <Row label="Tanlangan vaqt" value={new Date(selected.at).toLocaleString('uz-UZ')} />

            <div className="mt-3">
              <label className="mb-1 block text-[11px] uppercase tracking-wide text-ink-600 dark:text-slate-400">
                Joyga nom bering (masalan: Uy, Ishxona)
              </label>
              <input
                type="text"
                value={label || ''}
                onChange={(e) => onLabelChange?.(e.target.value)}
                placeholder="Nomi (ixtiyoriy)"
                maxLength={60}
                className="input w-full"
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {QUICK_LABELS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => onLabelChange?.(q)}
                    className={`rounded-full border px-2.5 py-1 text-[11px] transition ${
                      (label || '').toLowerCase() === q.toLowerCase()
                        ? 'border-brand-500 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-500/15 dark:text-brand-300'
                        : 'border-gray-200 text-ink-700 hover:bg-gray-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/40'
                    }`}
                  >
                    {q}
                  </button>
                ))}
                {label && (
                  <button
                    type="button"
                    onClick={() => onLabelChange?.('')}
                    className="rounded-full border border-gray-200 px-2.5 py-1 text-[11px] text-ink-600 hover:bg-gray-50 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700/40"
                  >
                    ✕ Tozalash
                  </button>
                )}
              </div>
            </div>

            {saveError && (
              <div className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-rose-500/10 dark:text-rose-300">
                {saveError}
              </div>
            )}

            <div className="mt-4 flex gap-2">
              <button onClick={onSave} disabled={saving} className="btn-primary flex-1">
                {saving ? <span className="spinner" /> : '💾'}
                <span>{isSaved ? 'Yangilash' : 'Saqlash'}</span>
              </button>
              <button onClick={onClear} className="btn-ghost">
                Tozalash
              </button>
            </div>
          </>
        )}
      </CollapsibleCard>

      {selected && (
        <AIAnalysisPanel
          loading={aiLoading}
          error={aiError}
          analysis={aiAnalysis}
          onRetry={onAIRetry}
          isSaved={isSaved}
          collapsible
        />
      )}

      <CollapsibleCard
        title="So‘nggi saqlanganlar"
        defaultOpen={false}
        badge={
          recent && recent.length > 0 ? (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-ink-700 dark:bg-slate-700 dark:text-slate-200">
              {recent.length}
            </span>
          ) : null
        }
      >
        <div className="mb-2 flex items-center justify-end">
          <Link
            to="/history"
            className="text-xs text-brand-700 hover:underline dark:text-brand-300"
          >
            Hammasi →
          </Link>
        </div>

        {!recent || recent.length === 0 ? (
          <div className="text-xs text-ink-600 dark:text-slate-400 py-6 text-center">
            Hali yozuv yo‘q
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-slate-700">
            {recent.slice(0, 6).map((r) => (
              <li key={r._id}>
                <button
                  onClick={() => onRecentClick?.(r)}
                  className="w-full text-left py-2 hover:bg-gray-50 dark:hover:bg-slate-700/40 rounded-md px-1"
                >
                  <div className="flex items-center gap-2">
                    {r.label && (
                      <span className="inline-flex shrink-0 items-center rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                        {r.label}
                      </span>
                    )}
                    <div className="text-sm font-medium line-clamp-1 text-ink-800 dark:text-slate-100">
                      {r.name}
                    </div>
                  </div>
                  <div className="text-[11px] font-mono text-ink-600 dark:text-slate-400">
                    {r.latitude.toFixed(4)}, {r.longitude.toFixed(4)}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </CollapsibleCard>
    </aside>
  );
}
