import React, { createContext, useContext, useState, useEffect } from 'react';
import { users } from '../data/users';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('easyLifeUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login - in real app, this would call an API
    const foundUser = users.find(u => u.email === email);
    if (foundUser) {
      // In real app, verify password here
      setUser(foundUser);
      localStorage.setItem('easyLifeUser', JSON.stringify(foundUser));
      return { success: true, user: foundUser };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const loginWithOTP = async (phone, otp) => {
    // Mock OTP login
    const foundUser = users.find(u => u.phone === phone);
    if (foundUser && otp === '123456') { // Mock OTP
      setUser(foundUser);
      localStorage.setItem('easyLifeUser', JSON.stringify(foundUser));
      return { success: true, user: foundUser };
    }
    return { success: false, error: 'Invalid OTP' };
  };

  const signup = async (userData) => {
    // Mock signup
    const newUser = {
      id: `user${Date.now()}`,
      ...userData,
      avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150',
      joinDate: new Date().toISOString().split('T')[0],
      verified: false
    };
    
    setUser(newUser);
    localStorage.setItem('easyLifeUser', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('easyLifeUser');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('easyLifeUser', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    loginWithOTP,
    signup,
    logout,
    updateProfile,
    loading,
    isAuthenticated: !!user,
    isCustomer: user?.type === 'customer',
    isSeller: user?.type === 'seller',
    isAdmin: user?.type === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};