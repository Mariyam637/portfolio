require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

const app = express();

// Security middleware with relaxed crossOriginResourcePolicy for public uploads
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Permissive in local dev
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving for uploads and assets
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
app.use('/assets', express.static(path.join(__dirname, '../../client/public/assets')));

// Rate limiters for security
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 20, // 20 requests per window
  message: { success: false, message: 'Too many login attempts. Please try again in 15 minutes.' }
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many messages submitted. Please try again later.' }
});

// Route Handlers
const authRoutes = require('./routes/auth');
const publicRoutes = require('./routes/public');
const adminRoutes = require('./routes/admin');
const contactRoutes = require('./routes/contact');
const uploadRoutes = require('./routes/upload');

app.use('/api/auth/login', authLimiter);
app.use('/api/contact', contactLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Riyas Nifran Executive Portfolio API'
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('[API Error]:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[Executive Portfolio Server Running]: http://localhost:${PORT}`);
});

