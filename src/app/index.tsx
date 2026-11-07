import { router } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SearchForm } from '@/components/SearchForm';
import { colors, radii, spacing, typography } from '@/constants/theme';
import { useHydrated } from '@/hooks/useHydrated';

export default function SearchScreen() {
  const { width } = useWindowDimensions();
  const isHydrated = useHydrated();
  const horizontalPadding = isHydrated && width >= 700 ? spacing.xxl : spacing.md;

  const handleSearch = (login: string) => {
    router.push({ pathname: '/profile/[login]', params: { login } });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}>
        <View style={[styles.screen, { paddingHorizontal: horizontalPadding }]}>
          <View style={styles.hero}>
            <View style={styles.logoMark}>
              <Text style={styles.logoText}>42</Text>
            </View>
            <Text style={styles.title}>Swifty Companion</Text>
            <Text style={styles.subtitle}>
              Search for a 42 student and explore their profile, skills, and completed projects.
            </Text>
          </View>

          <View style={styles.card}>
            {isHydrated ? (
              <SearchForm onSubmit={handleSearch} />
            ) : (
              <View accessibilityLabel="Preparing search form" style={styles.formPlaceholder}>
                <View style={styles.placeholderLabel} />
                <View style={styles.placeholderInput} />
                <View style={styles.placeholderHint} />
                <View style={styles.placeholderButton} />
              </View>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  screen: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 640,
    gap: spacing.xl,
    paddingVertical: spacing.xl,
  },
  hero: {
    alignItems: 'center',
    gap: spacing.md,
  },
  logoMark: {
    width: 72,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.lg,
    backgroundColor: colors.text,
  },
  logoText: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '900',
  },
  title: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    maxWidth: 520,
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 24,
    textAlign: 'center',
  },
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    padding: spacing.lg,
  },
  formPlaceholder: {
    gap: spacing.sm,
  },
  placeholderLabel: {
    width: '24%',
    height: 16,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceMuted,
  },
  placeholderInput: {
    width: '100%',
    height: 52,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceMuted,
  },
  placeholderHint: {
    width: '58%',
    height: 13,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceMuted,
  },
  placeholderButton: {
    width: '100%',
    height: 52,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceMuted,
    marginTop: spacing.md,
  },
});
