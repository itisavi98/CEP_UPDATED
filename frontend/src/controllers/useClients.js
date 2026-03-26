// frontend/src/controllers/useClients.js
import { useState, useEffect, useCallback } from 'react';
import clientService from '../services/supabaseClientService';

export function useClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await clientService.getAll();
      setClients(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setClients([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchClients(); }, [fetchClients]);

  const createClient = async (formData) => {
    const { data } = await clientService.create(formData);
    await fetchClients();
    return data;
  };

  const updateClient = async (id, formData) => {
    // Strip fields Supabase shouldn't receive on update
    const { id: _id, created_at, ...cleanData } = formData;
    await clientService.update(id, cleanData);
    await fetchClients();
  };

  const deleteClient = async (id) => {
    await clientService.delete(id);
    await fetchClients();
  };

  return { clients, loading, error, refetch: fetchClients, createClient, updateClient, deleteClient };
}