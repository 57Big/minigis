# miniGIS — Frontend Arxitekturasi

> **Loyiha:** miniGIS — interaktiv xarita asosida joy tanlash va AI tahlili platformasi (BMI ishi)
> **Joylashuvi:** `web/frontend/`
> **Til / Ramka:** JavaScript (ES Modules) + React 18 + Vite 5
> **Stil:** TailwindCSS 3 (dark mode `class` strategiyasi orqali)
> **Marshrutlash:** React Router v6
> **Xarita:** Leaflet 1.9 + React-Leaflet 4
> **HTTP:** Axios

---

## 1. Umumiy ko'rinish

`miniGIS` frontend SPA (Single Page Application) sifatida tuzilgan. Foydalanuvchi xaritada nuqta tanlaydi, dastur:

1. **Reverse-geocoding** orqali joy nomini aniqlaydi (OpenStreetMap Nominatim).
2. **Backend AI servisi** (`/api/ai/analyze-location`) orqali GPT yordamida hudud tahlilini oladi.
3. Foydalanuvchi tanlovni **MongoDB**'ga (backend orqali) saqlaydi va **Tarix** sahifasida ko'radi.

Frontend backend bilan REST API orqali (`VITE_API_URL`) muloqot qiladi.

---

## 2. Texnologik stek

| Qatlam | Texnologiya | Vazifasi |
|---|---|---|
| Build tool | **Vite 5** | Tezkor dev server, HMR, prod build |
| UI ramka | **React 18** | Komponentlar va state management |
| Marshrutlash | **react-router-dom v6** | SPA navigatsiyasi (`/`, `/map`, `/history`, `/about`, `*`) |
| Stil | **TailwindCSS 3** + PostCSS + Autoprefixer | Utility-first CSS, dark mode |
| Xarita | **leaflet** + **react-leaflet** | Interaktiv tile xarita, markerlar, layer control |
| HTTP | **axios** | Backend va Nominatim chaqiriqlari, interceptor orqali xato boshqaruvi |
| Geocoding | **OSM Nominatim** | Bepul forward/reverse geocoding |
| AI | Backend `/api/ai/*` (GPT) | Joy klassifikatsiyasi va tavsiyalari |

---

## 3. Loyiha tuzilmasi

```
frontend/
├── index.html               # Vite ilova kirish nuqtasi
├── package.json             # bog'liqliklar, skriptlar (dev/build/preview)
├── vite.config.js           # Vite konfiguratsiyasi (port 5173)
├── tailwind.config.js       # brand/ink ranglari, dark mode 'class'
├── postcss.config.js        # Tailwind + autoprefixer
├── public/                  # statik fayllar
└── src/
    ├── main.jsx             # ReactDOM root + BrowserRouter
    ├── App.jsx              # marshrutlar (Routes/Route)
    ├── index.css            # Tailwind base/components/utilities + global classlar
    ├── leafletIconFix.js    # Leaflet default icon URL fix
    │
    ├── layout/              # umumiy layout komponentlari
    │   ├── MainLayout.jsx   # Navbar + <Outlet/> + Footer
    │   ├── Navbar.jsx       # NavLink, mobil menyu, ThemeToggle
    │   └── Footer.jsx
    │
    ├── pages/               # Route-darajadagi sahifalar
    │   ├── HomePage.jsx     # Landing
    │   ├── MapPage.jsx      # Asosiy xarita + sidebar (orchestrator)
    │   ├── HistoryPage.jsx  # MongoDB yozuvlari jadvali
    │   ├── AboutPage.jsx
    │   └── NotFoundPage.jsx
    │
    ├── components/          # qayta ishlatiladigan UI bloklari
    │   ├── MapView.jsx           # MapContainer + 4 BaseLayer + Overlay + markerlar
    │   ├── SearchBox.jsx         # Nominatim qidiruv (debounce bilan)
    │   ├── CoordinateBadge.jsx   # tanlangan lat/lng ko'rsatish
    │   ├── Sidebar.jsx           # tanlov ma'lumotlari + saqlash + recent ro'yxat
    │   └── AIAnalysisPanel.jsx   # AI natijasi: klassifikatsiya, tavsiyalar, confidence
    │
    ├── hooks/               # custom React hooklari
    │   ├── useLocations.js  # CRUD: list/add/remove + loading/error
    │   ├── useDebounce.js   # qidiruv inputi uchun
    │   └── useTheme.js      # light/dark mode (localStorage + media query)
    │
    └── services/            # tashqi API qatlamlari
        ├── api.js               # axios instance + xato interceptor (BASE_URL: VITE_API_URL)
        ├── locationService.js   # GET/POST/DELETE /api/locations
        ├── geocoding.js         # Nominatim: reverseGeocode, searchPlaces
        └── aiService.js         # POST /api/ai/analyze-location, /api/ai/reverse-geocode
```

