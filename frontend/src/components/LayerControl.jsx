export default function LayerControl({ value, onChange }) {
  const options = [
    { id: 'osm', label: 'Xarita', icon: '🗺️' },
    { id: 'satellite', label: 'Sun’iy yo‘ldosh', icon: '🛰️' },
  ];

  return (
    <div className="absolute right-3 top-3 z-[400] flex rounded-xl bg-white/95 p-1 shadow-soft border border-gray-200 backdrop-blur">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
            value === o.id
              ? 'bg-brand-600 text-white shadow'
              : 'text-ink-700 hover:bg-gray-100'
          }`}
        >
          <span>{o.icon}</span>
          <span>{o.label}</span>
        </button>
      ))}
    </div>
  );
}
