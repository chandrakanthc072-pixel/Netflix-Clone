# 🎬 Netflix Clone API Setup Guide

## 🚀 Quick Setup

Your Netflix Clone is now ready to work with any movie API! Here's how to configure it:

### 1. Update API Configuration

Open `src/config/apiConfig.js` and update these values:

```javascript
export const API_CONFIG = {
  // Your API Base URL
  BASE_URL: 'https://your-api-url.com', // Replace with your API
  
  // Your API Key
  API_KEY: 'your_actual_api_key', // Replace with your API key
  
  // Add any required headers
  HEADERS: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_token', // If needed
  },
}
```

### 2. Update API Endpoints

If your API has different endpoints, update them in `apiConfig.js`:

```javascript
ENDPOINTS: {
  TRENDING: '/your-trending-endpoint',
  NETFLIX_ORIGINALS: '/your-originals-endpoint',
  TOP_RATED: '/your-top-rated-endpoint',
  // ... etc
}
```

### 3. Configure Response Structure

If your API returns data in a different format, update:

```javascript
RESPONSE_STRUCTURE: {
  // If your API returns data like: { results: [...] }
  USE_RESULTS_ARRAY: true,
  
  // If your API returns data directly as an array: [...]
  USE_DIRECT_ARRAY: false,
  
  // Custom extractor for complex structures
  DATA_EXTRACTOR: (response) => {
    if (response.data) return response.data;
    if (response.movies) return response.movies;
    return response;
  }
}
```

## 🎯 Supported API Formats

### Format 1: TMDB-like API
```json
{
  "results": [
    {
      "id": 1,
      "title": "Movie Title",
      "poster_path": "/path.jpg",
      "backdrop_path": "/path.jpg",
      "overview": "Description",
      "vote_average": 8.5
    }
  ]
}
```

### Format 2: Direct Array
```json
[
  {
    "id": 1,
    "title": "Movie Title",
    "poster": "/path.jpg",
    "description": "Description"
  }
]
```

### Format 3: Custom Object
```json
{
  "data": {
    "movies": [...]
  }
}
```

## 🖼 Image Configuration

### If your API provides full image URLs:
```javascript
IMAGE: {
  PROVIDES_FULL_URLS: true,
}
```

### If your API provides relative paths:
```javascript
IMAGE: {
  PROVIDES_FULL_URLS: false,
  BASE_URL: 'https://your-image-cdn.com/',
}
```

## 🧪 Testing the Setup

### 1. Check Console Logs
Open browser console to see:
- API requests being made
- Any errors
- Mock data being used if API fails

### 2. Test with Mock Data
The app will show beautiful Netflix-style content even without a real API!

### 3. Verify API Integration
Once you add your API details:
1. Open the browser
2. Go to the Home page
3. Check Network tab in DevTools
4. See API requests being made

## 🔧 Common API Examples

### Example 1: TMDB API
```javascript
BASE_URL: 'https://api.themoviedb.org/3',
API_KEY: 'your_tmdb_key',
ENDPOINTS: {
  TRENDING: '/trending/all/week',
  NETFLIX_ORIGINALS: '/discover/tv?with_networks=213',
}
```

### Example 2: Custom API
```javascript
BASE_URL: 'https://api.yourmovieapp.com/v1',
API_KEY: 'your_api_key',
HEADERS: {
  'X-API-Key': 'your_api_key',
},
ENDPOINTS: {
  TRENDING: '/movies/trending',
  NETFLIX_ORIGINALS: '/movies/originals',
}
```

### Example 3: Self-Hosted API
```javascript
BASE_URL: 'http://localhost:8000/api',
API_KEY: '', // No key needed
ENDPOINTS: {
  TRENDING: '/movies/trending',
  NETFLIX_ORIGINALS: '/movies/originals',
}
```

## 🎨 Features Included

✅ **Netflix-Style UI** - Exact replica of Netflix interface  
✅ **Horizontal Scrolling** - Smooth movie rows with scroll buttons  
✅ **Hover Effects** - Beautiful play button overlays  
✅ **Movie Modal** - Click any movie for details  
✅ **Responsive Design** - Works on all devices  
✅ **Loading States** - Skeleton loaders while fetching  
✅ **Error Handling** - Graceful fallbacks to mock data  
✅ **Large Posters** - Netflix Originals show bigger posters  

## 🚀 Ready to Use

Your Netflix Clone now has:

1. **Beautiful UI** - Looks exactly like Netflix
2. **Mock Data** - Shows content even without API
3. **Easy API Integration** - Just update config file
4. **Flexible Structure** - Works with any movie API
5. **Production Ready** - Error handling, loading states, etc.

## 📞 Need Help?

If you have any issues:
1. Check browser console for errors
2. Verify API URL and key are correct
3. Check API response format
4. Make sure CORS is enabled on your API

**Your Netflix Clone is ready! Just provide your API key and it will work perfectly! 🎉**