---

## 4. Qatlamlar arxitekturasi

```
┌───────────────────────────────────────────────────────────┐
│                     Pages (route-level)                   │
│        HomePage · MapPage · HistoryPage · AboutPage        │
└───────────────┬─────────────────────────┬─────────────────┘
                │                         │
                ▼                         ▼
┌────────────────────────┐    ┌──────────────────────────┐
│   Components (UI)      │    │     Hooks (logic)        │
│   MapView, Sidebar,    │◄───┤   useLocations,          │
│   SearchBox,           │    │   useDebounce, useTheme  │
│   AIAnalysisPanel...   │    └─────────────┬────────────┘
└────────────┬───────────┘                  │
             │                              │
             └──────────────┬───────────────┘
                            ▼
              ┌──────────────────────────────┐
              │   Services (data access)     │
              │  api.js (axios)              │
              │  locationService.js          │
              │  geocoding.js (Nominatim)    │
              │  aiService.js                │
              └──────────────┬───────────────┘
                             │
                ┌────────────┴────────────┐
                ▼                         ▼
       ┌────────────────┐      ┌──────────────────────┐
       │  Backend API   │      │  Nominatim (OSM)     │
       │  Express +     │      │  forward/reverse     │
       │  Mongo + AI    │      │  geocoding           │
       └────────────────┘      └──────────────────────┘
```

**Asosiy qoidalar:**
- **Pages** — biznes oqimlarni yig'adi (orchestration), keyin holatni Componentlarga uzatadi.
- **Components** — `props` orqali boshqariladi, mustaqil API chaqirmaydi (`SearchBox` faqat qidiruv uchun istisno).
- **Hooks** — qayta ishlatiladigan stateful logikani enkapsulyatsiya qiladi.
- **Services** — barcha tarmoq chaqiriqlari shu qatlam orqali o'tadi.

---

## 5. Marshrutlash sxemasi

`src/App.jsx`:

| Yo'l | Komponent | Tavsif |
|---|---|---|
| `/` | `HomePage` | Landing sahifa |
| `/map` | `MapPage` | Asosiy xarita + AI tahlil |
| `/history` | `HistoryPage` | Saqlangan yozuvlar jadvali |
| `/about` | `AboutPage` | Loyiha haqida |
| `/404` | `NotFoundPage` | Topilmagan sahifa |
| `*` | `Navigate → /404` | Fallback |

Hammasi `MainLayout` ichida (`Navbar` + `<Outlet/>` + `Footer`).

---

## 6. Asosiy oqim — `MapPage`

`MapPage` sahifasi to'rtta manbadan keladigan ma'lumotlarni boshqaradi:

```
                 ┌──────────────────┐
                 │  Xarita ustida   │
                 │  click / search  │
                 └────────┬─────────┘
                          │ {lat,lng}
                          ▼
              ┌───────────────────────┐
              │  pickPoint()          │
              │   1. selected state   │
              │   2. reverseGeocode   │  ← Nominatim
              │   3. runAIAnalysis    │  ← /api/ai/analyze-location
              └───────────┬───────────┘
                          │
        ┌─────────────────┼──────────────────┐
        ▼                 ▼                  ▼
  ┌──────────┐    ┌────────────────┐   ┌──────────────────┐
  │ Sidebar  │    │ AIAnalysisPanel│   │ MapView (marker) │
  │  selected│    │  loading/error │   │  flyTo, savedMrk │
  │  saqlash │    │  analysis      │   └──────────────────┘
  └────┬─────┘    └────────────────┘
       │ Saqlash
       ▼
  ┌────────────────┐         ┌──────────────────────┐
  │ useLocations() │ ──POST→ │ Backend /locations   │
  │  add(payload)  │ ←───────│  MongoDB             │
  └────────────────┘         └──────────────────────┘
```

