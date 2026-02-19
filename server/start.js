#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Netflix Backend Startup Helper\n');

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

console.log(`📋 Node.js version: ${nodeVersion}`);

if (majorVersion < 16) {
  console.error('❌ Node.js version 16 or higher required');
  console.log('Please upgrade Node.js from https://nodejs.org/');
  process.exit(1);
} else {
  console.log('✅ Node.js version is compatible');
}

// Check if we're in the right directory
const packageJsonPath = path.join(__dirname, 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ package.json not found. Make sure you run this from the server directory.');
  process.exit(1);
} else {
  console.log('✅ package.json found');
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('⚠️  node_modules not found. Installing dependencies...');
  
  const { spawn } = await import('child_process');
  const npmInstall = spawn('npm', ['install'], { 
    cwd: __dirname,
    stdio: 'inherit' 
  });
  
  npmInstall.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Dependencies installed successfully');
      checkEnvFile();
    } else {
      console.error('❌ Failed to install dependencies');
      process.exit(1);
    }
  });
} else {
  console.log('✅ node_modules exists');
  checkEnvFile();
}

function checkEnvFile() {
  const envPath = path.join(__dirname, '.env');
  const envExamplePath = path.join(__dirname, '.env.example');
  
  if (!fs.existsSync(envPath)) {
    console.log('⚠️  .env file not found');
    
    if (fs.existsSync(envExamplePath)) {
      console.log('📝 Creating .env file from .env.example...');
      fs.copyFileSync(envExamplePath, envPath);
      console.log('✅ .env file created');
      console.log('⚠️  Please update the .env file with your actual values:');
      console.log('   - MONGO_URI: Your MongoDB connection string');
      console.log('   - JWT_SECRET: Your secret JWT key');
    } else {
      console.log('📝 Creating basic .env file...');
      const basicEnv = `PORT=5000
MONGO_URI=mongodb://localhost:27017/netflix-clone
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development`;
      fs.writeFileSync(envPath, basicEnv);
      console.log('✅ Basic .env file created');
    }
  } else {
    console.log('✅ .env file exists');
  }
  
  startServer();
}

function startServer() {
  console.log('\n🚀 Starting Netflix Backend...\n');
  
  // Try to start the fixed server first (no database required)
  import('./server-fixed.js').then(() => {
    console.log('✅ Server started successfully (mock mode)');
    console.log('\n📡 Available endpoints:');
    console.log('   GET  http://localhost:5000/');
    console.log('   GET  http://localhost:5000/api/health');
    console.log('   POST http://localhost:5000/api/auth/register');
    console.log('   POST http://localhost:5000/api/auth/login');
    console.log('   GET  http://localhost:5000/api/auth/me');
    console.log('\n💡 To connect to MongoDB, update your .env file and run: node server.js');
  }).catch(error => {
    console.error('❌ Failed to start server:', error.message);
    console.log('\n🔧 Manual troubleshooting:');
    console.log('1. Run: npm install');
    console.log('2. Check .env file configuration');
    console.log('3. Try: node server-fixed.js');
    console.log('4. See TROUBLESHOOTING.md for more help');
  });
}
