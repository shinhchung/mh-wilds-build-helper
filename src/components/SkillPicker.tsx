import { Pressable, StyleSheet, Text, View } from 'react-native';
import { skills } from '../data';
import { colors } from '../theme/colors';
import { SkillTarget } from '../types';

type Props = {
  selectedTargets: SkillTarget[];
  onTargetsChange: (targets: SkillTarget[]) => void;
};

export function SkillPicker({ selectedTargets, onTargetsChange }: Props) {
  const targetMap = new Map(selectedTargets.map((t) => [t.skillId, t.targetLevel]));

  const toggleSkill = (skillId: string, maxLevel: number) => {
    if (targetMap.has(skillId)) {
      onTargetsChange(selectedTargets.filter((t) => t.skillId !== skillId));
    } else {
      onTargetsChange([...selectedTargets, { skillId, targetLevel: maxLevel }]);
    }
  };

  const setLevel = (skillId: string, level: number) => {
    onTargetsChange(
      selectedTargets.map((t) => (t.skillId === skillId ? { ...t, targetLevel: level } : t)),
    );
  };

  return (
    <View style={styles.container}>
      {skills.map((skill) => {
        const selected = targetMap.has(skill.id);
        const currentLevel = targetMap.get(skill.id) ?? 0;
        return (
          <View key={skill.id}>
            <Pressable
              onPress={() => toggleSkill(skill.id, skill.levels.length)}
              style={[styles.skillRow, selected && styles.skillRowActive]}
            >
              <View style={styles.skillInfo}>
                <Text style={[styles.skillName, selected && styles.skillNameActive]}>
                  {skill.name}
                </Text>
                <Text style={styles.skillDesc}>{skill.description}</Text>
              </View>
              <Text style={styles.categoryBadge}>
                {skill.category === 'offense' ? '攻' : skill.category === 'defense' ? '守' : '輔'}
              </Text>
            </Pressable>
            {selected && (
              <View style={styles.levelRow}>
                <Text style={styles.levelLabel}>目標等級</Text>
                {skill.levels.map((entry) => (
                  <Pressable
                    key={entry.level}
                    onPress={() => setLevel(skill.id, entry.level)}
                    style={[
                      styles.levelButton,
                      currentLevel === entry.level && styles.levelButtonActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.levelButtonText,
                        currentLevel === entry.level && styles.levelButtonTextActive,
                      ]}
                    >
                      {entry.level}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  skillRowActive: {
    borderColor: colors.primary,
    backgroundColor: colors.elevatedCard,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  skillInfo: {
    flex: 1,
    gap: 2,
  },
  skillName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  skillNameActive: {
    color: colors.primaryMuted,
  },
  skillDesc: {
    color: colors.subtext,
    fontSize: 12,
    lineHeight: 16,
  },
  categoryBadge: {
    color: colors.subtext,
    fontSize: 11,
    fontWeight: '600',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    overflow: 'hidden',
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.elevatedCard,
    borderColor: colors.primary,
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 10,
    gap: 8,
  },
  levelLabel: {
    color: colors.subtext,
    fontSize: 12,
    marginRight: 4,
  },
  levelButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  levelButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  levelButtonTextActive: {
    color: colors.background,
  },
});
