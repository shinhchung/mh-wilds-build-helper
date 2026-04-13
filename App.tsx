import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ElementSelector } from './src/components/ElementSelector';
import { SectionCard } from './src/components/SectionCard';
import { WeaponSelector } from './src/components/WeaponSelector';
import { skills } from './src/data';
import { getWeaponRecommendation } from './src/data/weapons';
import { recommendBuilds } from './src/logic/recommendBuild';
import { colors } from './src/theme/colors';
import { ArmorPieceSlot, ElementType, Playstyle } from './src/types';

const skillNameMap = Object.fromEntries(skills.map((s) => [s.id, s.name]));

const slotLabels: Record<ArmorPieceSlot, string> = {
  head: '頭',
  chest: '身',
  arms: '手',
  waist: '腰',
  legs: '腳',
  talisman: '護石',
};

const playstyleConfig: Record<Playstyle, { label: string; icon: string; desc: string }> = {
  attack:  { label: '攻擊型', icon: '⚔', desc: '極限傷害' },
  defense: { label: '防守型', icon: '◈', desc: '穩定生存' },
  balanced:{ label: '全能型', icon: '◇', desc: '攻守兼備' },
  support: { label: '加奶型', icon: '◎', desc: '廣域支援' },
};

// ─── Palico component ────────────────────────────────────────────
function Palico({ face, speech }: { face: string; speech: string }) {
  return (
    <View style={palico.wrap}>
      <View style={palico.faceWrap}>
        <Text style={palico.faceText}>{face}</Text>
      </View>
      <Text style={palico.speechText}>「{speech}」</Text>
    </View>
  );
}

const palico = StyleSheet.create({
  wrap: { alignItems: 'center', gap: 4 },
  faceWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceText: { fontSize: 22 },
  speechText: { color: colors.subtext, fontSize: 10, textAlign: 'center' },
});

// ─── Divider ──────────────────────────────────────────────────────
function MhDivider() {
  return (
    <View style={divider.row}>
      <View style={divider.line} />
      <Text style={divider.diamond}>◆</Text>
      <View style={divider.line} />
    </View>
  );
}

const divider = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 4 },
  line: { flex: 1, height: 1, backgroundColor: colors.border },
  diamond: { color: colors.primary, fontSize: 10 },
});

