export const theme = {
  colors: {
    primary: '#D9B15F', primaryDark: '#A87F35', primaryLight: '#F2D48B',

    background: '#0A0A0C', backgroundAlt: '#0D0D10', navy: '#121216', navyLight: '#1E1E25', navyDark: '#050506',

    secondary: '#23232B',

    // Текст
    text: '#C7C4BA', textLight: '#85827A', heading: '#F3EFE4',

    border: '#23232B', error: '#EF4444', success: '#8FB573', warning: '#D9B15F',

    mapFill: '#161D2C', mapFillHover: '#222D44', mapStroke: 'rgba(200, 210, 235, 0.13)',
  },

  fonts: {
    display: 'var(--font-manrope), -apple-system, sans-serif',
    body: 'var(--font-manrope), -apple-system, sans-serif',
    mono: 'var(--font-jb-mono), ui-monospace, monospace',
  },

  breakpoints: {
    mobile: '480px', tablet: '768px', desktop: '1024px', wide: '1280px',
  },

  spacing: {
    xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem', xxl: '3rem', xxxl: '4rem',
  },

  fontSize: {
    xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem', '5xl': '3rem',
  },

  fontWeight: {
    normal: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800,
  },

  borderRadius: {
    sm: '2px', md: '4px', lg: '6px', full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
    glow: '0 0 24px rgba(217, 177, 95, 0.35)',
  },

  transitions: {
    fast: '150ms ease-in-out', normal: '300ms ease-in-out', slow: '500ms ease-in-out',
  },
};

export type Theme = typeof theme
