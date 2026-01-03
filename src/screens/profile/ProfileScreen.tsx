// Profile Screen - User profile with archive timeline
// Part of the "Digital Tactility" design language

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme/colors';
import {typography} from '../../theme/typography';
import {spacing, borderRadius} from '../../theme/spacing';
import Avatar from '../../components/Avatar';
import {currentUser, mockPastZigs} from '../../data/mockData';
import {Zig} from '../../types';

const ProfileScreen: React.FC = () => {
  const [user] = useState(currentUser);

  const handleSettingsPress = () => {
    console.log('Navigate to settings');
  };

  const handleZigPress = (zigId: string) => {
    console.log('Navigate to zig detail:', zigId);
  };

  const renderArchiveItem = ({item, index}: {item: Zig; index: number}) => {
    const isLast = index === mockPastZigs.length - 1;
    const imageSource = item.link.albumArt || item.link.image;

    return (
      <View style={styles.archiveItem}>
        {/* Timeline indicator */}
        <View style={styles.timelineColumn}>
          <View style={styles.timelineDot} />
          {!isLast && <View style={styles.timelineLine} />}
        </View>

        {/* Content */}
        <TouchableOpacity
          style={styles.archiveContent}
          onPress={() => handleZigPress(item.id)}
          activeOpacity={0.7}>
          <Text style={styles.weekLabel}>WEEK {item.weekNumber}</Text>
          <Text style={styles.archiveTitle}>{item.link.title}</Text>

          {/* Quote card with thumbnail */}
          <View style={styles.quoteCard}>
            {imageSource && (
              <Image
                source={{uri: imageSource}}
                style={styles.quoteThumbnail}
                resizeMode="cover"
              />
            )}
            <Text style={styles.quoteText} numberOfLines={2}>
              "{item.caption}"
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.profileHeader}>
      {/* Avatar with settings */}
      <View style={styles.avatarRow}>
        <Avatar
          source={user.avatar}
          name={user.displayName}
          size="xlarge"
        />
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleSettingsPress}
          activeOpacity={0.7}>
          <Text style={styles.settingsIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <Text style={styles.displayName}>Alex Chen</Text>
      <Text style={styles.handle}>@concept_designer</Text>

      <Text style={styles.bio}>
        Digital Philatelist. Seeking high signal in a noisy world.
      </Text>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>142</Text>
          <Text style={styles.statLabel}>FOLLOWERS</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>SAVED ZEITS</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Archive Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionIcon}>⊞</Text>
        <Text style={styles.sectionTitle}>THE ARCHIVE</Text>
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
      <FlatList
        data={mockPastZigs}
        renderItem={renderArchiveItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.paper,
  },

  listContent: {
    flexGrow: 1,
    paddingBottom: 120, // Space for floating nav bar
  },

  profileHeader: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },

  avatarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },

  settingsButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },

  settingsIcon: {
    fontSize: 24,
    color: colors.stone,
  },

  displayName: {
    ...typography.h1,
    fontSize: 28,
    marginBottom: 4,
  },

  handle: {
    ...typography.link,
    color: colors.indigo,
    marginBottom: spacing.md,
  },

  bio: {
    ...typography.body,
    color: colors.charcoal,
    marginBottom: spacing.lg,
    lineHeight: 24,
  },

  statsRow: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },

  statItem: {
    marginRight: spacing.xxl,
  },

  statNumber: {
    ...typography.statNumber,
    marginBottom: 2,
  },

  statLabel: {
    ...typography.label,
    fontSize: 11,
    letterSpacing: 1.5,
  },

  divider: {
    height: 1,
    backgroundColor: colors.parchment,
    marginBottom: spacing.lg,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },

  sectionIcon: {
    fontSize: 16,
    color: colors.stone,
    marginRight: spacing.sm,
  },

  sectionTitle: {
    ...typography.label,
    color: colors.sumiInk,
    letterSpacing: 2,
  },

  // Archive Timeline Styles
  archiveItem: {
    flexDirection: 'row',
    paddingLeft: spacing.lg,
  },

  timelineColumn: {
    width: 24,
    alignItems: 'center',
  },

  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.parchment,
    borderWidth: 2,
    borderColor: colors.stone,
  },

  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.parchment,
    marginVertical: 4,
  },

  archiveContent: {
    flex: 1,
    paddingLeft: spacing.md,
    paddingRight: spacing.lg,
    paddingBottom: spacing.xl,
  },

  weekLabel: {
    ...typography.label,
    fontSize: 11,
    color: colors.stone,
    marginBottom: spacing.xs,
  },

  archiveTitle: {
    ...typography.h3,
    fontSize: 18,
    marginBottom: spacing.md,
  },

  quoteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.boneWhite,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    // Subtle shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },

  quoteThumbnail: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    backgroundColor: colors.parchment,
    marginRight: spacing.md,
  },

  quoteText: {
    ...typography.quoteSmall,
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },

  // Empty State
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
