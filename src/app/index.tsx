import { router } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
  const isWide = isHydrated && width >= 900;
  const horizontalPadding = isHydrated && width >= 700 ? spacing.xl : spacing.md;

  const handleSearch = (login: string) => {
    router.push({ pathname: '/profile/[login]', params: { login } });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}>
        <View pointerEvents="none" style={styles.backgroundDecoration}>
          <View style={[styles.orb, styles.orbTop]} />
          <View style={[styles.orb, styles.orbBottom]} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View
            style={[
              styles.screen,
              isWide && styles.screenWide,
              { paddingHorizontal: horizontalPadding },
            ]}>
            <View style={[styles.hero, isWide && styles.heroWide]}>
              <View style={styles.brandRow}>
                <View style={styles.logoMark}>
                  <Text style={styles.logoText}>42</Text>
                </View>
                <Text style={styles.brandName}>SWIFTY COMPANION</Text>
              </View>

              <View style={styles.heroCopy}>
                <Text style={[styles.title, isWide && styles.titleWide]}>
                  Discover every 42 journey.
                </Text>
                <Text style={[styles.subtitle, isWide && styles.subtitleWide]}>
                  Find a student and explore their cursus, skills, progress, and completed projects
                  in one clear profile.
                </Text>
              </View>

              <View style={styles.featureList}>
                <View style={styles.featurePill}>
                  <View style={styles.featureDot} />
                  <Text style={styles.featureText}>Live Intra data</Text>
                </View>
                <View style={styles.featurePill}>
                  <View style={styles.featureDot} />
                  <Text style={styles.featureText}>Skills & projects</Text>
                </View>
              </View>
            </View>

            <View style={[styles.card, isWide && styles.cardWide]}>
              <View style={styles.cardHeading}>
                <Text style={styles.cardEyebrow}>STUDENT DIRECTORY</Text>
                <Text style={styles.cardTitle}>Find a profile</Text>
                <Text style={styles.cardDescription}>
                  Enter the student&apos;s exact Intra login to get started.
                </Text>
              </View>

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
        </ScrollView>
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
  backgroundDecoration: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
  },
  orb: {
    position: 'absolute',
    width: 320,
    aspectRatio: 1,
    borderRadius: radii.pill,
    backgroundColor: colors.primarySoft,
    opacity: 0.55,
  },
  orbTop: {
    top: -180,
    right: -130,
  },
  orbBottom: {
    bottom: -210,
    left: -160,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  screen: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1180,
    gap: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  screenWide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 64,
  },
  hero: {
    alignItems: 'flex-start',
    gap: spacing.lg,
  },
  heroWide: {
    flex: 1.15,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoMark: {
    width: 52,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.md,
    backgroundColor: colors.primary,
  },
  logoText: {
    color: colors.white,
    fontSize: 21,
    fontWeight: '900',
  },
  brandName: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.4,
  },
  heroCopy: {
    gap: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '900',
    letterSpacing: -1,
  },
  titleWide: {
    maxWidth: 560,
    fontSize: 52,
    lineHeight: 58,
    letterSpacing: -1.8,
  },
  subtitle: {
    maxWidth: 560,
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 25,
  },
  subtitleWide: {
    fontSize: 18,
    lineHeight: 28,
  },
  featureList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  featurePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  featureDot: {
    width: 7,
    aspectRatio: 1,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
  },
  featureText: {
    color: colors.text,
    fontSize: typography.caption,
    fontWeight: '700',
  },
  card: {
    width: '100%',
    gap: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    padding: spacing.xl,
  },
  cardWide: {
    flex: 0.85,
    maxWidth: 460,
  },
  cardHeading: {
    gap: spacing.sm,
  },
  cardEyebrow: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  cardDescription: {
    color: colors.textMuted,
    fontSize: typography.caption,
    lineHeight: 20,
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
