// frontend/src/controllers/useProjects.js
import { useState, useEffect, useCallback } from 'react';
import supabaseProjectService from '../services/supabaseProjectService';
import backendProjectService  from '../services/projectService';

// Try Supabase first, fall back to backend REST API
const safeAction = async (supabaseAction, backendAction) => {
  try {
    return await supabaseAction();
  } catch (err) {
    console.warn('Supabase failed, falling back to backend:', err.message);
    const res = await backendAction();
    // Axios returns { data } directly
    return { data: res.data };
  }
};

// Strip read-only fields before sending updates to Supabase
const cleanForUpdate = (formData) => {
  const { id, created_at, ...clean } = formData;
  return clean;
};

// ── Ongoing Projects Hook ─────────────────────────────────────────────────────
export function useOngoingProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await safeAction(
        () => supabaseProjectService.getOngoing(),
        () => backendProjectService.getOngoing()
      );
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Fixed: was missing useEffect
  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const createProject = async (formData) => {
    const { data } = await safeAction(
      () => supabaseProjectService.createOngoing(formData),
      () => backendProjectService.createOngoing(formData)
    );
    await fetchProjects();
    return data;
  };

  const updateProject = async (id, formData) => {
    await safeAction(
      () => supabaseProjectService.updateOngoing(id, cleanForUpdate(formData)),
      () => backendProjectService.updateOngoing(id, formData)
    );
    await fetchProjects();
  };

  const deleteProject = async (id) => {
    await safeAction(
      () => supabaseProjectService.deleteOngoing(id),
      () => backendProjectService.deleteOngoing(id)
    );
    await fetchProjects();
  };

  return { projects, loading, error, refetch: fetchProjects, createProject, updateProject, deleteProject };
}

// ── Completed Projects Hook ───────────────────────────────────────────────────
export function useCompletedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await safeAction(
        () => supabaseProjectService.getCompleted(),
        () => backendProjectService.getCompleted()
      );
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const createProject = async (formData) => {
    const { data } = await safeAction(
      () => supabaseProjectService.createCompleted(formData),
      () => backendProjectService.createCompleted(formData)
    );
    await fetchProjects();
    return data;
  };

  const updateProject = async (id, formData) => {
    await safeAction(
      () => supabaseProjectService.updateCompleted(id, cleanForUpdate(formData)),
      () => backendProjectService.updateCompleted(id, formData)
    );
    await fetchProjects();
  };

  const deleteProject = async (id) => {
    await safeAction(
      () => supabaseProjectService.deleteCompleted(id),
      () => backendProjectService.deleteCompleted(id)
    );
    await fetchProjects();
  };

  return { projects, loading, error, refetch: fetchProjects, createProject, updateProject, deleteProject };
}