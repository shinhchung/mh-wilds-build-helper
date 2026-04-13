import { ArmorPiece } from '../types';

export const armorDatabase: ArmorPiece[] = [
  // ── 雄火龍 (Rathalos) ──
  { id: 'rathalos-head', name: '雄火龍頭盔β', slot: 'head', rarity: 6, defense: 72, slots: [1, 1], skillBonuses: [{ skillId: 'attack-boost', level: 2 }] },
  { id: 'rathalos-chest', name: '雄火龍鎧甲β', slot: 'chest', rarity: 6, defense: 74, slots: [2], skillBonuses: [{ skillId: 'weakness-exploit', level: 1 }] },
  { id: 'rathalos-arms', name: '雄火龍臂甲β', slot: 'arms', rarity: 6, defense: 70, slots: [2, 1], skillBonuses: [{ skillId: 'attack-boost', level: 1 }] },
  { id: 'rathalos-waist', name: '雄火龍腰甲β', slot: 'waist', rarity: 6, defense: 72, slots: [2], skillBonuses: [{ skillId: 'weakness-exploit', level: 1 }] },
  { id: 'rathalos-legs', name: '雄火龍護腿β', slot: 'legs', rarity: 6, defense: 72, slots: [2], skillBonuses: [{ skillId: 'health-boost', level: 2 }] },

  // ── 黑蝕龍 (Gore Magala) ──
  { id: 'gore-head', name: '黑蝕龍頭盔β', slot: 'head', rarity: 7, defense: 78, slots: [2, 1], skillBonuses: [{ skillId: 'critical-eye', level: 2 }] },
  { id: 'gore-chest', name: '黑蝕龍鎧甲β', slot: 'chest', rarity: 7, defense: 80, slots: [2, 1], skillBonuses: [{ skillId: 'critical-eye', level: 2 }] },
  { id: 'gore-arms', name: '黑蝕龍臂甲β', slot: 'arms', rarity: 7, defense: 76, slots: [2], skillBonuses: [{ skillId: 'critical-boost', level: 2 }] },
  { id: 'gore-waist', name: '黑蝕龍腰甲β', slot: 'waist', rarity: 7, defense: 78, slots: [2], skillBonuses: [{ skillId: 'critical-boost', level: 2 }] },
  { id: 'gore-legs', name: '黑蝕龍護腿β', slot: 'legs', rarity: 7, defense: 76, slots: [2, 1], skillBonuses: [{ skillId: 'weakness-exploit', level: 2 }] },

  // ── 鎖刃龍 (Arkveld) ──
  { id: 'arkveld-head', name: '鎖刃龍頭盔β', slot: 'head', rarity: 8, defense: 84, slots: [3], skillBonuses: [{ skillId: 'attack-boost', level: 2 }] },
  { id: 'arkveld-chest', name: '鎖刃龍鎧甲β', slot: 'chest', rarity: 8, defense: 86, slots: [3, 1], skillBonuses: [{ skillId: 'critical-boost', level: 2 }] },
  { id: 'arkveld-arms', name: '鎖刃龍臂甲β', slot: 'arms', rarity: 8, defense: 82, slots: [2, 1], skillBonuses: [{ skillId: 'attack-boost', level: 2 }] },
  { id: 'arkveld-waist', name: '鎖刃龍腰甲β', slot: 'waist', rarity: 8, defense: 84, slots: [2, 1], skillBonuses: [{ skillId: 'weakness-exploit', level: 2 }] },
  { id: 'arkveld-legs', name: '鎖刃龍護腿β', slot: 'legs', rarity: 8, defense: 82, slots: [2], skillBonuses: [{ skillId: 'critical-eye', level: 2 }] },

  // ── 護鎖刃龍 (Guardian Arkveld) ──
  { id: 'g-arkveld-head', name: '護鎖刃龍頭盔β', slot: 'head', rarity: 8, defense: 86, slots: [2, 1], skillBonuses: [{ skillId: 'weakness-exploit', level: 2 }] },
  { id: 'g-arkveld-chest', name: '護鎖刃龍鎧甲β', slot: 'chest', rarity: 8, defense: 88, slots: [3], skillBonuses: [{ skillId: 'attack-boost', level: 2 }] },
  { id: 'g-arkveld-arms', name: '護鎖刃龍臂甲β', slot: 'arms', rarity: 8, defense: 84, slots: [2, 1], skillBonuses: [{ skillId: 'critical-boost', level: 2 }] },
  { id: 'g-arkveld-waist', name: '護鎖刃龍腰甲β', slot: 'waist', rarity: 8, defense: 86, slots: [2], skillBonuses: [{ skillId: 'critical-eye', level: 2 }] },
  { id: 'g-arkveld-legs', name: '護鎖刃龍護腿β', slot: 'legs', rarity: 8, defense: 84, slots: [2, 1], skillBonuses: [{ skillId: 'attack-boost', level: 2 }] },

  // ── 雷爪龍 (Rey Dau) ──
  { id: 'reydau-head', name: '雷爪龍頭盔β', slot: 'head', rarity: 7, defense: 76, slots: [2], skillBonuses: [{ skillId: 'critical-eye', level: 2 }] },
  { id: 'reydau-chest', name: '雷爪龍鎧甲β', slot: 'chest', rarity: 7, defense: 78, slots: [1, 1], skillBonuses: [{ skillId: 'critical-boost', level: 1 }] },
  { id: 'reydau-arms', name: '雷爪龍臂甲β', slot: 'arms', rarity: 7, defense: 74, slots: [2], skillBonuses: [{ skillId: 'weakness-exploit', level: 2 }] },
  { id: 'reydau-waist', name: '雷爪龍腰甲β', slot: 'waist', rarity: 7, defense: 76, slots: [1, 1], skillBonuses: [{ skillId: 'critical-eye', level: 1 }] },
  { id: 'reydau-legs', name: '雷爪龍護腿β', slot: 'legs', rarity: 7, defense: 74, slots: [2], skillBonuses: [{ skillId: 'evade-window', level: 2 }] },

  // ── 護雷顎龍 (Guardian Rey Dau) ──
  { id: 'g-reydau-head', name: '護雷顎龍頭盔β', slot: 'head', rarity: 8, defense: 82, slots: [2], skillBonuses: [{ skillId: 'weakness-exploit', level: 2 }] },
  { id: 'g-reydau-chest', name: '護雷顎龍鎧甲β', slot: 'chest', rarity: 8, defense: 84, slots: [2, 1], skillBonuses: [{ skillId: 'critical-eye', level: 2 }] },
  { id: 'g-reydau-arms', name: '護雷顎龍臂甲β', slot: 'arms', rarity: 8, defense: 80, slots: [2, 1], skillBonuses: [{ skillId: 'critical-eye', level: 2 }] },
  { id: 'g-reydau-waist', name: '護雷顎龍腰甲β', slot: 'waist', rarity: 8, defense: 82, slots: [2], skillBonuses: [{ skillId: 'attack-boost', level: 1 }] },
  { id: 'g-reydau-legs', name: '護雷顎龍護腿β', slot: 'legs', rarity: 8, defense: 80, slots: [2], skillBonuses: [{ skillId: 'weakness-exploit', level: 1 }] },

  // ── 鎧龍 (Gravios) ──
  { id: 'gravios-head', name: '鎧龍頭盔β', slot: 'head', rarity: 6, defense: 86, slots: [1], skillBonuses: [{ skillId: 'guard', level: 2 }] },
  { id: 'gravios-chest', name: '鎧龍鎧甲β', slot: 'chest', rarity: 6, defense: 88, slots: [2, 1], skillBonuses: [{ skillId: 'guard', level: 2 }] },
  { id: 'gravios-arms', name: '鎧龍臂甲β', slot: 'arms', rarity: 6, defense: 84, slots: [1, 1], skillBonuses: [{ skillId: 'guard', level: 1 }] },
  { id: 'gravios-waist', name: '鎧龍腰甲β', slot: 'waist', rarity: 6, defense: 86, slots: [1, 1], skillBonuses: [{ skillId: 'divine-blessing', level: 1 }, { skillId: 'health-boost', level: 1 }] },
  { id: 'gravios-legs', name: '鎧龍護腿β', slot: 'legs', rarity: 6, defense: 84, slots: [1], skillBonuses: [{ skillId: 'guard', level: 2 }] },

  // ── 影蜘蛛 (Nerscylla) ──
  { id: 'nerscylla-head', name: '影蜘蛛頭盔β', slot: 'head', rarity: 6, defense: 68, slots: [2], skillBonuses: [{ skillId: 'evade-window', level: 2 }] },
  { id: 'nerscylla-chest', name: '影蜘蛛鎧甲β', slot: 'chest', rarity: 6, defense: 70, slots: [1, 1], skillBonuses: [{ skillId: 'evade-window', level: 1 }] },
  { id: 'nerscylla-arms', name: '影蜘蛛臂甲β', slot: 'arms', rarity: 6, defense: 66, slots: [2], skillBonuses: [{ skillId: 'evade-window', level: 2 }] },
  { id: 'nerscylla-waist', name: '影蜘蛛腰甲β', slot: 'waist', rarity: 6, defense: 68, slots: [1], skillBonuses: [{ skillId: 'critical-eye', level: 1 }] },
  { id: 'nerscylla-legs', name: '影蜘蛛護腿β', slot: 'legs', rarity: 6, defense: 66, slots: [2, 1], skillBonuses: [{ skillId: 'evade-window', level: 2 }] },

  // ── 桃毛獸王 (Congalala) ──
  { id: 'conga-head', name: '桃毛獸王頭盔β', slot: 'head', rarity: 5, defense: 58, slots: [1], skillBonuses: [{ skillId: 'health-boost', level: 2 }] },
  { id: 'conga-chest', name: '桃毛獸王鎧甲β', slot: 'chest', rarity: 5, defense: 60, slots: [1, 1], skillBonuses: [{ skillId: 'health-boost', level: 1 }, { skillId: 'divine-blessing', level: 1 }] },
  { id: 'conga-arms', name: '桃毛獸王臂甲β', slot: 'arms', rarity: 5, defense: 56, slots: [1], skillBonuses: [{ skillId: 'attack-boost', level: 1 }] },
  { id: 'conga-waist', name: '桃毛獸王腰甲β', slot: 'waist', rarity: 5, defense: 58, slots: [1], skillBonuses: [{ skillId: 'divine-blessing', level: 1 }] },
  { id: 'conga-legs', name: '桃毛獸王護腿β', slot: 'legs', rarity: 5, defense: 56, slots: [1, 1], skillBonuses: [{ skillId: 'health-boost', level: 1 }] },

  // ── 怒獸 (Doshaguma) ──
  { id: 'dosha-head', name: '怒獸頭盔β', slot: 'head', rarity: 6, defense: 74, slots: [1, 1], skillBonuses: [{ skillId: 'attack-boost', level: 2 }] },
  { id: 'dosha-chest', name: '怒獸鎧甲β', slot: 'chest', rarity: 6, defense: 76, slots: [2], skillBonuses: [{ skillId: 'attack-boost', level: 2 }] },
  { id: 'dosha-arms', name: '怒獸臂甲β', slot: 'arms', rarity: 6, defense: 72, slots: [1], skillBonuses: [{ skillId: 'health-boost', level: 1 }] },
  { id: 'dosha-waist', name: '怒獸腰甲β', slot: 'waist', rarity: 6, defense: 74, slots: [1, 1], skillBonuses: [{ skillId: 'attack-boost', level: 1 }] },
  { id: 'dosha-legs', name: '怒獸護腿β', slot: 'legs', rarity: 6, defense: 72, slots: [1], skillBonuses: [{ skillId: 'health-boost', level: 2 }] },

  // ── 水獸 (Uth Duna) ──
  { id: 'duna-head', name: '水獸頭盔β', slot: 'head', rarity: 6, defense: 70, slots: [1, 1], skillBonuses: [{ skillId: 'divine-blessing', level: 2 }] },
  { id: 'duna-chest', name: '水獸鎧甲β', slot: 'chest', rarity: 6, defense: 72, slots: [2], skillBonuses: [{ skillId: 'health-boost', level: 2 }] },
  { id: 'duna-arms', name: '水獸臂甲β', slot: 'arms', rarity: 6, defense: 68, slots: [1], skillBonuses: [{ skillId: 'divine-blessing', level: 1 }] },
  { id: 'duna-waist', name: '水獸腰甲β', slot: 'waist', rarity: 6, defense: 70, slots: [1, 1], skillBonuses: [{ skillId: 'health-boost', level: 1 }] },
  { id: 'duna-legs', name: '水獸護腿β', slot: 'legs', rarity: 6, defense: 68, slots: [2], skillBonuses: [{ skillId: 'divine-blessing', level: 1 }] },

  // ── 爆鱗龍 (Rompopolo) ──
  { id: 'rompo-head', name: '爆鱗龍頭盔β', slot: 'head', rarity: 6, defense: 70, slots: [2], skillBonuses: [{ skillId: 'attack-boost', level: 1 }, { skillId: 'critical-eye', level: 1 }] },
  { id: 'rompo-chest', name: '爆鱗龍鎧甲β', slot: 'chest', rarity: 6, defense: 72, slots: [1, 1], skillBonuses: [{ skillId: 'weakness-exploit', level: 1 }] },
  { id: 'rompo-arms', name: '爆鱗龍臂甲β', slot: 'arms', rarity: 6, defense: 68, slots: [1], skillBonuses: [{ skillId: 'attack-boost', level: 2 }] },
  { id: 'rompo-waist', name: '爆鱗龍腰甲β', slot: 'waist', rarity: 6, defense: 70, slots: [2], skillBonuses: [{ skillId: 'critical-eye', level: 1 }] },
  { id: 'rompo-legs', name: '爆鱗龍護腿β', slot: 'legs', rarity: 6, defense: 68, slots: [1, 1], skillBonuses: [{ skillId: 'attack-boost', level: 1 }] },
];
