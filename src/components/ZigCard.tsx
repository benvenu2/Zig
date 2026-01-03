// Zig Card Component - Editorial quote-style post card
// Part of the "Digital Tactility" design language

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {spacing, borderRadius} from '../theme/spacing';
import {Zig} from '../types';
import Avatar from './Avatar';

interface ZigCardProps {
  zig: Zig;
  onPress?: () => void;
  onUserPress?: () => void;
  onSave?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

const formatCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

// Get type label for different content types
const getTypeLabel = (type: string): string => {
  switch (type) {
    case 'song':
      return 'SONG';
    case 'video':
      return 'VIDEO';
    case 'podcast':
      return 'PODCAST';
    case 'book':
      return 'BOOK';
    case 'product':
      return 'PRODUCT';
    default:
      return 'ARTICLE';
  }
};

export const ZigCard: React.FC<ZigCardProps> = ({
  zig,
  onPress,
  onUserPress,
  onSave,
  onComment,
  onShare,
}) => {
  const hasImage = zig.link.image || zig.link.albumArt;
  const imageSource = zig.link.albumArt || zig.link.image;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header - User info */}
        <TouchableOpacity
          style={styles.header}
          onPress={onUserPress}
          activeOpacity={0.7}>
          <Avatar
            source={zig.user.avatar}
            name={zig.user.displayName}
            size="medium"
          />
          <View style={styles.headerText}>
            <View style={styles.nameRow}>
              <Text style={styles.displayName}>{zig.user.displayName}</Text>
              <View style={styles.weekBadge}>
                <Text style={styles.weekBadgeText}>#{zig.weekNumber}</Text>
              </View>
            </View>
            <Text style={styles.handle}>@{zig.user.handle}</Text>
          </View>
          <TouchableOpacity style={styles.moreButton} activeOpacity={0.7}>
            <Text style={styles.moreIcon}>:</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Quote - The caption with editorial styling */}
        <View style={styles.quoteSection}>
          <Text style={styles.quoteText}>
            <Text style={styles.quoteMark}>"</Text>
            {zig.caption}
          </Text>
        </View>

        {/* Link Preview */}
        <TouchableOpacity
          style={styles.linkPreview}
          onPress={onPress}
          activeOpacity={0.9}>
          {hasImage && (
            <Image
              source={{uri: imageSource}}
              style={styles.linkImage}
              resizeMode="cover"
            />
          )}
          <View style={styles.linkInfo}>
            <View style={styles.linkTypeRow}>
              <View style={styles.typeBadge}>
                <Text style={styles.typeLabel}>
                  {getTypeLabel(zig.link.type)}
                </Text>
              </View>
              <Text style={styles.linkSource}>{zig.link.source}</Text>
            </View>
            <Text style={styles.linkTitle} numberOfLines={2}>
              {zig.link.title}
              {zig.link.artist && ` – ${zig.link.artist}`}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Action Row */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onSave}
            activeOpacity={0.7}>
            <Text style={[styles.bookmarkIcon, zig.isSaved && styles.bookmarkIconFilled]}>
              {zig.isSaved ? '◼' : '▢'}
            </Text>
            <Text style={styles.actionText}>{formatCount(zig.savesCount)}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={onComment}
            activeOpacity={0.7}>
            <Text style={styles.commentIcon}>◯</Text>
            <Text style={styles.actionText}>{zig.commentsCount}</Text>
          </TouchableOpacity>

          <View style={styles.actionSpacer} />

          <TouchableOpacity
            style={styles.shareButton}
            onPress={onShare}
            activeOpacity={0.7}>
            <Text style={styles.shareIcon}>↗</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },

  card: {
    backgroundColor: colors.boneWhite,
    borderRadius: borderRadius.lg + 4,
    padding: spacing.lg,
    // Subtle shadow for paper feel
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  headerText: {
    flex: 1,
    marginLeft: spacing.sm,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  displayName: {
    ...typography.h4,
    fontSize: 15,
    fontWeight: '600',
  },

  weekBadge: {
    backgroundColor: colors.charcoal,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: spacing.xs,
  },

  weekBadgeText: {
    ...typography.weekBadge,
    color: colors.boneWhite,
  },

  handle: {
    ...typography.caption,
    color: colors.stone,
    marginTop: 1,
  },

  moreButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  moreIcon: {
    fontSize: 20,
    color: colors.stone,
    fontWeight: '900',
    letterSpacing: -4,
  },

  quoteSection: {
    marginBottom: spacing.lg,
    paddingLeft: spacing.xs,
  },

  quoteMark: {
    ...typography.quote,
    fontSize: 32,
    lineHeight: 36,
    color: colors.stone,
  },

  quoteText: {
    ...typography.quote,
    fontSize: 19,
    lineHeight: 28,
  },

  linkPreview: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: colors.paper,
    marginBottom: spacing.md,
  },

  linkImage: {
    width: '100%',
    height: 180,
    backgroundColor: colors.parchment,
  },

  linkInfo: {
    padding: spacing.md,
  },

  linkTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },

  typeBadge: {
    backgroundColor: colors.parchment,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: spacing.sm,
  },

  typeLabel: {
    ...typography.label,
    fontSize: 10,
    color: colors.charcoal,
  },

  linkSource: {
    ...typography.caption,
    color: colors.stone,
  },

  linkTitle: {
    ...typography.h4,
    fontSize: 16,
    lineHeight: 22,
  },

  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.sm,
  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
  },

  bookmarkIcon: {
    fontSize: 18,
    color: colors.stone,
    marginRight: spacing.xs,
  },

  bookmarkIconFilled: {
    color: colors.indigo,
  },

  commentIcon: {
    fontSize: 18,
    color: colors.stone,
    marginRight: spacing.xs,
  },

  actionText: {
    ...typography.caption,
    color: colors.stone,
    fontWeight: '500',
  },

  actionSpacer: {
    flex: 1,
  },

  shareButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  shareIcon: {
    fontSize: 22,
    color: colors.stone,
  },
});

export default ZigCard;
