// ============================================================
//  config/seed.js
//  Seeds the database with a default admin user.
//  Run once:  npm run seed
// ============================================================

import 'dotenv/config';
import bcrypt from 'bcryptjs';
import connectDB from './db.js';
import User from '../models/User.js';

const seed = async () => {
  await connectDB();

  // Remove existing admin to avoid duplicates
  await User.deleteOne({ email: 'admin@dreamland.com' });

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await User.create({
    name: 'Admin User',
    email: 'admin@dreamland.com',
    password: hashedPassword,
    role: 'admin',
  });

  console.log('✅ Admin user seeded successfully!');
  console.log('   Email:    admin@dreamland.com');
  console.log('   Password: admin123');
  console.log('   ⚠️  Change this password after first login!');
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});