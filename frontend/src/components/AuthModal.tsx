'use client';

import React, { useState } from 'react';
import { X, Loader } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (data: any) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
  isLoading = false,
  error = null,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    userType: 'HOUSEHOLD' as 'HOUSEHOLD' | 'BUSINESS' | 'COLLECTOR',
  });
  const [formError, setFormError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    try {
      if (mode === 'login') {
        if (!formData.email || !formData.password) {
          setFormError('Please fill in all fields');
          return;
        }
        await onLogin(formData.email, formData.password);
      } else {
        if (
          !formData.email ||
          !formData.password ||
          !formData.confirmPassword ||
          !formData.firstName
        ) {
          setFormError('Please fill in all required fields');
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setFormError('Passwords do not match');
          return;
        }
        if (formData.password.length < 8) {
          setFormError('Password must be at least 8 characters');
          return;
        }
        await onRegister(formData);
      }
      onClose();
    } catch (err: any) {
      setFormError(err.message || 'An error occurred');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="sticky top-0 absolute top-4 right-4 p-2 hover:bg-neutral-100 rounded-lg transition-colors z-10"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4">
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </h2>

        {(formError || error) && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {formError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              className="form-input"
              disabled={isLoading}
            />
          </div>

          {mode === 'register' && (
            <>
              <div>
                <label className="form-label">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className="form-input"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  className="form-input"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="form-label">I am a...</label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  className="form-input"
                  disabled={isLoading}
                >
                  <option value="HOUSEHOLD">Household</option>
                  <option value="BUSINESS">Business</option>
                  <option value="COLLECTOR">Scrap Collector</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className="form-input"
              disabled={isLoading}
            />
            {mode === 'register' && (
              <p className="text-xs text-neutral-500 mt-1">Minimum 8 characters</p>
            )}
          </div>

          {mode === 'register' && (
            <div>
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="form-input"
                disabled={isLoading}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader size={18} className="animate-spin mr-2" />
                {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
              </>
            ) : mode === 'login' ? (
              'Sign In'
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setFormData({
                  email: '',
                  password: '',
                  confirmPassword: '',
                  firstName: '',
                  lastName: '',
                  userType: 'HOUSEHOLD',
                });
                setFormError(null);
              }}
              className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
