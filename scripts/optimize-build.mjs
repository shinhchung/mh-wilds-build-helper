import path from 'node:path';
import { NORMALIZED_DIR, parseOwnedCounts, parseSkillTargets, readJson } from './data-utils.mjs';
import { optimizeArmorBuild } from './optimizer.mjs';

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...rest] = arg.replace(/^--/, '').split('=');
    return [key, rest.join('=') || 'true'];
  }),
);

const targets = parseSkillTargets(args.skills ?? process.env.npm_config_skills);
if (!targets.length) {
  console.error('Usage: node scripts/optimize-build.mjs --skills=weakness-exploit:3,agitator:3 --weapon-kind=great-sword --monster=煌雷龍 --limit=5');
  process.exit(1);
}

const armor = await readJson(path.join(NORMALIZED_DIR, 'armor.json'));
const decorations = await readJson(path.join(NORMALIZED_DIR, 'decorations.json'));
const charms = await readJson(path.join(NORMALIZED_DIR, 'charms.json'));
const weapons = await readJson(path.join(NORMALIZED_DIR, 'weapons.json'));
const monsters = await readJson(path.join(NORMALIZED_DIR, 'monsters.json'));
const skills = await readJson(path.join(NORMALIZED_DIR, 'skills.json'));
const knownSkillIds = new Set(skills.map((skill) => skill.id));
const unknownTargets = targets.filter((target) => !knownSkillIds.has(target.skillId));
if (unknownTargets.length) {
  console.error(`Unknown skill id(s): ${unknownTargets.map((target) => target.skillId).join(', ')}`);
  console.error('Example ids: attack-boost, weakness-exploit, critical-eye, divine-blessing');
  process.exit(1);
}
const availableSkillIds = new Set();
for (const piece of armor) {
  for (const bonus of piece.skillBonuses) availableSkillIds.add(bonus.skillId);
}
for (const charm of charms) {
  for (const skill of charm.skills) availableSkillIds.add(skill.skillId);
}
for (const weapon of weapons) {
  for (const skill of weapon.skills) availableSkillIds.add(skill.skillId);
}
for (const deco of decorations) availableSkillIds.add(deco.skillId);
const unavailableTargets = targets.filter((target) => !availableSkillIds.has(target.skillId));
if (unavailableTargets.length) {
  console.error(`Skill id(s) not available from armor, charms, weapons, or decorations: ${unavailableTargets.map((target) => target.skillId).join(', ')}`);
  process.exit(1);
}
const limit = Number(args.limit ?? process.env.npm_config_limit ?? 5);
const rankArg = args.rank ?? process.env.npm_config_rank ?? 'high';
const rank = rankArg === 'all' ? null : rankArg;
const weaponKind = args['weapon-kind'] ?? process.env.npm_config_weapon_kind ?? null;
const monsterQuery = args.monster ?? process.env.npm_config_monster ?? null;
const monster = monsterQuery
  ? monsters.find((item) =>
      item.id === monsterQuery ||
      String(item.sourceId) === String(monsterQuery) ||
      item.name === monsterQuery ||
      item.nameEn?.toLowerCase() === String(monsterQuery).toLowerCase() ||
      item.name.toLowerCase().includes(String(monsterQuery).toLowerCase()) ||
      item.nameEn?.toLowerCase().includes(String(monsterQuery).toLowerCase()))
  : null;
const ownedDecorations = parseOwnedCounts(args['owned-decorations'] ?? process.env.npm_config_owned_decorations ?? 'all');

if (monsterQuery && !monster) {
  console.error(`Monster not found: ${monsterQuery}`);
  process.exit(1);
}

const results = optimizeArmorBuild({
  armor,
  decorations,
  charms,
  weapons,
  targets,
  limit,
  rank,
  weaponKind,
  monster,
  ownedDecorations,
});

for (const [index, result] of results.entries()) {
  console.log(`\n#${index + 1} score=${result.score.toFixed(2)} defense=${result.totalDefense}`);
  if (result.weapon) {
    const specials = result.weapon.specials
      .map((special) => special.element ? `${special.element}:${special.damage?.display ?? special.damage?.raw ?? 0}` : special.status)
      .filter(Boolean)
      .join(', ') || '-';
    console.log(`Weapon: ${result.weapon.name} (${result.weapon.kind}) raw=${result.weapon.damage.raw} affinity=${result.weapon.affinity}% element=${specials}`);
    if (result.weapon.imageUrl) console.log(`Weapon image: ${result.weapon.imageUrl}`);
  }
  if (result.charm) {
    console.log(`Charm: ${result.charm.name} ${result.charm.skills.map((skill) => `${skill.skillId}+${skill.level}`).join(', ')}`);
  }
  if (monster) {
    const weaknesses = monster.weaknesses
      .filter((weakness) => weakness.kind === 'element')
      .map((weakness) => `${weakness.element}:${weakness.level}`)
      .join(', ');
    console.log(`Monster: ${monster.name} (${monster.nameEn}) weakness=${weaknesses || '-'}`);
    if (monster.imageUrl) console.log(`Monster image: ${monster.imageUrl}`);
  }
  console.log('Armor:');
  for (const piece of result.armor) {
    const skills = piece.skillBonuses.map((skill) => `${skill.skillId}+${skill.level}`).join(', ') || '-';
    console.log(`- ${piece.slot}: ${piece.name} [${piece.slots.join('-') || '-'}] ${skills}`);
  }
  console.log('Decorations:');
  for (const deco of result.decorations) {
    console.log(`- ${deco.name} [${deco.slotSize}] ${deco.skillId}+${deco.skillLevel}`);
  }
  console.log('Targets:');
  for (const skill of result.achievedSkills) {
    console.log(`- ${skill.skillId}: ${skill.achievedLevel}/${skill.targetLevel}`);
  }
}
