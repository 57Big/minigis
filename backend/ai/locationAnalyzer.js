const { chatJSON } = require('../services/openaiService');
const { reverseGeocode } = require('../services/geocodingService');
const { SYSTEM_PROMPT, buildUserPrompt } = require('./prompts');

const ALLOWED_USAGES = [
  'yashash',
  'qishloq xo\'jaligi',
  'sanoat',
  'turizm',
  'transport',
  'tabiiy hudud',
  'savdo',
  'ta\'lim/tibbiyot',
];

function computeFallbackConfidence(raw, fallback) {
  let score = 0.15;
  const a = fallback || {};
  if (a.country && a.country !== 'noma\'lum') score += 0.20;
  if (a.region && a.region !== 'noma\'lum') score += 0.20;
  if (a.district && a.district !== 'noma\'lum') score += 0.15;
  if (a.placeName) score += 0.10;
  if (raw.classification && raw.classification !== 'noma\'lum') score += 0.10;
  if (raw.terrain && raw.terrain !== 'noma\'lum') score += 0.05;
  if (Array.isArray(raw.suggestedUsage) && raw.suggestedUsage.length > 0) score += 0.05;
  return Math.min(0.95, Math.max(0.1, score));
}

function normalizeAnalysis(raw, fallback = {}) {
  const rawConfidence = typeof raw.confidence === 'number' ? raw.confidence : null;
  const validConfidence =
    rawConfidence !== null && rawConfidence > 0 && rawConfidence <= 1
      ? rawConfidence
      : computeFallbackConfidence(raw, fallback);

  const out = {
    classification: String(raw.classification || 'noma\'lum').trim(),
    country: String(raw.country || fallback.country || 'noma\'lum').trim(),
    region: String(raw.region || fallback.region || 'noma\'lum').trim(),
    district: String(raw.district || fallback.district || 'noma\'lum').trim(),
    placeName: String(raw.placeName || fallback.placeName || '').trim(),
    description: String(raw.description || '').trim(),
    suggestedUsage: Array.isArray(raw.suggestedUsage)
      ? raw.suggestedUsage.map((s) => String(s).trim()).filter(Boolean).slice(0, 6)
      : [],
    terrain: String(raw.terrain || 'noma\'lum').trim(),
    confidence: Math.min(1, Math.max(0, validConfidence)),
  };
  return out;
}

async function analyzeLocation({ latitude, longitude, addressData: incomingAddr }) {
  const addressData = incomingAddr || (await reverseGeocode(latitude, longitude));

  const fallback = {
    country: addressData?.address?.country,
    region: addressData?.address?.state,
    district: addressData?.address?.city || addressData?.address?.county,
    placeName: addressData?.displayName,
  };

  const userPrompt = buildUserPrompt({ latitude, longitude, addressData });

  const raw = await chatJSON({
    system: SYSTEM_PROMPT,
    user: userPrompt,
    temperature: 0.2,
  });

  const normalized = normalizeAnalysis(raw, fallback);

  return {
    ...normalized,
    coordinates: { latitude, longitude },
    geocoding: addressData
      ? {
          displayName: addressData.displayName,
          address: addressData.address,
        }
      : null,
  };
}

module.exports = { analyzeLocation, ALLOWED_USAGES };
