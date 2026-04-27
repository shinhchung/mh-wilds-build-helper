const ARMOR_SLOTS = ['head', 'chest', 'arms', 'waist', 'legs'];
const DEFAULT_ARMOR_CANDIDATES_PER_SLOT = 12;
const DEFAULT_CHARM_CANDIDATES = 16;
const DEFAULT_WEAPON_CANDIDATES = 80;

function addSkillTotals(totals, skills) {
  for (const skill of skills ?? []) {
    totals.set(skill.skillId, (totals.get(skill.skillId) ?? 0) + skill.level);
  }
}

function skillTotalsFromEquipment({ armor = [], charm = null, weapon = null }) {
  const totals = new Map();
  for (const piece of armor) addSkillTotals(totals, piece.skillBonuses);
  if (charm) addSkillTotals(totals, charm.skills);
  if (weapon) addSkillTotals(totals, weapon.skills);
  return totals;
}

function cloneOwnedCounts(ownedCounts) {
  return ownedCounts == null ? null : new Map(ownedCounts);
}

function hasOwnedDecoration(deco, ownedCounts) {
  if (ownedCounts == null) return true;
  return (ownedCounts.get(deco.id) ?? ownedCounts.get(deco.sourceId) ?? ownedCounts.get(deco.skillId) ?? 0) > 0;
}

function consumeOwnedDecoration(deco, ownedCounts) {
  if (ownedCounts == null) return;
  for (const key of [deco.id, deco.sourceId, deco.skillId]) {
    if (key == null) continue;
    const count = ownedCounts.get(key);
    if (count > 0) {
      ownedCounts.set(key, count - 1);
      return;
    }
  }
}

function fillDecorations(openSlots, decorations, targets, baseTotals, ownedCounts = null) {
  const sortedSlots = [...openSlots].sort((a, b) => b - a);
  const used = new Array(sortedSlots.length).fill(false);
  const totals = new Map(baseTotals);
  const picked = [];
  const remainingOwned = cloneOwnedCounts(ownedCounts);

  const usefulDecos = decorations
    .filter((deco) => targets.some((target) => target.skillId === deco.skillId))
    .sort((a, b) => b.slotSize - a.slotSize || b.skillLevel - a.skillLevel);

  for (const target of targets) {
    while ((totals.get(target.skillId) ?? 0) < target.targetLevel) {
      const deco = usefulDecos.find((candidate) => candidate.skillId === target.skillId && hasOwnedDecoration(candidate, remainingOwned));
      if (!deco) break;
      const slotIndex = sortedSlots.findIndex((slot, index) => !used[index] && slot >= deco.slotSize);
      if (slotIndex === -1) break;
      used[slotIndex] = true;
      consumeOwnedDecoration(deco, remainingOwned);
      picked.push(deco);
      totals.set(target.skillId, (totals.get(target.skillId) ?? 0) + deco.skillLevel);
    }
  }

  return { decorations: picked, totals, remainingOwned };
}

function setBonusScore(armor) {
  const counts = new Map();
  for (const piece of armor) {
    if (!piece.armorSetId) continue;
    counts.set(piece.armorSetId, (counts.get(piece.armorSetId) ?? 0) + 1);
  }
  return [...counts.values()].reduce((sum, count) => sum + (count >= 3 ? 8 : count >= 2 ? 3 : 0), 0);
}

function targetScore(targets, totals) {
  let score = 0;
  let missing = 0;
  let overcapPenalty = 0;
  for (const target of targets) {
    const actual = totals.get(target.skillId) ?? 0;
    score += Math.min(actual, target.targetLevel) * 100;
    missing += Math.max(0, target.targetLevel - actual) * 80;
    overcapPenalty += Math.max(0, actual - target.targetLevel) * 4;
  }
  return score - missing - overcapPenalty;
}

function monsterElementWeakness(monster) {
  const map = new Map();
  for (const weakness of monster?.weaknesses ?? []) {
    if (weakness.kind === 'element' && weakness.element) {
      map.set(weakness.element, Math.max(map.get(weakness.element) ?? 0, weakness.level ?? 0));
    }
  }
  return map;
}

function weaponElementScore(weapon, monster) {
  const weakness = monsterElementWeakness(monster);
  let best = 0;
  for (const special of weapon?.specials ?? []) {
    if (special.kind !== 'element' || !special.element || special.hidden) continue;
    const level = weakness.get(special.element) ?? 0;
    best = Math.max(best, level * 35 + (special.damage?.raw ?? 0) * level * 0.5);
  }
  return best;
}

function weaponStatScore(weapon, monster) {
  if (!weapon) return 0;
  const raw = weapon.damage?.raw ?? 0;
  const affinity = weapon.affinity ?? 0;
  const slots = (weapon.slots ?? []).reduce((sum, slot) => sum + slot, 0);
  return raw * (1 + affinity / 400) + slots * 3 + (weapon.defenseBonus ?? 0) * 0.2 + weaponElementScore(weapon, monster);
}

function scoreBuild({ armor, charm, weapon, decorations, targets, totals, monster }) {
  const defense = armor.reduce((sum, piece) => sum + piece.defense, 0);
  const slotScore = armor.flatMap((piece) => piece.slots).reduce((sum, slot) => sum + slot, 0);
  return (
    targetScore(targets, totals) +
    defense * 0.08 +
    slotScore +
    setBonusScore(armor) +
    weaponStatScore(weapon, monster) -
    decorations.length * 0.5 +
    (charm ? 4 : 0)
  );
}

