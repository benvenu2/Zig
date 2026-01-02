// Root Navigator - Main navigation structure for the app

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {colors} from '../theme/colors';

// Import screens
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import AuthScreen from '../screens/auth/AuthScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ProfileSetupScreen from '../screens/auth/ProfileSetupScreen';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface RootNavigatorProps {
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
}

const RootNavigator: React.FC<RootNavigatorProps> = ({
  isAuthenticated,
  hasCompletedOnboarding,
}) => {
  // Determine initial route based on auth state
  const getInitialRoute = (): keyof RootStackParamList => {
    if (!hasCompletedOnboarding) {
      return 'Onboarding';
    }
    if (!isAuthenticated) {
      return 'Auth';
    }
    return 'MainTabs';
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={getInitialRoute()}
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: colors.cream},
          animation: 'slide_from_right',
        }}>
        {/* Onboarding Flow */}
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{
            animation: 'fade',
          }}
        />

        {/* Auth Flow */}
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />

        {/* Main App */}
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{
            animation: 'fade',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
