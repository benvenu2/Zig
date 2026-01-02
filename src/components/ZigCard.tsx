// Zig Card Component - A single Zig post in the feed

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {spacing, borderRadius} from '../theme/spacing';
import {Zig} from '../types';
import Avatar from './Avatar';
import LinkCard from './LinkCard';

interface ZigCardProps {
  zig: Zig;
  onPress?: () => void;
  onUserPress?: () => void;
  onSave?: () => void;
  onComment?: () => void;
}

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays}d ago`;
  }
  if (diffHours > 0) {
    return `${diffHours}h ago`;
  }
  return 'just now';
};

const formatCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

export const ZigCard: React.FC<ZigCardProps> = ({
  zig,
  onPress,
  onUserPress,
  onSave,
  onComment,
}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
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
          <Text style={styles.handle}>@{zig.user.handle}</Text>
          <Text style={styles.timestamp}>{formatTimeAgo(zig.publishedAt)}</Text>
        </View>
        {zig.isLate && (
          <View style={styles.lateBadge}>
            <Text style={styles.lateBadgeText}>Late</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Link Card */}
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <LinkCard link={zig.link} />
      </TouchableOpacity>

      {/* Caption */}
      <Text style={styles.caption}>{zig.caption}</Text>

      {/* Action Row */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onSave}
          activeOpacity={0.7}>
          <Text style={[styles.actionIcon, zig.isSaved && styles.actionIconActive]}>
            {zig.isSaved ? '◆' : '◇'}
          </Text>
          <Text style={styles.actionText}>
            {formatCount(zig.savesCount)} Saves
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={onComment}
          activeOpacity={0.7}>
          <Text style={styles.actionIcon}>○</Text>
          <Text style={styles.actionText}>{zig.commentsCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.boneWhite,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.parchment,
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

  handle: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.sumiInk,
  },

  timestamp: {
    ...typography.caption,
    color: colors.stone,
    marginTop: 2,
  },

  lateBadge: {
    backgroundColor: colors.terracotta,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },

  lateBadgeText: {
    ...typography.caption,
    color: colors.boneWhite,
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: 10,
  },

  caption: {
    ...typography.body,
    color: colors.sumiInk,
    marginTop: spacing.md,
    lineHeight: 24,
  },

  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
  },

  actionIcon: {
    fontSize: 18,
    color: colors.stone,
    marginRight: spacing.xs,
  },

  actionIconActive: {
    color: colors.indigo,
  },

  actionText: {
    ...typography.caption,
    color: colors.stone,
  },
});

export default ZigCard;
