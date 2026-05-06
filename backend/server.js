require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./config/db');
const locationRoutes = require('./routes/locationRoutes');
const aiRoutes = require('./routes/aiRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS bloklandi: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// Salomatlik tekshiruvi
app.get('/', (req, res) => {
  res.json({
    name: 'miniGIS AI API',
    status: 'ok',
    docs: ['/api/locations', '/api/ai/analyze-location', '/api/ai/reverse-geocode'],
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Asosiy yo'nalishlar
app.use('/api/locations', locationRoutes);
app.use('/api/ai', aiRoutes);

// 404 + xato
app.use(notFound);
app.use(errorHandler);

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Serverni ishga tushirishda xato:', err.message);
    process.exit(1);
  }
})();
