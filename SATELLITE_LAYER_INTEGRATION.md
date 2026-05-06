# MiniGIS Platformasida Satellite Layer Integratsiyasi

## 1. Umumiy ma'lumot

MiniGIS platformasida **sun'iy yo'ldosh (satellite) qatlami** foydalanuvchiga Yer yuzasining yuqori aniqlikdagi kosmik tasvirlarini ko'rish imkonini beradi. Integratsiya **client-side** (frontend) tomonida amalga oshirilgan bo'lib, [Esri ArcGIS World Imagery](https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer) ochiq tile xizmatidan foydalanadi. Backend tomonida satellite layer uchun alohida kod yoki proxy mavjud emas — barcha tile so'rovlari to'g'ridan-to'g'ri brauzerdan Esri serveriga yuboriladi.

## 2. Texnologik stek

| Qatlam        | Texnologiya              | Vazifasi                                     |
|---------------|--------------------------|----------------------------------------------|
| Xarita dvigateli | Leaflet                | Tile-based xarita render qilish              |
| React integratsiyasi | react-leaflet      | Leaflet komponentlarini React'ga moslash     |
| Tile manbai   | Esri World Imagery       | Sun'iy yo'ldosh tasvirlari (XYZ tile sxema)  |
| Qo'shimcha overlay | Esri Reference Labels | Ustiga shahar/davlat nomlari yozuvlari    |

## 3. Fayl tuzilmasi

Satellite layer integratsiyasi ikkita asosiy faylda joylashgan:

```
frontend/src/components/
├── MapView.jsx        # Leaflet xaritasi va BaseLayer'lar (qatlam ta'rifi)
└── LayerControl.jsx   # Foydalanuvchi tugmalari (qatlam tanlovi)
```

Ota komponent — `frontend/src/pages/HomePage.jsx` — ikki komponent o'rtasida `baseLayer` holatini boshqaradi.

## 4. Qatlam ta'rifi — `MapView.jsx`

Fayl: `frontend/src/components/MapView.jsx:59-65`

```jsx
<BaseLayer checked={baseLayer === 'satellite'} name="🛰️ Satellite (Esri)">
  <TileLayer
    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    attribution="Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics, GIS User Community"
    maxZoom={19}
  />
</BaseLayer>
```

### Parametrlar tahlili

| Parametr      | Qiymat                                                                 | Izoh                                                  |
|---------------|------------------------------------------------------------------------|-------------------------------------------------------|
| `checked`     | `baseLayer === 'satellite'`                                            | Prop orqali tashqaridan boshqariladi                  |
| `url`         | `.../World_Imagery/MapServer/tile/{z}/{y}/{x}`                         | XYZ sxema: `z` — zoom, `x`/`y` — tile koordinatalari |
| `attribution` | `Tiles © Esri — Source: Esri, Maxar...`                                | Litsenziya talabi bo'yicha majburiy                   |
| `maxZoom`     | `19`                                                                   | Esri'ning maksimal aniqlik darajasi                   |

### Xarita ichidagi boshqa qatlamlar

`MapView.jsx:50-90` da `LayersControl` ichida quyidagi qatlamlar e'lon qilingan:

