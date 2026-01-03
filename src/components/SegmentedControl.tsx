// Segmented Control Component - Editorial pill-style toggle
// Part of the "Digital Tactility" design language

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
    borderRadius: 24,
    padding: 4,
  },

  option: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },

  selectedOption: {
    backgroundColor: colors.sumiInk,
  },

  optionText: {
    ...typography.label,
    fontSize: 12,
    letterSpacing: 1.2,
    color: colors.stone,
    fontWeight: '600',
  },

  selectedText: {
    color: colors.boneWhite,
    fontWeight: '700',
  },
});

export default SegmentedControl;
