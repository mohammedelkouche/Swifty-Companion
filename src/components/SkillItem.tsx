import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '@/constants/theme';
import type { Skill } from '@/types/profile';

type SkillItemProps = {
  skill: Skill;
};

export function SkillItem({ skill }: SkillItemProps) {
  const percentage = Math.min(Math.max(skill.percentage, 0), 100);

  return (
    <View style={styles.item}>
      <View style={styles.labels}>
        <Text numberOfLines={2} style={styles.name}>
          {skill.name}
        </Text>
        <Text style={styles.value}>
          {skill.level.toFixed(2)} · {percentage.toFixed(1)}%
        </Text>
      </View>
      <View
        accessibilityLabel={`${skill.name} ${percentage.toFixed(1)} percent`}
        accessibilityRole="progressbar"
        style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  labels: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  name: {
    flex: 1,
    color: colors.text,
    fontSize: typography.caption,
    fontWeight: '700',
  },
  value: {
    color: colors.textMuted,
    fontSize: typography.caption,
    fontWeight: '600',
  },
  progressTrack: {
    height: 8,
    overflow: 'hidden',
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceMuted,
  },
  progressFill: {
    height: '100%',
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
  },
});
