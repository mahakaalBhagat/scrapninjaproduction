'use client';

import React, { createContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'HOUSEHOLD' | 'BUSINESS' | 'COLLECTOR';
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
      // Try to load user data
      loadUserProfile(savedToken);
    }
  }, []);

  const loadUserProfile = async (authToken: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/validate`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      // If token is valid, we can proceed (actual user data would come from a /profile endpoint)
    } catch (err) {
      localStorage.removeItem('authToken');
      setToken(null);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
        rememberMe: true,
      });

      const { token, userId, email: userEmail, firstName, lastName, userType } = response.data;

      setToken(token);
      setUser({
        id: userId,
        email: userEmail,
        firstName: firstName || '',
        lastName: lastName || '',
        userType: userType || 'HOUSEHOLD',
      });

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify({ id: userId, email: userEmail, firstName, lastName, userType }));
    } catch (err: any) {
      const message = err.response?.data?.error || 'Login failed. Please check your credentials.';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        userType: data.userType || 'HOUSEHOLD',
      });

      const { token, userId, email: userEmail, firstName, lastName, userType } = response.data;

      setToken(token);
      setUser({
        id: userId,
        email: userEmail,
        firstName: firstName || '',
        lastName: lastName || '',
        userType: userType || 'HOUSEHOLD',
      });

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify({ id: userId, email: userEmail, firstName, lastName, userType }));
    } catch (err: any) {
      const message = err.response?.data?.error || 'Registration failed. Please try again.';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setError(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token && !!user,
    login,
    register,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
