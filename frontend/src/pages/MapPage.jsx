import { useCallback, useRef, useState } from 'react';
import MapView from '../components/MapView.jsx';
import SearchBox from '../components/SearchBox.jsx';
import Sidebar from '../components/Sidebar.jsx';
import CoordinateBadge from '../components/CoordinateBadge.jsx';
import useLocations from '../hooks/useLocations.js';
import { reverseGeocode } from '../services/geocoding.js';
import { analyzeLocation } from '../services/aiService.js';

export default function MapPage() {
  // selected: { lat, lng, name, at, label?, savedId? }
  const [selected, setSelected] = useState(null);
  const [reverseLoading, setReverseLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [flyTo, setFlyTo] = useState(null);
  const [label, setLabel] = useState('');

  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  const aiRequestId = useRef(0);

  const { items, add, update, load } = useLocations(true);

  const runAIAnalysis = useCallback(async (lat, lng) => {
    const reqId = ++aiRequestId.current;
    setAiLoading(true);
    setAiError(null);
    setAiAnalysis(null);
    try {
      const res = await analyzeLocation({ latitude: lat, longitude: lng });
      if (reqId !== aiRequestId.current) return;
      setAiAnalysis(res);
      return res;
    } catch (e) {
      if (reqId !== aiRequestId.current) return;
      setAiError(e.message || 'AI tahlilida xato');
    } finally {
      if (reqId === aiRequestId.current) setAiLoading(false);
    }
  }, []);

  // Yangi nuqta tanlash — AI faqat foydalanuvchi tugma bosganda ishga tushadi.
  const pickPoint = useCallback(
    async ({ lat, lng }, presetName) => {
      aiRequestId.current++; // davomdagi har qanday AI so'rovni bekor qilamiz
      setSelected({ lat, lng, name: presetName || '', at: Date.now() });
      setLabel('');
      setSaveError(null);
      setAiLoading(false);
      setAiError(null);
      setAiAnalysis(null);

      if (!presetName) {
        setReverseLoading(true);
        const name = await reverseGeocode(lat, lng);
        setSelected((prev) =>
          prev && prev.lat === lat && prev.lng === lng
            ? { ...prev, name: name || 'Noma’lum joy' }
            : prev
        );
        setReverseLoading(false);
      }
    },
    []
  );

  const handleMapClick = ({ lat, lng }) => pickPoint({ lat, lng });

  const handleSearchSelect = (item) => {
    setFlyTo({ lat: item.lat, lng: item.lon, zoom: 14 });
    pickPoint({ lat: item.lat, lng: item.lon }, item.name);
  };

  // Saqlangan joy bosilganda — AI avtomatik chaqirilmaydi.
  // Saqlangan tahlil bo'lsa, shuni ko'rsatamiz.
  const handleRecentClick = (r) => {
    aiRequestId.current++; // har qanday davomdagi so'rovni bekor qilamiz
    setFlyTo({ lat: r.latitude, lng: r.longitude, zoom: 14 });
    setSelected({
      lat: r.latitude,
      lng: r.longitude,
      name: r.name,
      at: new Date(r.createdAt).getTime(),
      label: r.label || '',
      savedId: r._id,
    });
    setLabel(r.label || '');
    setSaveError(null);
    setAiLoading(false);
    setAiError(null);
    setAiAnalysis(r.aiAnalysis || null);
  };

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    setSaveError(null);
    try {
      if (selected.savedId) {
        // mavjud joyni yangilash (label o'zgargan bo'lishi mumkin)
        const updated = await update(selected.savedId, {
          label: label.trim(),
          aiAnalysis: aiAnalysis || null,
        });
        setSelected((prev) =>
          prev && prev.savedId === updated._id
            ? { ...prev, label: updated.label || '' }
            : prev
        );
      } else {
        const created = await add({
          name: selected.name || 'Nomsiz joy',
          latitude: selected.lat,
          longitude: selected.lng,
          label: label.trim(),
          aiAnalysis: aiAnalysis || null,
        });
        if (created) {
          setSelected((prev) =>
            prev && prev.lat === created.latitude && prev.lng === created.longitude
              ? { ...prev, savedId: created._id, label: created.label || '' }
              : prev
          );
        }
      }
      await load();
    } catch (e) {
      setSaveError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleClear = () => {
    aiRequestId.current++;
    setSelected(null);
    setLabel('');
    setAiAnalysis(null);
    setAiError(null);
    setAiLoading(false);
  };

  const handleAIRetry = () => {
    if (selected) runAIAnalysis(selected.lat, selected.lng);
  };

  return (
    <div className="flex h-full min-h-0 flex-col lg:flex-row">
      <div className="relative flex-1 min-h-[55vh] lg:min-h-0">
        <SearchBox onSelect={handleSearchSelect} />
        <CoordinateBadge lat={selected?.lat} lng={selected?.lng} />

        <MapView
          marker={selected}
          savedMarkers={items}
          onMapClick={handleMapClick}
          flyTo={flyTo}
        />
      </div>

      <Sidebar
        selected={selected}
        reverseLoading={reverseLoading}
        onSave={handleSave}
        saving={saving}
        saveError={saveError}
        recent={items}
        onRecentClick={handleRecentClick}
        onClear={handleClear}
        label={label}
        onLabelChange={setLabel}
        aiLoading={aiLoading}
        aiError={aiError}
        aiAnalysis={aiAnalysis}
        onAIRetry={handleAIRetry}
      />
    </div>
  );
}
