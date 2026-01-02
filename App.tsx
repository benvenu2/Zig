// Zig - All Signal. All Zeitgeist.
// Main App Component

import React, {useState, useEffect} from 'react';
import {StatusBar, View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AppProvider} from './src/context/AppContext';
import {RootNavigator} from './src/navigation';
import {colors} from './src/theme/colors';
import {typography} from './src/theme/typography';

// Storage keys
const STORAGE_KEYS = {
  HAS_ONBOARDED: '@zig/hasOnboarded',
  AUTH_TOKEN: '@zig/authToken',
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      const [hasOnboarded, authToken] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.HAS_ONBOARDED),
        AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
      ]);

      setHasCompletedOnboarding(hasOnboarded === 'true');
      setIsAuthenticated(!!authToken);
    } catch (error) {
      console.error('Error initializing app:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>Z</Text>
        </View>
        <ActivityIndicator size="large" color={colors.sumiInk} style={styles.loader} />
        <Text style={styles.tagline}>All Signal. All Zeitgeist.</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <AppProvider>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={colors.cream}
          />
          <RootNavigator
            isAuthenticated={isAuthenticated}
            hasCompletedOnboarding={hasCompletedOnboarding}
          />
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.cream,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.sumiInk,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.boneWhite,
  },
  loader: {
    marginBottom: 16,
  },
  tagline: {
    ...typography.body,
    color: colors.stone,
  },
});

export default App;
