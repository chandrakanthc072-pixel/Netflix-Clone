import React from 'react';
import { getImageUrl } from '../services/tmdb';

const MovieCard = ({ movie, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(movie);
    }
  };

  return (
    <div
      className="relative group cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={handleClick}
    >
      <img
        src={getImageUrl(movie.poster_path)}
        alt={movie.title || movie.name}
        className="w-full h-48 object-cover rounded-md"
      />
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex items-center justify-center">
        <div className="text-center p-2">
          <h3 className="text-white text-sm font-semibold mb-1">
            {movie.title || movie.name || movie.original_name}
          </h3>
          <p className="text-gray-300 text-xs">
            {movie.vote_average ? `⭐ ${Math.round(movie.vote_average * 10)}%` : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
