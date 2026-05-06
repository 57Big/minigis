const express = require('express');
const rateLimit = require('express-rate-limit');
const {
  analyzeLocationHandler,
  reverseGeocodeHandler,
} = require('../controllers/aiController');

const router = express.Router();

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: Number(process.env.AI_RATE_LIMIT_PER_MIN || 20),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Juda ko\'p so\'rov. Bir daqiqa kutib turing.',
  },
});

router.post('/analyze-location', aiLimiter, analyzeLocationHandler);
router.post('/reverse-geocode', aiLimiter, reverseGeocodeHandler);

module.exports = router;
