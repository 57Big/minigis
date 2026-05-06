import { useCallback, useEffect, useState } from 'react';
import {
  fetchLocations,
  createLocation as apiCreate,
  updateLocation as apiUpdate,
  deleteLocation as apiDelete,
} from '../services/locationService.js';

export default function useLocations(autoLoad = true) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLocations();
      setItems(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const add = useCallback(async (payload) => {
    const created = await apiCreate(payload);
    setItems((prev) => [created, ...prev]);
    return created;
  }, []);

  const update = useCallback(async (id, payload) => {
    const updated = await apiUpdate(id, payload);
    setItems((prev) => prev.map((x) => (x._id === id ? updated : x)));
    return updated;
  }, []);

  const remove = useCallback(async (id) => {
    await apiDelete(id);
    setItems((prev) => prev.filter((x) => x._id !== id));
  }, []);

  useEffect(() => {
    if (autoLoad) load();
  }, [autoLoad, load]);

  return { items, loading, error, load, add, update, remove };
}
