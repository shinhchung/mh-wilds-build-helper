import path from 'node:path';
import { NORMALIZED_DIR, parseSkillTargets, readJson } from './data-utils.mjs';
import { optimizeArmorBuild } from './optimizer.mjs';

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...rest] = arg.replace(/^--/, '').split('=');
    return [key, rest.join('=') || 'true'];
  }),
);

const targets = parseSkillTargets(args.skills ?? process.env.npm_config_skills);
if (!targets.length) {
  console.error('Usage: npm run optimize:build -- --skills=attack:4,weakness-exploit:3,critical-eye:4 [--limit=5]');
  process.exit(1);
}

const armor = await readJson(path.join(NORMALIZED_DIR, 'armor.json'));
const decorations = (await readJson(path.join(NORMALIZED_DIR, 'decorations.json'))).filter((deco) => deco.kind === 'armor');
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
for (const deco of decorations) availableSkillIds.add(deco.skillId);
const unavailableTargets = targets.filter((target) => !availableSkillIds.has(target.skillId));
if (unavailableTargets.length) {
  console.error(`Skill id(s) not available from armor or armor decorations: ${unavailableTargets.map((target) => target.skillId).join(', ')}`);
  console.error('For weapon skills, include weapon optimization in a later pass or choose armor/equip skills such as weakness-exploit, agitator, evade-window.');
  process.exit(1);
}
const limit = Number(args.limit ?? process.env.npm_config_limit ?? 5);
const rankArg = args.rank ?? process.env.npm_config_rank ?? 'high';
const rank = rankArg === 'all' ? null : rankArg;

const results = optimizeArmorBuild({ armor, decorations, targets, limit, rank });

for (const [index, result] of results.entries()) {
  console.log(`\n#${index + 1} score=${result.score.toFixed(2)} defense=${result.totalDefense}`);
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
