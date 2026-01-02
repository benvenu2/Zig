// Vault Screen - The private staging area for curating your weekly Zig

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  Clipboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme/colors';
import {typography} from '../../theme/typography';
import {spacing, borderRadius} from '../../theme/spacing';
import Button from '../../components/Button';
import LinkCard from '../../components/LinkCard';
import {mockVaultItems} from '../../data/mockData';
import {VaultItem} from '../../types';

const VaultScreen: React.FC = () => {
  const [vaultItems, setVaultItems] = useState<VaultItem[]>(mockVaultItems);
  const [caption, setCaption] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  const selectedItem = vaultItems.find((item) => item.isSelected);
  const weekNumber = getWeekNumber(new Date());

  const handleSelectItem = (itemId: string) => {
    if (isLocked) return;

    setVaultItems((items) =>
      items.map((item) => ({
        ...item,
        isSelected: item.id === itemId,
      }))
    );
  };

  const handlePasteLink = async () => {
    try {
      const clipboardContent = await Clipboard.getString();
      if (clipboardContent && isValidUrl(clipboardContent)) {
        // In a real app, this would fetch OG tags and create a proper link
        Alert.alert('Link Added', `Added: ${clipboardContent}`);
      } else {
        Alert.alert('Invalid Link', 'Please copy a valid URL to paste.');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not paste from clipboard.');
    }
  };

  const handleLockIn = () => {
    if (!selectedItem) {
      Alert.alert('Select a Zig', 'Please select an item to lock in as your weekly Zig.');
      return;
    }

    if (!caption.trim()) {
      Alert.alert('Add Commentary', 'Please add your thoughts about why this is your Zig.');
      return;
    }

    if (caption.length > 500) {
      Alert.alert('Caption Too Long', 'Your caption must be 500 characters or less.');
      return;
    }

    Alert.alert(
      'Lock In Your Zig?',
      'Once locked, your selection will be published in the Monday drop.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Lock It In',
          onPress: () => setIsLocked(true),
        },
      ]
    );
  };

  const handleUnlock = () => {
    Alert.alert(
      'Unlock Your Zig?',
      'You can change your selection before Monday 9 AM.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Unlock',
          onPress: () => setIsLocked(false),
        },
      ]
    );
  };

  const renderVaultItem = ({item}: {item: VaultItem}) => (
    <TouchableOpacity
      style={[
        styles.candidateItem,
        item.isSelected && styles.candidateItemSelected,
      ]}
      onPress={() => handleSelectItem(item.id)}
      activeOpacity={0.7}
      disabled={isLocked}>
      <View style={styles.radioButton}>
        {item.isSelected ? (
          <View style={styles.radioButtonInner} />
        ) : null}
      </View>
      <View style={styles.candidateContent}>
        <Text style={styles.candidateTitle} numberOfLines={1}>
          {item.link.title}
        </Text>
        <Text style={styles.candidateSource}>{item.link.source}</Text>
      </View>
    </TouchableOpacity>
  );

  if (isLocked && selectedItem) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Vault</Text>
          <Text style={styles.headerSubtitle}>Week {weekNumber}</Text>
        </View>

        <View style={styles.lockedContainer}>
          <View style={styles.lockedBadge}>
            <Text style={styles.lockedBadgeText}>⬤ LOCKED IN</Text>
          </View>

          <Text style={styles.lockedTitle}>Ready for The Drop</Text>
          <Text style={styles.lockedSubtitle}>
            Your Zig will publish Monday at 9:00 AM EST
          </Text>

          <View style={styles.lockedPreview}>
            <LinkCard link={selectedItem.link} />
            <Text style={styles.captionPreview}>{caption}</Text>
          </View>

          <Button
            title="Change Selection"
            onPress={handleUnlock}
            variant="outline"
            fullWidth
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Vault</Text>
        <Text style={styles.headerSubtitle}>Week {weekNumber}</Text>
      </View>

      {/* Input Methods */}
      <View style={styles.inputMethods}>
        <TouchableOpacity
          style={styles.pasteButton}
          onPress={handlePasteLink}
          activeOpacity={0.7}>
          <Text style={styles.pasteIcon}>+</Text>
          <Text style={styles.pasteText}>Paste Link</Text>
        </TouchableOpacity>

        <View style={styles.shareSheetTip}>
          <Text style={styles.tipText}>
            Tip: Use "Share to Zig" from Safari or any app
          </Text>
        </View>
      </View>

      {/* Candidates List */}
      <View style={styles.candidatesSection}>
        <Text style={styles.sectionTitle}>
          CANDIDATES ({vaultItems.length})
        </Text>

        <FlatList
          data={vaultItems}
          renderItem={renderVaultItem}
          keyExtractor={(item) => item.id}
          style={styles.candidatesList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                Save links throughout the week to curate your best discovery.
              </Text>
            </View>
          }
        />
      </View>

      {/* Selection Section */}
      {selectedItem && (
        <View style={styles.selectionSection}>
          <View style={styles.selectionHeader}>
            <Text style={styles.selectionLabel}>SELECTED</Text>
            <Text style={styles.selectedTitle} numberOfLines={1}>
              "{selectedItem.link.title}"
            </Text>
          </View>

          <View style={styles.captionContainer}>
            <View style={styles.captionHeader}>
              <Text style={styles.captionLabel}>Your commentary</Text>
              <Text style={styles.captionCount}>{caption.length}/500</Text>
            </View>
            <TextInput
              style={styles.captionInput}
              placeholder="Why is this your Zig for the week?"
              placeholderTextColor={colors.stone}
              value={caption}
              onChangeText={setCaption}
              multiline
              maxLength={500}
            />
          </View>

          <Button
            title="Lock as Weekly Zig"
            onPress={handleLockIn}
            fullWidth
            size="large"
            disabled={!caption.trim()}
          />

          <Text style={styles.lockNote}>
            Unlocks Monday @ 9:00 AM EST
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

// Helper functions
const getWeekNumber = (date: Date): number => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor(
    (date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
  );
  return Math.ceil((days + 1) / 7);
};

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
    backgroundColor: colors.cream,
  },

  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.parchment,
  },

  headerTitle: {
    ...typography.h2,
  },

  headerSubtitle: {
    ...typography.caption,
    color: colors.stone,
    marginTop: spacing.xs,
  },

  inputMethods: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.parchment,
  },

  pasteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.boneWhite,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.parchment,
  },

  pasteIcon: {
    fontSize: 20,
    color: colors.sumiInk,
    marginRight: spacing.xs,
  },

  pasteText: {
    ...typography.bodySmall,
    fontWeight: '600',
  },

  shareSheetTip: {
    flex: 1,
    marginLeft: spacing.md,
  },

  tipText: {
    ...typography.caption,
    color: colors.stone,
  },

  candidatesSection: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },

  sectionTitle: {
    ...typography.label,
    color: colors.stone,
    marginBottom: spacing.md,
  },

  candidatesList: {
    flex: 1,
  },

  candidateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.boneWhite,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.parchment,
  },

  candidateItemSelected: {
    borderColor: colors.indigo,
    borderWidth: 2,
  },

  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.stone,
    marginRight: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.indigo,
  },

  candidateContent: {
    flex: 1,
  },

  candidateTitle: {
    ...typography.bodySmall,
    fontWeight: '600',
  },

  candidateSource: {
    ...typography.caption,
    color: colors.stone,
    marginTop: 2,
  },

  emptyState: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },

  emptyText: {
    ...typography.body,
    color: colors.stone,
    textAlign: 'center',
  },

  selectionSection: {
    backgroundColor: colors.boneWhite,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.parchment,
  },

  selectionHeader: {
    marginBottom: spacing.md,
  },

  selectionLabel: {
    ...typography.label,
    color: colors.indigo,
    marginBottom: spacing.xs,
  },

  selectedTitle: {
    ...typography.body,
    fontStyle: 'italic',
  },

  captionContainer: {
    marginBottom: spacing.md,
  },

  captionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },

  captionLabel: {
    ...typography.bodySmall,
    fontWeight: '600',
  },

  captionCount: {
    ...typography.caption,
    color: colors.stone,
  },

  captionInput: {
    ...typography.body,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.parchment,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    minHeight: 80,
    textAlignVertical: 'top',
  },

  lockNote: {
    ...typography.caption,
    color: colors.stone,
    textAlign: 'center',
    marginTop: spacing.sm,
  },

  // Locked state styles
  lockedContainer: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    alignItems: 'center',
  },

  lockedBadge: {
    backgroundColor: colors.matcha,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },

  lockedBadgeText: {
    ...typography.label,
    color: colors.boneWhite,
    letterSpacing: 1,
  },

  lockedTitle: {
    ...typography.h2,
    marginBottom: spacing.sm,
  },

  lockedSubtitle: {
    ...typography.body,
    color: colors.stone,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },

  lockedPreview: {
    width: '100%',
    marginBottom: spacing.xl,
  },

  captionPreview: {
    ...typography.body,
    color: colors.charcoal,
    marginTop: spacing.md,
    fontStyle: 'italic',
  },
});

export default VaultScreen;
