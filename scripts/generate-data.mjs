import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { GENERATED_DIR, NORMALIZED_DIR, RAW_DIR, ensureDir, readJson, slugify, toTsArray, toTsConst, writeJson } from './data-utils.mjs';
import { optimizeArmorBuild } from './optimizer.mjs';

const slotMap = {
  head: 'head',
  chest: 'chest',
  arms: 'arms',
  waist: 'waist',
  legs: 'legs',
};

const skillCategoryByKind = {
  armor: 'defense',
  weapon: 'offense',
  set: 'utility',
  group: 'utility',
};

function skillId(skill) {
  return slugify(skill.name);
}

function buildLocalizedNameMap(enItems, zhItems) {
  const map = new Map();
  for (let i = 0; i < enItems.length; i++) {
    const en = enItems[i];
    const zh = zhItems.find((item) => item.id === en.id) ?? zhItems[i];
    if (zh?.name) map.set(en.id, zh.name);
  }
  return map;
}

const manifest = await readJson(path.join(RAW_DIR, 'manifest.json'));
const enArmor = await readJson(path.join(RAW_DIR, 'mhdb', 'en', 'armor.json'));
const zhArmor = await readJson(path.join(RAW_DIR, 'mhdb', 'zh-Hant', 'armor.json'));
const enSkills = await readJson(path.join(RAW_DIR, 'mhdb', 'en', 'skills.json'));
const zhSkills = await readJson(path.join(RAW_DIR, 'mhdb', 'zh-Hant', 'skills.json'));
const enDecorations = await readJson(path.join(RAW_DIR, 'mhdb', 'en', 'decorations.json'));
const zhDecorations = await readJson(path.join(RAW_DIR, 'mhdb', 'zh-Hant', 'decorations.json'));
const enArmorSets = await readJson(path.join(RAW_DIR, 'mhdb', 'en', 'armor__sets.json'));
const zhArmorSets = await readJson(path.join(RAW_DIR, 'mhdb', 'zh-Hant', 'armor__sets.json'));
const enWeapons = await readJson(path.join(RAW_DIR, 'mhdb', 'en', 'weapons.json'));
const zhWeapons = await readJson(path.join(RAW_DIR, 'mhdb', 'zh-Hant', 'weapons.json'));

const skillNameZh = buildLocalizedNameMap(enSkills, zhSkills);
const armorNameZh = buildLocalizedNameMap(enArmor, zhArmor);
const decoNameZh = buildLocalizedNameMap(enDecorations, zhDecorations);
const armorSetNameZh = buildLocalizedNameMap(enArmorSets, zhArmorSets);
const weaponNameZh = buildLocalizedNameMap(enWeapons, zhWeapons);

const skills = enSkills.map((skill) => ({
  id: skillId(skill),
  gameId: skill.gameId,
  name: skillNameZh.get(skill.id) ?? skill.name,
  nameEn: skill.name,
  category: skillCategoryByKind[skill.kind] ?? 'utility',
  kind: skill.kind,
  description: zhSkills.find((item) => item.id === skill.id)?.description ?? skill.description ?? '',
  levels: (zhSkills.find((item) => item.id === skill.id)?.ranks ?? skill.ranks ?? []).map((rank) => ({
    level: rank.level,
    description: rank.description ?? '',
  })),
}));

const normalizedArmor = enArmor
  .filter((piece) => slotMap[piece.kind])
  .map((piece) => ({
    id: `armor-${piece.id}`,
    sourceId: piece.id,
    gameId: piece.gameId,
    name: armorNameZh.get(piece.id) ?? piece.name,
    nameEn: piece.name,
    slot: slotMap[piece.kind],
    rank: piece.rank,
    rarity: piece.rarity,
    defense: piece.defense?.base ?? 0,
    maxDefense: piece.defense?.max ?? piece.defense?.base ?? 0,
    resistances: piece.resistances,
    slots: (piece.slots ?? []).filter((slot) => slot >= 1 && slot <= 3),
    armorSetId: piece.armorSet?.id ?? null,
    armorSetName: piece.armorSet ? armorSetNameZh.get(piece.armorSet.id) ?? piece.armorSet.name : null,
    skillBonuses: (piece.skills ?? []).map((rank) => ({
      skillId: skillId(rank.skill),
      level: rank.level,
    })),
    crafting: piece.crafting
      ? {
          zennyCost: piece.crafting.zennyCost,
          materials: (piece.crafting.materials ?? []).map((cost) => ({
            itemId: cost.item.id,
            gameId: cost.item.gameId,
            name: cost.item.name,
            quantity: cost.quantity,
          })),
        }
      : null,
  }));

