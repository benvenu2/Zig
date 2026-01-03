// Zig Design System: "Digital Tactility" Color Palette
// Evoking high-quality stationery with subtle grain textures

export const colors = {
  // The Paper (Warm, tactile backgrounds)
  paper: '#F5F0E8',            // Primary background - warm cream like fine stationery
  paperLight: '#FAF7F2',       // Lighter paper variant
  paperDark: '#EDE8DE',        // Darker paper for depth

  // Legacy aliases for compatibility
  boneWhite: '#FAF7F2',        // Card backgrounds
  cream: '#F5F0E8',            // Main background

  // The Ink (Rich, editorial blacks)
  sumiInk: '#1A1A1A',          // Primary text - deep black
  charcoal: '#3A3A3A',         // Secondary text
  inkWash: '#5A5A5A',          // Tertiary text

  // The Accent (Editorial blue)
  indigo: '#3D5A80',           // Links, highlights - editorial blue
  indigoDark: '#2A4B7C',       // Pressed state

  // Neutral Tones (Stone and parchment)
  stone: '#8A8A82',            // Muted gray for secondary elements
  stoneLight: '#B0B0A8',       // Lighter stone
  parchment: '#E8E4DA',        // Borders and dividers

  // The Navigation Bar (Glass/Crystal)
  navBackground: '#2C2C2C',    // Dark charcoal for floating nav
  navBackgroundGlass: 'rgba(44, 44, 44, 0.95)', // Semi-transparent for glass effect
  navIcon: '#FAF7F2',          // Light icons on dark nav
  navIconInactive: '#8A8A82',  // Muted inactive state

  // Functional colors
  error: '#8B3A3A',            // Muted red
  success: '#4A5D23',          // Pine green
  warning: '#B8860B',          // Dark golden

  // Accent colors
  matcha: '#556B2F',           // Earthy olive
  pine: '#4A5D23',             // Deep green
  terracotta: '#C04000',       // Burnt orange for CTAs

  // Transparency variants
  overlay: 'rgba(26, 26, 26, 0.5)',
  subtleOverlay: 'rgba(26, 26, 26, 0.08)',
  paperOverlay: 'rgba(245, 240, 232, 0.95)',

  // Grain texture overlay
  grainOverlay: 'rgba(0, 0, 0, 0.03)',
} as const;

export type ColorKey = keyof typeof colors;
