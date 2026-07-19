/**
 * Enterprise Design System - Spacing Scale
 * 8px baseline spacing system
 * Used consistently across all components
 */

export const SPACING = {
  // Base units (8px scale)
  xs: '4px',    // 0.25rem
  sm: '8px',    // 0.5rem
  md: '12px',   // 0.75rem
  lg: '16px',   // 1rem
  xl: '24px',   // 1.5rem
  '2xl': '32px', // 2rem
  '3xl': '40px', // 2.5rem
  '4xl': '48px', // 3rem
  '5xl': '64px', // 4rem

  // Padding
  padding: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
  },

  // Gaps
  gap: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
  },

  // Margin
  margin: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
  },

  // Radii
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },

  // Common component spacing
  component: {
    cardPadding: '24px',      // Interior card padding
    cardGap: '16px',          // Gap between card items
    inputPadding: '12px 16px',
    buttonPadding: '10px 16px',
    modalPadding: '32px',
    headerHeight: '64px',
    sidebarWidth: '256px',     // w-64
    sidebarCollapsedWidth: '80px', // w-20
  },
};

// Tailwind CSS spacing tokens
export const TAILWIND_SPACING = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
};
