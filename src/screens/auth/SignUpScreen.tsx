// Sign Up Screen - Email/Password registration

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '../../theme/colors';
import {typography} from '../../theme/typography';
import {spacing} from '../../theme/spacing';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {RootStackParamList} from '../../types';

type SignUpScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
};

const SignUpScreen: React.FC<SignUpScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('ProfileSetup');
    }, 1500);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.subtitle}>
              Join the community of curators. One Zig per week.
            </Text>

            {/* Form */}
            <View style={styles.form}>
              <Input
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.email}
              />

              <Input
                label="Password"
                placeholder="At least 8 characters"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                error={errors.password}
              />

              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                error={errors.confirmPassword}
              />

              <View style={styles.buttonContainer}>
                <Button
                  title="Create Account"
                  onPress={handleSignUp}
                  loading={loading}
                  fullWidth
                  size="large"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },

  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backArrow: {
    fontSize: 24,
    color: colors.sumiInk,
  },

  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },

  title: {
    ...typography.h1,
    marginBottom: spacing.sm,
  },

  subtitle: {
    ...typography.body,
    color: colors.charcoal,
    marginBottom: spacing.xl,
  },

  form: {
    flex: 1,
  },

  buttonContainer: {
    marginTop: spacing.md,
  },
});

export default SignUpScreen;
