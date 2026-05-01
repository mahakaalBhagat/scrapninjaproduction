// Premium animation variants for Framer Motion
export const animations = {
  // Fade + Upward motion for text and sections - SMOOTH
  fadeUp: {
    hidden: { opacity: 0, y: 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
    },
  },

  // General fade in - FAST
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  },

  // Scale up for cards - SNAPPY
  scaleUp: {
    hidden: { opacity: 0, y: 20, scale: 0.985 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
    },
  },

  // Staggered container for groups - FAST & SNAPPY
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.08,
      },
    },
  },

  // Individual stagger child - SMOOTH & FAST
  staggerChild: {
    hidden: { 
      opacity: 0, 
      y: 24
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.56, 
        ease: [0.22, 1, 0.36, 1]
      },
    },
  },
};

// Viewport settings for scroll-triggered animations
export const viewportConfig = {
  once: true,
  margin: '0px 0px -80px 0px',
  amount: 'some' as const,
};

// Fast scroll viewport - triggers immediately if scrolling fast
export const fastScrollViewport = {
  once: true,
  margin: '0px 0px 0px 0px', // No margin = triggers immediately
  amount: 'some' as const,
};

// Hover animation for cards - SMOOTH LIFT
export const cardHover = {
  whileHover: { 
    y: -8,
    scale: 1.02,
    zIndex: 10,
    boxShadow: '0 18px 34px rgba(0, 0, 0, 0.14), 0 0 0 1px rgba(11, 122, 62, 0.12), 0 0 22px rgba(11, 122, 62, 0.16)',
    filter: 'brightness(1.02) contrast(1.02)',
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] }
  },
};

// Button animation - QUICK RESPONSE
export const buttonAnimation = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.15 },
};

// Section reveal animation
export const sectionReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

// Convenience export used by multiple components.
export const staggerChild = animations.staggerChild;
