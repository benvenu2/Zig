// Zig Design System: "Mindful Analog" Color Palette
// Colors that look like they were printed on matte paper

export const colors = {
  // The Base (The Canvas)
  boneWhite: '#FAF9F4',      // High-quality cardstock / rice paper
  cream: '#F2F0E9',          // Main background color
  sumiInk: '#1A1A1A',        // Dried ink - primary text
  charcoal: '#252525',       // Secondary text

  // The Accents (The Woodblock)
  indigo: '#2A4B7C',         // Japan Blue - calming, found in classic prints
  matcha: '#556B2F',         // Earthy olive green
  pine: '#4A5D23',           // Alternative earthy green
  terracotta: '#C04000',     // Muted burnt orange/red for CTAs

  // Neutral tones
  stone: '#9B9B8F',          // Muted gray for secondary elements
  parchment: '#E8E6DD',      // Border and divider color
  inkWash: '#3A3A3A',        // Slightly lighter ink

  // Functional colors
  error: '#8B3A3A',          // Muted red for errors
  success: '#4A5D23',        // Pine green for success
  warning: '#B8860B',        // Dark golden for warnings

  // Transparency variants
  overlay: 'rgba(26, 26, 26, 0.5)',
  subtleOverlay: 'rgba(26, 26, 26, 0.08)',
} as const;

export type ColorKey = keyof typeof colors;
