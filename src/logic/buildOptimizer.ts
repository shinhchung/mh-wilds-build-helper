import { ArmorPiece, Decoration, SkillTarget } from '../types';

const ARMOR_SLOTS = ['head', 'chest', 'arms', 'waist', 'legs'] as const;

export type OptimizedBuild = {
  score: number;
  armor: ArmorPiece[];
  decorations: Decoration[];
  achievedSkills: Array<{
    skillId: string;
    achievedLevel: number;
    targetLevel: number;
  }>;
  totalDefense: number;
};

function skillTotalsFromArmor(armor: ArmorPiece[]): Map<string, number> {
  const totals = new Map<string, number>();
  for (const piece of armor) {
    for (const bonus of piece.skillBonuses) {
      totals.set(bonus.skillId, (totals.get(bonus.skillId) ?? 0) + bonus.level);
    }
  }
  return totals;
}

function fillDecorations(
  openSlots: number[],
  decorations: Decoration[],
  targets: SkillTarget[],
  baseTotals: Map<string, number>,
) {
  const sortedSlots = [...openSlots].sort((a, b) => b - a);
  const used = sortedSlots.map(() => false);
  const totals = new Map(baseTotals);
  const picked: Decoration[] = [];

  for (const target of targets) {
    while ((totals.get(target.skillId) ?? 0) < target.targetLevel) {
      const deco = decorations.find((candidate) => candidate.skillId === target.skillId);
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

function scoreBuild(
  armor: ArmorPiece[],
  decorations: Decoration[],
  targets: SkillTarget[],
  totals: Map<string, number>,
): number {
  const targetScore = targets.reduce((sum, target) => {
    const actual = totals.get(target.skillId) ?? 0;
    return sum + Math.min(actual, target.targetLevel) * 100;
  }, 0);
  const defense = armor.reduce((sum, piece) => sum + piece.defense, 0);
  const slotScore = armor.flatMap((piece) => piece.slots).reduce((sum, slot) => sum + slot, 0);
  return targetScore + defense * 0.08 + slotScore - decorations.length * 0.5;
}

export function optimizeArmorBuild(
  armor: ArmorPiece[],
  decorations: Decoration[],
  targets: SkillTarget[],
  limit = 5,
): OptimizedBuild[] {
  const targetIds = new Set(targets.map((target) => target.skillId));
  const pieceScore = (piece: ArmorPiece) => {
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
        .filter((piece) => piece.slot === slot)
        .filter((piece) => piece.skillBonuses.some((bonus) => targetIds.has(bonus.skillId)) || piece.slots.length > 0)
        .sort((a, b) => pieceScore(b) - pieceScore(a))
        .slice(0, 12),
    ]),
  ) as Record<(typeof ARMOR_SLOTS)[number], ArmorPiece[]>;

  const results: OptimizedBuild[] = [];

  for (const head of bySlot.head) {
    for (const chest of bySlot.chest) {
      for (const arms of bySlot.arms) {
        for (const waist of bySlot.waist) {
          for (const legs of bySlot.legs) {
            const pickedArmor = [head, chest, arms, waist, legs];
            const baseTotals = skillTotalsFromArmor(pickedArmor);
            const filled = fillDecorations(
              pickedArmor.flatMap((piece) => piece.slots),
              decorations,
              targets,
              baseTotals,
            );
            const totalDefense = pickedArmor.reduce((sum, piece) => sum + piece.defense, 0);
            results.push({
              score: scoreBuild(pickedArmor, filled.decorations, targets, filled.totals),
              armor: pickedArmor,
              decorations: filled.decorations,
              achievedSkills: targets.map((target) => ({
                skillId: target.skillId,
                achievedLevel: Math.min(filled.totals.get(target.skillId) ?? 0, target.targetLevel),
                targetLevel: target.targetLevel,
              })),
              totalDefense,
            });
          }
        }
      }
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}
