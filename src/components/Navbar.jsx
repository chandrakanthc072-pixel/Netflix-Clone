import React, { useState, useEffect } from 'react';
import RecentSearches from './RecentSearches';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Save to recent searches
      const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      const updatedSearches = [searchQuery.trim(), ...recentSearches.filter(s => s !== searchQuery.trim())].slice(0, 10);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      
      // Close modal and reset search
      setShowRecentSearches(false);
      setSearchQuery('');
    }
  };

  const handleRecentSearchSelect = (movie) => {
    // Handle movie selection from recent searches
    console.log('Selected movie:', movie);
    setShowRecentSearches(false);
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/70 to-transparent'
      }`}>
        <div className="flex items-center justify-between px-4 md:px-16 py-4">
          {/* Left side - Logo and Browse */}
          <div className="flex items-center space-x-8">
            {/* Netflix Logo */}
            <div className="text-red-600 text-4xl font-black tracking-wide">
              NETFLIX
            </div>
            
            {/* Browse Menu - Desktop only */}
            <div className="hidden lg:flex items-center space-x-6">
              <span className="text-white text-sm font-medium hover:text-gray-300 cursor-pointer transition-colors">Home</span>
              <span className="text-gray-300 text-sm font-medium hover:text-white cursor-pointer transition-colors">TV Shows</span>
              <span className="text-gray-300 text-sm font-medium hover:text-white cursor-pointer transition-colors">Movies</span>
              <span className="text-gray-300 text-sm font-medium hover:text-white cursor-pointer transition-colors">New & Popular</span>
              <span className="text-gray-300 text-sm font-medium hover:text-white cursor-pointer transition-colors">My List</span>
              <span className="text-gray-300 text-sm font-medium hover:text-white cursor-pointer transition-colors">Browse by Languages</span>
            </div>
          </div>

          {/* Right side - Search and User */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setShowRecentSearches(true)}
              className="w-6 h-6 text-white hover:text-gray-300 cursor-pointer transition-colors"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Notifications */}
            <div className="relative">
              <svg className="w-6 h-6 text-white hover:text-gray-300 cursor-pointer transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-2 cursor-pointer group">
              <img 
                src="https://via.placeholder.com/32x32?text=User" 
                alt="User" 
                className="w-8 h-8 rounded"
              />
              <svg className="w-4 h-4 text-white group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </nav>

      {/* Recent Searches Modal */}
      <RecentSearches
        isVisible={showRecentSearches}
        onClose={() => setShowRecentSearches(false)}
        onSelectSearch={handleRecentSearchSelect}
      />
    </>
  );
};

export default Navbar;
