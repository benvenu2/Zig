// Progress Dots Component - For onboarding screens

import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';

interface ProgressDotsProps {
  total: number;
  current: number;
  style?: ViewStyle;
}

export const ProgressDots: React.FC<ProgressDotsProps> = ({
  total,
  current,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {Array.from({length: total}).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === current && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.parchment,
    marginHorizontal: spacing.xs,
  },

  activeDot: {
    backgroundColor: colors.sumiInk,
    width: 24,
    borderRadius: 4,
  },
});

export default ProgressDots;
