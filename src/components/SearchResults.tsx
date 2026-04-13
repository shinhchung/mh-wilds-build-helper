import { StyleSheet, Text, View } from 'react-native';
import { skills as allSkills } from '../data';
import { colors } from '../theme/colors';
import { ArmorPieceSlot, ArmorSearchResult } from '../types';

const skillNameMap = Object.fromEntries(allSkills.map((s) => [s.id, s.name]));

const slotLabels: Record<ArmorPieceSlot, string> = {
  head: '頭部',
  chest: '身體',
  arms: '手部',
  waist: '腰部',
  legs: '腳部',
  talisman: '護石',
};

type Props = {
  result: ArmorSearchResult;
};

export function SearchResults({ result }: Props) {
  if (result.armor.length === 0) return null;

  return (
    <View style={styles.container}>
      {/* Skill achievement summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>技能達成</Text>
        {result.achievedSkills.map((s) => {
          const met = s.achievedLevel >= s.targetLevel;
          return (
            <View key={s.skillId} style={styles.skillRow}>
              <Text style={[styles.skillName, met ? styles.met : styles.unmet]}>
                {skillNameMap[s.skillId] ?? s.skillId}
              </Text>
              <Text style={[styles.skillLevel, met ? styles.met : styles.unmet]}>
                Lv.{s.achievedLevel} / {s.targetLevel}
                {met ? ' ✓' : ''}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Armor pieces */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>推薦防具</Text>
        {result.armor.map((piece) => (
          <View key={piece.id} style={styles.armorRow}>
            <Text style={styles.armorSlot}>{slotLabels[piece.slot]}</Text>
            <View style={styles.armorInfo}>
              <Text style={styles.armorName}>{piece.name}</Text>
              <Text style={styles.armorDetail}>
                防禦 {piece.defense} · 孔位 {piece.slots.length ? piece.slots.join('/') : '無'}
              </Text>
              <Text style={styles.armorDetail}>
                {piece.skillBonuses
                  .map((b) => `${skillNameMap[b.skillId] ?? b.skillId} Lv.${b.level}`)
                  .join(', ')}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Decorations */}
      {result.decorations.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>建議裝飾珠</Text>
          {result.decorations.map((deco, i) => (
            <View key={`${deco.id}-${i}`} style={styles.decoRow}>
              <Text style={styles.decoName}>{deco.name}</Text>
              <Text style={styles.decoDetail}>{deco.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Total defense */}
      <Text style={styles.totalDefense}>總物理防禦: {result.totalDefense}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  skillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  skillName: {
    fontSize: 14,
    fontWeight: '600',
  },
  skillLevel: {
    fontSize: 14,
    fontWeight: '700',
  },
  met: {
    color: colors.success,
  },
  unmet: {
    color: colors.danger,
  },
  armorRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  armorSlot: {
    color: colors.primaryMuted,
    fontSize: 12,
    fontWeight: '700',
    width: 36,
    paddingTop: 2,
  },
  armorInfo: {
    flex: 1,
    gap: 2,
  },
  armorName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  armorDetail: {
    color: colors.subtext,
    fontSize: 12,
    lineHeight: 16,
  },
  decoRow: {
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  decoName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  decoDetail: {
    color: colors.subtext,
    fontSize: 12,
  },
  totalDefense: {
    color: colors.primaryMuted,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 4,
  },
});