// ─── Main App ─────────────────────────────────────────────────────
export default function App() {
  const [selectedWeapon, setSelectedWeapon] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<ElementType | null>(null);
  const [playstyle, setPlaystyle] = useState<Playstyle | null>(null);
  const [buildIdx, setBuildIdx] = useState<number>(0);

  const armorBuilds = useMemo(
    () => (playstyle ? recommendBuilds(playstyle) : []),
    [playstyle],
  );
  const armorBuild = armorBuilds[buildIdx] ?? null;

  const weaponRec = useMemo(
    () =>
      selectedWeapon && selectedElement
        ? getWeaponRecommendation(selectedWeapon, selectedElement)
        : null,
    [selectedWeapon, selectedElement],
  );

  const showResults = armorBuild && weaponRec;

  // Compute total skill levels from armor + decorations
  const skillTotals = useMemo(() => {
    if (!armorBuild) return [];
    const map: Record<string, number> = {};
    armorBuild.build.armor.forEach((piece) =>
      piece.skillBonuses.forEach((b) => {
        map[b.skillId] = (map[b.skillId] ?? 0) + b.level;
      }),
    );
    armorBuild.build.decorations.forEach((d) => {
      map[d.skillId] = (map[d.skillId] ?? 0) + d.skillLevel;
    });
    return Object.entries(map)
      .map(([id, level]) => ({ id, name: skillNameMap[id] ?? id, level }))
      .sort((a, b) => b.level - a.level);
  }, [armorBuild]);

  // Group duplicate decorations for display
  const decoGrouped = useMemo(() => {
    if (!armorBuild) return [];
    const map: Record<string, { name: string; slotSize: number; count: number; skillId: string }> = {};
    armorBuild.build.decorations.forEach((d) => {
      if (!map[d.name]) map[d.name] = { name: d.name, slotSize: d.slotSize, count: 0, skillId: d.skillId };
      map[d.name].count++;
    });
    return Object.values(map).sort((a, b) => b.slotSize - a.slotSize);
  }, [armorBuild]);

  const handleWeaponSelect = (id: string) => {
    setSelectedWeapon(id);
    setSelectedElement(null);
    setPlaystyle(null);
    setBuildIdx(0);
  };

  const handleElementSelect = (el: ElementType) => {
    setSelectedElement(el);
    setPlaystyle(null);
    setBuildIdx(0);
  };

  const handlePlaystyleSelect = (p: Playstyle) => {
    setPlaystyle(p);
    setBuildIdx(0);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* ── Hero ──────────────────────────────────── */}
        <View style={styles.hero}>
          <Text style={styles.heroEyebrow}>◆ MONSTER HUNTER WILDS ◆</Text>
          <Text style={styles.heroTitle}>陪裝助手</Text>
          <Text style={styles.heroSub}>揀武器、選屬性、即時出配裝</Text>
          <View style={styles.palicos}>
            <Palico face="ฅ^•ﻌ•^ฅ" speech="係我最強！" />
            <Palico face="(=^･ω･^=)" speech="打邊隻好？" />
            <Palico face="(ﾉ•ω•)ﾉ" speech="出發囉！" />
          </View>
        </View>

        {/* ── Step 1: Weapon ────────────────────────── */}
        <SectionCard title="選擇武器種類" step={1}>
          <WeaponSelector selected={selectedWeapon} onSelect={handleWeaponSelect} />
        </SectionCard>

        {/* ── Step 2: Element ───────────────────────── */}
        <SectionCard
          title="選擇武器屬性"
          step={2}
          subtitle={!selectedWeapon ? '請先選擇武器種類' : undefined}
        >
          {!selectedWeapon ? (
            <View style={styles.lockedRow}>
              <Text style={styles.lockedText}>ฅ^•ﻌ•^ฅ  先揀武器先！</Text>
            </View>
          ) : (
            <ElementSelector selected={selectedElement} onSelect={handleElementSelect} />
          )}
        </SectionCard>

        {/* ── Step 3: Playstyle ─────────────────────── */}
        <SectionCard
          title="選擇狩獵風格"
          step={3}
          subtitle={!selectedElement ? '請先選擇武器屬性' : undefined}
        >
          {!selectedElement ? (
            <View style={styles.lockedRow}>
              <Text style={styles.lockedText}>(=^･ω･^=)  再揀屬性呀！</Text>
            </View>
          ) : (
            <View style={styles.playstyleRow}>
              {(['attack', 'defense', 'balanced', 'support'] as Playstyle[]).map((p) => {
                const cfg = playstyleConfig[p];
                const active = playstyle === p;
                return (
                  <Pressable
                    key={p}
                    onPress={() => handlePlaystyleSelect(p)}
                    style={[styles.playstyleBtn, active && styles.playstyleBtnActive]}
                  >
                    <Text style={[styles.playstyleIcon, active && styles.playstyleIconActive]}>
                      {cfg.icon}
                    </Text>
                    <Text style={[styles.playstyleLabel, active && styles.playstyleLabelActive]}>
                      {cfg.label}
                    </Text>
                    <Text style={styles.playstyleDesc}>{cfg.desc}</Text>
                  </Pressable>
                );
              })}
            </View>
          )}
        </SectionCard>

        {/* ── Results ───────────────────────────────── */}
        {showResults && (
          <>
            <MhDivider />

            {/* Build variant selector */}
            {armorBuilds.length > 1 && (
              <SectionCard title="配裝方案">
                <View style={styles.buildVariantRow}>
                  {armorBuilds.map((b, i) => (
                    <Pressable
                      key={b.build.id}
                      onPress={() => setBuildIdx(i)}
                      style={[styles.buildVariantChip, buildIdx === i && styles.buildVariantChipActive]}
                    >
                      <Text style={[styles.buildVariantText, buildIdx === i && styles.buildVariantTextActive]}>
                        {b.build.title}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                <Text style={[styles.bodyText, { marginTop: 8 }]}>{armorBuild.build.summary}</Text>
              </SectionCard>
            )}

            {/* Weapon result */}
            <SectionCard title={`${weaponRec.weaponType} 推薦`}>
              <Text style={styles.weaponName}>{weaponRec.name}</Text>
              <Text style={styles.bodyText}>{weaponRec.tip}</Text>
            </SectionCard>

            {/* Armor */}
            <SectionCard title="推薦防具配置">
              {armorBuild.build.armor.map((piece) => (
                <View key={piece.id} style={styles.armorRow}>
                  <View style={styles.slotBadge}>
                    <Text style={styles.slotText}>{slotLabels[piece.slot]}</Text>
                  </View>
                  <View style={styles.armorInfo}>
                    <Text style={styles.armorName}>{piece.name}</Text>
                    <Text style={styles.bodyText}>
                      防禦 {piece.defense} · 孔位{' '}
                      {piece.slots.length ? piece.slots.join('/') : '無'}
                    </Text>
                    <Text style={styles.bodyText}>
                      {piece.skillBonuses
                        .map((b) => `${skillNameMap[b.skillId] ?? b.skillId} Lv.${b.level}`)
                        .join('  ')}
                    </Text>
                  </View>
                </View>
              ))}
            </SectionCard>

            {/* Set bonuses */}
            <SectionCard title="套裝技能">
              {armorBuild.build.setBonuses.map((sb, i) => (
                <View key={i} style={styles.setBonusRow}>
                  <View style={styles.setBonusHeader}>
                    <View style={styles.setNameBadge}>
                      <Text style={styles.setNameText}>{sb.setName}</Text>
                    </View>
                    <Text style={styles.setPiecesText}>{sb.piecesRequired}件效果</Text>
                    <Text style={styles.setBonusName}>{sb.bonusName}</Text>
                  </View>
                  <Text style={styles.bodyText}>{sb.description}</Text>
                </View>
              ))}
            </SectionCard>

            {/* Decorations grouped */}
            <SectionCard title="建議裝飾珠" subtitle="填滿所有可用孔位的最優珠子配置">
              <View style={styles.decoGrid}>
                {decoGrouped.map((g) => (
                  <View key={g.name} style={styles.decoChip}>
                    <Text style={styles.decoSlot}>【{g.slotSize}】</Text>
                    <Text style={styles.decoName}>{g.name}</Text>
                    {g.count > 1 && (
                      <View style={styles.decoCount}>
                        <Text style={styles.decoCountText}>×{g.count}</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </SectionCard>

            {/* Skill totals */}
            <SectionCard title="技能總覽" subtitle="裝備＋裝飾珠後的最終技能等級">
              <View style={styles.skillTotalsGrid}>
                {skillTotals.map((s) => (
                  <View
                    key={s.id}
                    style={[
                      styles.skillTotalChip,
                      s.level >= 5 && styles.skillTotalChipMax,
                      s.level >= 3 && s.level < 5 && styles.skillTotalChipMid,
                    ]}
                  >
                    <Text
                      style={[
                        styles.skillTotalName,
                        s.level >= 5 && styles.skillTotalNameMax,
                      ]}
                    >
                      {s.name}
                    </Text>
                    <Text
                      style={[
                        styles.skillTotalLevel,
                        s.level >= 5 && styles.skillTotalLevelMax,
                      ]}
                    >
                      Lv.{s.level}
                    </Text>
                  </View>
                ))}
              </View>
            </SectionCard>

            {/* Skills */}
            <SectionCard title="核心技能詳解">
              {armorBuild.highlightedSkills.map((skill) => (
                <View key={skill.id} style={styles.skillBlock}>
                  <View style={styles.skillHeader}>
                    <Text style={styles.skillName}>{skill.name}</Text>
                    <Text style={styles.skillCat}>
                      {skill.category === 'offense'
                        ? '攻擊'
                        : skill.category === 'defense'
                          ? '防禦'
                          : '輔助'}
                    </Text>
                  </View>
                  <Text style={styles.bodyText}>{skill.description}</Text>
                  {skill.levels.map((lv) => (
                    <Text key={lv.level} style={styles.levelLine}>
                      ▸ Lv.{lv.level}  {lv.description}
                    </Text>
                  ))}
                </View>
              ))}
            </SectionCard>

            {/* Defense */}
            <SectionCard title="整體防禦資料">
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{armorBuild.build.defenseStats.physical}</Text>
                  <Text style={styles.statLabel}>物理防禦</Text>
                </View>
                {Object.entries(armorBuild.build.defenseStats.resistances).map(([key, val]) => (
                  <View key={key} style={styles.statItem}>
                    <Text style={[styles.statValue, val < 0 && { color: colors.danger }]}>
                      {val > 0 ? `+${val}` : val}
                    </Text>
                    <Text style={styles.statLabel}>
                      {key === 'fire' ? '火' : key === 'water' ? '水' : key === 'thunder' ? '雷' : key === 'ice' ? '冰' : '龍'}
                    </Text>
                  </View>
                ))}
              </View>
            </SectionCard>

            {/* Notes */}
            <SectionCard title="備註">
              {armorBuild.build.notes.map((note) => (
                <Text key={note} style={styles.note}>
                  ◆ {note}
                </Text>
              ))}
            </SectionCard>

            {/* Celebration palico */}
            <View style={styles.celebRow}>
              <Palico face="(✧ᵕ✧)" speech="配裝完成！" />
              <View style={styles.celebText}>
                <Text style={styles.celebTitle}>配裝完成！出去打怪喇～</Text>
                <Text style={styles.bodyText}>Good luck, hunter!</Text>
              </View>
              <Palico face="ฅ^•ﻌ•^ฅ" speech="加油！" />
            </View>
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    padding: 16,
    gap: 12,
    paddingBottom: 48,
  },

  // Hero
  hero: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 4,
  },
  heroEyebrow: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: -1,
  },
  heroSub: {
    color: colors.subtext,
    fontSize: 14,
    marginBottom: 8,
  },
  palicos: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 8,
  },

  // Locked state
  lockedRow: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  lockedText: {
    color: colors.subtext,
    fontSize: 14,
  },

  // Playstyle selector
  playstyleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  playstyleBtn: {
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    gap: 4,
    minWidth: '46%',
    flex: 1,
  },
  playstyleBtnActive: {
    borderColor: colors.primary,
    backgroundColor: colors.elevatedCard,
  },
  playstyleIcon: {
    color: colors.subtext,
    fontSize: 20,
  },
  playstyleIconActive: {
    color: colors.primary,
  },
  playstyleLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  playstyleLabelActive: {
    color: colors.primaryMuted,
  },
  playstyleDesc: {
    color: colors.subtext,
    fontSize: 10,
  },

  // Build variant selector
  buildVariantRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  buildVariantChip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    flex: 1,
    minWidth: '44%',
    alignItems: 'center',
  },
  buildVariantChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryDim,
  },
  buildVariantText: {
    color: colors.subtext,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  buildVariantTextActive: {
    color: colors.primaryMuted,
  },

  // Weapon result
  weaponName: {
    color: colors.primaryMuted,
    fontSize: 17,
    fontWeight: '800',
  },

  // Armor rows
  armorRow: {
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  slotBadge: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: colors.primaryDim,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  slotText: {
    color: colors.primaryMuted,
    fontSize: 11,
    fontWeight: '800',
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

  // Set bonuses
  setBonusRow: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 6,
  },
  setBonusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  setNameBadge: {
    backgroundColor: colors.primaryDim,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  setNameText: {
    color: colors.primaryMuted,
    fontSize: 11,
    fontWeight: '800',
  },
  setPiecesText: {
    color: colors.subtext,
    fontSize: 11,
    fontWeight: '700',
  },
  setBonusName: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },

  // Decoration chips
  decoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  decoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.elevatedCard,
    borderWidth: 1,
    borderColor: colors.borderBright,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  decoSlot: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  decoName: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  decoCount: {
    marginLeft: 2,
    backgroundColor: colors.primaryDim,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  decoCountText: {
    color: colors.primaryMuted,
    fontSize: 11,
    fontWeight: '800',
  },

  // Skill totals grid
  skillTotalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTotalChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  skillTotalChipMid: {
    borderColor: colors.borderBright,
    backgroundColor: colors.elevatedCard,
  },
  skillTotalChipMax: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryDim,
  },
  skillTotalName: {
    color: colors.subtext,
    fontSize: 13,
    fontWeight: '700',
  },
  skillTotalNameMax: {
    color: colors.primaryMuted,
  },
  skillTotalLevel: {
    color: colors.subtext,
    fontSize: 12,
    fontWeight: '800',
  },
  skillTotalLevelMax: {
    color: colors.primary,
  },

  // Skills
  skillBlock: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 4,
  },
  skillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skillName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  skillCat: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '700',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    overflow: 'hidden',
  },
  levelLine: {
    color: colors.subtext,
    fontSize: 12,
    lineHeight: 18,
  },

  // Stats grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: colors.elevatedCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    minWidth: 56,
  },
  statValue: {
    color: colors.primaryMuted,
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    color: colors.subtext,
    fontSize: 10,
    marginTop: 2,
  },

  // Notes
  note: {
    color: colors.subtext,
    fontSize: 13,
    lineHeight: 20,
  },

  // Celebration
  celebRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingVertical: 16,
  },
  celebText: {
    alignItems: 'center',
    gap: 4,
  },
  celebTitle: {
    color: colors.primaryMuted,
    fontSize: 16,
    fontWeight: '800',
  },

  // Shared
  bodyText: {
    color: colors.subtext,
    fontSize: 13,
    lineHeight: 18,
  },
});
