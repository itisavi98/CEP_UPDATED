// frontend/src/config/supabase.js
// Supabase client for the frontend — uses the anon/public key only.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnon) {
  throw new Error(
    'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in your frontend .env file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnon);