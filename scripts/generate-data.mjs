import { readFile, writeFile } from 'node:fs/promises';
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

function extractKiranicoRows(html, imageNeedle) {
  const rows = [];
  const rowRegex = /<tr[\s\S]*?<\/tr>/g;
  for (const rowMatch of html.matchAll(rowRegex)) {
    const row = rowMatch[0];
    const img = row.match(/<img[^>]+src="([^"]+)"/)?.[1];
    const href = row.match(/<a[^>]+href="([^"]+)"/)?.[1];
    const name = row.match(/<span>([^<]+)<\/span>/)?.[1];
    if (img?.includes(imageNeedle) && href && name) {
      rows.push({ name, href: `https://mhwilds.kiranico.com${href}`, imageUrl: img });
    }
  }
  return rows;
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
const enCharms = await readJson(path.join(RAW_DIR, 'mhdb', 'en', 'charms.json'));
const zhCharms = await readJson(path.join(RAW_DIR, 'mhdb', 'zh-Hant', 'charms.json'));
const enMonsters = await readJson(path.join(RAW_DIR, 'mhdb', 'en', 'monsters.json'));
const zhMonsters = await readJson(path.join(RAW_DIR, 'mhdb', 'zh-Hant', 'monsters.json'));
const kiranicoWeaponsHtml = await readFile(path.join(RAW_DIR, 'kiranico', 'zh-Hant', 'weapons.html'), 'utf8').catch(() => '');
const kiranicoMonstersHtml = await readFile(path.join(RAW_DIR, 'kiranico', 'zh-Hant', 'monsters.html'), 'utf8').catch(() => '');

const skillNameZh = buildLocalizedNameMap(enSkills, zhSkills);
const armorNameZh = buildLocalizedNameMap(enArmor, zhArmor);
const decoNameZh = buildLocalizedNameMap(enDecorations, zhDecorations);
const armorSetNameZh = buildLocalizedNameMap(enArmorSets, zhArmorSets);
const weaponNameZh = buildLocalizedNameMap(enWeapons, zhWeapons);
const zhWeaponById = new Map(zhWeapons.map((weapon) => [weapon.id, weapon]));
const charmNameZh = new Map();
for (const charm of zhCharms) {
  for (const rank of charm.ranks ?? []) charmNameZh.set(`${charm.id}-${rank.level}`, rank.name);
}
const monsterNameZh = buildLocalizedNameMap(enMonsters, zhMonsters);
const kiranicoWeaponByName = new Map(extractKiranicoRows(kiranicoWeaponsHtml, 'tex_thumbnail').map((row) => [row.name, row]));
const kiranicoMonsterByName = new Map(extractKiranicoRows(kiranicoMonstersHtml, 'em_icon').map((row) => [row.name, row]));
const kiranicoWeaponTypeIcons = [...kiranicoWeaponsHtml.matchAll(/src="([^"]*weapon_type_\d+\.png)"/g)].map((match) => match[1]);
const invalidWildsWeaponNamePatterns = ['熊神'];

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
    setPiecesRequired: rank.setPiecesRequired ?? null,
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

const normalizedWeapons = enWeapons.flatMap((weapon) => {
  const name = weaponNameZh.get(weapon.id) ?? weapon.name;
  if (invalidWildsWeaponNamePatterns.some((pattern) => name.includes(pattern))) {
    return [];
  }
  const zhWeapon = zhWeaponById.get(weapon.id);
  const crafting = zhWeapon?.crafting ?? weapon.crafting ?? null;
  const kiranico = kiranicoWeaponByName.get(name);
  return [{
    id: `weapon-${weapon.kind}-${weapon.id}`,
    sourceId: weapon.id,
    gameId: weapon.gameId,
    name,
    nameEn: weapon.name,
    kind: weapon.kind,
    rarity: weapon.rarity,
    damage: weapon.damage,
    affinity: weapon.affinity,
    defenseBonus: weapon.defenseBonus ?? 0,
    slots: weapon.slots ?? [],
    specials: (weapon.specials ?? []).map((special) => ({
      kind: special.kind,
      element: special.element ?? null,
      status: special.status ?? null,
      damage: special.damage ?? null,
      hidden: special.hidden ?? false,
    })),
    skills: (weapon.skills ?? []).map((rank) => ({ skillId: skillId(rank.skill), level: rank.level })),
    crafting: crafting
      ? {
          craftable: crafting.craftable ?? false,
          craftingZennyCost: crafting.craftingZennyCost ?? 0,
          upgradeZennyCost: crafting.upgradeZennyCost ?? 0,
          previous: crafting.previous
            ? {
                id: crafting.previous.id,
                name: crafting.previous.name,
              }
            : null,
          branches: (crafting.branches ?? []).map((branch) => ({
            id: branch.id,
            name: branch.name,
          })),
          craftingMaterials: (crafting.craftingMaterials ?? []).map((cost) => ({
            itemId: cost.item.id,
            gameId: cost.item.gameId,
            name: cost.item.name,
            quantity: cost.quantity,
          })),
          upgradeMaterials: (crafting.upgradeMaterials ?? []).map((cost) => ({
            itemId: cost.item.id,
            gameId: cost.item.gameId,
            name: cost.item.name,
            quantity: cost.quantity,
          })),
        }
      : null,
    kiranicoUrl: kiranico?.href ?? null,
    imageUrl: kiranico?.imageUrl ?? null,
  }];
});

