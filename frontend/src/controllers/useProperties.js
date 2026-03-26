// frontend/src/controllers/useProperties.js
import { useState, useEffect, useCallback } from 'react';
import propertyService from '../services/supabasePropertyService';

export function useProperties(category, type = null) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await propertyService.getByCategoryAndType(category, type);
      setProperties(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, [category, type]);

  useEffect(() => { fetchProperties(); }, [fetchProperties]);

  const createProperty = async (formData) => {
    const { data } = await propertyService.create(formData);
    await fetchProperties();
    return data;
  };

  const updateProperty = async (id, formData) => {
    // Strip fields Supabase shouldn't receive on update
    const { id: _id, created_at, ...cleanData } = formData;
    await propertyService.update(id, cleanData);
    await fetchProperties();
  };

  const deleteProperty = async (id) => {
    await propertyService.delete(id);
    await fetchProperties();
  };

  return { properties, loading, error, refetch: fetchProperties, createProperty, updateProperty, deleteProperty };
}