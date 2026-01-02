// Input Component - Text input fields

import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {spacing, borderRadius} from '../theme/spacing';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={colors.stone}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },

  label: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.sumiInk,
    marginBottom: spacing.xs,
  },

  input: {
    ...typography.body,
    backgroundColor: colors.boneWhite,
    borderWidth: 1.5,
    borderColor: colors.parchment,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.sumiInk,
  },

  inputFocused: {
    borderColor: colors.sumiInk,
  },

  inputError: {
    borderColor: colors.error,
  },

  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
});

export default Input;
