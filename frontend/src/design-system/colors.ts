/**
 * Enterprise Design System - Color Palette
 * Single source of truth for all colors across the application
 * Master Reference: ScrapNinja Login Page
 */

export const COLORS = {
  // Primary Brand Colors
  primary: {
    50: '#F0F7F3',
    100: '#D1EDE3',
    200: '#B3E5D6',
    300: '#7FD4BF',
    400: '#4BC4A8',
    500: '#17B491', // Updated from old green
    600: '#138A36', // Master brand green from login page
    700: '#0B7A3E', // Darker brand green
    800: '#055C2D',
    900: '#033D1B',
  },

  // Neutral Colors
  neutral: {
    0: '#FFFFFF',
    50: '#F8F9FA',
    100: '#F1F3F5',
    200: '#E9ECEF',
    300: '#DEE2E6',
    400: '#CED4DA',
    500: '#ADB5BD',
    600: '#868E96',
    700: '#495057',
    800: '#343A40',
    900: '#212529',
  },

  // Status Colors
  status: {
    success: {
      50: '#ECFDF5',
      100: '#D1FAE5',
      500: '#10B981',
      600: '#059669',
      700: '#047857',
    },
    warning: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
    },
    error: {
      50: '#FEF2F2',
      100: '#FEE2E2',
      500: '#EF4444',
      600: '#DC2626',
      700: '#B91C1C',
    },
    info: {
      50: '#EFF6FF',
      100: '#E0F2FE',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
    },
  },

  // Semantic Colors
  semantic: {
    error: '#DC2626',
    success: '#059669',
    warning: '#D97706',
    info: '#2563EB',
    disabled: '#ADB5BD',
    placeholder: '#868E96',
  },

  // Gradients (Pre-defined)
  gradients: {
    primary: 'from-primary-600 to-primary-700',
    primaryLight: 'from-primary-100 to-primary-50',
    primaryDark: 'from-primary-700 to-primary-900',
    success: 'from-emerald-500 to-emerald-600',
    warning: 'from-amber-500 to-amber-600',
    error: 'from-red-500 to-red-600',
    info: 'from-blue-500 to-blue-600',
  },
};

// Tailwind CSS color tokens that need to be configured
export const TAILWIND_COLORS = {
  'primary-50': COLORS.primary[50],
  'primary-100': COLORS.primary[100],
  'primary-200': COLORS.primary[200],
  'primary-300': COLORS.primary[300],
  'primary-400': COLORS.primary[400],
  'primary-500': COLORS.primary[500],
  'primary-600': COLORS.primary[600],
  'primary-700': COLORS.primary[700],
  'primary-800': COLORS.primary[800],
  'primary-900': COLORS.primary[900],
};
