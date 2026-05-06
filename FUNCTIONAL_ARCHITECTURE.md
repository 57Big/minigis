# miniGIS — Umumiy Funksional Arxitektura

> **Loyiha:** miniGIS — interaktiv xarita asosida joy tanlash, sun'iy yo'ldosh tasvirini ko'rsatuvchi va sun'iy intellekt yordamida hudud tahlilini amalga oshiruvchi GIS platformasi
> **Turi:** BMI (Bitiruv malakaviy ishi)
> **Joylashuvi:** `web/`
> **Sana:** 2026-05-06
> **Versiya:** 1.0

---

## 1. Tizimning maqsadi va g'oyasi

`miniGIS` — bu **veb-asoslangan geografik axborot tizimi (GIS)** bo'lib, foydalanuvchiga xarita ustida istalgan nuqtani tanlash va u haqida **sun'iy intellekt orqali** chuqur tahlil olish imkonini beradi.

**Asosiy biznes-maqsadlari:**

1. Foydalanuvchiga xaritada nuqta tanlash orqali joy haqida zudlik bilan **tahliliy ma'lumot** yetkazib berish.
2. Bir nechta xarita qatlamlari (OSM, sun'iy yo'ldosh, relyef, tungi) o'rtasida moslashuvchan **ko'rinish almashtirish**.
3. **GPT-4o** orqali joyning klassifikatsiyasi, mintaqaviy mansubligi, relyefi va tavsiya etilgan foydalanish sohalarini avtomatik aniqlash.
4. Tanlangan joylarni **tarix sifatida** saqlash, qayta ko'rish va boshqarish.

**Akademik maqsad:** Talaba zamonaviy veb-stack (React + Node.js + MongoDB), tashqi GIS-API'lari (OSM, Esri) va LLM-integratsiyasini bir loyihada birlashtirib, **AI-asoslangan GIS** ilovasini ishlab chiqishni amaliy tarzda namoyish etadi.

---

## 2. Foydalanuvchilar va aktyorlar

| Aktyor | Tavsif | Tizimga ta'siri |
|---|---|---|
| 🧑 **Oxirgi foydalanuvchi** | Talaba, tadqiqotchi, geografiya bilan qiziquvchi | Xarita orqali joy tanlaydi, AI tahlili oladi, saqlaydi |
| 🤖 **OpenAI GPT-4o** | LLM (tashqi xizmat) | Joy haqida tabiiy tilda tahlil va JSON-strukturalangan tasnif qaytaradi |
| 🗺️ **OpenStreetMap Nominatim** | Geocoding xizmati | Forward (nomdan koordinata) va reverse (koordinatadan nom) geocoding |
| 🛰️ **Tile providerlari** | OSM, Esri, OpenTopoMap, CARTO | Xarita rasterlarini taqdim etadi |
| 💾 **MongoDB** | Ma'lumotlar bazasi (ichki) | Saqlangan joylarni va AI natijalarini xotirada saqlaydi |

> Hozirda **autentifikatsiya yo'q** — barcha foydalanuvchilar anonim, lekin har IP uchun **rate-limit** qo'llaniladi.

---

## 3. Yuqori darajadagi arxitektura

```
                 ┌──────────────────────────────────────────────┐
                 │                FOYDALANUVCHI                 │
                 │            (brauzer, port 5173)              │
                 └──────────────────────┬───────────────────────┘
                                        │ HTTPS / HTTP (REST + JSON)
                                        ▼
       ┌────────────────────────────────────────────────────────────┐
       │                       FRONTEND (SPA)                        │
       │   React 18 · Vite 5 · Tailwind · React-Leaflet · Axios       │
       │                                                              │
       │   Pages → Components → Hooks → Services                      │
       └──────────┬──────────────────────────────────────┬───────────┘
                  │                                      │
                  │ /api/locations  /api/ai/*           │ Nominatim
                  │ (Backend)                            │ (forward search)
                  ▼                                      ▼
       ┌──────────────────────────┐        ┌──────────────────────────┐
       │      BACKEND (REST)       │        │   OpenStreetMap          │
       │   Node.js + Express 4     │        │   Nominatim API          │
       │   (port 5000)             │        └──────────────────────────┘
       │                            │
       │   Routes → Controllers     │        ┌──────────────────────────┐
       │   → Services / AI domain   │───────►│   OpenAI Chat            │
       └──────┬─────────────────────┘        │   Completions            │
              │                              │   (gpt-4o-mini, JSON)    │
              ▼                              └──────────────────────────┘
       ┌──────────────────────────┐
       │   MongoDB (Mongoose)      │
       │   miniGIS / locations     │
       └──────────────────────────┘
```

