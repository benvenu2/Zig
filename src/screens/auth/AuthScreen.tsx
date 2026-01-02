// Auth Screen - Main authentication entry point

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '../../theme/colors';
import {typography} from '../../theme/typography';
import {spacing, borderRadius} from '../../theme/spacing';
import Button from '../../components/Button';
import {RootStackParamList} from '../../types';

type AuthScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Auth'>;
};

const AuthScreen: React.FC<AuthScreenProps> = ({navigation}) => {
  const handleAppleSignIn = () => {
    // In a real app, this would trigger Apple Sign In
    navigation.navigate('ProfileSetup');
  };

  const handleGoogleSignIn = () => {
    // In a real app, this would trigger Google Sign In
    navigation.navigate('ProfileSetup');
  };

  const handleEmailSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo/Brand */}
        <View style={styles.brandSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>Z</Text>
          </View>
          <Text style={styles.brandName}>Zig</Text>
          <Text style={styles.tagline}>All Signal. All Zeitgeist.</Text>
        </View>

        {/* Auth Options */}
        <View style={styles.authSection}>
          {/* Apple Sign In */}
          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleAppleSignIn}
            activeOpacity={0.8}>
            <Text style={styles.socialIcon}></Text>
            <Text style={styles.socialButtonText}>Continue with Apple</Text>
          </TouchableOpacity>

          {/* Google Sign In */}
          <TouchableOpacity
            style={[styles.socialButton, styles.googleButton]}
            onPress={handleGoogleSignIn}
            activeOpacity={0.8}>
            <Text style={styles.googleIcon}>G</Text>
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Email Sign Up */}
          <Button
            title="Sign up with Email"
            onPress={handleEmailSignUp}
            variant="outline"
            fullWidth
            size="large"
          />
        </View>

        {/* Login Link */}
        <View style={styles.loginSection}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginLink}>Log in</Text>
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <Text style={styles.terms}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },

  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
  },

  brandSection: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },

  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.sumiInk,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  logo: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.boneWhite,
  },

  brandName: {
    ...typography.h1,
    fontSize: 36,
    marginBottom: spacing.xs,
  },

  tagline: {
    ...typography.body,
    color: colors.stone,
  },

  authSection: {
    marginBottom: spacing.xl,
  },

  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.sumiInk,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    minHeight: 56,
  },

  googleButton: {
    backgroundColor: colors.boneWhite,
    borderWidth: 1.5,
    borderColor: colors.parchment,
  },

  socialIcon: {
    fontSize: 20,
    color: colors.boneWhite,
    marginRight: spacing.sm,
  },

  googleIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.sumiInk,
    marginRight: spacing.sm,
  },

  socialButtonText: {
    ...typography.button,
    color: colors.boneWhite,
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.parchment,
  },

  dividerText: {
    ...typography.caption,
    color: colors.stone,
    marginHorizontal: spacing.md,
  },

  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },

  loginText: {
    ...typography.body,
    color: colors.charcoal,
  },

  loginLink: {
    ...typography.body,
    color: colors.indigo,
    fontWeight: '600',
  },

  terms: {
    ...typography.caption,
    textAlign: 'center',
    color: colors.stone,
    lineHeight: 18,
  },
});

export default AuthScreen;
