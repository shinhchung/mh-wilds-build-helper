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
  name?: string | null;
  description: string;
  setPiecesRequired?: number | null;
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

export type Charm = {
  id: string;
  sourceId?: number;
  rankId?: number;
  gameId?: number;
  name: string;
  nameEn?: string;
  level: number;
  rarity: number;
  skills: Array<{
    skillId: string;
    level: number;
  }>;
  crafting?: {
    zennyCost?: number;
    craftable?: boolean;
    materials: Array<{
      itemId: number;
      gameId?: number;
      name: string;
      quantity: number;
    }>;
  } | null;
};

export type Weapon = {
  id: string;
  sourceId?: number;
  gameId?: number;
  name: string;
  nameEn?: string;
  kind: string;
  rarity: number;
  damage: {
    raw: number;
    display: number;
  };
  affinity: number;
  defenseBonus: number;
  slots: number[];
  specials: Array<{
    kind: string;
    element?: ElementType | null;
    status?: string | null;
    damage?: {
      raw: number;
      display: number;
    } | null;
    hidden?: boolean;
  }>;
  skills: Array<{
    skillId: string;
    level: number;
  }>;
  crafting?: {
    craftable: boolean;
    craftingZennyCost: number;
    upgradeZennyCost: number;
    previous?: {
      id: number;
      name: string;
    } | null;
    branches: Array<{
      id: number;
      name: string;
    }>;
    craftingMaterials: Array<{
      itemId: number;
      gameId?: number;
      name: string;
      quantity: number;
    }>;
    upgradeMaterials: Array<{
      itemId: number;
      gameId?: number;
      name: string;
      quantity: number;
    }>;
  } | null;
  kiranicoUrl?: string | null;
  imageUrl?: string | null;
};

export type Monster = {
  id: string;
  sourceId?: number;
  gameId?: number;
  name: string;
  nameEn?: string;
  kind: 'large' | 'small';
  species: string;
  description: string;
  locations: string[];
  weaknesses: Array<{
    kind: string;
    element?: ElementType | null;
    status?: string | null;
    effect?: string | null;
    level: number;
    condition?: string | null;
  }>;
  kiranicoUrl?: string | null;
  imageUrl?: string | null;
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
