# miniGIS — Backend va Ma'lumotlar Bazasi Arxitekturasi

> **Loyiha:** miniGIS — interaktiv xarita asosida joy tanlash va AI tahlili platformasi (BMI ishi)
> **Joylashuvi:** `web/backend/`
> **Til / Ramka:** Node.js + Express 4 (CommonJS)
> **Ma'lumotlar bazasi:** MongoDB + Mongoose 8
> **AI:** OpenAI Chat Completions API (`gpt-4o-mini`, JSON mode)
> **Geocoding:** OpenStreetMap Nominatim (server-side, User-Agent bilan)

---

## 1. Umumiy ko'rinish

Backend **uch xil mas'uliyatga ega monolitik REST API** sifatida tuzilgan:

1. **CRUD xizmati** — MongoDB'da tanlangan joylarni saqlash, yangilash, o'chirish.
2. **AI tahlil xizmati** — OpenAI'ga so'rov yuborib, hudud klassifikatsiyasi va tavsiyalarini qaytarish.
3. **Geocoding ko'priki** — server-side Nominatim chaqiriqlari (User-Agent va til sozlamalari bilan).

Frontend (`http://localhost:5173`) bilan **CORS** orqali muloqot qiladi va barcha javoblarni `{ success, data | message }` yagona formatida qaytaradi.

---

## 2. Texnologik stek

| Qatlam | Texnologiya | Versiya | Vazifasi |
|---|---|---|---|
| Runtime | **Node.js** | — | Server muhiti |
| Web ramka | **Express** | ^4.19 | Marshrut, middleware |
| ODM | **Mongoose** | ^8.5 | MongoDB sxema/model |
| AI SDK | **openai** | ^6.36 | Chat Completions (JSON mode) |
| HTTP | **axios** | ^1.16 | Nominatim chaqiriqlari |
| CORS | **cors** | ^2.8 | Origin oq ro'yxat |
| Logger | **morgan** | ^1.10 | Dev so'rov loglari |
| Rate limit | **express-rate-limit** | ^8.5 | AI endpointlarni himoya qilish |
| Konfig | **dotenv** | ^16.4 | `.env` o'qish |
| Dev | **nodemon** | ^3.1 | Auto-reload |

---

## 3. Loyiha tuzilmasi

```
backend/
├── server.js                # Ilova kirish nuqtasi (Express bootstrap)
├── package.json             # bog'liqliklar, start/dev skriptlar
├── .env                     # MONGO_URI, OPENAI_API_KEY, PORT, CLIENT_ORIGIN…
│
├── config/
│   └── db.js                # connectDB() — Mongoose ulanishi
│
├── models/
│   └── Location.js          # Joylar uchun Mongoose Schema + index
│
├── routes/
│   ├── locationRoutes.js    # /api/locations va /:id (REST)
│   └── aiRoutes.js          # /api/ai/* (rate-limit bilan)
│
├── controllers/
│   ├── locationController.js  # CRUD biznes-mantiq
│   └── aiController.js        # AI handler + xato tarjimasi
│
├── services/                # tashqi tizimlar (DB'dan tashqari)
│   ├── openaiService.js     # OpenAI client + chatJSON()
│   └── geocodingService.js  # Nominatim reverseGeocode()
│
├── ai/                      # AI domeni
│   ├── prompts.js           # SYSTEM_PROMPT + buildUserPrompt()
│   └── locationAnalyzer.js  # tahlil oqimi + normalizatsiya
│
├── middleware/
│   └── errorHandler.js      # notFound + markaziy errorHandler
│
└── utils/
    └── validate.js          # validateCoordinates(), isValidLat/Lng
```

---

## 4. Qatlamlar arxitekturasi

```
                    HTTP so'rov (frontend)
                            │
                            ▼
              ┌──────────────────────────────┐
              │        server.js (Express)   │
              │  cors · json · morgan · 404  │
              └──────┬─────────────┬─────────┘
                     │             │
            ┌────────▼──┐     ┌────▼──────────┐
            │ /locations│     │   /ai/*       │
            │  Routes   │     │  Routes (RL)  │
            └────┬──────┘     └────┬──────────┘
                 ▼                 ▼
         ┌──────────────┐   ┌──────────────┐
         │ Controllers  │   │ Controllers  │
         │ (location)   │   │ (ai)         │
         └──────┬───────┘   └──────┬───────┘
                │                  │
        ┌───────▼────────┐  ┌──────▼────────────┐
        │  Mongoose      │  │  ai/Analyzer      │
        │  Location      │  │  ├─ prompts       │
        │  model         │  │  ├─ openaiService │
        └────────┬───────┘  │  └─ geocoding     │
                 │          └────────┬──────────┘
                 ▼                   ▼
         ┌──────────────┐   ┌────────────────────┐
         │  MongoDB     │   │  OpenAI / Nominatim│
         └──────────────┘   └────────────────────┘
```

