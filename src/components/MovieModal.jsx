import React, { useState, useEffect } from 'react';
import { fetchMovieDetails, fetchMovieVideos, getImageUrl } from '../services/tmdb';

const MovieModal = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setLoading(true);
        const [movieDetails, movieVideos] = await Promise.all([
          fetchMovieDetails(movie.id),
          fetchMovieVideos(movie.id)
        ]);
        setDetails(movieDetails);
        setVideos(movieVideos || []);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (movie) {
      loadMovieDetails();
    }
  }, [movie]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getTrailer = () => {
    return videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
  };

  if (!movie) return null;

  const trailer = getTrailer();

  return (
    <div 
      className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <img
            src={getImageUrl(movie.backdrop_path)}
            alt={movie.title || movie.name}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent rounded-t-lg"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded mb-2 w-1/2"></div>
              <div className="h-4 bg-gray-700 rounded mb-4 w-1/3"></div>
              <div className="h-20 bg-gray-700 rounded mb-4"></div>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-white mb-2">
                {movie.title || movie.name || movie.original_name}
              </h2>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-green-400 font-semibold">
                  {Math.round((movie.vote_average || 0) * 10)}% Match
                </span>
                <span className="text-white text-sm">
                  {movie.first_air_date || movie.release_date ? 
                    new Date(movie.first_air_date || movie.release_date).getFullYear() : 
                    '2024'
                  }
                </span>
                {details?.runtime && (
                  <span className="text-white text-sm">
                    {Math.floor(details.runtime / 60)}h {details.runtime % 60}m
                  </span>
                )}
                <span className="text-white border border-white/50 px-2 py-1 text-sm">
                  HD
                </span>
              </div>

              <div className="flex space-x-4 mb-6">
                <button className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  <span className="font-semibold">Play</span>
                </button>
                
                <button className="bg-gray-600/80 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="font-semibold">My List</span>
                </button>
              </div>

              <p className="text-white text-lg mb-6">
                {movie.overview || 'No description available.'}
              </p>

              {/* Genres */}
              {details?.genres && details.genres.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {details.genres.map((genre) => (
                      <span 
                        key={genre.id}
                        className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Trailer */}
              {trailer && (
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-2">Trailer</h3>
                  <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${trailer.key}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
