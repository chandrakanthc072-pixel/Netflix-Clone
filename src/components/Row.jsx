import React, { useState, useEffect } from 'react';
import omdb from '../services/tmdb';

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(`Fetching ${title} with search: ${fetchUrl}`);
        const response = await omdb.get('', {
          params: {
            s: fetchUrl,
            type: 'movie'
          }
        });
        console.log(`OMDB Response for ${title}:`, response.data);
        console.log(`Response status:`, response.status);
        
        if (response.data.Search && response.data.Search.length > 0) {
          console.log(`Found ${response.data.Search.length} movies for ${title}`);
          response.data.Search.forEach((movie, index) => {
            console.log(`Movie ${index + 1}:`, {
              title: movie.Title,
              poster: movie.Poster,
              year: movie.Year
            });
          });
          setMovies(response.data.Search);
        } else {
          console.log(`No results found for ${title}`);
          console.log('Full response:', response.data);
          setMovies([]);
        }
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
        console.error('Error response:', error.response?.data);
        setError(error.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchUrl, title]);

  const getImageUrl = (path) => {
    if (!path || path === 'N/A') {
      // Return high-quality placeholder images
      return `https://picsum.photos/seed/${Math.random().toString(36).substr(2, 9)}/300/450.jpg`;
    }
    return path;
  };

  if (loading) {
    return (
      <div className="px-8 mt-6">
        <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-8 mt-6">
        <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="px-8 mt-6">
        <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
        <div className="text-white">No movies found</div>
      </div>
    );
  }

  return (
    <div className="px-8 mt-6">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      
      <div className="flex overflow-x-scroll gap-4 scrollbar-hide pb-4">
        {movies.map((movie) => (
          <div
            key={movie?.imdbID}
            className="flex-none cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:shadow-xl"
          >
            <img
              src={getImageUrl(movie?.Poster)}
              alt={movie?.Title || 'Movie'}
              className="w-48 h-72 object-cover rounded-lg"
              onLoad={(e) => {
                console.log(`Image loaded: ${movie?.Title}`, e.target.src);
              }}
              onError={(e) => {
                console.log(`Image failed for: ${movie?.Title}`, movie?.Poster);
                e.target.src = `https://picsum.photos/seed/${movie?.imdbID || 'fallback'}/300/450.jpg`;
              }}
            />
            <div className="text-white text-sm mt-2 text-center">
              {movie?.Title || 'Unknown'}
            </div>
            <div className="text-gray-400 text-xs text-center">
              {movie?.Year || 'N/A'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Row;