**Tizim uchta mantiqiy zona'ga bo'linadi:**

1. **Klient zonasi** — brauzerdagi React SPA (xarita, sidebar, AI paneli, tarix).
2. **Server zonasi** — Express REST API + MongoDB (CRUD, AI orchestration).
3. **Tashqi xizmatlar zonasi** — OpenAI, Nominatim, tile-provayderlar.

---

## 4. Funksional modullar

Tizim **5 ta asosiy funksional modul**dan iborat. Har biri o'zining mas'uliyat sohasiga ega va boshqa modullar bilan aniq belgilangan interfeyslar orqali muloqot qiladi.

### 4.1 Xarita modulі (Map module)

**Mas'uliyati:** Foydalanuvchiga interaktiv xarita ko'rsatish, qatlamlarni almashtirish, nuqta bosish/qidirish hodisalarini qabul qilish.

**Asosiy funksiyalari:**
- 4 ta tile-qatlam o'rtasida almashtirish (OSM, Satellite, Terrain, Dark).
- Labels overlay (joy nomlarini sun'iy yo'ldosh ustiga yopishtirish).
- Xaritada bosish (`click`) → koordinatani chiqarish.
- Tashqaridan kelgan nuqtaga **flyTo** animatsiyasi bilan o'tish.
- Saqlangan joylar va tanlangan joy uchun marker chizish.

**Komponentlar:** `MapView.jsx`, `FlyController`, `MapClickHandler` (frontendda).

### 4.2 Qidiruv va geocoding modulі

**Mas'uliyati:** Foydalanuvchidan kelgan matnli so'rovni koordinatalarga, koordinatani esa joy nomiga aylantirish.

**Funksiyalari:**
- **Forward geocoding:** Foydalanuvchi kiritgan matnni Nominatim'ga yuborib, `[{name, lat, lon, type}]` ro'yxatini qaytarish (avtomatik to'ldirish).
- **Reverse geocoding (klient):** UI uchun joy nomini olish.
- **Reverse geocoding (server):** AI uchun strukturalangan address (country, region, city, …).
- Debounce (450 ms) — Nominatim'ga ortiqcha so'rov yubormaslik.

**Komponentlar / fayllar:**
- Frontend: `SearchBox.jsx`, `services/geocoding.js`, `useDebounce`.
- Backend: `services/geocodingService.js`.

### 4.3 AI tahlil modulі (Location intelligence)

**Mas'uliyati:** Tanlangan koordinata haqida GPT yordamida tabiiy tilda va strukturalangan formatda tahlil yaratish.

**Bajaradigan ish:**
1. Koordinatani Nominatim'ga uzatadi (agar address kelmagan bo'lsa).
2. **System + user prompt** quradi — Nominatim ma'lumotlarini va koordinatani strukturalangan ravishda kiritadi.
3. OpenAI Chat Completions API'ga **JSON mode**'da so'rov yuboradi.
4. Javobni parse qiladi, normallashtiradi (`confidence` 0..1, `suggestedUsage[]`).
5. `coordinates` va `geocoding` ma'lumotlari bilan birga klientga qaytaradi.

**Chiqish JSON sxemasi:**
```json
{
  "classification": "shahar | qishloq | tabiiy hudud | ...",
  "country": "...",
  "region": "...",
  "district": "...",
  "placeName": "...",
  "description": "ilmiy uslubda 2–3 jumla",
  "suggestedUsage": ["yashash", "savdo", "transport", ...],
  "terrain": "tekislik | tog'lik | ...",
  "confidence": 0.86
}
```

**Komponentlar:**
- Backend: `ai/locationAnalyzer.js`, `ai/prompts.js`, `services/openaiService.js`, `controllers/aiController.js`.
- Frontend: `AIAnalysisPanel.jsx`, `services/aiService.js`.

**Himoya choralari:** rate-limit (20 req/min), API key faqat serverda, JSON mode, gallyutsinatsiyaga qarshi *"noma'lum"* qoidasi prompt ichida.

### 4.4 Joylar boshqaruvi modulі (Locations CRUD)

**Mas'uliyati:** Tanlangan joylarni MongoDB'da saqlash, ro'yxatlash, o'chirish.

