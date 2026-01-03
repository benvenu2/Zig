// Home Screen - The Feed with Magazine-style header
// Part of the "Digital Tactility" design language

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
import {spacing, borderRadius} from '../../theme/spacing';
import SegmentedControl from '../../components/SegmentedControl';
import ZigCard from '../../components/ZigCard';
import {mockZigs, mockZeitgeist} from '../../data/mockData';
import {Zig} from '../../types';

// Helper function to format date in magazine style
const formatMagazineDate = (date: Date): string => {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  return `${months[date.getMonth()]} ${date.getDate()} • ${days[date.getDay()]}`;
};

// Helper function to get week number
const getWeekNumber = (date: Date): number => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor(
    (date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
  );
  return Math.ceil((days + 1) / 7);
};

const HomeScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [zigs, setZigs] = useState<Zig[]>(mockZigs);
  const [zeitgeist, setZeitgeist] = useState<Zig[]>(mockZeitgeist);

  const weekNumber = getWeekNumber(new Date());

  const onRefresh = useCallback(() => {
    setRefreshing(true);
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
    console.log('Open zig:', zigId);
  };

  const handleUserPress = (userId: string) => {
    console.log('Open user profile:', userId);
  };

  const handleCommentPress = (zigId: string) => {
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

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Magazine-style header */}
      <View style={styles.magazineHeader}>
        <Text style={styles.dateText}>{formatMagazineDate(new Date())}</Text>
        <Text style={styles.volumeText}>VOL. {weekNumber}</Text>
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>ZIG.</Text>
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <SegmentedControl
          options={['FOLLOWING', 'ZEITGEIST']}
          selectedIndex={selectedTab}
          onChange={setSelectedTab}
        />
      </View>
    </View>
  );

  const renderFooter = () => {
    const data = selectedTab === 0 ? zigs : zeitgeist;
    if (data.length === 0) return null;

    return (
      <View style={styles.footer}>
        <View style={styles.endDot} />
        <Text style={styles.footerText}>END OF ISSUE</Text>
      </View>
    );
  };

  const currentData = selectedTab === 0 ? zigs : zeitgeist;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={currentData}
        renderItem={renderZigItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
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
    backgroundColor: colors.paper,
  },

  headerContainer: {
    paddingBottom: spacing.md,
  },

  magazineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },

  dateText: {
    ...typography.magazineHeader,
  },

  volumeText: {
    ...typography.magazineHeader,
  },

  logoContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },

  logo: {
    ...typography.logo,
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -2,
  },

  tabContainer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },

  feedContent: {
    flexGrow: 1,
    paddingBottom: 120, // Space for floating nav bar
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
    paddingVertical: spacing.xxl,
    alignItems: 'center',
    paddingBottom: spacing.xxxl,
  },

  endDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.stone,
    marginBottom: spacing.md,
  },

  footerText: {
    ...typography.label,
    color: colors.stone,
  },
});

export default HomeScreen;
