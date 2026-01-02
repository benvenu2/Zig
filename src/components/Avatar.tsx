// Avatar Component - User profile pictures

import React from 'react';
import {View, Image, Text, StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';

interface AvatarProps {
  source?: string | null;
  name?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  style?: ViewStyle;
}

const getInitials = (name: string): string => {
  const words = name.trim().split(' ');
  if (words.length >= 2) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const sizeMap = {
  small: 32,
  medium: 40,
  large: 56,
  xlarge: 80,
};

const fontSizeMap = {
  small: 12,
  medium: 14,
  large: 20,
  xlarge: 28,
};

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name = '?',
  size = 'medium',
  style,
}) => {
  const dimension = sizeMap[size];
  const fontSize = fontSizeMap[size];

  const containerStyle = [
    styles.container,
    {
      width: dimension,
      height: dimension,
      borderRadius: dimension / 2,
    },
    style,
  ];

  if (source) {
    return (
      <Image
        source={{uri: source}}
        style={[containerStyle, styles.image]}
        resizeMode="cover"
      />
    );
  }

  return (
    <View style={containerStyle}>
      <Text style={[styles.initials, {fontSize}]}>{getInitials(name)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.parchment,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    backgroundColor: colors.parchment,
  },
  initials: {
    ...typography.label,
    color: colors.stone,
  },
});

export default Avatar;