**Funksiyalari:**
- `POST /api/locations` — yangi yozuv (AI natijasi bilan birga ham qabul qiladi).
- `GET /api/locations` — oxirgi 500 yozuv, `createdAt: -1` bo'yicha.
- `GET /api/locations/:id` — bitta yozuv.
- `PATCH /api/locations/:id` — `name`, `note`, `label`, `aiAnalysis` ni yangilash.
- `DELETE /api/locations/:id` — o'chirish.

**Saqlanadigan ma'lumot strukturasi:**
```
Location {
  _id, name, latitude, longitude,
  note?, label?, aiAnalysis?,
  createdAt, updatedAt
}
```

**Validatsiya 4 darajada:** Frontend → Controller → Mongoose Schema → MongoDB.

**Komponentlar:**
- Backend: `models/Location.js`, `controllers/locationController.js`, `routes/locationRoutes.js`, `utils/validate.js`.
- Frontend: `services/locationService.js`, `hooks/useLocations.js`, `pages/HistoryPage.jsx`, `components/Sidebar.jsx`.

### 4.5 Foydalanuvchi interfeysi va navigatsiya modulі

**Mas'uliyati:** Sahifalararo navigatsiya, layout, mavzu (light/dark), umumiy UI komponentlari.

**Sahifalar:**
| Yo'l | Sahifa | Maqsad |
|---|---|---|
| `/` | HomePage | Landing — loyiha haqida tasavvur |
| `/map` | MapPage | Asosiy ish maydoni — xarita + AI |
| `/history` | HistoryPage | Saqlangan joylar jadvali, qidiruv, o'chirish |
| `/about` | AboutPage | Texnologik stek, AI imkoniyatlari |
| `*` | NotFoundPage | 404 |

**Mavzu (theme):** `useTheme` hook + Tailwind `darkMode: 'class'`. Birinchi yuklanishda `localStorage` → `prefers-color-scheme` → default.

---

## 5. Funksional talablar (Functional Requirements)

| ID | Talab | Modul | Status |
|---|---|---|---|
| FR-01 | Foydalanuvchi xaritada istalgan nuqtani sichqoncha bilan tanlay olishi kerak | Map | ✅ |
| FR-02 | Tizim 4 ta turli xarita qatlamini taklif qilishi kerak (OSM, Satellite, Terrain, Dark) | Map | ✅ |
| FR-03 | Foydalanuvchi joy nomi bo'yicha qidirib, xaritada uni topishi mumkin | Search | ✅ |
| FR-04 | Tanlangan koordinata avtomatik joy nomiga aylanishi kerak (reverse geocoding) | Search | ✅ |
| FR-05 | Tizim AI yordamida joyning klassifikatsiyasini, davlat/viloyatini, relyefini va tavsiya etilgan foydalanishini aniqlashi kerak | AI | ✅ |
| FR-06 | AI natijasi `confidence` koeffitsiyenti (0..1) bilan birga taqdim etilishi kerak | AI | ✅ |
| FR-07 | Foydalanuvchi tanlangan joyni izoh va belgi (label) bilan saqlay olishi kerak | CRUD | ✅ |
| FR-08 | Saqlangan joylar tarix sahifasida ko'rinishi va o'chirilishi mumkin | CRUD | ✅ |
| FR-09 | Foydalanuvchi mavzu (light/dark) tanlay olishi kerak va u qayta yuklashda saqlanadi | UI | ✅ |
| FR-10 | Tarix sahifasida nom yoki izoh bo'yicha qidiruv ishlashi kerak | UI | ✅ |
| FR-11 | AI xatolarida foydalanuvchiga **Qayta urinish** imkoniyati taqdim etilishi kerak | AI | ✅ |
| FR-12 | Tizim API kalitlarni klientga **chiqarmasligi** kerak | Sec | ✅ |

---

## 6. Funksional bo'lmagan talablar (NFR)

| Kategoriya | Talab |
|---|---|
| **Ishonchlilik** | OpenAI API kalit yo'q bo'lsa AI xizmati 503 qaytaradi, lekin xarita va CRUD ishlashda davom etadi |
| **Xavfsizlik** | API kalitlar `.env`'da; CORS oq ro'yxat; AI uchun rate-limit (20 req/min); JSON body limit 1 MB |
| **Mahalliylashtirish** | Asosiy til — **o'zbek tili (lotin)**; Nominatim `Accept-Language: uz,en,ru` |
| **Performans** | Qidiruv `debounce` 450 ms; oxirgi 500 yozuv pagination'siz; JSON mode AI sustlikini kamaytiradi |
| **UX** | Skeleton loaderlar; race-safe AI (`aiRequestId`); silliq `flyTo` animatsiya; responsive layout |
| **Kuzatuvchanlik** | `morgan('dev')` so'rov loglari; OpenAI xatolari tarjima qilinadi |
| **Akademiklik** | Hujjatlangan kod, `.env.example`, `README.md`, ikkita arxitektura hujjati |

