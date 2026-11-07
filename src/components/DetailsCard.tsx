import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '@/constants/theme';
import type { UserProfile } from '@/types/profile';

type DetailsCardProps = Pick<
  UserProfile,
  | 'campus'
  | 'correctionPoints'
  | 'email'
  | 'location'
  | 'login'
  | 'phone'
  | 'poolYear'
  | 'wallet'
>;

type Detail = {
  label: string;
  value: string | number | null;
};

export function DetailsCard({
  campus,
  correctionPoints,
  email,
  location,
  login,
  phone,
  poolYear,
  wallet,
}: DetailsCardProps) {
  const details: Detail[] = [
    { label: 'Login', value: login },
    { label: 'Email', value: email },
    { label: 'Phone', value: phone },
    { label: 'Location', value: location ?? 'Unavailable' },
    { label: 'Wallet', value: `${wallet} ₳` },
    { label: 'Correction points', value: correctionPoints },
    { label: 'Pool year', value: poolYear },
    { label: 'Campus', value: campus },
  ].filter((detail) => detail.value !== null && detail.value !== '');

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Details</Text>
      <View style={styles.grid}>
        {details.map((detail) => (
          <View key={detail.label} style={styles.row}>
            <Text style={styles.label}>{detail.label}</Text>
            <Text selectable style={styles.value}>
              {detail.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    padding: spacing.lg,
  },
  title: {
    color: colors.text,
    fontSize: typography.sectionTitle,
    fontWeight: '800',
  },
  grid: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  label: {
    color: colors.textMuted,
    fontSize: typography.caption,
    fontWeight: '600',
  },
  value: {
    flex: 1,
    color: colors.text,
    fontSize: typography.caption,
    fontWeight: '600',
    textAlign: 'right',
    flexShrink: 1,
  },
});
