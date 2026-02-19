# Netflix Clone Backend

A production-ready backend for the Netflix Clone application built with Node.js, Express.js, MongoDB, and JWT authentication.

## 🚀 Features

- ✅ **User Authentication** - Register, Login, Get Current User
- ✅ **JWT Security** - Secure token-based authentication
- ✅ **Password Hashing** - bcryptjs for secure password storage
- ✅ **Input Validation** - Comprehensive validation for all inputs
- ✅ **Error Handling** - Proper error handling and responses
- ✅ **Environment Variables** - Secure configuration management
- ✅ **CORS Support** - Cross-origin resource sharing
- ✅ **Health Check** - API health monitoring
- ✅ **Graceful Shutdown** - Proper server shutdown handling

## 📋 Requirements

- Node.js 16.0.0 or higher
- MongoDB database
- npm or yarn

## 🛠 Installation

1. **Clone the repository** (if not already done)
2. **Navigate to server directory**
   ```bash
   cd server
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the server directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   NODE_ENV=development
   ```

   **Important:** Replace the values with your actual credentials:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A strong secret key for JWT tokens

## 🗄 Database Setup

### Option 1: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Add it to your `.env` file

### Option 2: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use local connection string: `mongodb://localhost:27017/netflix-clone`

## 🚀 Running the Server

### Development Mode
```bash
npm run dev
```
The server will restart automatically on file changes.

### Production Mode
```bash
npm start
```

## 📡 API Endpoints

### Base URL
```
http://localhost:5000
```

### Authentication Routes

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2023-09-01T12:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2023-09-01T12:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "user": {
      "id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2023-09-01T12:00:00.000Z",
      "updatedAt": "2023-09-01T12:00:00.000Z"
    }
  }
}
```

### Other Endpoints

#### Health Check
```http
GET /api/health
```

#### Root Endpoint
```http
GET /
```

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcryptjs with salt rounds of 12
- **JWT Authentication**: Secure token-based authentication with 7-day expiration
- **Input Validation**: Comprehensive validation for all user inputs
- **CORS Protection**: Configured CORS for secure cross-origin requests
- **Error Handling**: Secure error responses without sensitive information

## 📝 Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Only for validation errors
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (Validation errors)
- `401` - Unauthorized (Authentication errors)
- `404` - Not Found
- `500` - Internal Server Error

## 🧪 Testing with Postman

You can test the API using Postman or any HTTP client:

1. **Register a new user**
   - URL: `POST http://localhost:5000/api/auth/register`
   - Body: JSON with name, email, password

2. **Login with the user**
   - URL: `POST http://localhost:5000/api/auth/login`
   - Body: JSON with email, password
   - Copy the token from response

3. **Access protected route**
   - URL: `GET http://localhost:5000/api/auth/me`
   - Headers: `Authorization: Bearer <your_token>`

## 📁 Project Structure

```
server/
├── config/
│   └── db.js              # Database connection
├── middleware/
│   └── authMiddleware.js  # JWT authentication middleware
├── models/
│   └── User.js            # User model with validation
├── routes/
│   └── auth.js            # Authentication routes
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
├── server.js              # Main server file
└── README.md              # This file
```

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
```

### Deployment Steps
1. Set production environment variables
2. Install dependencies: `npm install --production`
3. Start server: `npm start`

## 🛠 Scripts

- `npm run dev` - Start server in development mode with nodemon
- `npm start` - Start server in production mode

## 📞 Support

If you encounter any issues:
1. Check the console logs for detailed error messages
2. Ensure all environment variables are set correctly
3. Verify MongoDB connection string is valid
4. Make sure Node.js version is 16.0.0 or higher

## 📄 License

This project is licensed under the MIT License.
