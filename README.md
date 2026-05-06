# 🛰️ miniGIS — AI-powered GIS platformasi

> **BMI** (Bitiruv malakaviy ishi) loyihasi
> Mavzu: *Interaktiv xarita asosida joy tanlash, sun’iy yo‘ldosh tasvirini ko‘rsatuvchi va AI yordamida hudud tahlilini amalga oshiruvchi GIS platformasi*

Foydalanuvchi xarita yordamida istalgan nuqtani tanlaydi — platforma:
- joy nomini avtomatik aniqlaydi (reverse geocoding),
- sun’iy yo‘ldosh / OSM / terrain layerlari orasida o‘tadi,
- **OpenAI (GPT-4o)** orqali hudud klassifikatsiyasi, mamlakat, viloyat, relyef, tavsiya etilgan foydalanish va ilmiy tavsifni qaytaradi,
- yozuvni MongoDB ga saqlaydi.

---

## 📦 Texnologiyalar

**Frontend**
- React 18 + Vite
- TailwindCSS (dark / light mode)
- React Leaflet 4 + `LayersControl` (OSM, Esri Satellite, OpenTopoMap, CARTO Dark)
- React Router DOM v6, Axios

**Backend**
- Node.js + Express 4
- MongoDB + Mongoose 8
- **OpenAI SDK** (`openai` paket)
- `express-rate-limit` (AI endpointni himoya qilish)
- CORS, Morgan, dotenv, axios

**Tashqi servislar**
- OpenStreetMap tile’lari
- Esri World Imagery (sun’iy yo‘ldosh layer)
- OpenTopoMap (relyef layer)
- OpenStreetMap **Nominatim** (forward + reverse geocoding)
- **OpenAI Chat Completions API** (joy tahlili)

---

## 🗂 Loyiha tuzilmasi

```
web/
├─ backend/
│  ├─ ai/
│  │  ├─ locationAnalyzer.js     # AI orchestration (geocode + LLM + normalize)
│  │  └─ prompts.js              # GIS system & user prompt template
│  ├─ services/
│  │  ├─ openaiService.js        # OpenAI client + JSON-mode chat helper
│  │  └─ geocodingService.js     # Nominatim reverse geocoding (server-side)
│  ├─ controllers/
│  │  ├─ locationController.js
│  │  └─ aiController.js         # POST /analyze-location, /reverse-geocode
│  ├─ routes/
│  │  ├─ locationRoutes.js
│  │  └─ aiRoutes.js             # rate-limited /api/ai/*
│  ├─ middleware/errorHandler.js
│  ├─ models/Location.js
│  ├─ utils/validate.js
│  ├─ config/db.js
│  ├─ server.js
│  ├─ package.json
│  └─ .env.example
└─ frontend/
   ├─ src/
   │  ├─ components/
   │  │  ├─ MapView.jsx           # LayersControl (OSM/Satellite/Terrain/Dark)
   │  │  ├─ AIAnalysisPanel.jsx   # AI sidebar card + loading skeleton
   │  │  ├─ Sidebar.jsx, SearchBox.jsx, CoordinateBadge.jsx
   │  ├─ pages/                   # Home, Map, History, About, NotFound
   │  ├─ layout/                  # MainLayout, Navbar (theme toggle), Footer
   │  ├─ services/                # api, locationService, geocoding, aiService
   │  ├─ hooks/                   # useDebounce, useLocations, useTheme
   │  ├─ App.jsx, main.jsx, index.css, leafletIconFix.js
   ├─ tailwind.config.js (darkMode: 'class')
   └─ .env.example
```

---

## ⚙️ Talablar

