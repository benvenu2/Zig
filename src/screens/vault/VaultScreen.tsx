// Vault Screen - Light Table metaphor for curating your signal
// Part of the "Digital Tactility" design language

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme/colors';
import {typography} from '../../theme/typography';
import {spacing, borderRadius} from '../../theme/spacing';
import {mockVaultItems} from '../../data/mockData';
import {VaultItem} from '../../types';

const {width} = Dimensions.get('window');
const CARD_MARGIN = spacing.sm;
const CARD_WIDTH = (width - spacing.lg * 2 - CARD_MARGIN) / 2;

const VaultScreen: React.FC = () => {
  const [vaultItems, setVaultItems] = useState<VaultItem[]>(mockVaultItems);
  const [linkInput, setLinkInput] = useState('');

  const handleAddLink = () => {
    if (linkInput.trim() && isValidUrl(linkInput.trim())) {
      Alert.alert('Link Added', `Added: ${linkInput}`);
      setLinkInput('');
    } else if (linkInput.trim()) {
      Alert.alert('Invalid Link', 'Please enter a valid URL.');
    }
  };

  const handleCardPress = (itemId: string) => {
    console.log('View item:', itemId);
  };

  // Arrange items in masonry-like layout
  const leftColumn: VaultItem[] = [];
  const rightColumn: VaultItem[] = [];
  vaultItems.forEach((item, index) => {
    if (index % 2 === 0) {
      leftColumn.push(item);
    } else {
      rightColumn.push(item);
    }
  });

  const renderVaultCard = (item: VaultItem, isLeft: boolean) => {
    const imageSource = item.link.albumArt || item.link.image;
    // Vary card heights slightly for visual interest
    const imageHeight = isLeft ? 140 : 160;

    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.vaultCard, isLeft ? styles.cardLeft : styles.cardRight]}
        onPress={() => handleCardPress(item.id)}
        activeOpacity={0.9}>
        {imageSource && (
          <Image
            source={{uri: imageSource}}
            style={[styles.cardImage, {height: imageHeight}]}
            resizeMode="cover"
          />
        )}
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.link.title}
          </Text>
          <Text style={styles.cardSource}>{item.link.source}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Vault</Text>
          <View style={styles.itemCount}>
            <Text style={styles.itemCountText}>{vaultItems.length}</Text>
          </View>
        </View>
        <Text style={styles.headerSubtitle}>CURATE YOUR SIGNAL</Text>
      </View>

      {/* Link Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.linkIcon}>🔗</Text>
          <TextInput
            style={styles.linkInput}
            placeholder="Paste a link to collect..."
            placeholderTextColor={colors.stone}
            value={linkInput}
            onChangeText={setLinkInput}
            onSubmitEditing={handleAddLink}
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddLink}
            activeOpacity={0.7}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Light Table - Masonry Grid */}
      <ScrollView
        style={styles.lightTable}
        contentContainerStyle={styles.lightTableContent}
        showsVerticalScrollIndicator={false}>
        {vaultItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>◇</Text>
            <Text style={styles.emptyTitle}>Your light table is empty</Text>
            <Text style={styles.emptySubtitle}>
              Save links throughout the week to curate your best discovery.
            </Text>
          </View>
        ) : (
          <View style={styles.masonryContainer}>
            {/* Left Column */}
            <View style={styles.column}>
              {leftColumn.map((item) => renderVaultCard(item, true))}
            </View>
            {/* Right Column */}
            <View style={styles.column}>
              {rightColumn.map((item) => renderVaultCard(item, false))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Helper function
const isValidUrl = (string: string): boolean => {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.paper,
  },

  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTitle: {
    ...typography.h1,
    fontSize: 32,
  },

  itemCount: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.parchment,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },

  itemCountText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.charcoal,
  },

  headerSubtitle: {
    ...typography.label,
    color: colors.stone,
    marginTop: spacing.xs,
    letterSpacing: 2,
  },

  inputContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.boneWhite,
    borderRadius: borderRadius.lg + 4,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.parchment,
  },

  linkIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
    opacity: 0.5,
  },

  linkInput: {
    ...typography.body,
    flex: 1,
    paddingVertical: spacing.xs,
    color: colors.sumiInk,
  },

  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.parchment,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButtonText: {
    fontSize: 20,
    color: colors.charcoal,
    fontWeight: '300',
    marginTop: -2,
  },

  lightTable: {
    flex: 1,
  },

  lightTableContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 120, // Space for floating nav bar
  },

  masonryContainer: {
    flexDirection: 'row',
  },

  column: {
    flex: 1,
  },

  vaultCard: {
    backgroundColor: colors.boneWhite,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.sm,
    // Light table shadow effect
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  cardLeft: {
    marginRight: CARD_MARGIN / 2,
  },

  cardRight: {
    marginLeft: CARD_MARGIN / 2,
  },

  cardImage: {
    width: '100%',
    backgroundColor: colors.parchment,
  },

  cardContent: {
    padding: spacing.md,
  },

  cardTitle: {
    ...typography.h4,
    fontSize: 14,
    lineHeight: 18,
    marginBottom: spacing.xs,
  },

  cardSource: {
    ...typography.caption,
    color: colors.stone,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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

export default VaultScreen;