**Asosiy qoidalar:**
- **Routes** — faqat URL → controller bog'lash; biznes-mantiq yo'q.
- **Controllers** — input validatsiyasi, model/service chaqirish, javob yasash.
- **Services** — tashqi tizimlar (OpenAI, Nominatim) bilan ishlash.
- **AI domeni** (`ai/`) — promptlar va analizator alohida ajratilgan, qayta ishlatish oson.
- **Middleware** — kesib o'tuvchi muammolar (xato, 404).

---

## 5. Server bootstrap (`server.js`)

Tartibi muhim:

1. `dotenv.config()` — birinchi ishga tushadi.
2. **CORS** — `CLIENT_ORIGIN` env'dan vergul orqali ajratilgan oq ro'yxat (default: `http://localhost:5173`).
3. `express.json({ limit: '1mb' })` — JSON body parser.
4. `morgan('dev')` — so'rov loglari.
5. **Health endpointlar:**
   - `GET /` — API metadata.
   - `GET /api/health` — `{ status, uptime }`.
6. **Asosiy yo'nalishlar:**
   - `app.use('/api/locations', locationRoutes)`
   - `app.use('/api/ai', aiRoutes)`
7. `notFound` → `errorHandler` (oxirida).
8. `connectDB()` muvaffaqiyatli bo'lganidan **keyin** `app.listen()`.

---

## 6. REST API spetsifikatsiyasi

### 6.1 Locations CRUD

| Metod | Endpoint | Tavsif | Status kodlari |
|---|---|---|---|
| GET | `/api/locations` | Oxirgi 500 yozuvni `createdAt: -1` bo'yicha qaytaradi | 200 |
| GET | `/api/locations/:id` | Bitta yozuv | 200 / 400 / 404 |
| POST | `/api/locations` | Yangi yozuv yaratadi | 201 / 400 |
| PATCH | `/api/locations/:id` | `name`, `label`, `note`, `aiAnalysis` ni yangilaydi | 200 / 400 / 404 |
| DELETE | `/api/locations/:id` | Yozuvni o'chiradi | 200 / 400 / 404 |

**Javob formati (yagona):**
```json
{ "success": true, "data": { ... } }
{ "success": false, "message": "Xato matni" }
```

**POST `/api/locations` body:**
```json
{
  "name": "Toshkent shahri",
  "latitude": 41.3111,
  "longitude": 69.2797,
  "note": "Ixtiyoriy izoh",
  "label": "ish",
  "aiAnalysis": { ... }   // ixtiyoriy, AI natijasini birga saqlash
}
```

### 6.2 AI endpointlari (`/api/ai/*`)

| Metod | Endpoint | Tavsif |
|---|---|---|
| POST | `/api/ai/analyze-location` | OpenAI orqali GIS-tahlilni qaytaradi |
| POST | `/api/ai/reverse-geocode` | Server-side Nominatim reverse geocoding |

**Body:**
```json
{ "latitude": 41.3111, "longitude": 69.2797, "addressData": null }
```

**Rate limit:** har bir IP uchun 1 daqiqada `AI_RATE_LIMIT_PER_MIN` (default **20**) so'rov.
**`OPENAI_API_KEY` topilmasa:** `503` + tushunarli xabar.
**OpenAI 401:** `502` (yaroqsiz API key).
**OpenAI 429:** `429` (rate limit, qayta urinish).

---

## 7. Ma'lumotlar bazasi arxitekturasi

### 7.1 Texnologiya tanlovi

- **MongoDB** (NoSQL document DB) tanlandi, chunki:
  - Hujjatlar (`Location`) flexible — `aiAnalysis` maydoni o'zgaruvchan strukturada.
  - Geo-koordinatalar va kelajakdagi geo-indekslar (`2dsphere`) uchun mos.
  - Mongoose orqali Schema-darajada validatsiya qilinadi (kuchli SQL'ga o'xshash kafolat).
- **Mongoose** ODM:
  - `strictQuery: true` — noma'lum maydonlar so'rovlarda tashlab yuboriladi.
  - `serverSelectionTimeoutMS: 10000` — 10 s ulanish timeout'i.

