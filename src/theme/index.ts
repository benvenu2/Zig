// Zig Design System: Theme Export
// "Mindful Analog" - Lo-Fi Zen aesthetic

export {colors} from './colors';
export {typography} from './typography';
export {spacing, borderRadius, shadows} from './spacing';

// Theme object for easy access
export const theme = {
  colors: require('./colors').colors,
  typography: require('./typography').typography,
  spacing: require('./spacing').spacing,
  borderRadius: require('./spacing').borderRadius,
  shadows: require('./spacing').shadows,
};

export default theme;
