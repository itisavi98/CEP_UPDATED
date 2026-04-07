// ============================================================
//  server.js
//  Main entry point for the DreamLand Realty backend API.
//  Sets up Express server, middleware, database, and routes.
// ============================================================

// Load environment variables FIRST
import './config/env.js';

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Skip MongoDB connection since we're using Supabase
// connectDB();

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.VITE_FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'https://cep-updated-frontend.vercel.app',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS policy: Origin ${origin} is not allowed.`));
  },
  credentials: true,
}));

app.use(express.json({ limit: '10mb' })); // For file uploads if needed

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/properties', propertyRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'DreamLand Realty API is running' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend URL: ${process.env.VITE_API_URL || 'http://localhost:5173'}`);
});