### 7.2 Ulanish hayotiy sikli

```
process.env.MONGO_URI
        │
        ▼
 connectDB() (config/db.js)
        │
        ├─ mongoose.set('strictQuery', true)
        ├─ mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
        └─ console.log("✅ MongoDB ulandi: <host>/<db>")
        │
        ▼
 server.listen(PORT)
```

Agar ulanish bo'lmasa — server **ishga tushmaydi** (`process.exit(1)`).

### 7.3 `Location` kolleksiyasi sxemasi

| Maydon | Tip | Cheklov | Default |
|---|---|---|---|
| `_id` | ObjectId | avto-yaratiladi | — |
| `name` | String | required, trim, max 250 | — |
| `latitude` | Number | required, [-90, 90] | — |
| `longitude` | Number | required, [-180, 180] | — |
| `note` | String | trim, max 500 | `''` |
| `label` | String | trim, max 60 | `''` |
| `aiAnalysis` | Mixed | — | `null` |
| `createdAt` | Date | `timestamps: true` | avto |
| `updatedAt` | Date | `timestamps: true` | avto |

**Sxema parametrlari:**
- `timestamps: true` — `createdAt` / `updatedAt` avto.
- `minimize: false` — bo'sh nested obyektlar saqlanadi (AI bo'sh qism yuborgan holatlar uchun).

**Indekslar:**
- `{ createdAt: -1 }` — `getLocations` uchun yangi yozuvlardan boshlab tezkor sortlash.

### 7.4 Hujjat namunasi

```json
{
  "_id": "65f3a8...",
  "name": "Mirzo Ulug'bek tumani, Toshkent",
  "latitude": 41.3215,
  "longitude": 69.3502,
  "note": "Universitet yaqinida",
  "label": "ta'lim",
  "aiAnalysis": {
    "classification": "yashash hududi",
    "country": "O'zbekiston",
    "region": "Toshkent shahri",
    "district": "Mirzo Ulug'bek",
    "placeName": "Mirzo Ulug'bek t.",
    "description": "Toshkentning sharqiy qismidagi yashash va ta'lim hududi...",
    "suggestedUsage": ["yashash", "ta'lim/tibbiyot", "savdo"],
    "terrain": "tekislik",
    "confidence": 0.86,
    "coordinates": { "latitude": 41.3215, "longitude": 69.3502 }
  },
  "createdAt": "2026-05-06T10:23:14.512Z",
  "updatedAt": "2026-05-06T10:23:14.512Z",
  "__v": 0
}
```

### 7.5 Validatsiya darajalari

```
1. Frontend (UX)        →  hech bo'lmasa lat/lng raqamliligi
2. Controller           →  validateCoordinates() / typeof number
3. Mongoose Schema      →  required, min/max, maxlength
4. MongoDB              →  oxirgi himoya (driver darajasi)
```

---

## 8. AI domeni (`ai/`)

### 8.1 Tahlil oqimi

```
analyzeLocation({ lat, lng, addressData? })
        │
        ├─ addressData yo'q bo'lsa → reverseGeocode() (Nominatim)
        │
        ├─ buildUserPrompt({...})    ← prompts.js
        │
        ├─ chatJSON({                ← openaiService.js
        │     model: gpt-4o-mini,
        │     temperature: 0.2,
        │     response_format: { type: 'json_object' }
        │  })
        │
        ├─ JSON.parse() (markdown ```json fence ham olib tashlanadi)
        │
        ├─ normalizeAnalysis(raw, fallback)
        │     ├─ string maydonlar trim
        │     ├─ suggestedUsage → array, max 6
        │     └─ confidence → [0, 1] ga clamp
        │
        └─ qaytadi:
           {
             ...normalized,
             coordinates: { latitude, longitude },
             geocoding: { displayName, address }
           }
```

### 8.2 Prompt strategiyasi (`prompts.js`)

- **`SYSTEM_PROMPT`** — modelga rolni va qat'iy qoidalarni beradi:
  - Faqat **valid JSON** qaytarish.
  - **O'zbek tili (lotin)**.
  - Aniq bilmagan joyda **"noma'lum"** (gallyutsinatsiyaga qarshi).
  - JSON sxemasi inline ko'rsatilgan: `classification`, `country`, `region`, `district`, `placeName`, `description`, `suggestedUsage[]`, `terrain`, `confidence`.
- **`buildUserPrompt({ lat, lng, addressData })`** — Nominatim natijalarini struktura qilib uzatadi: `Davlat`, `Viloyat`, `Tuman`, `Shahar`, `Mahalla`, `Ko'cha`, `Indeks`.

