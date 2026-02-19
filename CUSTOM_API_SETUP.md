# 🎬 Custom Movie API Setup Guide

Your Netflix Clone is now ready to work with ANY movie API! Here's how to connect your custom API:

## 🚀 Quick Setup

### 1. Update API Configuration

Open `src/config/apiConfig.js` and update these values:

```javascript
export const API_CONFIG = {
  // Your API Base URL
  BASE_URL: 'https://your-movie-api.com/api', // Replace with your API URL
  
  // Your API Key (if needed)
  API_KEY: 'your_api_key_here', // Replace with your API key or remove if not needed
  
  // Your API Endpoints
  ENDPOINTS: {
    TRENDING: '/movies/trending',
    NETFLIX_ORIGINALS: '/movies/netflix-originals',
    TOP_RATED: '/movies/top-rated',
    ACTION_MOVIES: '/movies/action',
    COMEDY_MOVIES: '/movies/comedy',
    HORROR_MOVIES: '/movies/horror',
    ROMANCE_MOVIES: '/movies/romance',
    DOCUMENTARIES: '/movies/documentaries',
  }
}
```

## 📋 Expected API Response Format

Your API should return movies in this format (or similar):

### Option 1: Standard Format
```json
{
  "results": [
    {
      "id": "movie1",
      "title": "Movie Title",
      "poster": "https://example.com/poster.jpg",
      "overview": "Movie description...",
      "rating": 8.5,
      "year": "2023",
      "genre": "Action, Drama"
    }
  ]
}
```

### Option 2: Direct Array
```json
[
  {
    "id": "movie1",
    "title": "Movie Title",
    "poster": "https://example.com/poster.jpg",
    "description": "Movie description...",
    "score": 8.5,
    "release_date": "2023"
  }
]
```

### Option 3: Custom Format
```json
{
  "data": {
    "movies": [
      {
        "movie_id": "movie1",
        "name": "Movie Title",
        "image": "https://example.com/poster.jpg",
        "synopsis": "Movie description...",
        "imdb_rating": 8.5,
        "release_year": "2023"
      }
    ]
  }
}
```

## 🎯 Supported Field Names

The Netflix Clone automatically maps these field names:

### Title Fields
- `title`, `Title`, `name`, `Name`

### Image Fields
- `poster`, `Poster`, `image`, `thumbnail`, `poster_path`

### Description Fields
- `overview`, `description`, `synopsis`, `Plot`

### Rating Fields
- `rating`, `score`, `imdbRating`, `vote_average`

### Date Fields
- `year`, `release_date`, `release`, `Year`

### ID Fields
- `id`, `imdbID`, `movie_id`

## 🖼 Image Requirements

### Option 1: Full URLs
If your API provides full image URLs:
```javascript
IMAGE: {
  PROVIDES_FULL_URLS: true,
}
```

### Option 2: Relative Paths
If your API provides relative paths:
```javascript
IMAGE: {
  PROVIDES_FULL_URLS: false,
  BASE_URL: 'https://your-cdn.com/',
}
```

## 🔧 Response Structure Configuration

Update the `DATA_EXTRACTOR` function based on your API:

```javascript
DATA_EXTRACTOR: (response) => {
  if (response.results) return response.results;  // Standard format
  if (response.data) return response.data;        // Custom format
  if (response.movies) return response.movies;    // Movies field
  if (Array.isArray(response)) return response;   // Direct array
  return response;
}
```

## ✨ What You Get

Once configured, your Netflix Clone will display:

✅ **Beautiful Movie Cards** - Exact Netflix-style design  
✅ **Horizontal Scrolling** - Smooth rows with scroll buttons  
✅ **Hover Effects** - Play button overlays and movie info  
✅ **Movie Modal** - Click any movie for details  
✅ **Responsive Design** - Works on all devices  
✅ **Loading States** - Skeleton loaders while fetching  
✅ **Error Handling** - Graceful fallbacks to mock data  

## 🧪 Test It Now

The app already shows beautiful Netflix-style mock data! You can:

1. **Start the app**: `npm run dev`
2. **See the interface** with sample movies
3. **Add your API details** when ready
4. **It will automatically switch** to your real data

## 🎨 Features Included

- **8 Movie Categories** - Trending, Netflix Originals, Top Rated, Action, Comedy, Horror, Romance, Documentaries
- **Large Posters** - Netflix Originals show bigger landscape posters
- **Match Percentage** - Shows "XX% Match" like real Netflix
- **Age Ratings** - Shows maturity ratings (13+, 16+, 18+)
- **Duration** - Shows movie/show duration
- **Beautiful Images** - Uses high-quality placeholder images

## 📞 Need Help?

If your API has a different format, just show me a sample response and I'll help you configure it!

**Your Netflix Clone is ready for any movie API! 🎉**
