import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/constants/theme';

export function LoadingView() {
  return (
    <View style={styles.container}>
      <ActivityIndicator accessibilityLabel="Loading profile" color={colors.primary} size="large" />
      <Text style={styles.label}>Loading profile…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.lg,
  },
  label: {
    color: colors.textMuted,
    fontSize: typography.body,
  },
});
