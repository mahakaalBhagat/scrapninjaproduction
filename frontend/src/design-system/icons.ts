/**
 * Enterprise Design System - Icons
 * Single icon library: Lucide React
 * Consistent sizing and styling
 */

export const ICON_SIZE = {
  xs: 16,    // Extra small
  sm: 20,    // Small
  md: 24,    // Medium (standard)
  lg: 32,    // Large
  xl: 40,    // Extra large
  '2xl': 48, // 2x large
};

export const ICON_STROKE = {
  thin: 1,
  normal: 2,
  bold: 2.5,
};

export const ICON_CONFIG = {
  // Standard icon sizing
  default: {
    size: 24,
    stroke: 2,
  },

  // Component-specific
  sidebar: {
    size: 20,
    stroke: 2,
    color: 'currentColor',
  },

  header: {
    size: 20,
    stroke: 2,
    color: 'currentColor',
  },

  button: {
    small: {
      size: 16,
      stroke: 2,
    },
    medium: {
      size: 20,
      stroke: 2,
    },
    large: {
      size: 24,
      stroke: 2,
    },
  },

  input: {
    size: 18,
    stroke: 2,
  },

  badge: {
    size: 16,
    stroke: 2,
  },

  table: {
    size: 18,
    stroke: 2,
  },

  card: {
    size: 24,
    stroke: 2,
  },

  modal: {
    closeButton: {
      size: 24,
      stroke: 2,
    },
  },

  status: {
    size: 16,
    stroke: 2,
  },

  // Icon colors
  colors: {
    default: 'currentColor',
    primary: '#138A36',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    disabled: '#ADB5BD',
  },
};

// Icons mapping for consistent usage
export const ICON_MAP = {
  // Navigation
  home: 'Home',
  dashboard: 'LayoutDashboard',
  menu: 'Menu',
  menuOpen: 'X',

  // Commerce
  briefcase: 'Briefcase',
  shopping: 'ShoppingCart',
  box: 'Package',

  // Social
  users: 'Users',
  user: 'User',
  settings: 'Settings',

  // Time
  calendar: 'Calendar',
  clock: 'Clock',
  history: 'History',

  // Content
  file: 'FileText',
  files: 'Files',
  document: 'Document',
  fileCheck: 'FileCheck',

  // Finance
  creditCard: 'CreditCard',
  wallet: 'Wallet',
  dollarSign: 'DollarSign',

  // Analytics
  barChart: 'BarChart3',
  pieChart: 'PieChart',
  lineChart: 'LineChart',
  trending: 'TrendingUp',

  // Notifications
  bell: 'Bell',
  alertCircle: 'AlertCircle',
  info: 'Info',

  // Actions
  search: 'Search',
  filter: 'Filter',
  download: 'Download',
  upload: 'Upload',
  share: 'Share2',
  edit: 'Edit',
  trash: 'Trash2',
  copy: 'Copy',
  check: 'Check',
  x: 'X',
  plus: 'Plus',
  minus: 'Minus',

  // Status
  checkCircle: 'CheckCircle',
  alertTriangle: 'AlertTriangle',
  loader: 'Loader2',
  eye: 'Eye',
  eyeOff: 'EyeOff',

  // Authentication
  logOut: 'LogOut',
  logIn: 'LogIn',
  lock: 'Lock',

  // Other
  leaf: 'Leaf',
  mapPin: 'MapPin',
  phone: 'Phone',
  mail: 'Mail',
  globe: 'Globe',
};
