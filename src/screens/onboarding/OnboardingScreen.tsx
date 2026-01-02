// Onboarding Screen - The three-step onboarding flow

import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ViewToken,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '../../theme/colors';
import {typography} from '../../theme/typography';
import {spacing} from '../../theme/spacing';
import Button from '../../components/Button';
import ProgressDots from '../../components/ProgressDots';
import {RootStackParamList} from '../../types';

type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
};

const {width} = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  headline: string;
  subtext: string;
  illustration: React.ReactNode;
}

// Ukiyo-e inspired illustrations using text/shapes
const NoiseSignalIllustration = () => (
  <View style={styles.illustrationContainer}>
    {/* Chaotic pile of rocks (noise) */}
    <View style={styles.noiseContainer}>
      {Array.from({length: 12}).map((_, i) => (
        <View
          key={i}
          style={[
            styles.rock,
            {
              transform: [
                {rotate: `${Math.random() * 60 - 30}deg`},
                {translateX: (Math.random() - 0.5) * 40},
                {translateY: (Math.random() - 0.5) * 20},
              ],
              opacity: 0.3 + Math.random() * 0.3,
            },
          ]}
        />
      ))}
    </View>
    {/* Glowing gem (the signal) */}
    <View style={styles.gemContainer}>
      <View style={styles.gemGlow} />
      <View style={styles.gem}>
        <Text style={styles.gemSymbol}>◈</Text>
      </View>
    </View>
  </View>
);

const VaultIllustration = () => (
  <View style={styles.illustrationContainer}>
    <View style={styles.vaultContainer}>
      {/* Share sheet visualization */}
      <View style={styles.shareSheet}>
        <View style={styles.shareSheetHandle} />
        <View style={styles.shareOption}>
          <View style={styles.shareIcon}>
            <Text style={styles.shareIconText}>Z</Text>
          </View>
          <Text style={styles.shareLabel}>Share to Zig</Text>
        </View>
      </View>
      {/* Lock button */}
      <View style={styles.lockButton}>
        <Text style={styles.lockIcon}>⬤</Text>
        <Text style={styles.lockText}>Lock In</Text>
      </View>
    </View>
  </View>
);

const DropIllustration = () => (
  <View style={styles.illustrationContainer}>
    <View style={styles.dropContainer}>
      {/* Clock striking 9 */}
      <View style={styles.clock}>
        <Text style={styles.clockTime}>9:00</Text>
        <Text style={styles.clockLabel}>AM EST</Text>
      </View>
      {/* Feed unlocking animation representation */}
      <View style={styles.feedPreview}>
        {[1, 2, 3].map((i) => (
          <View
            key={i}
            style={[
              styles.feedCard,
              {opacity: 1 - (i - 1) * 0.25},
            ]}
          />
        ))}
      </View>
      <Text style={styles.dropLabel}>MONDAY DROP</Text>
    </View>
  </View>
);

const slides: OnboardingSlide[] = [
  {
    id: '1',
    headline: 'All Signal. No Noise.',
    subtext:
      'The internet is crowded. Zig limits every user to sharing just one item per week. Stop scrolling infinitely and start curating your best discoveries.',
    illustration: <NoiseSignalIllustration />,
  },
  {
    id: '2',
    headline: 'Curate Your Weekly Zig.',
    subtext:
      'Save links to your private Vault during the week. On Sunday, select your favorite one to lock it in. That is your Zig.',
    illustration: <VaultIllustration />,
  },
  {
    id: '3',
    headline: 'Ready for The Drop?',
    subtext:
      "Everyone's Zigs publish at the exact same time: Monday, 9 AM. Enable notifications to see what the world selected the moment the issue drops.",
    illustration: <DropIllustration />,
  },
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleSkip = () => {
    navigation.replace('Auth');
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      // Last slide - go to auth
      navigation.replace('Auth');
    }
  };

  const renderSlide = ({item}: {item: OnboardingSlide}) => (
    <View style={styles.slide}>
      {item.illustration}
      <Text style={styles.headline}>{item.headline}</Text>
      <Text style={styles.subtext}>{item.subtext}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Skip button */}
      {currentIndex < slides.length - 1 && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        bounces={false}
      />

      {/* Bottom section */}
      <View style={styles.bottomSection}>
        <ProgressDots
          total={slides.length}
          current={currentIndex}
          style={styles.dots}
        />

        {currentIndex === slides.length - 1 ? (
          <Button
            title="Turn on Notifications & Start"
            onPress={handleNext}
            fullWidth
            size="large"
          />
        ) : (
          <Button
            title="Continue"
            onPress={handleNext}
            fullWidth
            size="large"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },

  skipButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    zIndex: 10,
    padding: spacing.sm,
  },

  skipText: {
    ...typography.bodySmall,
    color: colors.stone,
  },

  slide: {
    width,
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    alignItems: 'center',
  },

  illustrationContainer: {
    width: '100%',
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  headline: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: spacing.md,
  },

  subtext: {
    ...typography.body,
    textAlign: 'center',
    color: colors.charcoal,
    lineHeight: 26,
  },

  bottomSection: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },

  dots: {
    marginBottom: spacing.lg,
  },

  // Noise/Signal Illustration
  noiseContainer: {
    position: 'absolute',
    bottom: 60,
    width: 200,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rock: {
    position: 'absolute',
    width: 30,
    height: 24,
    backgroundColor: colors.stone,
    borderRadius: 4,
  },

  gemContainer: {
    position: 'absolute',
    top: 40,
  },

  gemGlow: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.indigo,
    opacity: 0.15,
    top: -15,
    left: -15,
  },

  gem: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  gemSymbol: {
    fontSize: 48,
    color: colors.indigo,
  },

  // Vault Illustration
  vaultContainer: {
    alignItems: 'center',
    width: '100%',
  },

  shareSheet: {
    backgroundColor: colors.boneWhite,
    borderRadius: 16,
    padding: spacing.md,
    width: 200,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.parchment,
  },

  shareSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.parchment,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },

  shareOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  shareIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.sumiInk,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },

  shareIconText: {
    color: colors.boneWhite,
    fontSize: 20,
    fontWeight: '700',
  },

  shareLabel: {
    ...typography.bodySmall,
    fontWeight: '600',
  },

  lockButton: {
    backgroundColor: colors.sumiInk,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  lockIcon: {
    color: colors.boneWhite,
    marginRight: spacing.sm,
  },

  lockText: {
    ...typography.button,
    color: colors.boneWhite,
  },

  // Drop Illustration
  dropContainer: {
    alignItems: 'center',
  },

  clock: {
    backgroundColor: colors.boneWhite,
    borderRadius: 100,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.sumiInk,
    marginBottom: spacing.lg,
  },

  clockTime: {
    ...typography.h1,
    fontSize: 28,
  },

  clockLabel: {
    ...typography.caption,
    fontSize: 10,
    color: colors.stone,
  },

  feedPreview: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },

  feedCard: {
    width: 60,
    height: 80,
    backgroundColor: colors.boneWhite,
    borderRadius: 4,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.parchment,
  },

  dropLabel: {
    ...typography.label,
    color: colors.terracotta,
    letterSpacing: 2,
  },
});

export default OnboardingScreen;
