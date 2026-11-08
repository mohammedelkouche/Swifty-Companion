import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '@/constants/theme';

type ErrorViewProps = {
  message: string;
  onBack: () => void;
  onRetry?: () => void;
};

export function ErrorView({ message, onBack, onRetry }: ErrorViewProps) {
  const isNotFound = message === 'Login not found.';

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>{isNotFound ? '?' : '!'}</Text>
        </View>

        <View style={styles.copy}>
          <Text style={styles.title}>{isNotFound ? 'Student not found' : 'Unable to load profile'}</Text>
          <Text accessibilityLiveRegion="polite" style={styles.message}>
            {message}
          </Text>
          <Text style={styles.guidance}>
            {isNotFound
              ? 'Check the spelling of the Intra login, then try another search.'
              : 'Return to search or try the request again.'}
          </Text>
        </View>

        <View style={styles.actions}>
          {onRetry ? (
            <Pressable
              accessibilityRole="button"
              onPress={onRetry}
              style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
              <Text style={styles.primaryButtonText}>Try again</Text>
            </Pressable>
          ) : null}
          <Pressable
            accessibilityRole="button"
            onPress={onBack}
            style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
            <Text style={styles.secondaryButtonText}>← Back to search</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card: {
    width: '100%',
    maxWidth: 520,
    alignItems: 'center',
    gap: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  icon: {
    width: 56,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.pill,
    backgroundColor: colors.dangerSoft,
  },
  iconText: {
    color: colors.danger,
    fontSize: 28,
    fontWeight: '900',
  },
  copy: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: typography.sectionTitle,
    fontWeight: '800',
    textAlign: 'center',
  },
  message: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '700',
    lineHeight: 24,
    textAlign: 'center',
  },
  guidance: {
    maxWidth: 380,
    color: colors.textMuted,
    fontSize: typography.caption,
    lineHeight: 20,
    textAlign: 'center',
  },
  actions: {
    width: '100%',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  primaryButton: {
    width: '100%',
    maxWidth: 280,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
  },
  primaryButtonText: {
    color: colors.white,
    fontWeight: '700',
  },
  secondaryButton: {
    width: '100%',
    maxWidth: 280,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
  },
  secondaryButtonText: {
    color: colors.text,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.76,
  },
});
