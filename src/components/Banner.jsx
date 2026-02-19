import React from 'react';

const Banner = ({ movie }) => {
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  const getImageUrl = (path) => {
    if (!path || path === 'N/A') {
      return 'https://picsum.photos/seed/netflix-banner/1280/720.jpg';
    }
    return path;
  };

  if (!movie) {
    return (
      <div className="relative h-[70vh] md:h-[80vh] bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 animate-pulse"></div>
        <div className="relative z-10 h-full flex items-center">
          <div className="px-4 md:px-8 max-w-2xl">
            <div className="animate-pulse">
              <div className="h-12 w-64 bg-gray-700 rounded mb-4"></div>
              <div className="h-6 w-48 bg-gray-700 rounded mb-4"></div>
              <div className="h-4 w-full bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-700 rounded mb-6"></div>
              <div className="flex space-x-4">
                <div className="h-12 w-32 bg-gray-700 rounded"></div>
                <div className="h-12 w-24 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[70vh] md:h-[80vh]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={getImageUrl(movie.Poster)}
          alt={movie.Title}
          className="w-full h-full object-cover"
        />
        {/* Netflix-style gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="px-4 md:px-8 max-w-2xl">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {movie.Title}
          </h1>

          {/* Movie Info */}
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-green-400 font-semibold">
              88% Match
            </span>
            {movie.Year && (
              <span className="text-white text-sm">
                {movie.Year}
              </span>
            )}
            <span className="text-white text-sm border border-gray-400 px-2 py-1">
              HD
            </span>
          </div>

          {/* Description */}
          <p className="text-white text-base md:text-lg mb-6 leading-relaxed">
            {truncate(movie.Plot || 'No description available.', 150)}
          </p>

          {/* Action Buttons - Netflix style */}
          <div className="flex space-x-4">
            <button className="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              <span>Play</span>
            </button>
            <button className="bg-gray-600/70 bg-opacity-60 text-white px-8 py-3 rounded font-semibold hover:bg-gray-600 transition-colors duration-200 flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fade to bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};

export default Banner;
