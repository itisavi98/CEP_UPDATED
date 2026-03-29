// ============================================================
//  config/seed.js
//  Seeds a default admin user directly in Supabase Auth.
//  Run once:  npm run seed
//  Requires SUPABASE_URL + SUPABASE_SERVICE_KEY in backend/.env
// ============================================================

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const ADMIN_EMAIL    = 'admin@dreamland.com';
const ADMIN_PASSWORD = 'admin123';

const seed = async () => {
  console.log('🌱 Seeding Supabase Auth admin user...');

  // Check if user already exists
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) throw listError;

  const existing = users.find((u) => u.email === ADMIN_EMAIL);

  if (existing) {
    // Update password + metadata in case they changed
    const { error } = await supabase.auth.admin.updateUserById(existing.id, {
      password: ADMIN_PASSWORD,
      user_metadata: { app_role: 'admin' },
      email_confirm: true,
    });
    if (error) throw error;
    console.log('✅ Admin user already existed — updated password & role.');
  } else {
    const { error } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: { app_role: 'admin' },
    });
    if (error) throw error;
    console.log('✅ Admin user created in Supabase Auth!');
  }

  console.log(`   Email:    ${ADMIN_EMAIL}`);
  console.log(`   Password: ${ADMIN_PASSWORD}`);
  console.log('   ⚠️  Change this password after first login!');
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});