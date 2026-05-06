const axios = require('axios');

const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org';
const USER_AGENT = process.env.NOMINATIM_USER_AGENT || 'miniGIS-BMI/1.0 (academic project)';

const http = axios.create({
  baseURL: NOMINATIM_BASE,
  timeout: 15000,
  headers: {
    'User-Agent': USER_AGENT,
    'Accept-Language': 'uz,en,ru',
  },
});

async function reverseGeocode(lat, lon) {
  try {
    const { data } = await http.get('/reverse', {
      params: {
        format: 'jsonv2',
        lat,
        lon,
        zoom: 14,
        addressdetails: 1,
        'accept-language': 'uz,en,ru',
      },
    });

    if (!data) return null;

    const a = data.address || {};

    return {
      displayName: data.display_name || null,
      osmType: data.osm_type || null,
      type: data.type || null,
      category: data.category || null,
      address: {
        country: a.country || null,
        countryCode: a.country_code || null,
        state: a.state || a.region || null,
        county: a.county || null,
        city: a.city || a.town || a.village || a.hamlet || a.municipality || null,
        suburb: a.suburb || a.neighbourhood || null,
        road: a.road || null,
        postcode: a.postcode || null,
      },
      raw: data,
    };
  } catch (err) {
    console.error('reverseGeocode xatosi:', err.message);
    return null;
  }
}

module.exports = { reverseGeocode };
