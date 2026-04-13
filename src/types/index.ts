export type Playstyle = 'attack' | 'defense' | 'balanced';

export type ElementType = 'fire' | 'water' | 'thunder' | 'ice' | 'dragon' | 'none';

export type ResistanceSet = {
  fire: number;
  water: number;
  thunder: number;
  ice: number;
  dragon: number;
};

export type DefenseStats = {
  physical: number;
  elemental: number;
  resistances: ResistanceSet;
};

export type SkillLevelEffect = {
  level: number;
  description: string;
};

export type Skill = {
  id: string;
  name: string;
  category: 'offense' | 'defense' | 'utility';
  description: string;
  levels: SkillLevelEffect[];
};

export type Decoration = {
  id: string;
  name: string;
  slotSize: 1 | 2 | 3;
  skillId: string;
  skillLevel: number;
  description: string;
};

export type ArmorPieceSlot = 'head' | 'chest' | 'arms' | 'waist' | 'legs' | 'talisman';

export type ArmorPiece = {
  id: string;
  name: string;
  slot: ArmorPieceSlot;
  rarity: number;
  defense: number;
  slots: Array<1 | 2 | 3>;
  skillBonuses: Array<{
    skillId: string;
    level: number;
  }>;
  notes?: string;
};

export type WeaponRecommendation = {
  label: string;
  weaponType: string;
  reason: string;
};

export type Build = {
  id: string;
  playstyle: Playstyle;
  title: string;
  summary: string;
  weapon: WeaponRecommendation;
  armor: ArmorPiece[];
  decorations: Decoration[];
  highlightedSkillIds: string[];
  defenseStats: DefenseStats;
  notes: string[];
};
