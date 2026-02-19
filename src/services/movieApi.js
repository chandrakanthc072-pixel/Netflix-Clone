// Custom API Service for Netflix Clone
// Configured for your custom movie API

import { API_CONFIG, getImageUrl } from '../config/apiConfig.js';

// Movie API Service
export const movieApi = {
  // Generic fetch function
  async fetch(endpoint, options = {}) {
    try {
      // Construct URL for your API
      let url = `${API_CONFIG.BASE_URL}${endpoint}`;
      
      // Add API key if needed
      if (API_CONFIG.API_KEY && !url.includes('?')) {
        url += `?api_key=${API_CONFIG.API_KEY}`;
      }
      
      console.log('Fetching from:', url);
      
      const response = await fetch(url, {
        headers: API_CONFIG.HEADERS,
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      // Extract data based on your API response structure
      const extractedData = API_CONFIG.RESPONSE_STRUCTURE.DATA_EXTRACTOR(data);
      
      // Map your API fields to Netflix Clone format
      const mappedData = extractedData.map(movie => this.mapToNetflixFormat(movie));
      
      return mappedData;
    } catch (error) {
      console.error('API fetch error:', error);
      
      // Return beautiful Netflix-style mock data if API fails
      return this.getNetflixMockData(endpoint);
    }
  },

  // Map your API response to Netflix Clone format
  mapToNetflixFormat(movie) {
    return {
      id: movie.id || movie.imdbID || Math.random().toString(36).substr(2, 9),
      title: movie.title || movie.Title || movie.name || 'Unknown Title',
      name: movie.title || movie.Title || movie.name || 'Unknown Title',
      poster_path: movie.poster_path || movie.Poster || movie.poster || movie.image || movie.thumbnail,
      backdrop_path: movie.backdrop_path || movie.backdrop || movie.poster_path || movie.Poster || movie.poster,
      overview: movie.overview || movie.Plot || movie.description || movie.synopsis || 'No description available.',
      vote_average: parseFloat(movie.vote_average || movie.rating || movie.imdbRating || movie.score) || 0,
      release_date: movie.release_date || movie.Year || movie.year || movie.release || '2023',
      type: movie.type || movie.Type || 'movie',
      genre: movie.genre || movie.Genre || 'Unknown',
      imdbID: movie.imdbID || movie.id,
      // Additional fields for your API
      duration: movie.duration || movie.runtime || '2h',
      maturity: movie.maturity || movie.age_rating || '13+'
    };
  },

  // Beautiful Netflix-style mock data
  getNetflixMockData(endpoint) {
    const netflixMovies = [
      {
        id: 'netflix1',
        title: "Stranger Things",
        poster_path: "https://images.unsplash.com/photo-1626814026160-773741800674?w=300&h=450&fit=crop",
        backdrop_path: "https://images.unsplash.com/photo-1626814026160-773741800674?w=1280&h=720&fit=crop",
        overview: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
        vote_average: 8.7,
        release_date: "2016",
        type: "series",
        genre: "Drama, Fantasy, Horror",
        duration: "1h",
        maturity: "16+"
      },
      {
        id: 'netflix2',
        title: "The Crown",
        poster_path: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=450&fit=crop",
        backdrop_path: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1280&h=720&fit=crop",
        overview: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
        vote_average: 8.6,
        release_date: "2016",
        type: "series",
        genre: "Drama, History",
        duration: "1h",
        maturity: "16+"
      },
      {
        id: 'netflix3',
        title: "Breaking Bad",
        poster_path: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
        backdrop_path: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1280&h=720&fit=crop",
        overview: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
        vote_average: 9.5,
        release_date: "2008",
        type: "series",
        genre: "Crime, Drama, Thriller",
        duration: "45m",
        maturity: "18+"
      },
      {
        id: 'netflix4',
        title: "Money Heist",
        poster_path: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop",
        backdrop_path: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1280&h=720&fit=crop",
        overview: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint.",
        vote_average: 8.2,
        release_date: "2017",
        type: "series",
        genre: "Action, Crime, Drama",
        duration: "50m",
        maturity: "16+"
      },
      {
        id: 'netflix5',
        title: "The Witcher",
        poster_path: "https://images.unsplash.com/photo-1578915622602-65d758a9c716?w=300&h=450&fit=crop",
        backdrop_path: "https://images.unsplash.com/photo-1578915622602-65d758a9c716?w=1280&h=720&fit=crop",
        overview: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
        vote_average: 8.2,
        release_date: "2019",
        type: "series",
        genre: "Action, Adventure, Drama",
        duration: "1h",
        maturity: "18+"
      },
      {
        id: 'netflix6',
        title: "Squid Game",
        poster_path: "https://images.unsplash.com/photo-1608501078770-02b39ed4c15b?w=300&h=450&fit=crop",
        backdrop_path: "https://images.unsplash.com/photo-1608501078770-02b39ed4c15b?w=1280&h=720&fit=crop",
        overview: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes.",
        vote_average: 8.0,
        release_date: "2021",
        type: "series",
        genre: "Action, Drama, Mystery",
        duration: "55m",
        maturity: "18+"
      },
      {
        id: 'netflix7',
        title: "The Queen's Gambit",
        poster_path: "https://images.unsplash.com/photo-1515934751635-c81c6aa9ff2e?w=300&h=450&fit=crop",
        backdrop_path: "https://images.unsplash.com/photo-1515934751635-c81c6aa9ff2e?w=1280&h=720&fit=crop",
        overview: "Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA.",
        vote_average: 8.5,
        release_date: "2020",
        type: "series",
        genre: "Drama, Sport",
        duration: "45m",
        maturity: "13+"
      },
      {
        id: 'netflix8',
        title: "Dark",
        poster_path: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=300&h=450&fit=crop",
        backdrop_path: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=1280&h=720&fit=crop",
        overview: "A family saga with a supernatural twist, set in a German town, where the disappearance of two young children exposes the broken relationships among four families.",
        vote_average: 8.7,
        release_date: "2017",
        type: "series",
        genre: "Drama, Mystery, Sci-Fi",
        duration: "50m",
        maturity: "16+"
      }
    ];

    // Shuffle and return different subsets for different categories
    const shuffled = [...netflixMovies].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 6 + Math.floor(Math.random() * 3));
    return selected.map(movie => this.mapToNetflixFormat(movie));
  },

  // Movie endpoints using your API configuration
  async getTrending() {
    return this.fetch(API_CONFIG.ENDPOINTS.TRENDING);
  },

  async getNetflixOriginals() {
    return this.fetch(API_CONFIG.ENDPOINTS.NETFLIX_ORIGINALS);
  },

  async getTopRated() {
    return this.fetch(API_CONFIG.ENDPOINTS.TOP_RATED);
  },

  async getActionMovies() {
    return this.fetch(API_CONFIG.ENDPOINTS.ACTION_MOVIES);
  },

  async getComedyMovies() {
    return this.fetch(API_CONFIG.ENDPOINTS.COMEDY_MOVIES);
  },

  async getHorrorMovies() {
    return this.fetch(API_CONFIG.ENDPOINTS.HORROR_MOVIES);
  },

  async getRomanceMovies() {
    return this.fetch(API_CONFIG.ENDPOINTS.ROMANCE_MOVIES);
  },

  async getDocumentaries() {
    return this.fetch(API_CONFIG.ENDPOINTS.DOCUMENTARIES);
  },

  // Movie details
  async getMovieDetails(movieId) {
    return this.fetch(`${API_CONFIG.ENDPOINTS.MOVIE_DETAILS}${movieId}`);
  },

  // Search movies
  async searchMovies(query) {
    return this.fetch(`${API_CONFIG.ENDPOINTS.SEARCH}${encodeURIComponent(query)}`);
  },

  // Get movie trailers/videos
  async getMovieVideos(movieId) {
    return this.fetch(`${API_CONFIG.ENDPOINTS.MOVIE_VIDEOS}${movieId}/videos`);
  }
};

// Export individual functions for easier use
export const {
  getTrending,
  getNetflixOriginals,
  getTopRated,
  getActionMovies,
  getComedyMovies,
  getHorrorMovies,
  getRomanceMovies,
  getDocumentaries,
  getMovieDetails,
  searchMovies,
  getMovieVideos
} = movieApi;

// Export getImageUrl from config
export { getImageUrl };

export default movieApi;