---

## 7. Asosiy biznes oqimlari (Use Cases)

### UC-01 — Xaritada nuqta tanlash va AI tahlili olish

```
[Foydalanuvchi]                  [Frontend]                      [Backend]                  [Tashqi xizmatlar]
     │                                │                                │                             │
     │ Xaritada bosadi                │                                │                             │
     │───────────────────────────────►│                                │                             │
     │                                │ pickPoint(lat,lng)             │                             │
     │                                │───────► reverseGeocode ───────────────────────────────────►  Nominatim
     │                                │ ◄─────────── displayName ─────────────────────────────────── │
     │                                │                                │                             │
     │                                │ POST /api/ai/analyze-location  │                             │
     │                                │───────────────────────────────►│                             │
     │                                │                                │ buildPrompt + chatJSON ───► OpenAI
     │                                │                                │ ◄──────── JSON tahlil ────  │
     │                                │ ◄────── {success,data} ────────│                             │
     │                                │                                │                             │
     │ AI panel + marker ko'radi      │                                │                             │
     │ ◄──────────────────────────────│                                │                             │
```

### UC-02 — Joyni saqlash

```
[Foydalanuvchi] → "Saqlash" tugmasi → useLocations.add(payload)
                                      │
                                      ▼
                         POST /api/locations { name, lat, lng, aiAnalysis }
                                      │
                                      ▼
                         Mongoose validatsiya + insert → MongoDB
                                      │
                                      ▼
                         { success: true, data: {...} } → ro'yxatni yangilash
```

### UC-03 — Saqlanganlardan birini ochish va ko'rish

```
[Foydalanuvchi] → /history → useLocations.load()
                                      │
                                      ▼
                         GET /api/locations → MongoDB find().sort({createdAt:-1}).limit(500)
                                      │
                                      ▼
                         Jadvalda ko'rsatish → Qidiruv (useMemo filter) → "Xaritada ko'rish" tugmasi
                                      │
                                      ▼
                         /map?lat=...&lng=... yoki state orqali flyTo
```

### UC-04 — Qidiruv orqali joy topish

```
[Foydalanuvchi] → SearchBox'ga matn yozadi → useDebounce(450ms)
                                      │
                                      ▼
                         Nominatim search?q=... → [{name, lat, lon}]
                                      │
                                      ▼
                         Foydalanuvchi tanlaydi → flyTo → pickPoint() → UC-01 oqimi
```

### UC-05 — AI xatosi bo'lganda qayta urinish

```
[OpenAI 429] → aiController → 429 + xabar
            ▼
[Frontend] → AIAnalysisPanel.error → "Qayta urinish" tugmasi
            ▼
[Foydalanuvchi bosadi] → runAIAnalysis(lat,lng) qaytadan chaqiriladi
```

---

## 8. Ma'lumotlar oqimi (Data flow)

### 8.1 Klient → Server → MongoDB (saqlash)

```
Brauzer  ──(JSON)──►  Express  ──(Mongoose ODM)──►  MongoDB
   ▲                     │
   │                     ▼
   └────────  { success, data }  ◄────  Mongoose hujjat
```

### 8.2 Klient → Server → OpenAI (AI tahlili)

```
Brauzer ──► Express /api/ai ──► rateLimit ──► aiController ──► analyzeLocation()
                                                                   │
                                       ┌───────────────────────────┤
                                       ▼                           ▼
                                 Nominatim                   OpenAI Chat (JSON mode)
                                       │                           │
                                       └────────► normalizeAnalysis ◄─────
                                                          │
                                                          ▼
                                                  Brauzer'ga JSON
```

### 8.3 Klient → Nominatim (qidiruv)

Frontend qidiruv uchun **bevosita** Nominatim'ga murojaat qiladi (server o'rta bo'g'in emas) — `Accept-Language: uz,en,ru` headeri bilan.

```
Brauzer ──► nominatim.openstreetmap.org/search?q=...
        ◄── [{display_name, lat, lon, ...}]
```

> Reverse geocoding **AI uchun** server-side bajariladi, chunki promptga to'liq strukturalangan ma'lumot kerak; UI uchun esa to'g'ridan-to'g'ri klientdan ham chaqirilishi mumkin.

