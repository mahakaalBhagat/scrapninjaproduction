/**
 * Enterprise Design System - Breakpoints
 * Responsive design breakpoints
 */

export const BREAKPOINTS = {
  xs: '320px',    // Extra small (mobile)
  sm: '640px',    // Small (landscape phone)
  md: '768px',    // Medium (tablet)
  lg: '1024px',   // Large (laptop)
  xl: '1280px',   // Extra large (desktop)
  '2xl': '1536px', // 2x large (ultra-wide)

  // Pixel values
  values: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },

  // Tailwind breakpoint strings
  tailwind: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

// Device sizes for media queries
export const MEDIA_QUERIES = {
  mobile: '(max-width: 639px)',
  tablet: '(min-width: 640px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
  wide: '(min-width: 1280px)',

  // Up variants
  mobileUp: '(min-width: 320px)',
  tabletUp: '(min-width: 640px)',
  desktopUp: '(min-width: 1024px)',

  // Down variants
  tabletDown: '(max-width: 1023px)',
  desktopDown: '(max-width: 1279px)',
};

// Screen sizes for responsive behavior
export const SCREEN_SIZES = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
};

// Responsive component sizes
export const RESPONSIVE_SIZES = {
  sidebar: {
    desktop: '256px',     // 16rem (w-64)
    mobile: '0',          // Hidden on mobile
    collapsed: '80px',    // 5rem (w-20)
  },
  header: {
    height: '64px',       // 4rem
  },
  container: {
    sm: '100%',           // Full width
    md: '90%',            // 90% on tablet
    lg: '95%',            // 95% on desktop
    xl: '1200px',         // Fixed max width
  },
};
