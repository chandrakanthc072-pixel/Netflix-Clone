console.log('🚀 Starting simple test...');

// Test basic Node.js functionality
console.log('✅ Node.js is working');

// Test if we can read files
import fs from 'fs';
import path from 'path';

try {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  console.log('✅ package.json loaded:', packageJson.name);
  console.log('✅ Dependencies:', Object.keys(packageJson.dependencies));
} catch (error) {
  console.error('❌ Error reading package.json:', error.message);
}

// Test if node_modules exists
try {
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  const nodeModulesExists = fs.existsSync(nodeModulesPath);
  if (nodeModulesExists) {
    console.log('✅ node_modules exists');
  } else {
    console.log('❌ node_modules missing - run npm install');
  }
} catch (error) {
  console.error('❌ Error checking node_modules:', error.message);
}

console.log('✅ Simple test completed');
