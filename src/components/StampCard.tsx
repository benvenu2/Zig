// Stamp Card Component - The "Digital Philately" postage stamp effect
// Creates a serrated edge (perforation) to frame content as collectible

import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../theme/colors';
import {spacing, borderRadius, shadows} from '../theme/spacing';

interface StampCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'selected' | 'muted';
}

export const StampCard: React.FC<StampCardProps> = ({
  children,
  style,
  variant = 'default',
}) => {
  return (
    <View style={[styles.outerContainer, style]}>
      {/* Perforation effect using small circles on edges */}
      <View style={styles.perforationTop}>
        {Array.from({length: 20}).map((_, i) => (
          <View key={`top-${i}`} style={styles.perforationDot} />
        ))}
      </View>

      <View style={styles.middleRow}>
        <View style={styles.perforationLeft}>
          {Array.from({length: 12}).map((_, i) => (
            <View key={`left-${i}`} style={styles.perforationDot} />
          ))}
        </View>

        <View style={[
          styles.innerContainer,
          variant === 'selected' && styles.selected,
          variant === 'muted' && styles.muted,
        ]}>
          {children}
        </View>

        <View style={styles.perforationRight}>
          {Array.from({length: 12}).map((_, i) => (
            <View key={`right-${i}`} style={styles.perforationDot} />
          ))}
        </View>
      </View>

      <View style={styles.perforationBottom}>
        {Array.from({length: 20}).map((_, i) => (
          <View key={`bottom-${i}`} style={styles.perforationDot} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
  },

  perforationTop: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: spacing.sm,
  },

  perforationBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: spacing.sm,
  },

  middleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  perforationLeft: {
    justifyContent: 'space-around',
    height: '100%',
    paddingVertical: spacing.sm,
  },

  perforationRight: {
    justifyContent: 'space-around',
    height: '100%',
    paddingVertical: spacing.sm,
  },

  perforationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.cream,
    margin: 2,
  },

  innerContainer: {
    flex: 1,
    backgroundColor: colors.boneWhite,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginHorizontal: spacing.xs,
    marginVertical: spacing.xs,
    ...shadows.sm,
  },

  selected: {
    borderWidth: 2,
    borderColor: colors.indigo,
  },

  muted: {
    opacity: 0.6,
  },
});

export default StampCard;
