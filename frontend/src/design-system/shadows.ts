/**
 * Enterprise Design System - Shadow System
 * Unified shadow palette for depth and elevation
 */

export const SHADOWS = {
  // Card shadows
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',

  // Component-specific shadows
  card: '0 1px 3px 0 rgba(11, 122, 62, 0.08), 0 1px 2px -1px rgba(11, 122, 62, 0.04)',
  cardElevated: '0 10px 25px rgba(11, 122, 62, 0.12), 0 4px 8px rgba(11, 122, 62, 0.08)',
  cardHover: '0 20px 25px -5px rgba(11, 122, 62, 0.15), 0 8px 10px -6px rgba(11, 122, 62, 0.1)',

  sidebar: '4px 0 12px rgba(0, 0, 0, 0.08)',
  sidebarActive: '0 4px 15px rgba(11, 122, 62, 0.15)',

  header: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  headerSticky: '0 2px 12px rgba(0, 0, 0, 0.15)',

  dropdown: '0 10px 25px rgba(0, 0, 0, 0.15)',
  modal: '0 25px 50px rgba(0, 0, 0, 0.25)',
  tooltip: '0 10px 15px rgba(0, 0, 0, 0.1)',

  input: 'inset 0 1px 1px rgba(0, 0, 0, 0.06)',
  inputFocus: 'inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px rgba(11, 122, 62, 0.1)',

  // Interactive shadows
  button: '0 1px 2px rgba(0, 0, 0, 0.05)',
  buttonHover: '0 4px 12px rgba(11, 122, 62, 0.15)',
  buttonActive: '0 2px 4px rgba(0, 0, 0, 0.1)',

  // Layer system
  layer: {
    0: 'none',
    1: '0 1px 2px rgba(0, 0, 0, 0.05)',
    2: '0 1px 3px rgba(0, 0, 0, 0.1)',
    3: '0 4px 6px rgba(0, 0, 0, 0.1)',
    4: '0 10px 15px rgba(0, 0, 0, 0.1)',
    5: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },
};

// Tailwind CSS shadow tokens
export const TAILWIND_SHADOWS = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
};
