// API Configuration for Netflix Clone
// Configured for your custom movie API with movie links

export const API_CONFIG = {
  // Your API Base URL - Replace with your movie API
  BASE_URL: 'https://your-movie-api.com/api', // Replace with your API URL
  
  // Your API Key (if needed)
  API_KEY: 'your_api_key_here', // Replace with your API key or remove if not needed
  
  // API Headers
  HEADERS: {
    'Content-Type': 'application/json',
    // Add any required headers for your API
    // 'Authorization': 'Bearer your_token_here',
  },
  
  // Image Configuration
  IMAGE: {
    // If your API provides full image URLs
    PROVIDES_FULL_URLS: true,
    
    // Base URL for images (if your API provides relative paths)
    BASE_URL: 'https://your-image-cdn.com/', // Update if needed
    
    // Available image sizes
    SIZES: {
      POSTER: {
        SMALL: 'w300',
        MEDIUM: 'w500',
        LARGE: 'w780'
      },
      BACKDROP: {
        SMALL: 'w780',
        LARGE: 'w1280'
      }
    }
  },
  
  // Your API Endpoints - Update these based on your API structure
  ENDPOINTS: {
    // Movie categories - Update with your actual endpoints
    TRENDING: '/movies/trending',
    NETFLIX_ORIGINALS: '/movies/netflix-originals',
    TOP_RATED: '/movies/top-rated',
    ACTION_MOVIES: '/movies/action',
    COMEDY_MOVIES: '/movies/comedy',
    HORROR_MOVIES: '/movies/horror',
    ROMANCE_MOVIES: '/movies/romance',
    DOCUMENTARIES: '/movies/documentaries',
    
    // Movie details
    MOVIE_DETAILS: '/movies/',
    MOVIE_VIDEOS: '/movies/',
    
    // Search
    SEARCH: '/search?q=',
  },
  
  // Your API Response Structure
  RESPONSE_STRUCTURE: {
    // If your API returns data in a 'results' array
    USE_RESULTS_ARRAY: true,
    
    // If your API returns data directly as an array
    USE_DIRECT_ARRAY: false,
    
    // Custom data extractor for your API format
    DATA_EXTRACTOR: (response) => {
      // Update this based on your API response structure
      if (response.results) return response.results;
      if (response.data) return response.data;
      if (response.movies) return response.movies;
      if (Array.isArray(response)) return response;
      return response;
    }
  }
};

// Helper function to get full image URL
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/300x450?text=No+Image';
  
  // If your API provides full URLs, return as is
  if (API_CONFIG.IMAGE.PROVIDES_FULL_URLS || path.startsWith('http')) {
    return path;
  }
  
  // Construct full URL for relative paths
  return `${API_CONFIG.IMAGE.BASE_URL}${size}${path}`;
};

export default API_CONFIG;
