import { armorDatabase, decorations } from '../data';
import { ArmorPiece, ArmorSearchResult, Decoration, SkillTarget } from '../types';

const ARMOR_SLOTS = ['head', 'chest', 'arms', 'waist', 'legs'] as const;

type RemainingTargets = Map<string, number>;

function toRemainingTargets(targets: SkillTarget[]): RemainingTargets {
  return new Map(targets.map((t) => [t.skillId, t.targetLevel]));
}

function scorePiece(piece: ArmorPiece, remaining: RemainingTargets): number {
  let score = 0;
  for (const bonus of piece.skillBonuses) {
    const need = remaining.get(bonus.skillId);
    if (need != null && need > 0) {
      score += Math.min(bonus.level, need) * 10;
    }
  }
  // Small bonus for decoration slots (more flexibility)
  for (const slotSize of piece.slots) {
    score += slotSize * 0.5;
  }
  return score;
}

function subtractSkills(remaining: RemainingTargets, piece: ArmorPiece): void {
  for (const bonus of piece.skillBonuses) {
    const need = remaining.get(bonus.skillId);
    if (need != null) {
      remaining.set(bonus.skillId, Math.max(0, need - bonus.level));
    }
  }
}

function fillDecorations(
  openSlots: number[],
  remaining: RemainingTargets,
): Decoration[] {
  const result: Decoration[] = [];
  const availableSlots = [...openSlots].sort((a, b) => b - a);
  const slotUsed = availableSlots.map(() => false);

  // Sort targets by remaining need descending
  const sortedNeeds = [...remaining.entries()]
    .filter(([, need]) => need > 0)
    .sort(([, a], [, b]) => b - a);

  for (const [skillId, need] of sortedNeeds) {
    const deco = decorations.find((d) => d.skillId === skillId);
    if (!deco) continue;

    let filled = 0;
    for (let i = 0; i < availableSlots.length && filled < need; i++) {
      if (!slotUsed[i] && availableSlots[i] >= deco.slotSize) {
        slotUsed[i] = true;
        filled++;
        result.push(deco);
      }
    }
    remaining.set(skillId, Math.max(0, need - filled));
  }

  return result;
}

export function searchArmorBySkills(targets: SkillTarget[]): ArmorSearchResult {
  if (targets.length === 0) {
    return { armor: [], decorations: [], achievedSkills: [], totalDefense: 0 };
  }

  const remaining = toRemainingTargets(targets);
  const selectedArmor: ArmorPiece[] = [];

  // Greedy slot-by-slot selection
  for (const slot of ARMOR_SLOTS) {
    const candidates = armorDatabase.filter((p) => p.slot === slot);
    if (candidates.length === 0) continue;

    let bestPiece = candidates[0];
    let bestScore = -1;

    for (const piece of candidates) {
      const s = scorePiece(piece, remaining);
      if (s > bestScore || (s === bestScore && piece.defense > bestPiece.defense)) {
        bestScore = s;
        bestPiece = piece;
      }
    }

    selectedArmor.push(bestPiece);
    subtractSkills(remaining, bestPiece);
  }

  // Collect open decoration slots from selected armor
  const openSlots = selectedArmor.flatMap((p) => p.slots);

  // Fill decorations
  const filledDecorations = fillDecorations(openSlots, remaining);

  // Compute achieved skills
  const achievedMap = new Map<string, number>();
  for (const piece of selectedArmor) {
    for (const bonus of piece.skillBonuses) {
      achievedMap.set(bonus.skillId, (achievedMap.get(bonus.skillId) ?? 0) + bonus.level);
    }
  }
  for (const deco of filledDecorations) {
    achievedMap.set(deco.skillId, (achievedMap.get(deco.skillId) ?? 0) + deco.skillLevel);
  }

  const achievedSkills = targets.map((t) => ({
    skillId: t.skillId,
    achievedLevel: Math.min(achievedMap.get(t.skillId) ?? 0, t.targetLevel),
    targetLevel: t.targetLevel,
  }));

  const totalDefense = selectedArmor.reduce((sum, p) => sum + p.defense, 0);

  return { armor: selectedArmor, decorations: filledDecorations, achievedSkills, totalDefense };
}
