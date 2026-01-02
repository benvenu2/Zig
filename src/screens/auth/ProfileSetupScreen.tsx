// Profile Setup Screen - Set up user profile after registration

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
import {spacing, borderRadius} from '../../theme/spacing';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Avatar from '../../components/Avatar';
import {RootStackParamList} from '../../types';

type ProfileSetupScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProfileSetup'>;
};

const ProfileSetupScreen: React.FC<ProfileSetupScreenProps> = ({navigation}) => {
  const [displayName, setDisplayName] = useState('');
  const [handle, setHandle] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    displayName?: string;
    handle?: string;
    bio?: string;
  }>({});

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    }

    if (!handle.trim()) {
      newErrors.handle = 'Handle is required';
    } else if (!/^[a-zA-Z0-9_]+$/.test(handle)) {
      newErrors.handle = 'Handle can only contain letters, numbers, and underscores';
    } else if (handle.length < 3) {
      newErrors.handle = 'Handle must be at least 3 characters';
    }

    if (bio.length > 140) {
      newErrors.bio = 'Bio must be 140 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleComplete = async () => {
    if (!validate()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'MainTabs'}],
      });
    }, 1500);
  };

  const handleChoosePhoto = () => {
    // In a real app, this would open the image picker
    console.log('Choose photo');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title}>Set up your profile</Text>
            <Text style={styles.subtitle}>
              Tell the world who you are. This is how others will see you.
            </Text>

            {/* Avatar Section */}
            <TouchableOpacity
              style={styles.avatarSection}
              onPress={handleChoosePhoto}
              activeOpacity={0.8}>
              <Avatar name={displayName || '?'} size="xlarge" />
              <Text style={styles.changePhotoText}>Add Photo</Text>
            </TouchableOpacity>

            {/* Form */}
            <View style={styles.form}>
              <Input
                label="Display Name"
                placeholder="Your name"
                value={displayName}
                onChangeText={setDisplayName}
                autoCapitalize="words"
                error={errors.displayName}
              />

              <View style={styles.handleContainer}>
                <Input
                  label="Handle"
                  placeholder="username"
                  value={handle}
                  onChangeText={(text) => setHandle(text.toLowerCase())}
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={errors.handle}
                />
                <Text style={styles.handlePrefix}>@</Text>
              </View>

              <View style={styles.bioContainer}>
                <View style={styles.bioHeader}>
                  <Text style={styles.bioLabel}>Bio</Text>
                  <Text style={styles.bioCount}>{bio.length}/140</Text>
                </View>
                <Input
                  placeholder="Tell us about yourself..."
                  value={bio}
                  onChangeText={setBio}
                  multiline
                  numberOfLines={3}
                  style={styles.bioInput}
                  error={errors.bio}
                  containerStyle={styles.bioInputContainer}
                />
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  title="Complete Setup"
                  onPress={handleComplete}
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

  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
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

  avatarSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  changePhotoText: {
    ...typography.bodySmall,
    color: colors.indigo,
    marginTop: spacing.sm,
    fontWeight: '600',
  },

  form: {
    flex: 1,
  },

  handleContainer: {
    position: 'relative',
  },

  handlePrefix: {
    position: 'absolute',
    left: spacing.md,
    top: 44,
    ...typography.body,
    color: colors.stone,
  },

  bioContainer: {
    marginBottom: spacing.md,
  },

  bioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },

  bioLabel: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.sumiInk,
  },

  bioCount: {
    ...typography.caption,
    color: colors.stone,
  },

  bioInputContainer: {
    marginBottom: 0,
  },

  bioInput: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: spacing.md,
  },

  buttonContainer: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
});

export default ProfileSetupScreen;
