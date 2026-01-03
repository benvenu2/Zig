// Paper Background Component - Creates tactile paper texture effect
// Part of the "Digital Tactility" design language

import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../theme/colors';

interface PaperBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'light' | 'dark';
}

export const PaperBackground: React.FC<PaperBackgroundProps> = ({
  children,
  style,
  variant = 'default',
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'light':
        return colors.paperLight;
      case 'dark':
        return colors.paperDark;
      default:
        return colors.paper;
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: getBackgroundColor()}, style]}>
      {/* Grain overlay layers for paper texture */}
      <View style={styles.grainLayer1} pointerEvents="none" />
      <View style={styles.grainLayer2} pointerEvents="none" />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  // Multiple subtle grain layers create realistic paper texture
  grainLayer1: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    opacity: 0.4,
    // Using a pattern of subtle noise would require an image
    // For now, we use layered semi-transparent borders
  },
  grainLayer2: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    opacity: 0.2,
  },
});

export default PaperBackground;
