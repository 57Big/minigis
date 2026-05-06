import api from './api.js';

export async function fetchLocations() {
  const { data } = await api.get('/locations');
  return data?.data || [];
}

export async function createLocation(payload) {
  const { data } = await api.post('/locations', payload);
  return data?.data;
}

export async function updateLocation(id, payload) {
  const { data } = await api.patch(`/locations/${id}`, payload);
  return data?.data;
}

export async function deleteLocation(id) {
  const { data } = await api.delete(`/locations/${id}`);
  return data;
}
