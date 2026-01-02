// Link Card Component - Rich preview card for links/content

import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {spacing, borderRadius} from '../theme/spacing';
import {LinkMetadata} from '../types';

interface LinkCardProps {
  link: LinkMetadata;
  onPress?: () => void;
  compact?: boolean;
}

const getTypeIcon = (type: LinkMetadata['type']): string => {
  switch (type) {
    case 'song':
      return '♫';
    case 'video':
      return '▶';
    case 'podcast':
      return '🎙';
    case 'book':
      return '📖';
    case 'product':
      return '◎';
    default:
      return '◇';
  }
};

export const LinkCard: React.FC<LinkCardProps> = ({
  link,
  onPress,
  compact = false,
}) => {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[styles.container, compact && styles.compactContainer]}
      onPress={onPress}
      activeOpacity={0.8}>
      {link.image && !compact && (
        <Image
          source={{uri: link.image}}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      {link.type === 'song' && link.albumArt && (
        <View style={styles.albumArtContainer}>
          <Image
            source={{uri: link.albumArt}}
            style={styles.albumArt}
            resizeMode="cover"
          />
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.typeRow}>
          <Text style={styles.typeIcon}>{getTypeIcon(link.type)}</Text>
          <Text style={styles.source}>{link.source}</Text>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {link.title}
        </Text>

        {link.artist && (
          <Text style={styles.artist}>{link.artist}</Text>
        )}

        {link.description && !compact && (
          <Text style={styles.description} numberOfLines={2}>
            {link.description}
          </Text>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.boneWhite,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.parchment,
  },

  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: 160,
    backgroundColor: colors.parchment,
  },

  albumArtContainer: {
    padding: spacing.md,
    alignItems: 'center',
  },

  albumArt: {
    width: 120,
    height: 120,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.parchment,
  },

  content: {
    padding: spacing.md,
  },

  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },

  typeIcon: {
    fontSize: 12,
    color: colors.stone,
    marginRight: spacing.xs,
  },

  source: {
    ...typography.caption,
    color: colors.stone,
    textTransform: 'lowercase',
  },

  title: {
    ...typography.h4,
    marginBottom: spacing.xs,
  },

  artist: {
    ...typography.bodySmall,
    color: colors.stone,
    marginBottom: spacing.xs,
  },

  description: {
    ...typography.bodySmall,
    color: colors.charcoal,
    marginTop: spacing.xs,
  },
});

export default LinkCard;
