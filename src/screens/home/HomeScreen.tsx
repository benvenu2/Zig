// Home Screen - The Feed with Following and Global tabs

import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme/colors';
import {typography} from '../../theme/typography';
import {spacing} from '../../theme/spacing';
import SegmentedControl from '../../components/SegmentedControl';
import ZigCard from '../../components/ZigCard';
import {mockZigs, mockZeitgeist} from '../../data/mockData';
import {Zig} from '../../types';

const HomeScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [zigs, setZigs] = useState<Zig[]>(mockZigs);
  const [zeitgeist, setZeitgeist] = useState<Zig[]>(mockZeitgeist);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleSaveZig = (zigId: string) => {
    const updateZigs = (items: Zig[]) =>
      items.map((zig) =>
        zig.id === zigId
          ? {
              ...zig,
              isSaved: !zig.isSaved,
              savesCount: zig.isSaved ? zig.savesCount - 1 : zig.savesCount + 1,
            }
          : zig
      );

    setZigs(updateZigs);
    setZeitgeist(updateZigs);
  };

  const handleZigPress = (zigId: string) => {
    // Navigate to zig detail
    console.log('Open zig:', zigId);
  };

  const handleUserPress = (userId: string) => {
    // Navigate to user profile
    console.log('Open user profile:', userId);
  };

  const handleCommentPress = (zigId: string) => {
    // Navigate to comments
    console.log('Open comments:', zigId);
  };

  const renderZigItem = ({item}: {item: Zig}) => (
    <ZigCard
      zig={item}
      onPress={() => handleZigPress(item.id)}
      onUserPress={() => handleUserPress(item.user.id)}
      onSave={() => handleSaveZig(item.id)}
      onComment={() => handleCommentPress(item.id)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>◇</Text>
      <Text style={styles.emptyTitle}>No Zigs yet</Text>
      <Text style={styles.emptySubtitle}>
        {selectedTab === 0
          ? 'Follow some people to see their weekly Zigs here.'
          : 'Check back after the Monday drop!'}
      </Text>
    </View>
  );

  const renderFooter = () => {
    const data = selectedTab === 0 ? zigs : zeitgeist;
    if (data.length === 0) return null;

    return (
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          You're all caught up on this week's Zig.
        </Text>
      </View>
    );
  };

  const currentData = selectedTab === 0 ? zigs : zeitgeist;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header with Segmented Control */}
      <View style={styles.header}>
        <SegmentedControl
          options={['Following', 'Global']}
          selectedIndex={selectedTab}
          onChange={setSelectedTab}
        />
      </View>

      {/* Week indicator */}
      <View style={styles.weekIndicator}>
        <Text style={styles.weekText}>Week {getWeekNumber(new Date())}</Text>
        <View style={styles.dropBadge}>
          <Text style={styles.dropBadgeText}>NEW DROP</Text>
        </View>
      </View>

      {/* Feed */}
      <FlatList
        data={currentData}
        renderItem={renderZigItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        ListFooterComponent={renderFooter}
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

  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.cream,
    borderBottomWidth: 1,
    borderBottomColor: colors.parchment,
  },

  weekIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    backgroundColor: colors.boneWhite,
    borderBottomWidth: 1,
    borderBottomColor: colors.parchment,
  },

  weekText: {
    ...typography.caption,
    color: colors.stone,
    fontWeight: '600',
    marginRight: spacing.sm,
  },

  dropBadge: {
    backgroundColor: colors.terracotta,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },

  dropBadgeText: {
    ...typography.caption,
    color: colors.boneWhite,
    fontWeight: '700',
    fontSize: 9,
    letterSpacing: 1,
  },

  feedContent: {
    flexGrow: 1,
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

  footer: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },

  footerText: {
    ...typography.bodySmall,
    color: colors.stone,
    fontStyle: 'italic',
  },
});

export default HomeScreen;
