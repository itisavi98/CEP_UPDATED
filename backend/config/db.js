// ============================================================
//  config/db.js
//  MongoDB connection using Mongoose
//  Connects once at startup; logs success or fatal error.
// ============================================================

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Mongoose 7+ no longer needs these options, but kept for clarity
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    process.exit(1); // Exit process with failure — no point running without DB
  }
};

export default connectDB;