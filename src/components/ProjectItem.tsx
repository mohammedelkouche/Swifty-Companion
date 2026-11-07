import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '@/constants/theme';
import type { ProjectResult } from '@/types/profile';

type ProjectItemProps = {
  project: ProjectResult;
};

export function ProjectItem({ project }: ProjectItemProps) {
  const badge =
    project.validated === true
      ? { background: colors.successSoft, color: colors.success, label: 'Validated' }
      : project.validated === false
        ? { background: colors.dangerSoft, color: colors.danger, label: 'Failed' }
        : { background: colors.neutralSoft, color: colors.neutral, label: 'Unknown' };

  return (
    <View style={styles.item}>
      <View style={styles.summary}>
        <Text numberOfLines={2} style={styles.name}>
          {project.name}
        </Text>
        <Text style={styles.mark}>{project.finalMark === null ? '—' : `${project.finalMark}%`}</Text>
      </View>
      <View style={[styles.badge, { backgroundColor: badge.background }]}>
        <Text style={[styles.badgeText, { color: badge.color }]}>{badge.label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  summary: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    color: colors.text,
    fontSize: typography.caption,
    fontWeight: '700',
    flexShrink: 1,
  },
  mark: {
    color: colors.textMuted,
    fontSize: typography.caption,
    fontWeight: '600',
  },
  badge: {
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
  },
});
