// Tab Navigator - Floating Glass Navigation Bar
// Part of the "Digital Tactility" design language

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../theme/colors';
import {spacing, borderRadius} from '../theme/spacing';
import {MainTabParamList} from '../types';

// Import screens
import HomeScreen from '../screens/home/HomeScreen';
import SearchScreen from '../screens/search/SearchScreen';
import VaultScreen from '../screens/vault/VaultScreen';
import ActivityScreen from '../screens/activity/ActivityScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Custom floating tab bar component
const FloatingTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  // Map route names to their icons
  const getIcon = (routeName: string, focused: boolean) => {
    switch (routeName) {
      case 'Home':
        return (
          <View style={styles.iconContainer}>
            <Text style={[styles.homeIcon, focused && styles.iconFocused]}>
              {/* House icon using Unicode */}
              ⌂
            </Text>
          </View>
        );
      case 'Profile':
        return (
          <View style={styles.iconContainer}>
            <Text style={[styles.profileIcon, focused && styles.iconFocused]}>
              {/* Person icon */}
              ⍟
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  // Get the Home and Profile tabs
  const homeTab = state.routes.find(r => r.name === 'Home');
  const profileTab = state.routes.find(r => r.name === 'Profile');
  const vaultTab = state.routes.find(r => r.name === 'Vault');

  const isHomeActive = state.routes[state.index].name === 'Home';
  const isProfileActive = state.routes[state.index].name === 'Profile';
  const isVaultActive = state.routes[state.index].name === 'Vault';

  const handlePress = (routeName: string) => {
    const route = state.routes.find(r => r.name === routeName);
    if (route) {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!event.defaultPrevented) {
        navigation.navigate(routeName);
      }
    }
  };

  return (
    <View style={[styles.floatingContainer, {paddingBottom: Math.max(insets.bottom, 16)}]}>
      <View style={styles.floatingBar}>
        {/* Home button */}
        <TouchableOpacity
          style={styles.sideButton}
          onPress={() => handlePress('Home')}
          activeOpacity={0.7}
        >
          <View style={[styles.sideIconWrapper, isHomeActive && styles.sideIconWrapperActive]}>
            <HomeIcon focused={isHomeActive} />
          </View>
        </TouchableOpacity>

        {/* Center Z button */}
        <TouchableOpacity
          style={styles.centerButton}
          onPress={() => handlePress('Vault')}
          activeOpacity={0.8}
        >
          <View style={[styles.zButtonOuter, isVaultActive && styles.zButtonOuterActive]}>
            <View style={styles.zButtonInner}>
              <Text style={styles.zLogo}>Z</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Profile button */}
        <TouchableOpacity
          style={styles.sideButton}
          onPress={() => handlePress('Profile')}
          activeOpacity={0.7}
        >
          <View style={[styles.sideIconWrapper, isProfileActive && styles.sideIconWrapperActive]}>
            <ProfileIcon focused={isProfileActive} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Home icon component - simple house shape
const HomeIcon: React.FC<{focused: boolean}> = ({focused}) => (
  <View style={styles.homeIconContainer}>
    {/* House shape using multiple views */}
    <View style={[styles.homeRoof, focused && styles.iconPathFocused]} />
    <View style={[styles.homeBody, focused && styles.iconPathFocused]} />
  </View>
);

// Profile icon component - simple person shape
const ProfileIcon: React.FC<{focused: boolean}> = ({focused}) => (
  <View style={styles.profileIconContainer}>
    {/* Person head */}
    <View style={[styles.profileHead, focused && styles.iconPathFocused]} />
    {/* Person body */}
    <View style={[styles.profileBody, focused && styles.iconPathFocused]} />
  </View>
);

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Vault" component={VaultScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },

  floatingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.navBackground,
    borderRadius: 28,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    // Cinematic glass shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
    // Subtle inner glow effect
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },

  sideButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },

  sideIconWrapper: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sideIconWrapperActive: {
    // Active state styling
  },

  centerButton: {
    paddingHorizontal: spacing.xl,
  },

  zButtonOuter: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.paperLight,
    justifyContent: 'center',
    alignItems: 'center',
    // Elevated from the bar
    marginTop: -28,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },

  zButtonOuterActive: {
    backgroundColor: colors.paperLight,
  },

  zButtonInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.paperLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  zLogo: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.sumiInk,
    letterSpacing: -1,
  },

  // Icon styles
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  homeIcon: {
    fontSize: 22,
    color: colors.navIconInactive,
  },

  profileIcon: {
    fontSize: 22,
    color: colors.navIconInactive,
  },

  iconFocused: {
    color: colors.navIcon,
  },

  // Custom home icon
  homeIconContainer: {
    width: 22,
    height: 20,
    alignItems: 'center',
  },

  homeRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 11,
    borderRightWidth: 11,
    borderBottomWidth: 9,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.navIconInactive,
  },

  homeBody: {
    width: 16,
    height: 10,
    backgroundColor: colors.navIconInactive,
    marginTop: -1,
  },

  iconPathFocused: {
    borderBottomColor: colors.navIcon,
    backgroundColor: colors.navIcon,
  },

  // Custom profile icon
  profileIconContainer: {
    width: 22,
    height: 22,
    alignItems: 'center',
  },

  profileHead: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.navIconInactive,
    marginBottom: 2,
  },

  profileBody: {
    width: 18,
    height: 8,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    backgroundColor: colors.navIconInactive,
  },
});

export default TabNavigator;
