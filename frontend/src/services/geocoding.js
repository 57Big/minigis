import axios from 'axios';

// OpenStreetMap Nominatim — bepul reverse / forward geocoding
const NOMINATIM = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org',
  timeout: 15000,
  headers: {
    'Accept-Language': 'uz,en,ru',
  },
});

export async function reverseGeocode(lat, lon) {
  try {
    const { data } = await NOMINATIM.get('/reverse', {
      params: {
        format: 'json',
        lat,
        lon,
        zoom: 14,
        addressdetails: 1,
      },
    });
    return data?.display_name || null;
  } catch {
    return null;
  }
}

export async function searchPlaces(query, limit = 6) {
  if (!query || query.trim().length < 2) return [];
  try {
    const { data } = await NOMINATIM.get('/search', {
      params: {
        q: query,
        format: 'json',
        addressdetails: 1,
        limit,
      },
    });
    return (data || []).map((item) => ({
      id: item.place_id,
      name: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      type: item.type,
    }));
  } catch {
    return [];
  }
}
