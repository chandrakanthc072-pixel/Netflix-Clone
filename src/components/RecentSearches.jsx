import React, { useState, useEffect } from 'react';
import omdb from '../services/tmdb';

const RecentSearches = ({ onSelectSearch, isVisible, onClose }) => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecentSearches(searches);
  }, []);

  const handleSearchClick = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await omdb.get('', {
        params: {
          s: searchTerm,
          type: 'movie'
        }
      });
      
      if (response.data.Search && response.data.Search.length > 0) {
        setSearchResults({
          term: searchTerm,
          movies: response.data.Search
        });
      } else {
        setSearchResults({
          term: searchTerm,
          movies: []
        });
      }
    } catch (error) {
      console.error('Error searching:', error);
      setSearchResults({
        term: searchTerm,
        movies: []
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMovieSelect = (movie) => {
    onSelectSearch(movie);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-gray-900 rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-white text-2xl font-bold">Recent Searches</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl font-bold transition-colors"
          >
            ×
          </button>
        </div>

        <div className="flex h-[calc(80vh-88px)]">
          {/* Recent Searches List */}
          <div className="w-1/3 border-r border-gray-800 overflow-y-auto p-4">
            {recentSearches.length === 0 ? (
              <div className="text-gray-400 text-center py-8">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>No recent searches</p>
                <p className="text-sm mt-2">Your search history will appear here</p>
              </div>
            ) : (
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <button
                      onClick={() => handleSearchClick(search)}
                      className="flex items-center space-x-3 flex-1 text-left w-full"
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="text-white text-sm">{search}</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search Results */}
          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-white">Searching...</div>
              </div>
            ) : searchResults ? (
              <div>
                <h3 className="text-white text-lg font-semibold mb-4">
                  Results for "{searchResults.term}"
                </h3>
                {searchResults.movies.length === 0 ? (
                  <div className="text-gray-400 text-center py-8">
                    <p>No movies found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {searchResults.movies.map((movie) => (
                      <div
                        key={movie.imdbID}
                        onClick={() => handleMovieSelect(movie)}
                        className="cursor-pointer group"
                      >
                        <div className="relative overflow-hidden rounded-lg">
                          <img
                            src={movie.Poster !== 'N/A' ? movie.Poster : `https://picsum.photos/seed/${movie.imdbID}/300/450.jpg`}
                            alt={movie.Title}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              e.target.src = `https://picsum.photos/seed/${movie.imdbID}/300/450.jpg`;
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300"></div>
                        </div>
                        <div className="mt-2">
                          <p className="text-white text-sm font-medium truncate">{movie.Title}</p>
                          <p className="text-gray-400 text-xs">{movie.Year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-gray-400 text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p>Select a search to view results</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentSearches;
