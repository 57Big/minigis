export default function CoordinateBadge({ lat, lng }) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return (
    <div className="absolute bottom-3 left-1/2 z-[400] -translate-x-1/2 rounded-full bg-ink-900/85 px-3 py-1.5 text-xs font-mono text-white shadow-soft">
      lat: {lat.toFixed(5)} · lng: {lng.toFixed(5)}
    </div>
  );
}
