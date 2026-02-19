import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Row from '../components/Row';
import omdb from '../services/tmdb';

const Home = () => {
  const [bannerMovie, setBannerMovie] = useState(null);

  // Load banner movie from popular search
  useEffect(() => {
    const loadBannerMovie = async () => {
      try {
        const response = await omdb.get('', {
          params: {
            s: 'avengers',
            type: 'movie'
          }
        });
        const movies = response.data.Search;
        console.log('Banner movies:', movies);
        if (movies && movies.length > 0) {
          // Select a random movie for banner
          const randomIndex = Math.floor(Math.random() * movies.length);
          setBannerMovie(movies[randomIndex]);
        }
      } catch (error) {
        console.error('Error loading banner movie:', error);
      }
    };

    loadBannerMovie();
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      <Banner movie={bannerMovie} />
      
      {/* All Movie Rows - Using OMDB search terms */}
      <Row 
        title="Trending Now" 
        fetchUrl="marvel" 
      />
      
      <Row 
        title="Action Movies" 
        fetchUrl="action" 
      />
      
      <Row 
        title="Comedy Movies" 
        fetchUrl="comedy" 
      />
      
      <Row 
        title="Drama Movies" 
        fetchUrl="drama" 
      />
      
      <Row 
        title="Horror Movies" 
        fetchUrl="horror" 
      />
      
      <Row 
        title="Romance Movies" 
        fetchUrl="romance" 
      />
      
      <Row 
        title="Sci-Fi Movies" 
        fetchUrl="science fiction" 
      />
      
      <Row 
        title="Thriller Movies" 
        fetchUrl="thriller" 
      />
    </div>
  );
};

export default Home;
