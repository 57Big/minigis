import api from './api.js';

export async function analyzeLocation({ latitude, longitude, addressData = null }) {
  const { data } = await api.post('/ai/analyze-location', {
    latitude,
    longitude,
    addressData,
  });
  return data?.data;
}

export async function reverseGeocodeAI({ latitude, longitude }) {
  const { data } = await api.post('/ai/reverse-geocode', { latitude, longitude });
  return data?.data;
}
