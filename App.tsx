import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SearchResults } from './src/components/SearchResults';
import { SectionCard } from './src/components/SectionCard';
import { SkillPicker } from './src/components/SkillPicker';
import { WeaponSelector } from './src/components/WeaponSelector';
import { skills } from './src/data';
import { getWeaponRecommendation } from './src/data/weapons';
import { searchArmorBySkills } from './src/logic/armorSearch';
import { recommendBuild } from './src/logic/recommendBuild';
import { colors } from './src/theme/colors';
import { AppMode, ArmorPieceSlot, ArmorSearchResult, Playstyle, SkillTarget } from './src/types';

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
  attack: { label: '攻擊型', icon: '⚔', desc: '極限傷害' },
  defense: { label: '防守型', icon: '◈', desc: '穩定生存' },
  balanced: { label: '全能型', icon: '◇', desc: '攻守兼備' },
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
  const [mode, setMode] = useState<AppMode>('preset');

  // Preset mode state
  const [selectedWeapon, setSelectedWeapon] = useState<string | null>(null);
  const [playstyle, setPlaystyle] = useState<Playstyle | null>(null);

  // Skill search state
  const [skillTargets, setSkillTargets] = useState<SkillTarget[]>([]);
  const [searchResult, setSearchResult] = useState<ArmorSearchResult | null>(null);

  const armorBuild = useMemo(
    () => (playstyle ? recommendBuild(playstyle) : null),
    [playstyle],
  );

  const weaponRec = useMemo(
    () => (selectedWeapon && playstyle ? getWeaponRecommendation(selectedWeapon, playstyle) : null),
    [selectedWeapon, playstyle],
  );

  const showResults = armorBuild && weaponRec;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* ── Hero ──────────────────────────────────── */}
        <View style={styles.hero}>
          <Text style={styles.heroEyebrow}>◆ MONSTER HUNTER WILDS ◆</Text>
          <Text style={styles.heroTitle}>陪裝助手</Text>
          <Text style={styles.heroSub}>揀武器、選風格、即時出配裝</Text>
          <View style={styles.palicos}>
            <Palico face="ฅ^•ﻌ•^ฅ" speech="係我最強！" />
            <Palico face="(=^･ω･^=)" speech="打邊隻好？" />
            <Palico face="(ﾉ•ω•)ﾉ" speech="出發囉！" />
          </View>
        </View>

        {/* ── Mode Toggle ───────────────────────────── */}
        <View style={styles.modeRow}>
          <Pressable
            onPress={() => setMode('preset')}
            style={[styles.modeBtn, mode === 'preset' && styles.modeBtnActive]}
          >
            <Text style={[styles.modeBtnText, mode === 'preset' && styles.modeBtnTextActive]}>
              ⚔ 武器配裝
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setMode('skill-search')}
            style={[styles.modeBtn, mode === 'skill-search' && styles.modeBtnActive]}
          >
            <Text
              style={[styles.modeBtnText, mode === 'skill-search' && styles.modeBtnTextActive]}
            >
              ◈ 技能搜裝
            </Text>
          </Pressable>
        </View>

        {/* ══════════════════════════════════════════ */}
        {/* MODE: 武器配裝                             */}
        {/* ══════════════════════════════════════════ */}
        {mode === 'preset' && (
          <>
            {/* Step 1 - Weapon */}
            <SectionCard title="選擇武器種類" step={1}>
              <WeaponSelector selected={selectedWeapon} onSelect={setSelectedWeapon} />
            </SectionCard>

            {/* Step 2 - Playstyle (unlock after weapon) */}
            <SectionCard
              title="選擇狩獵風格"
              step={2}
              subtitle={!selectedWeapon ? '請先選擇武器' : undefined}
            >
              {!selectedWeapon ? (
                <View style={styles.lockedRow}>
                  <Text style={styles.lockedText}>ฅ^•ﻌ•^ฅ  先揀武器先！</Text>
                </View>
              ) : (
                <View style={styles.playstyleRow}>
                  {(['attack', 'defense', 'balanced'] as Playstyle[]).map((p) => {
                    const cfg = playstyleConfig[p];
                    const active = playstyle === p;
                    return (
                      <Pressable
                        key={p}
                        onPress={() => setPlaystyle(p)}
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

            {/* Results */}
            {showResults && (
              <>
                <MhDivider />

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
                            .map(
                              (b) =>
                                `${skillNameMap[b.skillId] ?? b.skillId} Lv.${b.level}`,
                            )
                            .join('  ')}
                        </Text>
                      </View>
                    </View>
                  ))}
                </SectionCard>

                {/* Decorations */}
                <SectionCard title="建議裝飾珠">
                  <View style={styles.decoGrid}>
                    {armorBuild.build.decorations.map((jewel) => (
                      <View key={jewel.id} style={styles.decoChip}>
                        <Text style={styles.decoSlot}>【{jewel.slotSize}】</Text>
                        <Text style={styles.decoName}>{jewel.name}</Text>
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
                    {Object.entries(armorBuild.build.defenseStats.resistances).map(
                      ([key, val]) => (
                        <View key={key} style={styles.statItem}>
                          <Text style={[styles.statValue, val < 0 && { color: colors.danger }]}>
                            {val > 0 ? `+${val}` : val}
                          </Text>
                          <Text style={styles.statLabel}>
                            {key === 'fire'
                              ? '火'
                              : key === 'water'
                                ? '水'
                                : key === 'thunder'
                                  ? '雷'
                                  : key === 'ice'
                                    ? '冰'
                                    : '龍'}
                          </Text>
                        </View>
                      ),
                    )}
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
          </>
        )}

        {/* ══════════════════════════════════════════ */}
        {/* MODE: 技能搜裝                             */}
        {/* ══════════════════════════════════════════ */}
        {mode === 'skill-search' && (
          <>
            <SectionCard
              title="選擇想要嘅技能"
              subtitle="㩒技能選擇，再設定目標等級。"
            >
              <SkillPicker selectedTargets={skillTargets} onTargetsChange={setSkillTargets} />
            </SectionCard>

            {skillTargets.length > 0 && (
              <Pressable
                style={styles.searchBtn}
                onPress={() => setSearchResult(searchArmorBySkills(skillTargets))}
              >
                <Text style={styles.searchBtnText}>◆ 搜尋最佳配裝 ◆</Text>
              </Pressable>
            )}

            {searchResult && searchResult.armor.length > 0 && (
              <SectionCard title="搜尋結果">
                <SearchResults result={searchResult} />
              </SectionCard>
            )}
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

  // Mode toggle
  modeRow: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 4,
  },
  modeBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  modeBtnActive: {
    backgroundColor: colors.primaryDim,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  modeBtnText: {
    color: colors.subtext,
    fontSize: 13,
    fontWeight: '700',
  },
  modeBtnTextActive: {
    color: colors.primaryMuted,
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
    gap: 8,
  },
  playstyleBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    gap: 4,
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

  // Skill search button
  searchBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  searchBtnText: {
    color: colors.background,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1,
  },

  // Shared
  bodyText: {
    color: colors.subtext,
    fontSize: 13,
    lineHeight: 18,
  },
});
