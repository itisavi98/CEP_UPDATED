// ============================================================
//  config/supabase.js  (BACKEND)
//  Uses the service-role key for admin operations.
//  Never expose this key to the frontend.
// ============================================================

import { createClient } from '@supabase/supabase-js';

const supabaseUrl        = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl) {
  throw new Error('SUPABASE_URL is required in backend .env');
}
if (!supabaseServiceKey || supabaseServiceKey === 'your_service_role_key_here') {
  throw new Error('SUPABASE_SERVICE_KEY is required in backend .env');
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});