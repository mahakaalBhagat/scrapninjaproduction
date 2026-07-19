/**
 * Enterprise Design System - Border Radius
 * Limited to 3 values: 12px, 16px, 24px
 * Ensures consistency across all components
 */

export const RADIUS = {
  sm: '8px',    // 0.5rem - small elements
  md: '12px',   // 0.75rem - standard (PRIMARY)
  lg: '16px',   // 1rem - larger components
  xl: '24px',   // 1.5rem - extra large (SECONDARY)
  full: '9999px', // fully rounded

  // Component-specific
  input: '12px',
  button: '12px',
  card: '16px',
  modal: '12px',
  dropdown: '12px',
  badge: '12px',
  avatar: '9999px', // full circle
  tag: '12px',
};

// Tailwind CSS radius tokens
export const TAILWIND_RADIUS = {
  'rounded-none': '0',
  'rounded-sm': '8px',
  'rounded': '12px',
  'rounded-md': '12px',
  'rounded-lg': '16px',
  'rounded-xl': '24px',
  'rounded-full': '9999px',
};

// CSS class names for Tailwind integration
export const RADIUS_CLASSES = {
  input: 'rounded-[12px]',
  button: 'rounded-[12px]',
  card: 'rounded-[16px]',
  modal: 'rounded-[12px]',
  dropdown: 'rounded-[12px]',
  badge: 'rounded-[12px]',
  avatar: 'rounded-full',
  tag: 'rounded-[12px]',
};
