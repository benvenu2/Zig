// Profile Screen - User profile and archive of past Zigs

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme/colors';
import {typography} from '../../theme/typography';
import {spacing, borderRadius} from '../../theme/spacing';
import Avatar from '../../components/Avatar';
import LinkCard from '../../components/LinkCard';
import {currentUser, mockPastZigs} from '../../data/mockData';
import {Zig} from '../../types';

const ProfileScreen: React.FC = () => {
  const [user] = useState(currentUser);

  const handleSettingsPress = () => {
    console.log('Navigate to settings');
  };

  const handleEditProfile = () => {
    console.log('Navigate to edit profile');
  };

  const handleZigPress = (zigId: string) => {
    console.log('Navigate to zig detail:', zigId);
  };

  const getWeekLabel = (weekNumber: number, year: number): string => {
    const currentWeek = getWeekNumber(new Date());
    const currentYear = new Date().getFullYear();

    if (year === currentYear && weekNumber === currentWeek) {
      return `Week ${weekNumber} (Current)`;
    }
    return `Week ${weekNumber}`;
  };

  const renderPastZigItem = ({item}: {item: Zig}) => (
    <TouchableOpacity
      style={styles.pastZigItem}
      onPress={() => handleZigPress(item.id)}
      activeOpacity={0.7}>
      <Text style={styles.weekLabel}>
        {getWeekLabel(item.weekNumber, item.year)}
      </Text>
      <View style={styles.zigCardContainer}>
        <LinkCard link={item.link} compact />
      </View>
      <View style={styles.zigStats}>
        <Text style={styles.statText}>◆ {item.savesCount} saves</Text>
        <Text style={styles.statText}>○ {item.commentsCount}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.profileHeader}>
      {/* Avatar and Edit */}
      <View style={styles.avatarSection}>
        <Avatar
          source={user.avatar}
          name={user.displayName}
          size="xlarge"
        />
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEditProfile}
          activeOpacity={0.7}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <Text style={styles.displayName}>{user.displayName}</Text>
      <Text style={styles.handle}>@{user.handle}</Text>

      {user.bio && <Text style={styles.bio}>{user.bio}</Text>}

      {/* Stats */}
      <View style={styles.statsRow}>
        <TouchableOpacity style={styles.statItem}>
          <Text style={styles.statNumber}>{user.followerCount}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </TouchableOpacity>

        <View style={styles.statDivider} />

        <TouchableOpacity style={styles.statItem}>
          <Text style={styles.statNumber}>{user.followingCount}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </TouchableOpacity>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.savedZigsCount}</Text>
          <Text style={styles.statLabel}>Saved</Text>
        </View>
      </View>

      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>PAST ZIGS</Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>◇</Text>
      <Text style={styles.emptyTitle}>No Zigs yet</Text>
      <Text style={styles.emptySubtitle}>
        Your weekly Zigs will appear here as a permanent taste record.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.topBarSpacer} />
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleSettingsPress}
          activeOpacity={0.7}>
          <Text style={styles.settingsIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Content */}
      <FlatList
        data={mockPastZigs}
        renderItem={renderPastZigItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

// Helper function
const getWeekNumber = (date: Date): number => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor(
    (date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
  );
  return Math.ceil((days + 1) / 7);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.parchment,
  },

  topBarSpacer: {
    width: 44,
  },

  settingsButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },

  settingsIcon: {
    fontSize: 24,
    color: colors.sumiInk,
  },

  listContent: {
    flexGrow: 1,
    paddingBottom: spacing.xxl,
  },

  profileHeader: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },

  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },

  editButton: {
    backgroundColor: colors.boneWhite,
    borderWidth: 1,
    borderColor: colors.parchment,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },

  editButtonText: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.sumiInk,
  },

  displayName: {
    ...typography.h2,
    marginBottom: 2,
  },

  handle: {
    ...typography.body,
    color: colors.stone,
    marginBottom: spacing.sm,
  },

  bio: {
    ...typography.body,
    color: colors.charcoal,
    marginBottom: spacing.lg,
    lineHeight: 24,
  },

  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.parchment,
    marginBottom: spacing.lg,
  },

  statItem: {
    flex: 1,
    alignItems: 'center',
  },

  statNumber: {
    ...typography.h3,
    marginBottom: 2,
  },

  statLabel: {
    ...typography.caption,
    color: colors.stone,
  },

  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.parchment,
  },

  sectionHeader: {
    marginBottom: spacing.md,
  },

  sectionTitle: {
    ...typography.label,
    color: colors.stone,
  },

  pastZigItem: {
    backgroundColor: colors.boneWhite,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.parchment,
  },

  weekLabel: {
    ...typography.label,
    color: colors.indigo,
    marginBottom: spacing.sm,
    fontSize: 11,
  },

  zigCardContainer: {
    marginBottom: spacing.sm,
  },

  zigStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statText: {
    ...typography.caption,
    color: colors.stone,
    marginRight: spacing.md,
  },

  emptyState: {
    paddingVertical: spacing.xxxl,
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
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

export default ProfileScreen;
