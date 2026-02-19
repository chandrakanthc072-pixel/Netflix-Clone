console.log('🔧 Testing minimal server...');

import express from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('✅ Express loaded');
console.log('✅ Dotenv loaded');
console.log('✅ Environment variables loaded');

// Create minimal express app
const app = express();
const PORT = process.env.PORT || 5000;

// Basic middleware
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Minimal server is working!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Minimal server running on port ${PORT}`);
  console.log('✅ Basic setup is working!');
});

console.log('🎯 If you see this message, the basic setup is working');
