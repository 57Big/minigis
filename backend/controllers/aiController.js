const { analyzeLocation } = require('../ai/locationAnalyzer');
const { reverseGeocode } = require('../services/geocodingService');
const { validateCoordinates } = require('../utils/validate');

// POST /api/ai/analyze-location
exports.analyzeLocationHandler = async (req, res, next) => {
  try {
    const { latitude, longitude, addressData } = req.body || {};

    const err = validateCoordinates(latitude, longitude);
    if (err) {
      return res.status(400).json({ success: false, message: err });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({
        success: false,
        message: 'AI xizmati hozircha mavjud emas: OPENAI_API_KEY sozlanmagan',
      });
    }

    const result = await analyzeLocation({ latitude, longitude, addressData });

    res.json({ success: true, data: result });
  } catch (e) {
    if (e?.status === 401) {
      return res.status(502).json({
        success: false,
        message: 'OpenAI: API key noto\'g\'ri yoki muddati tugagan',
      });
    }
    if (e?.status === 429) {
      return res.status(429).json({
        success: false,
        message: 'OpenAI: rate limit. Birozdan keyin urinib ko\'ring',
      });
    }
    next(e);
  }
};

// POST /api/ai/reverse-geocode  (yordamchi endpoint)
exports.reverseGeocodeHandler = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.body || {};
    const err = validateCoordinates(latitude, longitude);
    if (err) return res.status(400).json({ success: false, message: err });

    const data = await reverseGeocode(latitude, longitude);
    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
};
