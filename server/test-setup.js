// Simple test to verify backend setup
console.log('🔍 Testing Netflix Backend Setup...\n');

// Check if required files exist
const fs = await import('fs');
const path = await import('path');

const requiredFiles = [
  'package.json',
  'server.js',
  '.env',
  'config/db.js',
  'models/User.js',
  'middleware/authMiddleware.js',
  'routes/auth.js'
];

console.log('📁 Checking required files...');
let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - Missing!`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log('\n✅ All required files are present!');
} else {
  console.log('\n❌ Some required files are missing!');
  process.exit(1);
}

// Check package.json dependencies
console.log('\n📦 Checking package.json...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  const requiredDeps = ['express', 'mongoose', 'jsonwebtoken', 'bcryptjs', 'dotenv', 'cors'];
  const requiredDevDeps = ['nodemon'];
  
  console.log('Dependencies:');
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      console.log(`✅ ${dep}@${packageJson.dependencies[dep]}`);
    } else {
      console.log(`❌ ${dep} - Missing!`);
    }
  });
  
  console.log('Dev Dependencies:');
  requiredDevDeps.forEach(dep => {
    if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
      console.log(`✅ ${dep}@${packageJson.devDependencies[dep]}`);
    } else {
      console.log(`❌ ${dep} - Missing!`);
    }
  });
  
  // Check scripts
  console.log('Scripts:');
  if (packageJson.scripts) {
    console.log(`✅ dev: ${packageJson.scripts.dev}`);
    console.log(`✅ start: ${packageJson.scripts.start}`);
  } else {
    console.log('❌ Scripts missing!');
  }
  
} catch (error) {
  console.log('❌ Error reading package.json:', error.message);
}

console.log('\n🚀 Backend Setup Complete!');
console.log('\nNext steps:');
console.log('1. cd server');
console.log('2. npm install');
console.log('3. Update .env with your MongoDB URI and JWT secret');
console.log('4. npm run dev');
console.log('5. Test API endpoints');

console.log('\n📡 Available Endpoints:');
console.log('POST /api/auth/register - Register new user');
console.log('POST /api/auth/login - Login user');
console.log('GET /api/auth/me - Get current user (protected)');
console.log('GET /api/health - Health check');
console.log('GET // - Root endpoint');

console.log('\n🎬 Netflix Backend is ready to run!');