function limitedPush(results, result, limit) {
  results.push(result);
  results.sort((a, b) => b.score - a.score);
  if (results.length > limit) results.length = limit;
}

function equipmentCandidateScore(skills, targets) {
  return (skills ?? []).reduce((sum, skill) => {
    const target = targets.find((item) => item.skillId === skill.skillId);
    return sum + (target ? Math.min(skill.level, target.targetLevel) * 50 : 0);
  }, 0);
}

function selectArmorBySlot(armor, targets, rank, candidateLimit) {
  const targetIds = new Set(targets.map((target) => target.skillId));
  const pieceScore = (piece) => {
    const skillScore = equipmentCandidateScore(piece.skillBonuses, targets);
    const slotScore = piece.slots.reduce((sum, slot) => sum + slot, 0);
    return skillScore + slotScore * 3 + piece.defense * 0.08;
  };

  return Object.fromEntries(
    ARMOR_SLOTS.map((slot) => [
      slot,
      armor
        .filter((piece) => piece.slot === slot && (!rank || piece.rank === rank))
        .filter((piece) => piece.skillBonuses.some((bonus) => targetIds.has(bonus.skillId)) || piece.slots.length > 0)
        .sort((a, b) => pieceScore(b) - pieceScore(a))
        .slice(0, candidateLimit),
    ]),
  );
}

function selectCharms(charms, targets, limit) {
  return [null, ...charms
    .map((charm) => ({ charm, score: equipmentCandidateScore(charm.skills, targets) + (charm.rarity ?? 0) * 0.2 }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.charm)];
}

function selectWeapons(weapons, targets, monster, weaponKind, limit) {
  return weapons
    .filter((weapon) => !weaponKind || weapon.kind === weaponKind)
    .map((weapon) => ({
      weapon,
      score: weaponStatScore(weapon, monster) + equipmentCandidateScore(weapon.skills, targets),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.weapon);
}

function makeResult({ armor, charm, weapon, decorations, targets, totals, score }) {
  return {
    score,
    armor,
    charm,
    weapon,
    decorations,
    achievedSkills: targets.map((target) => ({
      skillId: target.skillId,
      targetLevel: target.targetLevel,
      achievedLevel: Math.min(totals.get(target.skillId) ?? 0, target.targetLevel),
    })),
    totalDefense: armor.reduce((sum, piece) => sum + piece.defense, 0) + (weapon?.defenseBonus ?? 0),
  };
}

export function optimizeArmorBuild({
  armor,
  decorations,
  targets,
  limit = 5,
  rank = 'high',
  charms = [],
  weapons = [],
  monster = null,
  weaponKind = null,
  ownedDecorations = null,
  armorCandidateLimit = DEFAULT_ARMOR_CANDIDATES_PER_SLOT,
  charmCandidateLimit = DEFAULT_CHARM_CANDIDATES,
  weaponCandidateLimit = DEFAULT_WEAPON_CANDIDATES,
}) {
  const armorDecorations = decorations.filter((deco) => deco.kind !== 'weapon');
  const weaponDecorations = decorations.filter((deco) => deco.kind === 'weapon');
  const bySlot = selectArmorBySlot(armor, targets, rank, armorCandidateLimit);
  const charmCandidates = selectCharms(charms, targets, charmCandidateLimit);
  const baseLimit = Math.max(limit * 40, 200);
  const baseResults = [];

  for (const head of bySlot.head) {
    for (const chest of bySlot.chest) {
      for (const arms of bySlot.arms) {
        for (const waist of bySlot.waist) {
          for (const legs of bySlot.legs) {
            const pickedArmor = [head, chest, arms, waist, legs];
            for (const charm of charmCandidates) {
              const baseTotals = skillTotalsFromEquipment({ armor: pickedArmor, charm });
              const armorFilled = fillDecorations(
                pickedArmor.flatMap((piece) => piece.slots),
                armorDecorations,
                targets,
                baseTotals,
                ownedDecorations,
              );
              const score = scoreBuild({
                armor: pickedArmor,
                charm,
                weapon: null,
                decorations: armorFilled.decorations,
                targets,
                totals: armorFilled.totals,
                monster,
              });
              limitedPush(baseResults, { armor: pickedArmor, charm, armorFilled, score }, baseLimit);
            }
          }
        }
      }
    }
  }

  const weaponCandidates = weapons.length
    ? selectWeapons(weapons, targets, monster, weaponKind, weaponCandidateLimit)
    : [null];
  const finalResults = [];

  for (const base of baseResults) {
    for (const weapon of weaponCandidates) {
      let totals = new Map(base.armorFilled.totals);
      if (weapon) addSkillTotals(totals, weapon.skills);
      const weaponFilled = weapon
        ? fillDecorations(weapon.slots ?? [], weaponDecorations, targets, totals, base.armorFilled.remainingOwned)
        : { decorations: [], totals };
      totals = weaponFilled.totals;
      const decorations = [...base.armorFilled.decorations, ...weaponFilled.decorations];
      const score = scoreBuild({
        armor: base.armor,
        charm: base.charm,
        weapon,
        decorations,
        targets,
        totals,
        monster,
      });
      limitedPush(finalResults, makeResult({
        armor: base.armor,
        charm: base.charm,
        weapon,
        decorations,
        targets,
        totals,
        score,
      }), limit);
    }
  }

  return finalResults;
}