const normalizedDecorations = enDecorations
  .filter((deco) => deco.slot >= 1 && deco.slot <= 3 && deco.skills?.length)
  .map((deco) => {
    const firstSkill = deco.skills[0];
    return {
      id: `deco-${deco.id}`,
      sourceId: deco.id,
      gameId: deco.gameId,
      name: decoNameZh.get(deco.id) ?? deco.name,
      nameEn: deco.name,
      kind: deco.kind,
      slotSize: deco.slot,
      rarity: deco.rarity,
      skillId: skillId(firstSkill.skill),
      skillLevel: firstSkill.level,
      skills: deco.skills.map((rank) => ({
        skillId: skillId(rank.skill),
        level: rank.level,
      })),
      description: zhDecorations.find((item) => item.id === deco.id)?.description ?? deco.description ?? '',
    };
  });

const normalizedWeapons = enWeapons.map((weapon) => ({
  id: `weapon-${weapon.kind}-${weapon.id}`,
  sourceId: weapon.id,
  gameId: weapon.gameId,
  name: weaponNameZh.get(weapon.id) ?? weapon.name,
  nameEn: weapon.name,
  kind: weapon.kind,
  rarity: weapon.rarity,
  damage: weapon.damage,
  affinity: weapon.affinity,
  slots: weapon.slots ?? [],
  skills: (weapon.skills ?? []).map((rank) => ({ skillId: skillId(rank.skill), level: rank.level })),
  crafting: weapon.crafting ?? null,
}));

const targetSets = [
  {
    id: 'generated-attack',
    playstyle: 'attack',
    title: '高輸出技能優先配裝',
    summary: '由 MHDB snapshot 以弱點特效、挑戰者、無傷、連擊作目標自動搜尋。',
    targets: [
      { skillId: 'weakness-exploit', targetLevel: 3 },
      { skillId: 'agitator', targetLevel: 3 },
      { skillId: 'peak-performance', targetLevel: 3 },
      { skillId: 'burst', targetLevel: 2 },
    ],
  },
  {
    id: 'generated-defense',
    playstyle: 'defense',
    title: '防守容錯優先配裝',
    summary: '由 MHDB snapshot 以防禦性能、防禦、精靈加護、體力回復量上升作目標自動搜尋。',
    targets: [
      { skillId: 'guard', targetLevel: 3 },
      { skillId: 'defense-boost', targetLevel: 3 },
      { skillId: 'divine-blessing', targetLevel: 3 },
      { skillId: 'recovery-up', targetLevel: 2 },
    ],
  },
  {
    id: 'generated-balanced',
    playstyle: 'balanced',
    title: '泛用攻守平衡配裝',
    summary: '由 MHDB snapshot 以弱點特效、看破、迴避性能、精靈加護作目標自動搜尋。',
    targets: [
      { skillId: 'weakness-exploit', targetLevel: 3 },
      { skillId: 'critical-eye', targetLevel: 3 },
      { skillId: 'evade-window', targetLevel: 3 },
      { skillId: 'divine-blessing', targetLevel: 2 },
    ],
  },
  {
    id: 'generated-support',
    playstyle: 'support',
    title: '多人支援優先配裝',
    summary: '由 MHDB snapshot 以廣域化、快吃、滿足感、精靈加護作目標自動搜尋。',
    targets: [
      { skillId: 'wide-range', targetLevel: 4 },
      { skillId: 'speed-eating', targetLevel: 3 },
      { skillId: 'free-meal', targetLevel: 2 },
      { skillId: 'divine-blessing', targetLevel: 2 },
    ],
  },
];

function toAppArmor(piece) {
  return {
    id: piece.id,
    name: piece.name,
    slot: piece.slot,
    rarity: piece.rarity,
    defense: piece.defense,
    slots: piece.slots,
    skillBonuses: piece.skillBonuses,
    rank: piece.rank,
    maxDefense: piece.maxDefense,
    resistances: piece.resistances,
    armorSetName: piece.armorSetName,
    crafting: piece.crafting,
  };
}

