import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PlaystyleSelector } from './src/components/PlaystyleSelector';
import { SectionCard } from './src/components/SectionCard';
import { skills } from './src/data';
import { recommendBuild } from './src/logic/recommendBuild';
import { colors } from './src/theme/colors';
import { ArmorPieceSlot, Playstyle } from './src/types';

const skillNameMap = Object.fromEntries(skills.map((s) => [s.id, s.name]));

const slotLabels: Record<ArmorPieceSlot, string> = {
  head: '頭部',
  chest: '身體',
  arms: '手部',
  waist: '腰部',
  legs: '腳部',
  talisman: '護石',
};

export default function App() {
  const [playstyle, setPlaystyle] = useState<Playstyle>('attack');
  const recommendation = useMemo(() => recommendBuild(playstyle), [playstyle]);
  const { build, highlightedSkills } = recommendation;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Monster Hunter Wilds</Text>
          <Text style={styles.title}>陪裝助手</Text>
          <Text style={styles.subtitle}>
            揀一個狩獵風格，立即睇推薦武器、裝備、珠，同技能效果。
          </Text>
        </View>

        <SectionCard title="選擇玩法方向" subtitle="可以先用攻擊型、防守型、全能型做初步配裝，之後再微調。">
          <PlaystyleSelector selected={playstyle} onSelect={setPlaystyle} />
        </SectionCard>

        <SectionCard title={build.title} subtitle={build.summary}>
          <Text style={styles.weaponText}>
            {build.weapon.weaponType} · {build.weapon.label}
          </Text>
          <Text style={styles.bodyText}>{build.weapon.reason}</Text>
        </SectionCard>

        <SectionCard title="推薦裝備配置">
          {build.armor.map((piece) => (
            <View key={piece.id} style={styles.rowBlock}>
              <Text style={styles.rowTitle}>
                {slotLabels[piece.slot]} · {piece.name}
              </Text>
              <Text style={styles.bodyText}>
                防禦 {piece.defense} · 孔位 {piece.slots.length ? piece.slots.join('/') : '無'}
              </Text>
              <Text style={styles.bodyText}>
                技能: {piece.skillBonuses.map((bonus) => `${skillNameMap[bonus.skillId] ?? bonus.skillId} Lv.${bonus.level}`).join(', ')}
              </Text>
            </View>
          ))}
        </SectionCard>

        <SectionCard title="推薦珠">
          {build.decorations.map((jewel) => (
            <View key={jewel.id} style={styles.rowBlock}>
              <Text style={styles.rowTitle}>{jewel.name}</Text>
              <Text style={styles.bodyText}>
                孔位大小 {jewel.slotSize} · {jewel.description}
              </Text>
            </View>
          ))}
        </SectionCard>

        <SectionCard title="技能描述">
          {highlightedSkills.map((skill) => (
            <View key={skill.id} style={styles.rowBlock}>
              <Text style={styles.rowTitle}>{skill.name}</Text>
              <Text style={styles.bodyText}>{skill.description}</Text>
              {skill.levels.map((entry) => (
                <Text key={`${skill.id}-${entry.level}`} style={styles.levelText}>
                  Lv.{entry.level}: {entry.description}
                </Text>
              ))}
            </View>
          ))}
        </SectionCard>

        <SectionCard title="整體防禦資料">
          <Text style={styles.bodyText}>物理防禦: {build.defenseStats.physical}</Text>
          <Text style={styles.bodyText}>屬性防禦評分: {build.defenseStats.elemental}</Text>
          <Text style={styles.bodyText}>
            抗性: 火 {build.defenseStats.resistances.fire}, 水 {build.defenseStats.resistances.water}, 雷 {build.defenseStats.resistances.thunder}, 冰 {build.defenseStats.resistances.ice}, 龍 {build.defenseStats.resistances.dragon}
          </Text>
        </SectionCard>

        <SectionCard title="備註">
          {build.notes.map((note) => (
            <Text key={note} style={styles.noteText}>• {note}</Text>
          ))}
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },
  hero: {
    gap: 8,
    marginTop: 8,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.subtext,
    fontSize: 15,
    lineHeight: 22,
  },
  weaponText: {
    color: colors.primaryMuted,
    fontSize: 17,
    fontWeight: '700',
  },
  rowBlock: {
    gap: 4,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  bodyText: {
    color: colors.subtext,
    fontSize: 14,
    lineHeight: 20,
  },
  levelText: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
  },
  noteText: {
    color: colors.subtext,
    fontSize: 14,
    lineHeight: 20,
  },
});