---

## 9. Integratsiyalar va shartnomalar

| Tashqi xizmat | Protokol | Maqsad | Cheklov |
|---|---|---|---|
| **OpenAI Chat Completions** | HTTPS REST (`openai` SDK) | Joy tahlili (LLM) | Tariflanadi (token), API kalit, rate-limit |
| **Nominatim (OSM)** | HTTPS REST | Forward + reverse geocoding | **Usage policy:** User-Agent majburiy, ≤1 req/sec |
| **OSM tile** | HTTPS (raster tiles) | Asosiy xarita qatlami | Attribution majburiy |
| **Esri World Imagery** | HTTPS (tiles) | Sun'iy yo'ldosh qatlami | Attribution majburiy |
| **OpenTopoMap** | HTTPS (tiles) | Relyef qatlami | CC-BY-SA, attribution |
| **CARTO basemaps** | HTTPS (tiles) | Tungi qatlam | Attribution |

**API shartnoma formati (backend):** Barcha javoblar yagona formatda — `{ success: boolean, data?: any, message?: string }`.

---

## 10. Ichki komponentlar bog'liqligi

```
                      ┌───────────────────────────────────────┐
                      │         FRONTEND (web/frontend)        │
                      │                                        │
                      │  Pages   ─►  Components  ─►  Hooks     │
                      │                              │         │
                      │                              ▼         │
                      │                          Services      │
                      └───────────┬────────────────────────────┘
                                  │ HTTP (axios)
                                  ▼
                      ┌──────────────────────────────────────────┐
                      │         BACKEND (web/backend)             │
                      │                                           │
                      │  Routes ─► Controllers                    │
                      │              │                            │
                      │              ├─► Models (Mongoose)        │
                      │              │       └─► MongoDB          │
                      │              │                            │
                      │              ├─► Services (OpenAI)        │
                      │              │       └─► OpenAI API       │
                      │              │                            │
                      │              ├─► Services (Geocoding)     │
                      │              │       └─► Nominatim        │
                      │              │                            │
                      │              └─► AI domain (analyzer +    │
                      │                   prompts)                │
                      └──────────────────────────────────────────┘
```

---

## 11. Tizimning chegaralari (System boundaries)

