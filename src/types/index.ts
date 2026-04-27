export type Playstyle = 'attack' | 'defense' | 'balanced' | 'support';

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
  gameId?: number;
  name: string;
  nameEn?: string;
  category: 'offense' | 'defense' | 'utility';
  kind?: 'armor' | 'weapon' | 'set' | 'group';
  description: string;
  levels: SkillLevelEffect[];
};

export type Decoration = {
  id: string;
  sourceId?: number;
  gameId?: number;
  name: string;
  nameEn?: string;
  kind?: 'armor' | 'weapon';
  slotSize: 1 | 2 | 3;
  rarity?: number;
  skillId: string;
  skillLevel: number;
  skills?: Array<{
    skillId: string;
    level: number;
  }>;
  description: string;
};

export type ArmorPieceSlot = 'head' | 'chest' | 'arms' | 'waist' | 'legs' | 'talisman';

export type ArmorPiece = {
  id: string;
  sourceId?: number;
  gameId?: number;
  name: string;
  nameEn?: string;
  slot: ArmorPieceSlot;
  rank?: 'low' | 'high';
  rarity: number;
  defense: number;
  maxDefense?: number;
  resistances?: ResistanceSet;
  slots: Array<1 | 2 | 3>;
  armorSetId?: number | null;
  armorSetName?: string | null;
  skillBonuses: Array<{
    skillId: string;
    level: number;
  }>;
  crafting?: {
    zennyCost: number;
    materials: Array<{
      itemId: number;
      gameId?: number;
      name: string;
      quantity: number;
    }>;
  } | null;
  notes?: string;
};

export type SkillTarget = {
  skillId: string;
  targetLevel: number;
};

export type ArmorSearchResult = {
  armor: ArmorPiece[];
  decorations: Decoration[];
  achievedSkills: Array<{
    skillId: string;
    achievedLevel: number;
    targetLevel: number;
  }>;
  totalDefense: number;
};

export type WeaponRecommendation = {
  label: string;
  weaponType: string;
  reason: string;
};

export type SetBonus = {
  setName: string;
  piecesRequired: number;
  bonusName: string;
  description: string;
};

export type Build = {
  id: string;
  playstyle: Playstyle;
  title: string;
  summary: string;
  weapon: WeaponRecommendation;
  armor: ArmorPiece[];
  decorations: Decoration[];
  setBonuses: SetBonus[];
  highlightedSkillIds: string[];
  defenseStats: DefenseStats;
  notes: string[];
};
