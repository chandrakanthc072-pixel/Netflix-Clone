import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

console.log('🔧 Starting Netflix Backend...');

// Check if required environment variables are set
if (!process.env.JWT_SECRET) {
  console.log('⚠️  JWT_SECRET not found, using default');
  process.env.JWT_SECRET = 'default_secret_key_change_in_production';
}

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Default route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Netflix Backend API Running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Mock auth routes (without database for testing)
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields: name, email, password'
    });
  }

  // Mock user creation
  const mockUser = {
    id: 'mock_user_id',
    name,
    email,
    createdAt: new Date().toISOString()
  };

  // Mock token
  const mockToken = 'mock_jwt_token_for_testing';

  res.status(201).json({
    success: true,
    message: 'User registered successfully (mock mode)',
    data: {
      user: mockUser,
      token: mockToken
    }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password'
    });
  }

  // Mock user login
  const mockUser = {
    id: 'mock_user_id',
    name: 'Test User',
    email,
    createdAt: new Date().toISOString()
  };

  const mockToken = 'mock_jwt_token_for_testing';

  res.status(200).json({
    success: true,
    message: 'Login successful (mock mode)',
    data: {
      user: mockUser,
      token: mockToken
    }
  });
});

app.get('/api/auth/me', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User retrieved successfully (mock mode)',
    data: {
      user: {
        id: 'mock_user_id',
        name: 'Test User',
        email: 'test@example.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📊 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth Routes: http://localhost:${PORT}/api/auth`);
  console.log('\n✅ Netflix Backend API is ready! (Mock Mode)\n');
  console.log('📝 Note: Running in mock mode without database connection');
  console.log('💡 To connect to MongoDB, update .env with MONGO_URI and use server.js');
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

export default app;