**Race-condition himoyasi:** `aiRequestId` ref orqali — agar foydalanuvchi tezda boshqa nuqtaga bossa, eski AI javobi `setState`'ni chaqirmaydi.

---

## 7. State management strategiyasi

Loyiha **Redux/Zustand kabi global store ishlatmaydi**. Holat uchta darajada saqlanadi:

1. **Local component state** (`useState`) — UI holatlari (modal, qidiruv input).
2. **Hook-darajadagi state** (`useLocations`) — server cache, har bir sahifa o'z nusxasini yaratadi va `load()` orqali yangilaydi.
3. **DOM-darajadagi state** (`useTheme` + `localStorage`) — mavzu tanlovi.

> Bu yondashuv kichik loyiha uchun yetarli; kelajakda kengayganda `react-query` yoki `zustand` qo'shish tavsiya qilinadi.

---

## 8. Xizmatlar (services) qatlami

### `api.js` — markaziy axios instance
- `baseURL`: `import.meta.env.VITE_API_URL` yoki `http://localhost:5000/api` (fallback).
- `timeout`: 15 s.
- Response interceptor — xatolarni inson o'qiy oladigan `Error.message`'ga aylantiradi.

### `locationService.js`
| Funksiya | HTTP | Endpoint |
|---|---|---|
| `fetchLocations()` | GET | `/locations` |
| `createLocation(payload)` | POST | `/locations` |
| `deleteLocation(id)` | DELETE | `/locations/:id` |

### `aiService.js`
| Funksiya | HTTP | Endpoint |
|---|---|---|
| `analyzeLocation({lat, lon, addressData})` | POST | `/ai/analyze-location` |
| `reverseGeocodeAI({lat, lon})` | POST | `/ai/reverse-geocode` |

### `geocoding.js` — to'g'ridan-to'g'ri Nominatim'ga
- `reverseGeocode(lat, lon)` → `display_name`
- `searchPlaces(query, limit=6)` → `[{id, name, lat, lon, type}]`
- `Accept-Language: uz,en,ru` headeri.

---

## 9. Custom hooklar

### `useLocations(autoLoad = true)`
Qaytaradi: `{ items, loading, error, load, add, remove }`.
Optimistik emas — `add()` va `remove()` keyingi muvaffaqiyatdan so'ng `setItems`'ni yangilaydi.

### `useDebounce(value, delay = 400)`
`SearchBox` ichida 450 ms bilan ishlatiladi — Nominatim'ga ortiqcha so'rov ketmaydi.

### `useTheme()`
- Boshlang'ich qiymat: `localStorage` → `prefers-color-scheme` → `'light'`.
- `<html class="dark">` toggle qiladi (Tailwind `darkMode: 'class'` bilan mos).
- `colorScheme` CSS xususiyatini ham yangilaydi.

---

## 10. Xarita qatlamlari

`MapView.jsx` to'rtta **BaseLayer** va bitta **Overlay**'ni `LayersControl` orqali taqdim etadi:

| Qatlam | Provayder |
|---|---|
| 🗺️ OpenStreetMap | `tile.openstreetmap.org` |
| 🛰️ Satellite | Esri World Imagery |
| ⛰️ Terrain | OpenTopoMap |
| 🌑 Dark | Carto basemaps |
| 🏷️ Labels (overlay) | Esri Boundaries & Places |

`FlyController` — `flyTo` propga reaksiya qilib `map.flyTo()` chaqiradi (qidiruv yoki `recent` bosilganida silliq harakat).
`MapClickHandler` — `useMapEvents({click})` orqali `onMapClick` callback'ni chaqiradi.