- **Node.js** v18 yoki yuqori
- **npm** v9+
- **MongoDB** (lokal yoki MongoDB Atlas)
- **OpenAI API key** (https://platform.openai.com)

---

## 🚀 Ishga tushirish

### 1. Backend

```bash
cd backend
cp .env.example .env       # MONGO_URI va OPENAI_API_KEY ni tahrirlang
npm install                # openai, express-rate-limit, axios paketlari ham o'rnatiladi
npm run dev                # nodemon
```

`.env` ichidagi qiymatlar:

```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/minigis
CLIENT_ORIGIN=http://localhost:5173

# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini      # yoki gpt-4o, gpt-4.1

# AI rate limit
AI_RATE_LIMIT_PER_MIN=20

# Nominatim Usage Policy uchun
NOMINATIM_USER_AGENT=miniGIS-BMI/1.0 (academic project)
```

> 💡 MongoDB Atlas ishlatmoqchi bo‘lsangiz, `MONGO_URI` ni
> `mongodb+srv://USER:PASS@cluster.mongodb.net/minigis` ko‘rinishida bering.

Server muvaffaqiyatli ishga tushgach:
```
✅ MongoDB ulandi: 127.0.0.1/minigis
🚀 Server: http://localhost:5000
```

### 2. Frontend (yangi terminal oynasida)

```bash
cd frontend
cp .env.example .env       # VITE_API_URL standart bo'yicha to'g'ri
npm install
npm run dev
```

Brauzerda ochiladi: **http://localhost:5173**

---

## 🔌 REST API

### Joylar — `/api/locations`

| Method | Endpoint              | Maqsadi                            | Body |
|-------:|-----------------------|------------------------------------|------|
| GET    | `/api/locations`      | Barcha saqlangan joylarni olish    | —    |
| GET    | `/api/locations/:id`  | Bitta yozuvni olish                | —    |
| POST   | `/api/locations`      | Yangi joy saqlash                  | `{ name, latitude, longitude, note? }` |
| DELETE | `/api/locations/:id`  | Yozuvni o‘chirish                  | —    |

### AI — `/api/ai`  *(rate limited: `AI_RATE_LIMIT_PER_MIN`)*

| Method | Endpoint                      | Maqsadi |
|-------:|-------------------------------|---------|
| POST   | `/api/ai/analyze-location`    | OpenAI orqali joy tahlili |
| POST   | `/api/ai/reverse-geocode`     | Server-side reverse geocoding (Nominatim) |

**POST `/api/ai/analyze-location`**

Request:
```json
{
  "latitude": 41.3111,
  "longitude": 69.2797,
  "addressData": null
}
```

> `addressData` ixtiyoriy — agar `null` bo‘lsa, backend o‘zi Nominatim chaqiradi.

Response:
```json
{
  "success": true,
  "data": {
    "classification": "shahar",
    "country": "O'zbekiston",
    "region": "Toshkent shahri",
    "district": "Yashnobod",
    "placeName": "Toshkent markazi",
    "description": "Mintaqaviy poytaxt, zich qurilgan shahar markazi...",
    "suggestedUsage": ["yashash", "savdo", "transport", "ta'lim/tibbiyot"],
    "terrain": "tekislik",
    "confidence": 0.86,
    "coordinates": { "latitude": 41.3111, "longitude": 69.2797 },
    "geocoding": { "displayName": "...", "address": { ... } }
  }
}
```

---

## 🧭 Foydalanish bo‘yicha qo‘llanma

1. **Bosh sahifa** (`/`) — landing, AI imkoniyatlari haqida.
2. **Xarita** (`/map`):
   - Yuqoridan **qidiruv** (Nominatim) — joy nomini yozing, xarita avtomatik uchadi.
   - O‘ng yuqoridan **layer control** — *OSM / Satellite / Terrain / Dark + Labels overlay*.
   - Xarita ustiga **bosish** marker qo‘yadi va:
     - reverse geocoding orqali joy nomini aniqlaydi,
     - **AI joy tahlili** panelini ishga tushiradi.
   - O‘ng panelda joy nomi, koordinatalar va **AI klassifikatsiyasi**, mamlakat, viloyat, tavsif, tavsiya etilgan foydalanish va ishonch koeffitsiyenti ko‘rinadi.
   - **Saqlash** tugmasi MongoDB’ga yozadi.
3. **Tarix** (`/history`) — saqlanganlar jadvali, qidiruv, o‘chirish.
4. **Loyiha haqida** (`/about`) — texnologik stek, AI imkoniyatlari, arxitektura.
5. Yuqori-o‘ngdagi **🌙 / ☀️** tugma — yorug‘ va tungi rejim almashtirish.

---

## 🛡 AI xato boshqaruv va himoya

- `express-rate-limit` — har IP uchun daqiqasiga `AI_RATE_LIMIT_PER_MIN` so‘rov.
- OpenAI 401 / 429 xatolari foydalanuvchiga tushunarli xabarga aylantiriladi.
- AI prompt **JSON mode** (`response_format: { type: 'json_object' }`) bilan ishlatiladi — natija doimo to‘g‘ri JSON.
- Backend natijani normalizatsiya qiladi: `confidence` 0–1 ga clamp qilinadi, `suggestedUsage` array sifatida tekshiriladi.
- Frontend AI request’larining ID counter’i — eski natija yangisini bosib o‘tmaydi (race-safe).

---

## 🧪 Tezkor sinov

```bash
# Backend ishlayotganini tekshirish
curl http://localhost:5000/api/health

# AI joy tahlili
curl -X POST http://localhost:5000/api/ai/analyze-location \
  -H "Content-Type: application/json" \
  -d '{"latitude":41.3111,"longitude":69.2797}'
```

---

## 📜 Litsenziya

Akademik (BMI) maqsadlarida foydalanish uchun ishlab chiqilgan.
Tashqi servislar o‘zlarining litsenziyalariga muvofiq ishlatiladi:
OpenStreetMap (ODbL), Esri (attribution required), OpenTopoMap (CC-BY-SA),
Nominatim (Usage Policy), OpenAI (Terms of Use).
