// Tab Navigator - Bottom tab navigation for main app screens

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {spacing} from '../theme/spacing';
import {MainTabParamList} from '../types';

// Import screens
import HomeScreen from '../screens/home/HomeScreen';
import SearchScreen from '../screens/search/SearchScreen';
import VaultScreen from '../screens/vault/VaultScreen';
import ActivityScreen from '../screens/activity/ActivityScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Custom tab icon components
const TabIcon: React.FC<{
  focused: boolean;
  icon: string;
  focusedIcon?: string;
}> = ({focused, icon, focusedIcon}) => (
  <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
    {focused && focusedIcon ? focusedIcon : icon}
  </Text>
);

// Special center button for Vault
const VaultTabButton: React.FC<{focused: boolean}> = ({focused}) => (
  <View style={[styles.vaultButton, focused && styles.vaultButtonFocused]}>
    <Text style={styles.vaultIcon}>Z</Text>
  </View>
);

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.sumiInk,
        tabBarInactiveTintColor: colors.stone,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon="⌂" focusedIcon="⌂" />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon="⌕" />
          ),
        }}
      />
      <Tab.Screen
        name="Vault"
        component={VaultScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => <VaultTabButton focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          tabBarLabel: 'Activity',
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon="○" focusedIcon="●" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon="◯" focusedIcon="◉" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.boneWhite,
    borderTopWidth: 1,
    borderTopColor: colors.parchment,
    height: 85,
    paddingBottom: spacing.lg,
    paddingTop: spacing.sm,
  },

  tabItem: {
    paddingTop: spacing.xs,
  },

  tabLabel: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '500',
    marginTop: spacing.xs,
  },

  tabIcon: {
    fontSize: 24,
    color: colors.stone,
  },

  tabIconFocused: {
    color: colors.sumiInk,
  },

  vaultButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.sumiInk,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -spacing.md,
    shadowColor: colors.sumiInk,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  vaultButtonFocused: {
    backgroundColor: colors.indigo,
  },

  vaultIcon: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.boneWhite,
  },
});

export default TabNavigator;