- `BaseLayer` 🗺️ **OpenStreetMap** — standart xarita
- `BaseLayer` 🛰️ **Satellite (Esri)** — sun'iy yo'ldosh tasvirlari
- `BaseLayer` ⛰️ **Terrain (OpenTopoMap)** — relyef xaritasi
- `BaseLayer` 🌑 **Dark (Carto)** — qorong'i tema
- `Overlay` 🏷️ **Labels (Esri)** — joy nomlari (satellite ustiga qo'yiladigan ixtiyoriy qatlam)

## 5. Foydalanuvchi boshqaruvi — `LayerControl.jsx`

Fayl: `frontend/src/components/LayerControl.jsx`

```jsx
export default function LayerControl({ value, onChange }) {
  const options = [
    { id: 'osm', label: 'Xarita', icon: '🗺️' },
    { id: 'satellite', label: 'Sun’iy yo‘ldosh', icon: '🛰️' },
  ];

  return (
    <div className="absolute right-3 top-3 z-[400] flex rounded-xl bg-white/95 ...">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`... ${value === o.id ? 'bg-brand-600 text-white' : '...'}`}
        >
          <span>{o.icon}</span>
          <span>{o.label}</span>
        </button>
      ))}
    </div>
  );
}
```

### Asosiy xususiyatlari

- **Ikki opsiya:** `osm` (oddiy xarita) va `satellite` (sun'iy yo'ldosh)
- **Boshqarilgan komponent (controlled):** `value` va `onChange` proplari orqali ota komponent state'iga bog'langan
- **Joylashuvi:** xarita ustida o'ng-yuqori burchak (`absolute right-3 top-3`)
- **z-index:** `z-[400]` — Leaflet ichki elementlaridan ustun turishi uchun

## 6. Ma'lumotlar oqimi (Data Flow)

```
┌────────────────────┐
│   HomePage.jsx     │  baseLayer state ('osm' | 'satellite')
│  (ota komponent)   │
└─────────┬──────────┘
          │
          ├── value=baseLayer ──────► ┌─────────────────────┐
          │                           │  LayerControl.jsx   │
          │                           │  (tugmalar paneli)  │
          │ ◄─── onChange(id) ────────┤                     │
          │                           └─────────────────────┘
          │
          └── baseLayer={...} ──────► ┌─────────────────────┐
                                      │     MapView.jsx     │
                                      │  (Leaflet xarita)   │
                                      │                     │
                                      │  BaseLayer checked  │
                                      │  bo'yicha tile yuk- │
                                      │  laydi (Esri/OSM)   │
                                      └─────────────────────┘
```

### Bosqichlar

1. **Foydalanuvchi** `LayerControl` da 🛰️ tugmasini bosadi.
2. `onChange('satellite')` chaqiriladi — `HomePage` da `setBaseLayer('satellite')` ishga tushadi.
3. React qayta render qiladi: `MapView` ga yangi `baseLayer="satellite"` propi yetadi.
4. `MapView` ichida `BaseLayer` ning `checked={baseLayer === 'satellite'}` shartida `true` bo'ladi.
5. Leaflet o'zining `LayersControl` mexanizmi orqali avvalgi tile'larni o'chirib, Esri serveridan yangi tile'larni yuklaydi:
   `GET https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`
6. Tile tasvirlari brauzer keshida saqlanadi (HTTP-cache).

## 7. Tashqi xizmat: Esri World Imagery

| Xususiyat            | Qiymat                                                            |
|----------------------|-------------------------------------------------------------------|
| Xizmat URL           | `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer` |
| Tile sxemasi         | XYZ (Web Mercator, EPSG:3857)                                     |
| Maksimal zoom        | 19                                                                |
| Format               | JPEG / PNG                                                        |
| Litsenziya           | Bepul, atribut majburiy (Esri, Maxar, Earthstar Geographics)      |
| API kalit            | Talab qilinmaydi (anonim foydalanish)                             |
| Kvota / Rate-limit   | Rasmiy hujjatda qattiq cheklov yo'q, lekin "fair use" siyosati amal qiladi |

## 8. Kuchli va zaif tomonlari

### Afzalliklari
- ✅ Backend talab qilmaydi — sodda integratsiya
- ✅ API kalit kerak emas
- ✅ Yuqori sifatli global qamrov (Maxar, ~0.3 m aniqlik shahar joylarida)
- ✅ Leaflet'ning standart `LayersControl` mexanizmi bilan to'liq mos

### Cheklovlari
- ⚠️ **Internetga to'liq bog'liq** — offline rejim ishlamaydi
- ⚠️ **Tile yangilanish sanasi nazoratga olinmagan** — eski tasvirlar ko'rsatilishi mumkin
- ⚠️ **Esri ToS o'zgarishi** — kelajakda kvota yoki kalit talab etilishi mumkin
- ⚠️ **CORS / blokirovka xavfi** — ba'zi mintaqalarda Esri serveriga kirish cheklangan bo'lishi mumkin

## 9. Kengaytirish bo'yicha tavsiyalar

Agar boshqa satellite manbalarini qo'shmoqchi bo'lsangiz:

### Variant A — Yandex Sputnik (Markaziy Osiyo uchun yaxshi qamrov)
`MapView.jsx` ga yangi `BaseLayer` qo'shing:

```jsx
<BaseLayer name="🛰️ Yandex Sputnik">
  <TileLayer
    url="https://core-sat.maps.yandex.net/tiles?l=sat&x={x}&y={y}&z={z}"
    attribution="&copy; Yandex"
    maxZoom={19}
  />
</BaseLayer>
```
> ⚠️ Yandex tile xizmati rasmiy ravishda ochiq emas — ishlab chiqarishda litsenziya tekshiruvi tavsiya etiladi.

### Variant B — Mapbox Satellite (yuqori sifat, kalit talab qiladi)
```jsx
<BaseLayer name="🛰️ Mapbox Satellite">
  <TileLayer
    url={`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`}
    attribution="&copy; Mapbox &copy; OpenStreetMap"
    tileSize={512}
    zoomOffset={-1}
    maxZoom={22}
  />
</BaseLayer>
```
Token'ni `frontend/.env` faylida `VITE_MAPBOX_TOKEN` sifatida saqlang.

### Variant C — Sentinel-2 (yangi, bepul, lekin sekinroq)
EU Copernicus dasturidan:
```
https://services.sentinel-hub.com/ogc/wmts/{INSTANCE_ID}?...
```
Bu yerda `LayerControl.jsx` ga ham yangi opsiya qo'shish kerak:
```jsx
{ id: 'sentinel', label: 'Sentinel-2', icon: '🛰️' }
```

### Variant D — Bir nechta sun'iy yo'ldosh manbasini birgalikda taklif qilish
`LayerControl` ni dropdown'ga aylantirib, `satellite-esri`, `satellite-yandex`, `satellite-mapbox` kabi alohida ID'lar bilan boshqarish.

## 10. Sinov (Test) bosqichlari

1. Frontend dev serverni ishga tushiring:
   ```bash
   cd frontend
   npm run dev
   ```
2. Brauzerda `http://localhost:5173` ni oching.
3. Xarita o'ng-yuqori burchakdagi 🛰️ tugmasini bosing.
4. Tasvir Esri sun'iy yo'ldosh tile'lariga almashishini tekshiring.
5. DevTools → Network → `tile/` so'rovlari `arcgisonline.com` ga ketayotganiga ishonch hosil qiling.
6. Zoom darajasini 1 dan 19 gacha o'zgartirib, har bir darajada tile yuklanishini tasdiqlang.
7. Leaflet ichki `LayersControl` (o'ng-yuqori, ⚙️ ikona) orqali Labels overlay'ini yoqib, joy nomlari sun'iy yo'ldosh tasviri ustida ko'rinishini tekshiring.

## 11. Bog'liq fayllar

| Fayl                                            | Vazifa                                |
|-------------------------------------------------|---------------------------------------|
| `frontend/src/components/MapView.jsx`           | Leaflet xaritasi va BaseLayer'lar     |
| `frontend/src/components/LayerControl.jsx`      | Qatlam tanlash tugmalari              |
| `frontend/src/pages/HomePage.jsx`               | `baseLayer` state'ini boshqaradi      |
| `FRONTEND_ARCHITECTURE.md`                      | Umumiy frontend arxitekturasi         |
| `FUNC_ARCHITECTURE.md`                          | Funksional arxitektura tavsifi        |
