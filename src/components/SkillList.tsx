import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '@/constants/theme';
import type { Skill } from '@/types/profile';

import { SkillItem } from './SkillItem';

type SkillListProps = {
  skills: Skill[];
};

export function SkillList({ skills }: SkillListProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Skills</Text>
      {skills.length > 0 ? (
        <View style={styles.list}>
          {skills.map((skill) => (
            <SkillItem key={skill.name} skill={skill} />
          ))}
        </View>
      ) : (
        <Text style={styles.empty}>No skills are available for this cursus.</Text>
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
