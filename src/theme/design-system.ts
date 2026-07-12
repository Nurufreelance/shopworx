// ShopWorx Design System
// Source of truth for all styling

export const designSystem = {
  // Colors
  colors: {
    // Primary
    primary: {
      blue: '#2F6BFF',
      blueLight: '#EBF5FF',
      blueDark: '#1A5AEE',
    },
    // Status
    success: '#31B86A',
    warning: '#F4A62A',
    error: '#EF5350',
    // Neutrals
    background: '#F6F8FB',
    card: '#FFFFFF',
    sidebar: '#1F2229',
    sidebarHover: '#2A2D35',
    text: {
      primary: '#1A1A2E',
      secondary: '#6B7280',
      light: '#9CA3AF',
      white: '#FFFFFF',
    },
    border: '#E5E7EB',
    // Machine Status
    machine: {
      running: '#31B86A',
      idle: '#F4A62A',
      offline: '#9CA3AF',
      maintenance: '#EF5350',
      setup: '#F97316',
    },
  },

  // Typography
  typography: {
    fontFamily: {
      primary: "'Inter', 'Roboto', sans-serif",
    },
    size: {
      xs: '10px',
      sm: '11px',
      base: '13px',
      md: '14px',
      lg: '18px',
      xl: '24px',
      '2xl': '32px',
    },
    weight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.2',
      normal: '1.5',
      relaxed: '1.8',
    },
  },

  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
  },

  // Border Radius
  radius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '10px',
    xl: '12px',
    full: '9999px',
  },

  // Shadows
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 2px 6px rgba(0,0,0,0.05)',
    lg: '0 4px 12px rgba(0,0,0,0.08)',
    xl: '0 8px 24px rgba(0,0,0,0.10)',
  },

  // Transitions
  transitions: {
    fast: '100ms ease',
    normal: '150ms ease',
    slow: '250ms ease',
  },

  // Layout
  layout: {
    sidebarWidth: '240px',
    headerHeight: '64px',
    maxWidth: '1440px',
    contentPadding: '24px',
    cardGap: '16px',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-Index
  zIndex: {
    dropdown: '10',
    sticky: '20',
    overlay: '30',
    modal: '40',
    popover: '50',
    toast: '60',
    tooltip: '70',
  },
};

export type DesignSystem = typeof designSystem;