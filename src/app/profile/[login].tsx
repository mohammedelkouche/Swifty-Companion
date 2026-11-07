import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { DetailsCard } from '@/components/DetailsCard';
import { ErrorView } from '@/components/ErrorView';
import { LoadingView } from '@/components/LoadingView';
import { ProfileHeader } from '@/components/ProfileHeader';
import { ProjectList } from '@/components/ProjectList';
import { SkillList } from '@/components/SkillList';
import { colors, radii, spacing } from '@/constants/theme';
import { useHydrated } from '@/hooks/useHydrated';
import { useUserProfile } from '@/hooks/useUserProfile';
import { normalizeLogin } from '@/utils/validators';

export default function ProfileScreen() {
  const params = useLocalSearchParams<{ login?: string | string[] }>();
  const rawLogin = Array.isArray(params.login) ? params.login[0] : params.login;
  const login = normalizeLogin(rawLogin ?? '');
  const profile = useUserProfile(login);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isHydrated = useHydrated();
  const isWide = isHydrated && width >= 700;
  const horizontalPadding = isWide ? spacing.xl : spacing.md;
  const goBackToSearch = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/');
  };

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.safeArea}>
      <Stack.Screen options={{ title: login || 'Profile' }} />

      {profile.status === 'idle' || profile.status === 'loading' ? <LoadingView /> : null}

      {profile.status === 'error' ? (
        <ErrorView
          message={profile.error.message}
          onBack={goBackToSearch}
          onRetry={profile.error.retryable ? profile.retry : undefined}
        />
      ) : null}

      {profile.status === 'success' ? (
        <ScrollView
          contentContainerStyle={[
            styles.content,
            {
              paddingHorizontal: horizontalPadding,
              paddingBottom: insets.bottom + spacing.xl,
            },
          ]}
          keyboardShouldPersistTaps="handled">
          <Pressable
            accessibilityRole="button"
            onPress={goBackToSearch}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
            <Text style={styles.backButtonText}>‹ Back to search</Text>
          </Pressable>

          <ProfileHeader
            displayName={profile.data.displayName}
            imageUrl={profile.data.imageUrl}
            level={profile.data.level}
            levelProgress={profile.data.levelProgress}
            login={profile.data.login}
          />

          <DetailsCard
            campus={profile.data.campus}
            correctionPoints={profile.data.correctionPoints}
            email={profile.data.email}
            location={profile.data.location}
            login={profile.data.login}
            phone={profile.data.phone}
            poolYear={profile.data.poolYear}
            wallet={profile.data.wallet}
          />

          <View style={[styles.collections, isWide && styles.collectionsWide]}>
            <SkillList skills={profile.data.skills} />
            <ProjectList projects={profile.data.projects} />
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    width: '100%',
    maxWidth: 1120,
    alignSelf: 'center',
    gap: spacing.md,
    paddingTop: spacing.md,
  },
  backButton: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  backButtonText: {
    color: colors.text,
    fontWeight: '700',
  },
  collections: {
    gap: spacing.md,
  },
  collectionsWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  pressed: {
    opacity: 0.76,
  },
});
