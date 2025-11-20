// src/styles/theme.ts
export const theme = {
  colors: {
    primary: '#FDB913',
    primaryDark: '#E5A50B',
    primaryLight: '#FFCA3A',

    background: '#03060D',
    backgroundAlt: '#0A1018',
    navy: '#03060D',
    navyLight: '#0F1824',
    navyDark: '#000000',

    secondary: '#1E3A8A',

    // Текст
    text: '#E5E7EB',
    textLight: '#9CA3AF',
    heading: '#FFFFFF',

    border: '#1E3A8A',
    error: '#EF4444',
    success: '#10B981',
    warning: '#FDB913',
  },

  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem',
  },

  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
    glow: '0 0 20px rgba(253, 185, 19, 0.5)',
  },

  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },
}

export type Theme = typeof theme
