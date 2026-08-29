/**
 * IEEE Design System - Semantic Design Tokens
 * Centralized source of truth for colors, typography, and motion parameters.
 */

export const TOKENS = {
  colors: {
    // Canvas Backgrounds
    canvasLight: '#fffef8',
    canvasDark: '#1c1c1c',
    canvasDarkGlass: 'rgba(28, 28, 28, 0.75)',

    // Text Inks
    textPrimary: '#1c1c1c',
    textInverted: '#fffef8',

    // Brand Identity
    brandBlue: '#005de0',
    brandBlueHover: '#004bb8',

    // Architectural Grid Lines
    gridHero: '#8e8e93',
    gridAbout: '#fffef8',
    gridAboutSubtle: 'rgba(255, 254, 248, 0.3)',
  },

  fonts: {
    // Editorial & Display Headings
    display: "'Stolzl', 'Space Grotesk', 'Plus Jakarta Sans', sans-serif",
    // Clean Technical Body Text
    body: "'DM Sans', sans-serif",
  },

  motion: {
    easing: {
      power3Out: 'power3.out',
      expoOut: 'expo.out',
      power2Out: 'power2.out',
    },
    duration: {
      navbarSlide: 0.55,
      sectionReveal: 0.9,
      cardReveal: 1.1,
    },
  },
} as const;

export type DesignTokens = typeof TOKENS;
