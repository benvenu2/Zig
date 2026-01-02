// Zig Design System: Swiss Modern Typography
// Clean, grotesque sans-serif with tight tracking

import {TextStyle, Platform} from 'react-native';
import {colors} from './colors';

// Using system fonts that match the Inter aesthetic
const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

export const typography = {
  // Headers - Bold weight, tight tracking
  h1: {
    fontFamily,
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: colors.sumiInk,
    lineHeight: 38,
  } as TextStyle,

  h2: {
    fontFamily,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.3,
    color: colors.sumiInk,
    lineHeight: 30,
  } as TextStyle,

  h3: {
    fontFamily,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: -0.2,
    color: colors.sumiInk,
    lineHeight: 26,
  } as TextStyle,

  h4: {
    fontFamily,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.1,
    color: colors.sumiInk,
    lineHeight: 22,
  } as TextStyle,

  // Body text - Regular weight
  body: {
    fontFamily,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0,
    color: colors.sumiInk,
    lineHeight: 24,
  } as TextStyle,

  bodySmall: {
    fontFamily,
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0,
    color: colors.sumiInk,
    lineHeight: 20,
  } as TextStyle,

  // Caption text
  caption: {
    fontFamily,
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.1,
    color: colors.stone,
    lineHeight: 16,
  } as TextStyle,

  // Labels and buttons
  label: {
    fontFamily,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: colors.sumiInk,
    lineHeight: 18,
    textTransform: 'uppercase',
  } as TextStyle,

  button: {
    fontFamily,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
    color: colors.boneWhite,
    lineHeight: 20,
  } as TextStyle,

  // Link style
  link: {
    fontFamily,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    color: colors.indigo,
    lineHeight: 20,
  } as TextStyle,
} as const;

export type TypographyKey = keyof typeof typography;
