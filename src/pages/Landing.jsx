import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10"></div>
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc46b/94eb9ad0-3be9-45a1-b6b1-2d2fc8c0c97b/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="Netflix Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <header className="relative z-20 flex justify-between items-center px-8 py-6">
        <div className="text-red-600 text-4xl font-bold">
          NETFLIX
        </div>
        <Link
          to="/login"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Sign In
        </Link>
      </header>

      {/* Hero Content */}
      <div className="relative z-20 flex items-center justify-center min-h-[80vh]">
        <div className="text-center px-4 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Unlimited movies, TV shows, and more
          </h1>
          <p className="text-xl md:text-2xl text-white mb-6">
            Watch anywhere. Cancel anytime.
          </p>
          <p className="text-lg text-white mb-8">
            Ready to watch? Enter your email to create or restart your membership.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-700/80 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <Link
              to="/signup"
              state={{ email }}
              className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors font-semibold text-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
