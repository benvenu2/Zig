// Segmented Control Component - For switching between tabs

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {spacing, borderRadius} from '../theme/spacing';

interface SegmentedControlProps {
  options: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  selectedIndex,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.option,
            index === selectedIndex && styles.selectedOption,
          ]}
          onPress={() => onChange(index)}
          activeOpacity={0.7}>
          <Text
            style={[
              styles.optionText,
              index === selectedIndex && styles.selectedText,
            ]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.parchment,
    borderRadius: borderRadius.md,
    padding: spacing.xs,
  },

  option: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.sm,
  },

  selectedOption: {
    backgroundColor: colors.boneWhite,
  },

  optionText: {
    ...typography.bodySmall,
    fontWeight: '500',
    color: colors.stone,
  },

  selectedText: {
    color: colors.sumiInk,
    fontWeight: '600',
  },
});

export default SegmentedControl;