### 8.3 Toza chaqiriq (`openaiService.js`)

- **Lazy singleton** — `getClient()` faqat birinchi marta yaratadi.
- **`chatJSON()`** — `response_format: { type: 'json_object' }` (OpenAI **JSON mode**) ishlatiladi.
- **Defensiv parsing** — agar model markdown ichida JSON qaytarsa, `^```json` va ````$` regex bilan tozalanadi.

### 8.4 Ruxsat etilgan foydalanish toifalari

`ALLOWED_USAGES = ['yashash', 'qishloq xo\'jaligi', 'sanoat', 'turizm', 'transport', 'tabiiy hudud', 'savdo', 'ta\'lim/tibbiyot']`.
Hozircha clamping qilinmaydi (kelajakda enum tekshiruvi qo'shsa bo'ladi).

---

## 9. Geocoding xizmati (`services/geocodingService.js`)

- **Asos:** `https://nominatim.openstreetmap.org`.
- **Headerlar:**
  - `User-Agent: miniGIS-BMI/1.0 (academic project)` — Nominatim **majburiy** talab qiladi, aks holda 403.
  - `Accept-Language: uz,en,ru` — lokalizatsiyalangan natijalar.
- **`reverseGeocode(lat, lon)`** qaytaradigan obyekt:
  ```js
  {
    displayName, osmType, type, category,
    address: { country, countryCode, state, county, city, suburb, road, postcode },
    raw  // to'liq Nominatim javobi (debug uchun)
  }
  ```
- **Xato:** `try/catch` ichida `null` qaytaradi — AI baribir koordinatadan ishlaydi.

> **Diqqat:** Frontend ham to'g'ridan-to'g'ri Nominatim'ga murojaat qiladi (qidiruv uchun). Server-side variant **AI uchun** ishlatiladi, chunki OpenAI promptiga to'liq strukturani uzatish kerak.

---

## 10. Middleware oqimi

```
HTTP req
   │
   ▼
[ cors ] ──► origin oq ro'yxatda emasmi? → Error
   │
   ▼
[ express.json (1mb) ]
   │
   ▼
[ morgan('dev') ]
   │
   ▼
[ Router: /api/locations | /api/ai ]
   │  └─ AI uchun: [ rateLimit (20/min) ]
   ▼
[ Controller ]
   │
   ▼ (xato bo'lsa: next(err))
   │
[ notFound (404) ]
   │
   ▼
[ errorHandler ]
   ├─ Mongoose ValidationError → 400 + barcha xabarlar
   ├─ Mongoose CastError       → 400 + path
   └─ default                   → err.statusCode || 500
```

---

## 11. Xato boshqaruvi qatlamlari

| Manba | Tarjima | HTTP status |
|---|---|---|
| Mongoose `ValidationError` | barcha xabar matnlari `, ` bilan birlashadi | 400 |
| Mongoose `CastError` | `Noto'g'ri qiymat: <path>` | 400 |
| `validateCoordinates()` | inline string xabar | 400 |
| OpenAI 401 | `OPENAI_API_KEY noto'g'ri yoki muddati tugagan` | 502 |
| OpenAI 429 | `Rate limit. Birozdan keyin urinib ko'ring` | 429 |
| `OPENAI_API_KEY` yo'q | `AI xizmati hozircha mavjud emas` | 503 |
| Nominatim xato | `null` qaytadi (jim fallback) | — |
| Boshqa | console + 500 | 500 |

---

## 12. Xavfsizlik choralari

1. **CORS oq ro'yxat** — faqat `CLIENT_ORIGIN`'dagi originlar.
2. **JSON limit** — `1 MB`, prompt injection katta payload bilan kelmasligi uchun.
3. **Rate limit** — AI endpointlar uchun 20 req/min (env'dan o'zgartiriladi). OpenAI tomondan keladigan to'lovni va abuse'ni cheklaydi.
4. **API kalitlar** — faqat `.env`'da; frontendga **uzatilmaydi**.
5. **Validatsiya** — har bir kirish nuqtasida `lat/lng` raqamliligi va diapazoni tekshiriladi.
6. **Mongoose `strictQuery`** — bilinmagan filter maydonlar yuborib bo'lmaydi.
7. **`ObjectId.isValid()`** — `:id` paramni Mongo'ga yuborishdan oldin tekshiruv.
8. **Xato xabarlari** — stack trace foydalanuvchiga **chiqmaydi** (faqat console).

---

## 13. Konfiguratsiya (`.env`)

