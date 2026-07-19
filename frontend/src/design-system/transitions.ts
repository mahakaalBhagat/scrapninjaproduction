/**
 * Enterprise Design System - Transitions & Animations
 * Subtle, professional animations only
 * Enhances UX without being flashy
 */

export const TRANSITIONS = {
  // Duration
  duration: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slowest: '500ms',
  },

  // Easing functions
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  },

  // Component transitions
  button: 'transition-all duration-200 ease-out',
  card: 'transition-all duration-300 ease-out',
  input: 'transition-all duration-200 ease-out',
  dropdown: 'transition-all duration-200 ease-out',
  sidebar: 'transition-all duration-300 ease-out',
  modal: 'transition-all duration-300 ease-out',
  tooltip: 'transition-all duration-200 ease-out',

  // Hover effects
  hover: 'transition-all duration-200 ease-out',
  focus: 'transition-all duration-200 ease-out',
  active: 'transition-all duration-150 ease-in',

  // Common combinations
  default: 'transition-all duration-200 ease-out',
  slow: 'transition-all duration-300 ease-out',
  fast: 'transition-all duration-150 ease-out',
};

// Framer Motion variants for Stagger animations
export const ANIMATION_VARIANTS = {
  // Container for staggered children
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  },

  // Item that stagger children will animate
  staggerItem: {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  },

  // Fade in
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  },

  // Slide up
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  },

  // Slide in from left
  slideInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  },

  // Slide in from right
  slideInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  },

  // Scale in
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  },

  // Hover scale
  hoverScale: {
    scale: 1,
    whileHover: { scale: 1.02 },
    transition: { duration: 0.2 },
  },

  // Page transition
  pageTransition: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.3 } },
  },

  // Card hover
  cardHover: {
    initial: { y: 0, boxShadow: 'none' },
    whileHover: { y: -4, boxShadow: '0 10px 15px rgba(11, 122, 62, 0.15)' },
  },

  // Button hover
  buttonHover: {
    scale: 1,
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 },
  },
};

// CSS classes for Tailwind
export const TRANSITION_CLASSES = {
  button: 'transition-all duration-200 ease-out',
  card: 'transition-all duration-300 ease-out',
  input: 'transition-all duration-200 ease-out',
  all: 'transition-all duration-200 ease-out',
};
