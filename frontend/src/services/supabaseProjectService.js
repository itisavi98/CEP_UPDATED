// frontend/src/services/supabaseProjectService.js
import { supabase } from './supabaseClient';

// Table name candidates — tries each until one works
const ONGOING_TABLES   = ['ongoing_projects',   'ongoingprojects',   'ongoing_project'];
const COMPLETED_TABLES = ['completed_projects', 'completedprojects', 'completed_project'];

// Supabase never throws — it returns { data, error }.
// This helper tries multiple table names and throws on a real error.
const withTable = async (tables, fn) => {
  let lastError = null;

  for (const table of tables) {
    const result = await fn(table);

    if (!result.error) {
      // Success — return normalized { data }
      return { data: result.data };
    }

    lastError = result.error;

    // Only continue trying if the table doesn't exist
    const msg = result.error.message || '';
    if (msg.includes('does not exist') || result.error.details?.includes('relation')) {
      continue;
    }

    // Any other error (permissions, malformed query, etc.) — throw immediately
    throw new Error(result.error.message);
  }

  // All table names exhausted
  throw new Error(lastError?.message || 'No valid project table found in Supabase.');
};

const supabaseProjectService = {
  // ── Ongoing ──────────────────────────────────────────────────────────────
  getOngoing: () =>
    withTable(ONGOING_TABLES, (t) =>
      supabase.from(t).select('*').order('created_at', { ascending: false })),

  createOngoing: (data) =>
    withTable(ONGOING_TABLES, (t) =>
      supabase.from(t).insert(data).select()),

  updateOngoing: (id, data) =>
    withTable(ONGOING_TABLES, (t) =>
      supabase.from(t).update(data).eq('id', id).select()),

  deleteOngoing: (id) =>
    withTable(ONGOING_TABLES, (t) =>
      supabase.from(t).delete().eq('id', id)),

  // ── Completed ─────────────────────────────────────────────────────────────
  getCompleted: () =>
    withTable(COMPLETED_TABLES, (t) =>
      supabase.from(t).select('*').order('created_at', { ascending: false })),

  createCompleted: (data) =>
    withTable(COMPLETED_TABLES, (t) =>
      supabase.from(t).insert(data).select()),

  updateCompleted: (id, data) =>
    withTable(COMPLETED_TABLES, (t) =>
      supabase.from(t).update(data).eq('id', id).select()),

  deleteCompleted: (id) =>
    withTable(COMPLETED_TABLES, (t) =>
      supabase.from(t).delete().eq('id', id)),
};

export default supabaseProjectService;