import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce.js';
import { searchPlaces } from '../services/geocoding.js';

export default function SearchBox({ onSelect }) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounced = useDebounce(q, 450);

  useEffect(() => {
    let active = true;
    if (!debounced || debounced.trim().length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    searchPlaces(debounced)
      .then((r) => active && setResults(r))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [debounced]);

  function handleSelect(item) {
    setQ(item.name);
    setOpen(false);
    onSelect?.(item);
  }

  return (
    <div className="absolute left-1/2 top-3 z-[400] w-[92%] max-w-md -translate-x-1/2 sm:left-3 sm:translate-x-0">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
          </svg>
        </span>
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Joy nomi bo‘yicha qidirish (masalan, Toshkent)"
          className="w-full rounded-xl border border-gray-200 bg-white/95 py-2.5 pl-9 pr-9 text-sm shadow-soft outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
        {loading && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <span className="spinner dark" />
          </span>
        )}
        {!loading && q && (
          <button
            onClick={() => {
              setQ('');
              setResults([]);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            aria-label="Tozalash"
          >
            ✕
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <ul className="mt-1 max-h-72 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-soft">
          {results.map((r) => (
            <li key={r.id}>
              <button
                onClick={() => handleSelect(r)}
                className="flex w-full items-start gap-2 px-3 py-2 text-left text-sm hover:bg-brand-50"
              >
                <span className="mt-0.5 text-brand-600">📍</span>
                <span className="line-clamp-2">{r.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
