import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '@/constants/theme';
import type { ProjectResult } from '@/types/profile';

import { ProjectItem } from './ProjectItem';

type ProjectListProps = {
  projects: ProjectResult[];
};

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <View style={styles.headingCopy}>
          <Text style={styles.title}>Completed projects</Text>
          <Text style={styles.subtitle}>Validated and failed attempts</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{projects.length}</Text>
        </View>
      </View>
      {projects.length > 0 ? (
        <View style={styles.list}>
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </View>
      ) : (
        <Text style={styles.empty}>No completed projects are available.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignSelf: 'stretch',
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    padding: spacing.lg,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  headingCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    color: colors.text,
    fontSize: typography.sectionTitle,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.caption,
  },
  countBadge: {
    minWidth: 34,
    minHeight: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.pill,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.sm,
  },
  countText: {
    color: colors.primary,
    fontSize: typography.caption,
    fontWeight: '900',
  },
  list: {
    width: '100%',
    gap: spacing.sm,
  },
  empty: {
    color: colors.textMuted,
    fontSize: typography.caption,
    lineHeight: 20,
  },
});
