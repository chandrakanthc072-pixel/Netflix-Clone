import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      navigate('/home');
    } catch (error) {
      setError(error.message || 'Failed to sign in. Please check your credentials.');
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
      </header>

      {/* Login Form */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="bg-gray-900/90 p-8 rounded-lg max-w-md w-full mx-4">
          <h2 className="text-3xl font-bold text-white mb-6">Sign In</h2>

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
                placeholder="Email or phone number"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-colors font-semibold disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <div className="flex items-center justify-between text-gray-300 text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="hover:underline">Need help?</a>
            </div>
          </div>

          <div className="mt-6 text-gray-300">
            <span>New to Netflix? </span>
            <Link to="/signup" className="text-white hover:underline">
              Sign up now
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

export default Login;
