// ============================================================
//  config/supabase.js
//  Supabase client configuration for backend
// ============================================================

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('SUPABASE_URL environment variable is required');
}

if (!supabaseServiceKey || supabaseServiceKey === 'your_service_role_key_here') {
  console.warn('⚠️  SUPABASE_SERVICE_KEY not set properly. Using anon key for read operations only.');
  console.warn('   For full admin functionality, set SUPABASE_SERVICE_KEY in backend/.env');
}

// Use service role key for backend operations, fallback to anon key
export const supabase = createClient(
  supabaseUrl,
  supabaseServiceKey && supabaseServiceKey !== 'your_service_role_key_here'
    ? supabaseServiceKey
    : supabaseAnonKey || ''
);