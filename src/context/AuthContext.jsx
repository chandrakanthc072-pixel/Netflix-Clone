import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAuth = localStorage.getItem('isAuthenticated');
    
    if (storedUser && storedAuth === 'true') {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const signup = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.email === email)) {
      throw new Error('User already exists');
    }
    
    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return { success: true, message: 'Account created successfully' };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');
    
    return { success: true, message: 'Login successful' };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  };

  const value = {
    user,
    isAuthenticated,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
