import React, { useState, useEffect } from 'react';
import { movieApi } from '../services/movieApi';

const ApiTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testAPI = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Testing OMDB API...');
      
      // Test trending movies
      const trending = await movieApi.getTrending();
      console.log('Trending results:', trending);
      
      setTestResults(trending || []);
    } catch (err) {
      console.error('API Test Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testAPI();
  }, []);

  if (loading) {
    return (
      <div className="p-4 bg-gray-900 text-white">
        <h3 className="text-lg font-semibold mb-2">Testing OMDB API...</h3>
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-900 text-white">
        <h3 className="text-lg font-semibold mb-2">API Error</h3>
        <p className="text-sm">{error}</p>
        <button 
          onClick={testAPI}
          className="mt-2 px-4 py-2 bg-red-600 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-900 text-white">
      <h3 className="text-lg font-semibold mb-2">OMDB API Test Results</h3>
      <p className="text-sm mb-4">Found {testResults.length} movies</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {testResults.map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded p-2">
            <img 
              src={movie.poster_path} 
              alt={movie.title}
              className="w-full h-32 object-cover rounded mb-2"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150x225?text=No+Image';
              }}
            />
            <h4 className="text-xs font-semibold truncate">{movie.title}</h4>
            <p className="text-xs text-gray-400">{movie.release_date}</p>
            <p className="text-xs text-green-400">⭐ {movie.vote_average}</p>
          </div>
        ))}
      </div>
      
      {testResults.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No movies found. Check your API key and configuration.</p>
          <button 
            onClick={testAPI}
            className="mt-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Test Again
          </button>
        </div>
      )}
    </div>
  );
};

export default ApiTest;
