// Login Screen - Email/Password login

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

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  const validate = (): boolean => {
    const newErrors: {email?: string; password?: string} = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Navigate to main app
      navigation.reset({
        index: 0,
        routes: [{name: 'MainTabs'}],
      });
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
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>
              Log in to see what the world selected.
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
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                error={errors.password}
              />

              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>

              <Button
                title="Log In"
                onPress={handleLogin}
                loading={loading}
                fullWidth
                size="large"
              />
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

  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.xl,
    marginTop: -spacing.sm,
  },

  forgotPasswordText: {
    ...typography.bodySmall,
    color: colors.indigo,
  },
});

export default LoginScreen;
