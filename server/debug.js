// Debug script to check for syntax errors
console.log('🔍 Checking for syntax errors...');

try {
  // Test imports
  console.log('Testing imports...');
  
  // Check if we can load dotenv
  import('dotenv').then(() => {
    console.log('✅ dotenv loaded successfully');
  }).catch(err => {
    console.error('❌ dotenv error:', err.message);
  });

  // Check if we can load express
  import('express').then(() => {
    console.log('✅ express loaded successfully');
  }).catch(err => {
    console.error('❌ express error:', err.message);
  });

  // Check if we can load mongoose
  import('mongoose').then(() => {
    console.log('✅ mongoose loaded successfully');
  }).catch(err => {
    console.error('❌ mongoose error:', err.message);
  });

  // Check if .env file exists
  import('fs').then(fs => {
    try {
      const envExists = fs.existsSync('.env');
      if (envExists) {
        console.log('✅ .env file exists');
      } else {
        console.log('❌ .env file missing - create one from .env.example');
      }
    } catch (err) {
      console.error('❌ Error checking .env file:', err.message);
    }
  });

  console.log('✅ Basic syntax check completed');
  
} catch (error) {
  console.error('❌ Syntax error:', error.message);
  console.error('Stack:', error.stack);
}

console.log('\n📋 Quick fixes to try:');
console.log('1. Make sure you have a .env file');
console.log('2. Install dependencies: npm install');
console.log('3. Check Node.js version: node --version (should be >=16)');
console.log('4. Run: npm run dev');