function toAppDecoration(deco) {
  return {
    id: deco.id,
    name: deco.name,
    slotSize: deco.slotSize,
    skillId: deco.skillId,
    skillLevel: deco.skillLevel,
    description: deco.description,
    kind: deco.kind,
    rarity: deco.rarity,
  };
}

function defenseStats(armor) {
  const resistances = armor.reduce(
    (sum, piece) => ({
      fire: sum.fire + (piece.resistances?.fire ?? 0),
      water: sum.water + (piece.resistances?.water ?? 0),
      thunder: sum.thunder + (piece.resistances?.thunder ?? 0),
      ice: sum.ice + (piece.resistances?.ice ?? 0),
      dragon: sum.dragon + (piece.resistances?.dragon ?? 0),
    }),
    { fire: 0, water: 0, thunder: 0, ice: 0, dragon: 0 },
  );
  return {
    physical: armor.reduce((sum, piece) => sum + piece.defense, 0),
    elemental: Object.values(resistances).reduce((sum, value) => sum + value, 0),
    resistances,
  };
}

const armorDecorations = normalizedDecorations.filter((deco) => deco.kind === 'armor');
const builds = targetSets.flatMap((targetSet) => {
  const [best] = optimizeArmorBuild({
    armor: normalizedArmor,
    decorations: armorDecorations,
    targets: targetSet.targets,
    limit: 1,
    rank: 'high',
  });
  if (!best) return [];

  return [{
    id: targetSet.id,
    playstyle: targetSet.playstyle,
    title: targetSet.title,
    summary: targetSet.summary,
    weapon: {
      label: '請按目標魔物弱點另選武器',
      weaponType: '通用',
      reason: '此 preset 先優化防具、技能與裝飾品；武器傷害模型留待下一階段加入。',
    },
    armor: best.armor.map(toAppArmor),
    decorations: best.decorations.map(toAppDecoration),
    setBonuses: [],
    highlightedSkillIds: targetSet.targets.map((target) => target.skillId),
    defenseStats: defenseStats(best.armor),
    notes: [
      `Data source: MHDB API snapshot ${manifest.fetchedAt}`,
      'Kiranico zh-Hant snapshot is stored for Chinese cross-check; generated app data currently uses MHDB zh-Hant names.',
      'Optimizer MVP includes high-rank armor, armor decorations, slots, target skills, defense score, and basic set-piece preference.',
    ],
  }];
});

await writeJson(path.join(NORMALIZED_DIR, 'armor.json'), normalizedArmor);
await writeJson(path.join(NORMALIZED_DIR, 'decorations.json'), normalizedDecorations);
await writeJson(path.join(NORMALIZED_DIR, 'skills.json'), skills);
await writeJson(path.join(NORMALIZED_DIR, 'weapons.json'), normalizedWeapons);
await writeJson(path.join(NORMALIZED_DIR, 'builds.json'), builds);

await ensureDir(GENERATED_DIR);
await writeFile(path.join(GENERATED_DIR, 'skills.ts'), toTsArray('skills', 'Skill', skills), 'utf8');
await writeFile(path.join(GENERATED_DIR, 'armor.ts'), toTsArray('armorDatabase', 'ArmorPiece', normalizedArmor.map(toAppArmor)), 'utf8');
await writeFile(path.join(GENERATED_DIR, 'decorations.ts'), toTsArray('decorations', 'Decoration', normalizedDecorations.map(toAppDecoration)), 'utf8');
await writeFile(path.join(GENERATED_DIR, 'builds.ts'), toTsArray('builds', 'Build', builds), 'utf8');
await writeFile(path.join(GENERATED_DIR, 'sourceMeta.ts'), toTsConst('dataSourceMeta', {
  generatedAt: new Date().toISOString(),
  mhdbFetchedAt: manifest.fetchedAt,
  mhdbEndpoints: manifest.mhdb,
  kiranicoSnapshots: manifest.kiranico,
}), 'utf8');
await writeFile(path.join(GENERATED_DIR, 'index.ts'), [
  "export * from './skills';",
  "export * from './decorations';",
  "export * from './builds';",
  "export * from './armor';",
  "export * from './sourceMeta';",
  '',
].join('\n'), 'utf8');

console.log(`generated ${normalizedArmor.length} armor pieces`);
console.log(`generated ${normalizedDecorations.length} decorations`);
console.log(`generated ${skills.length} skills`);
console.log(`generated ${builds.length} build presets`);