const normalizedCharms = enCharms.flatMap((charm) =>
  (charm.ranks ?? []).map((rank) => ({
    id: `charm-${charm.id}-${rank.level}`,
    sourceId: charm.id,
    rankId: rank.id,
    gameId: rank.gameId,
    name: charmNameZh.get(`${charm.id}-${rank.level}`) ?? rank.name,
    nameEn: rank.name,
    level: rank.level,
    rarity: rank.rarity,
    skills: (rank.skills ?? []).map((entry) => ({
      skillId: skillId(entry.skill),
      level: entry.level,
    })),
    crafting: rank.crafting
      ? {
          zennyCost: rank.crafting.zennyCost,
          craftable: rank.crafting.craftable,
          materials: (rank.crafting.materials ?? []).map((cost) => ({
            itemId: cost.item.id,
            gameId: cost.item.gameId,
            name: cost.item.name,
            quantity: cost.quantity,
          })),
        }
      : null,
  })),
);

const normalizedMonsters = enMonsters.map((monster) => {
  const name = monsterNameZh.get(monster.id) ?? monster.name;
  const zh = zhMonsters.find((item) => item.id === monster.id);
  const kiranico = kiranicoMonsterByName.get(name);
  return {
    id: `monster-${monster.id}`,
    sourceId: monster.id,
    gameId: monster.gameId,
    name,
    nameEn: monster.name,
    kind: monster.kind,
    species: monster.species,
    description: zh?.description ?? monster.description ?? '',
    locations: (zh?.locations ?? monster.locations ?? []).map((location) => location.name),
    weaknesses: (monster.weaknesses ?? []).map((weakness) => ({
      kind: weakness.kind,
      element: weakness.element ?? null,
      status: weakness.status ?? null,
      effect: weakness.effect ?? null,
      level: weakness.level ?? 0,
      condition: weakness.condition ?? null,
    })),
    kiranicoUrl: kiranico?.href ?? null,
    imageUrl: kiranico?.imageUrl ?? null,
  };
});

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
const BUILD_VARIANTS_PER_PLAYSTYLE = 5;

function variantLabel(index) {
  return ['標準', '高防', '多孔', '混裝', '備選'][index] ?? `方案${index + 1}`;
}

function describeVariant(best) {
  const slots = best.armor.flatMap((piece) => piece.slots);
  const slotText = slots.length ? `${slots.length} 孔 / 孔位總值 ${slots.reduce((sum, slot) => sum + slot, 0)}` : '無孔位';
  const achieved = best.achievedSkills.map((skill) => `${skill.skillId} ${skill.achievedLevel}/${skill.targetLevel}`).join(', ');
  return `分數 ${best.score.toFixed(1)}，防禦 ${best.totalDefense}，${slotText}。目標技能：${achieved}`;
}