---

## 11. Stil tizimi (Design system)

`tailwind.config.js`:
- **brand** — ko'k palitra (50–900), brend ranglari.
- **ink** — quyuq matn ranglari (600–900).
- **fontFamily.sans** — Inter, system-ui.
- **shadow.soft** / **shadow.card** — yumshoq kartalar uchun.
- **keyframes.fade-in-up** — paneldagi animatsiya.

`src/index.css`'da global komponent klasslari:
- `.btn-primary`, `.btn-ghost`, `.btn-danger`
- `.card`, `.input`, `.badge`, `.spinner`

**Dark mode** — `class` strategiyasida; har bir komponent `dark:bg-slate-*`, `dark:text-slate-*` variantlari bilan stillangan.

---

## 12. Build va environment

### Skriptlar (`package.json`)
- `npm run dev` — Vite dev server, port **5173**, `open: true`.
- `npm run build` — `dist/` papkasiga prod build.
- `npm run preview` — build natijasini lokal ko'rish.

### Environment o'zgaruvchilari
| Kalit | Maqsad | Default |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

> Vite faqat `VITE_*` prefiksli o'zgaruvchilarni klient kodga uzatadi.

---

## 13. Xato boshqaruvi

| Manba | Strategiya |
|---|---|
| Axios | `api.js` interceptor → `new Error(message)` |
| Komponent | Lokal `error` state, foydalanuvchiga toast/banner |
| Nominatim | `try/catch` ichida `null` / `[]` qaytaradi (jim fallback) |
| AI | `AIAnalysisPanel`'da banner + **Qayta urinish** tugmasi |
| Network race | `aiRequestId` ref bilan eskirgan javoblar tashlab yuboriladi |

---

## 14. Performans optimizatsiyalari

- **Code-splitting** — Vite avtomatik route-darajada bo'ladi (kerak bo'lsa `React.lazy` qo'shsa bo'ladi).
- **Debounce** — qidiruv uchun 450 ms.
- **Conditional render** — `marker && Number.isFinite(marker.lat)` orqali keraksiz Leaflet renderlardan qochish.
- **`useCallback`** — `MapPage` ichidagi callbacklar barqaror referensga ega.
- **`useMemo`** — `HistoryPage`'dagi qidiruv filtri.
- **CSS-only animatsiya** — Skeleton uchun `animate-pulse`, `fade-in-up`.

---

## 15. Kengaytirish bo'yicha tavsiyalar

1. **TypeScript**'ga ko'chirish — `services/` va `hooks/` darajalarida foyda katta.
2. **react-query / TanStack Query** — server-state cache, refetch, retry uchun.
3. **Marker clustering** — `leaflet.markercluster` (yozuvlar 100+ bo'lganda).
4. **Test** — Vitest + React Testing Library (hook va service darajasida).
5. **Auth** — `axios` interceptor orqali JWT (foydalanuvchi profilini qo'shganda).
6. **i18n** — `react-i18next` (uz/ru/en).
7. **Error boundary** — global xato tutuvchi komponent.
8. **PWA** — `vite-plugin-pwa` orqali offline xarita kesh.

---

## 16. Komponentlar bog'liqlik grafigi

```
main.jsx
 └─ <BrowserRouter>
     └─ App.jsx (Routes)
         └─ MainLayout
             ├─ Navbar ── useTheme
             ├─ <Outlet/>
             │   ├─ HomePage
             │   ├─ MapPage ─────────────────────────┐
             │   │   ├─ SearchBox ── useDebounce ── geocoding
             │   │   ├─ CoordinateBadge
             │   │   ├─ MapView (react-leaflet)
             │   │   └─ Sidebar
             │   │       └─ AIAnalysisPanel
             │   │   uses: useLocations, geocoding, aiService
             │   ├─ HistoryPage ── useLocations
             │   ├─ AboutPage
             │   └─ NotFoundPage
             └─ Footer
```

---

**Hujjat versiyasi:** 1.0
**Sana:** 2026-05-06
