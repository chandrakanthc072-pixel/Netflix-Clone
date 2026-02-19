# 🚨 Netflix Backend Troubleshooting Guide

## Common Issues and Solutions

### 1. App Crashing on Startup

**Possible Causes:**
- Missing `.env` file
- Missing dependencies
- MongoDB connection issues
- Node.js version compatibility

**Solutions:**

#### Step 1: Check Node.js Version
```bash
node --version
# Should be 16.0.0 or higher
```

#### Step 2: Install Dependencies
```bash
cd server
npm install
```

#### Step 3: Create .env File
Create a `.env` file in the server directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/netflix-clone
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

#### Step 4: Try the Fixed Server
```bash
cd server
node server-fixed.js
```

### 2. MongoDB Connection Issues

**If you don't have MongoDB installed:**

#### Option A: Use MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a free cluster
4. Get your connection string
5. Update your `.env` file:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/netflix-clone
```

#### Option B: Install MongoDB Locally
1. Download and install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Use local connection string:
```env
MONGO_URI=mongodb://localhost:27017/netflix-clone
```

#### Option C: Run Without Database (Testing Only)
Use the fixed server that works without MongoDB:
```bash
node server-fixed.js
```

### 3. Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use a different port
# Update .env file:
PORT=5001
```

### 4. Permission Issues

**Error:** `EACCES: permission denied`

**Solution:**
```bash
# Run as administrator (Windows)
# Or use a different port above 1024
```

### 5. Module Not Found Errors

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
cd server
npm install
# If still not working:
npm cache clean --force
npm install
```

## Quick Start Commands

### Test Basic Setup
```bash
cd server
node simple-test.js
```

### Run Minimal Server
```bash
cd server
node minimal-server.js
```

### Run Fixed Server (No Database)
```bash
cd server
node server-fixed.js
```

### Run Full Server (With Database)
```bash
cd server
# Make sure .env is configured
npm run dev
```

## API Testing

### Test the fixed server:
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Environment Variables Template

Create `.env` file:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/netflix-clone

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Optional: Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

## Still Having Issues?

1. **Check the error message carefully**
2. **Make sure you're in the correct directory** (`cd server`)
3. **Verify all dependencies are installed** (`npm list`)
4. **Check if Node.js is properly installed**
5. **Try running the fixed server first** (`node server-fixed.js`)

## Contact Support

If you're still experiencing issues:
1. Copy the full error message
2. Run `node --version` and `npm --version`
3. Check if `.env` file exists and is correctly configured
4. Try the fixed server as a fallback solution
