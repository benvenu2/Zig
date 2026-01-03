// Tab Navigator - Floating Glass Navigation Bar
// Part of the "Digital Tactility" design language

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
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
  navigation,
}) => {
  const insets = useSafeAreaInsets();

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
          <HomeIcon focused={isHomeActive} />
        </TouchableOpacity>

        {/* Center Z button */}
        <TouchableOpacity
          style={styles.centerButton}
          onPress={() => handlePress('Vault')}
          activeOpacity={0.8}
        >
          <View style={styles.zButtonOuter}>
            <View style={[styles.zButtonInner, isVaultActive && styles.zButtonInnerActive]}>
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
          <ProfileIcon focused={isProfileActive} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Home icon component - outline house shape
const HomeIcon: React.FC<{focused: boolean}> = ({focused}) => {
  const iconColor = focused ? colors.navIcon : colors.navIconInactive;

  return (
    <View style={styles.homeIconContainer}>
      {/* Roof - triangle using borders */}
      <View style={[styles.homeRoof, {borderBottomColor: iconColor}]} />
      {/* House body - outline rectangle */}
      <View style={[styles.homeBody, {borderColor: iconColor}]} />
    </View>
  );
};

// Profile icon component - person outline shape
const ProfileIcon: React.FC<{focused: boolean}> = ({focused}) => {
  const iconColor = focused ? colors.navIcon : colors.navIconInactive;

  return (
    <View style={styles.profileIconContainer}>
      {/* Head - circle outline */}
      <View style={[styles.profileHead, {borderColor: iconColor}]} />
      {/* Body - arc/shoulders outline */}
      <View style={[styles.profileBody, {borderColor: iconColor}]} />
    </View>
  );
};

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
    borderRadius: 32,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 4,
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerButton: {
    paddingHorizontal: spacing.xl,
  },

  zButtonOuter: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.paperLight,
    justifyContent: 'center',
    alignItems: 'center',
    // Elevated from the bar
    marginTop: -32,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },

  zButtonInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.terracotta,
    justifyContent: 'center',
    alignItems: 'center',
  },

  zButtonInnerActive: {
    backgroundColor: '#D84800', // Slightly darker when active
  },

  zLogo: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.boneWhite,
    letterSpacing: -1,
  },

  // Home icon - outline style
  homeIconContainer: {
    width: 24,
    height: 22,
    alignItems: 'center',
  },

  homeRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.navIconInactive,
  },

  homeBody: {
    width: 18,
    height: 12,
    borderWidth: 2,
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    marginTop: -2,
  },

  // Profile icon - outline style
  profileIconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
  },

  profileHead: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },

  profileBody: {
    width: 20,
    height: 10,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'transparent',
    marginTop: 2,
  },
});

export default TabNavigator;
