const ARMOR_SLOTS = ['head', 'chest', 'arms', 'waist', 'legs'];

function skillTotalsFromArmor(armor) {
  const totals = new Map();
  for (const piece of armor) {
    for (const bonus of piece.skillBonuses) {
      totals.set(bonus.skillId, (totals.get(bonus.skillId) ?? 0) + bonus.level);
    }
  }
  return totals;
}

function setBonusScore(armor) {
  const counts = new Map();
  for (const piece of armor) {
    if (!piece.armorSetId) continue;
    counts.set(piece.armorSetId, (counts.get(piece.armorSetId) ?? 0) + 1);
  }
  return [...counts.values()].reduce((sum, count) => sum + (count >= 3 ? 8 : count >= 2 ? 3 : 0), 0);
}

function fillDecorations(openSlots, decorations, targets, baseTotals) {
  const sortedSlots = [...openSlots].sort((a, b) => b - a);
  const used = new Array(sortedSlots.length).fill(false);
  const totals = new Map(baseTotals);
  const picked = [];

  const usefulDecos = decorations
    .filter((deco) => targets.some((target) => target.skillId === deco.skillId))
    .sort((a, b) => b.slotSize - a.slotSize || b.skillLevel - a.skillLevel);

  for (const target of targets) {
    while ((totals.get(target.skillId) ?? 0) < target.targetLevel) {
      const deco = usefulDecos.find((candidate) => candidate.skillId === target.skillId);
      if (!deco) break;
      const slotIndex = sortedSlots.findIndex((slot, index) => !used[index] && slot >= deco.slotSize);
      if (slotIndex === -1) break;
      used[slotIndex] = true;
      picked.push(deco);
      totals.set(target.skillId, (totals.get(target.skillId) ?? 0) + deco.skillLevel);
    }
  }

  return { decorations: picked, totals };
}

function scoreBuild(armor, decorations, targets, totals) {
  let targetScore = 0;
  let overcapPenalty = 0;
  for (const target of targets) {
    const actual = totals.get(target.skillId) ?? 0;
    targetScore += Math.min(actual, target.targetLevel) * 100;
    overcapPenalty += Math.max(0, actual - target.targetLevel) * 4;
  }

  const defense = armor.reduce((sum, piece) => sum + piece.defense, 0);
  const slotScore = armor.flatMap((piece) => piece.slots).reduce((sum, slot) => sum + slot, 0);
  return targetScore + defense * 0.08 + slotScore + setBonusScore(armor) - overcapPenalty - decorations.length * 0.5;
}

export function optimizeArmorBuild({ armor, decorations, targets, limit = 5, rank = 'high' }) {
  const targetIds = new Set(targets.map((target) => target.skillId));
  const candidateLimit = 12;
  const pieceScore = (piece) => {
    const skillScore = piece.skillBonuses.reduce((sum, bonus) => {
      const target = targets.find((item) => item.skillId === bonus.skillId);
      return sum + (target ? Math.min(bonus.level, target.targetLevel) * 50 : 0);
    }, 0);
    const slotScore = piece.slots.reduce((sum, slot) => sum + slot, 0);
    return skillScore + slotScore * 3 + piece.defense * 0.08;
  };
  const bySlot = Object.fromEntries(
    ARMOR_SLOTS.map((slot) => [
      slot,
      armor
        .filter((piece) => piece.slot === slot && (!rank || piece.rank === rank))
        .filter((piece) => piece.skillBonuses.some((bonus) => targetIds.has(bonus.skillId)) || piece.slots.length > 0)
        .sort((a, b) => pieceScore(b) - pieceScore(a))
        .slice(0, candidateLimit),
    ]),
  );

  const results = [];
  const pushResult = (result) => {
    results.push(result);
    results.sort((a, b) => b.score - a.score);
    if (results.length > limit) results.length = limit;
  };
  for (const head of bySlot.head) {
    for (const chest of bySlot.chest) {
      for (const arms of bySlot.arms) {
        for (const waist of bySlot.waist) {
          for (const legs of bySlot.legs) {
            const pickedArmor = [head, chest, arms, waist, legs];
            const baseTotals = skillTotalsFromArmor(pickedArmor);
            const openSlots = pickedArmor.flatMap((piece) => piece.slots);
            const filled = fillDecorations(openSlots, decorations, targets, baseTotals);
            const score = scoreBuild(pickedArmor, filled.decorations, targets, filled.totals);
            pushResult({
              score,
              armor: pickedArmor,
              decorations: filled.decorations,
              achievedSkills: targets.map((target) => ({
                skillId: target.skillId,
                targetLevel: target.targetLevel,
                achievedLevel: Math.min(filled.totals.get(target.skillId) ?? 0, target.targetLevel),
              })),
              totalDefense: pickedArmor.reduce((sum, piece) => sum + piece.defense, 0),
            });
          }
        }
      }
    }
  }

  return results;
}
