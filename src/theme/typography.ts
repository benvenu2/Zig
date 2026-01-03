// Zig Design System: "Digital Tactility" Editorial Typography
// Magazine-style typography with serif headings and tight tracking

import {TextStyle, Platform} from 'react-native';
import {colors} from './colors';

// System fonts - using serif for editorial feel
const serifFontFamily = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  default: 'Georgia',
});

const sansFontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

export const typography = {
  // Display - Large editorial serif headings
  display: {
    fontFamily: serifFontFamily,
    fontSize: 42,
    fontWeight: '700',
    letterSpacing: -1.5,
    color: colors.sumiInk,
    lineHeight: 48,
  } as TextStyle,

  // Headers - Bold weight, tight tracking
  h1: {
    fontFamily: serifFontFamily,
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.8,
    color: colors.sumiInk,
    lineHeight: 38,
  } as TextStyle,

  h2: {
    fontFamily: serifFontFamily,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: colors.sumiInk,
    lineHeight: 32,
  } as TextStyle,

  h3: {
    fontFamily: sansFontFamily,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: -0.3,
    color: colors.sumiInk,
    lineHeight: 26,
  } as TextStyle,

  h4: {
    fontFamily: sansFontFamily,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.2,
    color: colors.sumiInk,
    lineHeight: 22,
  } as TextStyle,

  // Quote style - Large italic serif for captions/quotes
  quote: {
    fontFamily: serifFontFamily,
    fontSize: 20,
    fontWeight: '400',
    fontStyle: 'italic',
    letterSpacing: -0.2,
    color: colors.sumiInk,
    lineHeight: 28,
  } as TextStyle,

  quoteSmall: {
    fontFamily: serifFontFamily,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'italic',
    letterSpacing: 0,
    color: colors.charcoal,
    lineHeight: 24,
  } as TextStyle,

  // Body text - Clean sans-serif
  body: {
    fontFamily: sansFontFamily,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0,
    color: colors.sumiInk,
    lineHeight: 24,
  } as TextStyle,

  bodySmall: {
    fontFamily: sansFontFamily,
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0,
    color: colors.sumiInk,
    lineHeight: 20,
  } as TextStyle,

  // Caption text
  caption: {
    fontFamily: sansFontFamily,
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.2,
    color: colors.stone,
    lineHeight: 16,
  } as TextStyle,

  // Labels - Uppercase tracking for editorial feel
  label: {
    fontFamily: sansFontFamily,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1.5,
    color: colors.stone,
    lineHeight: 16,
    textTransform: 'uppercase',
  } as TextStyle,

  labelLarge: {
    fontFamily: sansFontFamily,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 2,
    color: colors.stone,
    lineHeight: 18,
    textTransform: 'uppercase',
  } as TextStyle,

  // Magazine header style - for dates and volume numbers
  magazineHeader: {
    fontFamily: sansFontFamily,
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 2,
    color: colors.stone,
    lineHeight: 14,
    textTransform: 'uppercase',
  } as TextStyle,

  // Logo text - Bold display
  logo: {
    fontFamily: serifFontFamily,
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1,
    color: colors.sumiInk,
    lineHeight: 40,
  } as TextStyle,

  // Buttons and interactive elements
  button: {
    fontFamily: sansFontFamily,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
    color: colors.boneWhite,
    lineHeight: 20,
  } as TextStyle,

  buttonSmall: {
    fontFamily: sansFontFamily,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
    color: colors.boneWhite,
    lineHeight: 18,
  } as TextStyle,

  // Link style
  link: {
    fontFamily: sansFontFamily,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    color: colors.indigo,
    lineHeight: 20,
  } as TextStyle,

  // Stats numbers - Large display numbers
  statNumber: {
    fontFamily: serifFontFamily,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: colors.sumiInk,
    lineHeight: 32,
  } as TextStyle,

  // Week badge number
  weekBadge: {
    fontFamily: sansFontFamily,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0,
    color: colors.boneWhite,
    lineHeight: 12,
  } as TextStyle,
} as const;

export type TypographyKey = keyof typeof typography;
