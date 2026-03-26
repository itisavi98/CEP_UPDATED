// frontend/src/services/supabasePropertyService.js
import { supabase } from './supabaseClient';

const TABLE = 'properties';

// Helper: Supabase never throws — it returns { data, error }.
// This wrapper converts errors into thrown exceptions so hooks can catch them.
const query = async (fn) => {
  const result = await fn();
  if (result.error) throw new Error(result.error.message);
  return { data: result.data };
};

const supabasePropertyService = {
  getAll: () =>
    query(() => supabase.from(TABLE).select('*').order('created_at', { ascending: false })),

  getByCategoryAndType: (category, type) =>
    query(() => {
      let q = supabase.from(TABLE).select('*').eq('category', category);
      if (type && type !== 'all') q = q.eq('type', type);
      return q.order('created_at', { ascending: false });
    }),

  create:  (data)     => query(() => supabase.from(TABLE).insert(data).select()),
  update:  (id, data) => query(() => supabase.from(TABLE).update(data).eq('id', id).select()),
  delete:  (id)       => query(() => supabase.from(TABLE).delete().eq('id', id)),
};

export default supabasePropertyService;