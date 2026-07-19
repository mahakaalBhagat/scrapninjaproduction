/**
 * Enterprise Design System - Theme
 * Central export for all design tokens
 * Single source of truth for styling across the application
 */

export { COLORS, TAILWIND_COLORS } from './colors';
export { SPACING, TAILWIND_SPACING } from './spacing';
export { TYPOGRAPHY, TYPOGRAPHY_CLASSES } from './typography';
export { SHADOWS, TAILWIND_SHADOWS } from './shadows';
export { RADIUS, TAILWIND_RADIUS, RADIUS_CLASSES } from './radius';
export { TRANSITIONS, ANIMATION_VARIANTS, TRANSITION_CLASSES } from './transitions';
export { BREAKPOINTS, MEDIA_QUERIES, SCREEN_SIZES, RESPONSIVE_SIZES } from './breakpoints';
export { ICON_SIZE, ICON_STROKE, ICON_CONFIG, ICON_MAP } from './icons';

// Theme object for easy access
export const THEME = {
  colors: require('./colors').COLORS,
  spacing: require('./spacing').SPACING,
  typography: require('./typography').TYPOGRAPHY,
  shadows: require('./shadows').SHADOWS,
  radius: require('./radius').RADIUS,
  transitions: require('./transitions').TRANSITIONS,
  breakpoints: require('./breakpoints').BREAKPOINTS,
  icons: require('./icons').ICON_CONFIG,
};

// Convenient getters for common values
export const getColor = (colorPath: string) => {
  const parts = colorPath.split('.');
  let value = require('./colors').COLORS;
  for (const part of parts) {
    value = value[part];
  }
  return value;
};

export const getSpacing = (spacingPath: string) => {
  const parts = spacingPath.split('.');
  let value = require('./spacing').SPACING;
  for (const part of parts) {
    value = value[part];
  }
  return value;
};
