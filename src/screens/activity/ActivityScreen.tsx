// Activity Screen - Notifications and activity feed

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme/colors';
import {typography} from '../../theme/typography';
import {spacing} from '../../theme/spacing';
import Avatar from '../../components/Avatar';
import {mockActivity, Activity} from '../../data/mockData';

const ActivityScreen: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>(mockActivity);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      // Mark all as read on refresh
      setActivities((items) =>
        items.map((item) => ({...item, read: true}))
      );
    }, 1500);
  };

  const handleActivityPress = (activity: Activity) => {
    // Navigate to relevant screen based on activity type
    if (activity.type === 'follow') {
      console.log('Navigate to user profile:', activity.user.id);
    } else if (activity.zig) {
      console.log('Navigate to zig:', activity.zig.id);
    }

    // Mark as read
    setActivities((items) =>
      items.map((item) =>
        item.id === activity.id ? {...item, read: true} : item
      )
    );
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays}d`;
    }
    if (diffHours > 0) {
      return `${diffHours}h`;
    }
    if (diffMins > 0) {
      return `${diffMins}m`;
    }
    return 'now';
  };

  const getActivityIcon = (type: Activity['type']): string => {
    switch (type) {
      case 'save':
        return '◆';
      case 'comment':
        return '○';
      case 'follow':
        return '+';
      default:
        return '•';
    }
  };

  const renderActivityItem = ({item}: {item: Activity}) => (
    <TouchableOpacity
      style={[
        styles.activityItem,
        !item.read && styles.activityItemUnread,
      ]}
      onPress={() => handleActivityPress(item)}
      activeOpacity={0.7}>
      <View style={styles.avatarContainer}>
        <Avatar
          source={item.user.avatar}
          name={item.user.displayName}
          size="medium"
        />
        <View style={styles.activityIconBadge}>
          <Text style={styles.activityIcon}>{getActivityIcon(item.type)}</Text>
        </View>
      </View>

      <View style={styles.activityContent}>
        <Text style={styles.activityText}>
          <Text style={styles.username}>@{item.user.handle}</Text>
          {' '}{item.message}
        </Text>
        {item.zig && (
          <Text style={styles.zigPreview} numberOfLines={1}>
            "{item.zig.link.title}"
          </Text>
        )}
      </View>

      <Text style={styles.timestamp}>{formatTimeAgo(item.timestamp)}</Text>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>○</Text>
      <Text style={styles.emptyTitle}>No activity yet</Text>
      <Text style={styles.emptySubtitle}>
        When people save your Zigs or follow you, you'll see it here.
      </Text>
    </View>
  );

  const unreadCount = activities.filter((a) => !a.read).length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activity</Text>
        {unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadCount}>{unreadCount}</Text>
          </View>
        )}
      </View>

      {/* Activity List */}
      <FlatList
        data={activities}
        renderItem={renderActivityItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.sumiInk}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.parchment,
  },

  headerTitle: {
    ...typography.h2,
  },

  unreadBadge: {
    backgroundColor: colors.terracotta,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
    paddingHorizontal: spacing.sm,
  },

  unreadCount: {
    ...typography.caption,
    color: colors.boneWhite,
    fontWeight: '700',
  },

  listContent: {
    flexGrow: 1,
  },

  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.parchment,
    backgroundColor: colors.cream,
  },

  activityItemUnread: {
    backgroundColor: colors.boneWhite,
  },

  avatarContainer: {
    position: 'relative',
  },

  activityIconBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: colors.indigo,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.cream,
  },

  activityIcon: {
    fontSize: 10,
    color: colors.boneWhite,
  },

  activityContent: {
    flex: 1,
    marginLeft: spacing.md,
  },

  activityText: {
    ...typography.bodySmall,
    color: colors.charcoal,
  },

  username: {
    fontWeight: '600',
    color: colors.sumiInk,
  },

  zigPreview: {
    ...typography.caption,
    color: colors.stone,
    marginTop: spacing.xs,
    fontStyle: 'italic',
  },

  timestamp: {
    ...typography.caption,
    color: colors.stone,
    marginLeft: spacing.sm,
  },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxxl,
  },

  emptyIcon: {
    fontSize: 48,
    color: colors.parchment,
    marginBottom: spacing.md,
  },

  emptyTitle: {
    ...typography.h3,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },

  emptySubtitle: {
    ...typography.body,
    color: colors.stone,
    textAlign: 'center',
  },
});

export default ActivityScreen;
