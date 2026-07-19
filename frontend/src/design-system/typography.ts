/**
 * Enterprise Design System - Typography
 * Single font family: Inter (via Tailwind)
 * Consistent sizing and weights across application
 */

export const TYPOGRAPHY = {
  // Font families
  fontFamily: {
    primary: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
  },

  // Font weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Heading styles
  heading: {
    h1: {
      size: '32px',
      weight: 700,
      lineHeight: '1.2',
      letterSpacing: '-0.02em',
    },
    h2: {
      size: '28px',
      weight: 700,
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
    },
    h3: {
      size: '24px',
      weight: 600,
      lineHeight: '1.3',
      letterSpacing: '0',
    },
    h4: {
      size: '20px',
      weight: 600,
      lineHeight: '1.4',
      letterSpacing: '0',
    },
    h5: {
      size: '16px',
      weight: 600,
      lineHeight: '1.4',
      letterSpacing: '0',
    },
    h6: {
      size: '14px',
      weight: 600,
      lineHeight: '1.5',
      letterSpacing: '0',
    },
  },

  // Body text
  body: {
    large: {
      size: '16px',
      weight: 400,
      lineHeight: '1.5',
      letterSpacing: '0',
    },
    base: {
      size: '14px',
      weight: 400,
      lineHeight: '1.5',
      letterSpacing: '0',
    },
    small: {
      size: '12px',
      weight: 400,
      lineHeight: '1.5',
      letterSpacing: '0',
    },
    xs: {
      size: '11px',
      weight: 400,
      lineHeight: '1.45',
      letterSpacing: '0.02em',
    },
  },

  // Labels and form text
  label: {
    size: '14px',
    weight: 500,
    lineHeight: '1.43',
    letterSpacing: '0',
  },

  // Button text
  button: {
    size: '14px',
    weight: 600,
    lineHeight: '1.43',
    letterSpacing: '0',
  },

  // Caption text
  caption: {
    size: '12px',
    weight: 500,
    lineHeight: '1.33',
    letterSpacing: '0.02em',
  },

  // Utility classes for Tailwind
  utilities: {
    'text-xs': '11px',
    'text-sm': '12px',
    'text-base': '14px',
    'text-lg': '16px',
    'text-xl': '18px',
    'text-2xl': '20px',
    'text-3xl': '24px',
    'text-4xl': '28px',
  },
};

// CSS class names for Tailwind integration
export const TYPOGRAPHY_CLASSES = {
  pageTitle: 'text-3xl font-bold text-neutral-900',
  sectionTitle: 'text-xl font-semibold text-neutral-900',
  subsectionTitle: 'text-lg font-semibold text-neutral-800',
  bodyLarge: 'text-base font-normal text-neutral-700',
  bodyBase: 'text-sm font-normal text-neutral-600',
  bodySmall: 'text-xs font-normal text-neutral-500',
  label: 'text-sm font-medium text-neutral-700',
  caption: 'text-xs font-medium text-neutral-500',
  button: 'text-sm font-semibold',
};
