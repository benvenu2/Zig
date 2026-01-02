// Search Screen - Discover users and Zigs

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme/colors';
import {typography} from '../../theme/typography';
import {spacing, borderRadius} from '../../theme/spacing';
import Avatar from '../../components/Avatar';
import {mockUsers} from '../../data/mockData';
import {User} from '../../types';

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim().length > 0) {
      setHasSearched(true);
      // Filter mock users based on query
      const filtered = mockUsers.filter(
        (user) =>
          user.displayName.toLowerCase().includes(query.toLowerCase()) ||
          user.handle.toLowerCase().includes(query.toLowerCase()) ||
          user.bio.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setHasSearched(false);
      setSearchResults([]);
    }
  };

  const handleUserPress = (userId: string) => {
    console.log('Navigate to user profile:', userId);
  };

  const handleFollow = (userId: string) => {
    console.log('Follow user:', userId);
  };

  const renderUserItem = ({item}: {item: User}) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => handleUserPress(item.id)}
      activeOpacity={0.7}>
      <Avatar source={item.avatar} name={item.displayName} size="large" />

      <View style={styles.userInfo}>
        <Text style={styles.displayName}>{item.displayName}</Text>
        <Text style={styles.handle}>@{item.handle}</Text>
        <Text style={styles.bio} numberOfLines={1}>{item.bio}</Text>
      </View>

      <TouchableOpacity
        style={styles.followButton}
        onPress={() => handleFollow(item.id)}
        activeOpacity={0.7}>
        <Text style={styles.followButtonText}>Follow</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderSuggestedSection = () => (
    <View style={styles.suggestedSection}>
      <Text style={styles.sectionTitle}>SUGGESTED CURATORS</Text>
      <FlatList
        data={mockUsers}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );

  const renderSearchResults = () => {
    if (searchResults.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>○</Text>
          <Text style={styles.emptyTitle}>No results found</Text>
          <Text style={styles.emptySubtitle}>
            Try searching for a different name or handle.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.resultsSection}>
        <Text style={styles.sectionTitle}>
          RESULTS ({searchResults.length})
        </Text>
        <FlatList
          data={searchResults}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Search Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search curators..."
            placeholderTextColor={colors.stone}
            value={searchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => handleSearch('')}
              style={styles.clearButton}>
              <Text style={styles.clearIcon}>×</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Content */}
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={
          hasSearched ? renderSearchResults() : renderSuggestedSection()
        }
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.parchment,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.boneWhite,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.parchment,
    paddingHorizontal: spacing.md,
  },

  searchIcon: {
    fontSize: 20,
    color: colors.stone,
    marginRight: spacing.sm,
  },

  searchInput: {
    flex: 1,
    ...typography.body,
    paddingVertical: spacing.md,
    color: colors.sumiInk,
  },

  clearButton: {
    padding: spacing.xs,
  },

  clearIcon: {
    fontSize: 24,
    color: colors.stone,
  },

  content: {
    flexGrow: 1,
    paddingBottom: spacing.xxl,
  },

  suggestedSection: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },

  resultsSection: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },

  sectionTitle: {
    ...typography.label,
    color: colors.stone,
    marginBottom: spacing.md,
  },

  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.parchment,
  },

  userInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },

  displayName: {
    ...typography.body,
    fontWeight: '600',
  },

  handle: {
    ...typography.bodySmall,
    color: colors.stone,
    marginTop: 2,
  },

  bio: {
    ...typography.caption,
    color: colors.charcoal,
    marginTop: spacing.xs,
  },

  followButton: {
    backgroundColor: colors.sumiInk,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },

  followButtonText: {
    ...typography.bodySmall,
    color: colors.boneWhite,
    fontWeight: '600',
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

export default SearchScreen;