const builds = targetSets.flatMap((targetSet) => {
  const variants = optimizeArmorBuild({
    armor: normalizedArmor,
    decorations: armorDecorations,
    targets: targetSet.targets,
    limit: BUILD_VARIANTS_PER_PLAYSTYLE,
    rank: 'high',
  });

  return variants.map((best, index) => {
    const highlightedSkillIds = [
      ...new Set([
        ...targetSet.targets.map((target) => target.skillId),
        ...best.armor.flatMap((piece) => piece.skillBonuses.map((bonus) => bonus.skillId)),
        ...best.decorations.map((deco) => deco.skillId),
      ]),
    ];

    return {
    id: `${targetSet.id}-${index + 1}`,
    playstyle: targetSet.playstyle,
    title: `${variantLabel(index)}｜${targetSet.title}`,
    summary: `${targetSet.summary} ${describeVariant(best)}`,
    weapon: {
      label: '請按目標魔物弱點另選武器',
      weaponType: '通用',
      reason: '此 preset 先優化防具、技能與裝飾品；武器傷害模型留待下一階段加入。',
    },
    armor: best.armor.map(toAppArmor),
    decorations: best.decorations.map(toAppDecoration),
    setBonuses: [],
    highlightedSkillIds,
    defenseStats: defenseStats(best.armor),
    notes: [
      `方案排名 #${index + 1} / ${BUILD_VARIANTS_PER_PLAYSTYLE}`,
      `Data source: MHDB API snapshot ${manifest.fetchedAt}`,
      'Kiranico zh-Hant snapshot is stored for Chinese cross-check; generated app data currently uses MHDB zh-Hant names.',
      'Optimizer MVP includes high-rank armor, armor decorations, slots, target skills, defense score, and basic set-piece preference.',
    ],
    };
  });
});

await writeJson(path.join(NORMALIZED_DIR, 'armor.json'), normalizedArmor);
await writeJson(path.join(NORMALIZED_DIR, 'decorations.json'), normalizedDecorations);
await writeJson(path.join(NORMALIZED_DIR, 'skills.json'), skills);
await writeJson(path.join(NORMALIZED_DIR, 'weapons.json'), normalizedWeapons);
await writeJson(path.join(NORMALIZED_DIR, 'charms.json'), normalizedCharms);
await writeJson(path.join(NORMALIZED_DIR, 'monsters.json'), normalizedMonsters);
await writeJson(path.join(NORMALIZED_DIR, 'builds.json'), builds);

await ensureDir(GENERATED_DIR);
await writeFile(path.join(GENERATED_DIR, 'skills.ts'), toTsArray('skills', 'Skill', skills), 'utf8');
await writeFile(path.join(GENERATED_DIR, 'armor.ts'), toTsArray('armorDatabase', 'ArmorPiece', normalizedArmor.map(toAppArmor)), 'utf8');
await writeFile(path.join(GENERATED_DIR, 'decorations.ts'), toTsArray('decorations', 'Decoration', normalizedDecorations.map(toAppDecoration)), 'utf8');
await writeFile(path.join(GENERATED_DIR, 'builds.ts'), toTsArray('builds', 'Build', builds), 'utf8');
await writeFile(path.join(GENERATED_DIR, 'charms.ts'), toTsArray('charms', 'Charm', normalizedCharms), 'utf8');
await writeFile(path.join(GENERATED_DIR, 'weapons.ts'), toTsArray('weapons', 'Weapon', normalizedWeapons), 'utf8');
await writeFile(path.join(GENERATED_DIR, 'monsters.ts'), toTsArray('monsters', 'Monster', normalizedMonsters), 'utf8');
await writeFile(path.join(GENERATED_DIR, 'sourceMeta.ts'), toTsConst('dataSourceMeta', {
  generatedAt: new Date().toISOString(),
  mhdbFetchedAt: manifest.fetchedAt,
  mhdbEndpoints: manifest.mhdb,
  kiranicoSnapshots: manifest.kiranico,
  kiranicoWeaponTypeIcons,
}), 'utf8');
await writeFile(path.join(GENERATED_DIR, 'index.ts'), [
  "export * from './skills';",
  "export * from './decorations';",
  "export * from './builds';",
  "export * from './armor';",
  "export * from './charms';",
  "export * from './weapons';",
  "export * from './monsters';",
  "export * from './sourceMeta';",
  '',
].join('\n'), 'utf8');

console.log(`generated ${normalizedArmor.length} armor pieces`);
console.log(`generated ${normalizedDecorations.length} decorations`);
console.log(`generated ${skills.length} skills`);
console.log(`generated ${normalizedCharms.length} charms`);
console.log(`generated ${normalizedWeapons.length} weapons`);
console.log(`generated ${normalizedMonsters.length} monsters`);
console.log(`generated ${builds.length} build presets`);
