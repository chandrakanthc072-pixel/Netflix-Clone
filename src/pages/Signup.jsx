import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signup(email, password);
      navigate('/login');
    } catch (error) {
      setError(error.message || 'Failed to create an account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Background */}
      <div className="fixed inset-0">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc46b/94eb9ad0-3be9-45a1-b6b1-2d2fc8c0c97b/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center px-8 py-6">
        <Link to="/" className="text-red-600 text-4xl font-bold">
          NETFLIX
        </Link>
        <Link to="/login" className="text-white hover:underline">
          Sign In
        </Link>
      </header>

      {/* Signup Form */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="bg-gray-900/90 p-8 rounded-lg max-w-md w-full mx-4">
          <h2 className="text-3xl font-bold text-white mb-6">Sign Up</h2>

          {error && (
            <div className="bg-orange-500 text-white p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            <div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-colors font-semibold disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-gray-300">
            <span>Already have an account? </span>
            <Link to="/login" className="text-white hover:underline">
              Sign in
            </Link>
          </div>

          <div className="mt-4 text-xs text-gray-400">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.
            <a href="#" className="text-blue-500 hover:underline"> Learn more.</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
