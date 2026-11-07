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
      <Text style={styles.title}>Completed projects</Text>
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
    flex: 1,
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
  list: {
    gap: spacing.md,
  },
  empty: {
    color: colors.textMuted,
    fontSize: typography.caption,
    lineHeight: 20,
  },
});