| Kalit | Majburiy | Default | Tavsif |
|---|---|---|---|
| `PORT` | ❌ | `5000` | Express tinglash porti |
| `MONGO_URI` | ✅ | — | MongoDB connection string |
| `CLIENT_ORIGIN` | ❌ | `http://localhost:5173` | CORS oq ro'yxat (vergul bilan ko'paytirish mumkin) |
| `OPENAI_API_KEY` | ⚠️ | — | Yo'q bo'lsa AI 503 qaytadi |
| `OPENAI_MODEL` | ❌ | `gpt-4o-mini` | Model nomi |
| `AI_RATE_LIMIT_PER_MIN` | ❌ | `20` | AI rate limit |
| `NOMINATIM_USER_AGENT` | ❌ | `miniGIS-BMI/1.0 (academic project)` | Nominatim talabi |

---

## 14. So'rov hayotiy siklning to'liq misoli

**Foydalanuvchi xaritada nuqta bosadi → AI tahlili va saqlash:**

```
[1] Frontend
    POST http://localhost:5000/api/ai/analyze-location
    Body: { latitude: 41.32, longitude: 69.35 }

[2] server.js
    cors → json → morgan → /api/ai router

[3] aiRoutes.js
    rateLimit (20/min) o'tkazadi

[4] aiController.analyzeLocationHandler
    ├─ validateCoordinates() → OK
    ├─ OPENAI_API_KEY tekshiruvi → OK
    └─ analyzeLocation({ lat, lng })

[5] ai/locationAnalyzer.js
    ├─ reverseGeocode(lat, lng)            ← Nominatim
    ├─ buildUserPrompt({ ..., addressData })
    ├─ chatJSON({ system, user })          ← OpenAI gpt-4o-mini, JSON mode
    └─ normalizeAnalysis(raw, fallback)

[6] aiController qaytaradi:
    { success: true, data: { classification, ..., coordinates, geocoding } }

[7] Frontend natijani ko'rsatadi → foydalanuvchi "Saqlash" bosadi

[8] POST /api/locations
    Body: { name, latitude, longitude, aiAnalysis }
    → locationController.createLocation
    → Mongoose validatsiya
    → MongoDB insert
    → 201 { success: true, data: { _id, ... } }
```

---

## 15. Skriptlar

```bash
npm run dev      # nodemon orqali auto-reload (development)
npm start        # production: node server.js
```

---

## 16. Kengaytirish bo'yicha tavsiyalar

1. **Geo-indeks** — `LocationSchema.index({ location: '2dsphere' })` qo'shib, radius bo'yicha qidiruvni yoqish (`$near`).
2. **Authentication** — JWT yoki sessiyalar; `User` modeli, `Location` ↔ `User` referensi.
3. **Caching** — Nominatim/AI javoblarini Redis'da kesh qilish (10 min TTL) — bir xil koordinata uchun ortiqcha xarajatdan qochish.
4. **Joblar/Queue** — AI tahlilni `BullMQ` orqali fonda bajarish, frontendga websocket bilan bildirish.
5. **Logging** — `pino` + `pino-http` (struct loglar), `morgan`'dan kuchliroq.
6. **Test** — Jest + Supertest (controller darajasida), `mongodb-memory-server` integration uchun.
7. **API hujjati** — `swagger-jsdoc` + Swagger UI orqali `/api/docs`.
8. **Monitoring** — `/api/health` ni kengaytirib DB ping va OpenAI ulanish holatini tekshirish.
9. **Dockerfile + docker-compose** — `app` + `mongo` xizmatlari bilan repikloliroq dev muhit.
10. **Schema versiyalash** — `aiAnalysis.version` qo'shib, eski yozuvlarni qayta ishlash uchun.

---

## 17. Komponentlar bog'liqlik grafigi

```
server.js
 ├─ config/db.js                    ── mongoose
 ├─ middleware/errorHandler.js
 │
 ├─ routes/locationRoutes.js
 │   └─ controllers/locationController.js
 │       └─ models/Location.js      ── mongoose
 │
 └─ routes/aiRoutes.js              ── express-rate-limit
     └─ controllers/aiController.js
         ├─ utils/validate.js
         ├─ services/geocodingService.js  ── axios → Nominatim
         └─ ai/locationAnalyzer.js
             ├─ ai/prompts.js
             ├─ services/geocodingService.js
             └─ services/openaiService.js  ── openai → OpenAI API
```

---

**Hujjat versiyasi:** 1.0
**Sana:** 2026-05-06