**Tizim ichida (in scope):**
- Veb-ilova (klient + server) bitta domain orqali ishga tushadi.
- MongoDB lokal yoki Atlas'da (mehmon talabi).
- AI faqat tahlil sifatida; LLM bilan suhbat (chat) hozircha **yo'q**.
- Faqat **single-user** rejimi (autentifikatsiya yo'q).

**Tizim tashqarisida (out of scope):**
- Mobil ilova (faqat web responsive).
- Foydalanuvchi profillari, ro'yxatdan o'tish.
- Hudud chegaralari (polygon) yoki GeoJSON yuklash.
- Real-time hamkorlik (websocket).
- O'lchov vositalari (masofa, maydon).
- Offline rejim / PWA.

---

## 12. Konfiguratsiya va deploy modeli

**Hozirgi (development):**
```
Brauzer (5173)  ──►  Vite dev server (HMR)
                       │
                       └─►  /api/* → Backend (5000) → MongoDB (27017) + OpenAI/Nominatim
```

**Tavsiya etilgan production layout:**
```
                ┌────────────────────────────────────┐
                │   Reverse proxy (nginx / Caddy)    │
                │   /         → static dist/         │
                │   /api/*    → backend:5000         │
                └──────────────┬─────────────────────┘
                               │
              ┌────────────────┴───────────┐
              ▼                             ▼
      ┌────────────────┐          ┌──────────────────┐
      │ Frontend dist/ │          │  Backend Node    │
      │ (Vite build)   │          │  pm2 / Docker    │
      └────────────────┘          └────────┬─────────┘
                                           ▼
                                  ┌──────────────────┐
                                  │  MongoDB Atlas   │
                                  └──────────────────┘
```

**Konfiguratsiya manbalari:**
- Backend: `web/backend/.env` (PORT, MONGO_URI, CLIENT_ORIGIN, OPENAI_API_KEY, OPENAI_MODEL, AI_RATE_LIMIT_PER_MIN, NOMINATIM_USER_AGENT).
- Frontend: `web/frontend/.env` (VITE_API_URL).

---

## 13. Sifat atributlari (Quality attributes)

| Atribut | Loyihaviy yechim |
|---|---|
| **Maintainability** | 4 qatlamli arxitektura (routes / controllers / services / models); fayllar bir mas'uliyatga ega |
| **Extensibility** | AI domeni alohida (`ai/`); yangi prompt yoki yangi model qo'shish — bir nechta funksiyaga tegmasdan |
| **Testability** | Services qatlami pure-funksional; controllerlarni Supertest bilan sinash mumkin |
| **Security** | API kalitlar serverda; CORS, rate-limit, JSON limit, validation, `ObjectId.isValid` |
| **Reliability** | Backend MongoDB ulanmasa ishga tushmaydi; OpenAI bo'lmasa AI 503 (boshqa funksiyalar ishlaydi) |
| **Usability** | Dark/light mode, debounce qidiruv, skeleton loader, race-safe AI, klaviatura navigatsiyasi |
| **Localization** | UI butunlay o'zbek tilida; Nominatim'da `uz,en,ru` qabul qilinadi |

---

## 14. Risklar va cheklovlar

| Risk | Ta'siri | Yumshatuvchi chora |
|---|---|---|
| OpenAI API kalit muddati tugashi | AI tahlil ishlamaydi | 503 + tushunarli xabar; CRUD va xarita ishlayveradi |
| Nominatim 1 req/sec policy | Qidiruv buzilishi | Debounce 450 ms + `User-Agent` jo'natish |
| LLM gallyutsinatsiya | Noto'g'ri AI tahlili | Prompt ichida *"noma'lum"* qoidasi + `confidence` ko'rsatish |
| Tile-server rate limit | Xaritada bo'sh kvadratlar | 4 ta provayder o'rtasida tanlov; brauzer kesh |
| Token xarajatlari | Pul xarajati o'sishi | `gpt-4o-mini` default; rate-limit; kelajakda Redis kesh |
| Autentifikatsiya yo'qligi | Hammada bir tarix ko'rinadi | Akademik scope; kelajakda JWT qo'shish rejalashtirilgan |

---

## 15. Kelajakdagi rivojlanish bosqichlari (Roadmap)

| Bosqich | Yangiliklar |
|---|---|
| **v1.1** | Marker clustering, qidiruv autocomplete, /map URL parametrlari |
| **v1.2** | Autentifikatsiya (JWT) + foydalanuvchi profillari |
| **v1.3** | AI natijalarini Redis'da kesh (10 min TTL); 2dsphere geo-indeks |
| **v1.4** | LLM bilan **suhbat rejimi** (chat) — joy haqida savol-javob |
| **v1.5** | Polygon chizish, hudud bo'yicha tahlil (`area-aware`) |
| **v2.0** | Mobil PWA + offline xarita keshi; ko'p tilli (uz/ru/en) |

---

## 16. Hujjatlar to'plami

| Hujjat | Maqsad |
|---|---|
| `README.md` | Tezkor boshlash, REST API ro'yxati, foydalanuvchi qo'llanmasi |
| `BACKEND_ARCHITECTURE.md` | Server qatlami, MongoDB sxemasi, AI oqimi, middleware |
| `FRONTEND_ARCHITECTURE.md` | SPA tuzilmasi, hooklar, state strategiyasi, xarita modulі |
| **`FUNCTIONAL_ARCHITECTURE.md`** | **Umumiy tizim ko'rinishi (mazkur hujjat)** |

---

## 17. Xulosa

`miniGIS` — **klassik 3-qatlamli (klient ↔ server ↔ DB)** veb-arxitekturani **AI integratsiyasi** va **tashqi GIS-xizmatlari** bilan kengaytirgan zamonaviy ta'lim loyihasidir. Funksional jihatdan u 5 ta mustaqil modulga bo'lingan (xarita, qidiruv, AI tahlil, joylar boshqaruvi, UI/navigatsiya), ularning har biri aniq mas'uliyatga ega va REST API hamda servis qatlami orqali bog'langan.

Arxitektura **maintainability**, **xavfsizlik** va **kengayuvchanlik** tamoyillariga asoslanadi: API kalitlari faqat serverda, AI prompt va orchestration alohida domenda, ma'lumot validatsiyasi 4 darajada amalga oshiriladi. Bu yondashuv loyihaning hozirgi BMI doirasidagi talablarni qondirish bilan birga, kelajakda multi-user, autentifikatsiya, kesh va PWA imkoniyatlarini qo'shish uchun zarur poydevorni ham yaratadi.

---

**Hujjat versiyasi:** 1.0
**Sana:** 2026-05-06
