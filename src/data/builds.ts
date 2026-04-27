import { Build } from '../types';

export const builds: Build[] = [
  {
    id: 'wilds-attack-arkveld',
    playstyle: 'attack',
    title: '鎖刃龍高會心輸出配裝',
    summary: '以鎖刃龍＋護雷顎龍混裝為核心，堆疊看破、弱點特效與超會心，主打穩定弱點爆發。',
    weapon: {
      label: '鎖刃龍衍生（太刀／大劍）',
      weaponType: '太刀',
      reason: '高會心收益高，適合長時間貼身打弱點。',
    },
    armor: [
      { id: 'arkveld-head', name: '鎖刃龍頭盔β', slot: 'head', rarity: 8, defense: 84, slots: [3], skillBonuses: [{ skillId: 'attack-boost', level: 2 }] },
      { id: 'arkveld-chest', name: '鎖刃龍鎧甲β', slot: 'chest', rarity: 8, defense: 86, slots: [3, 1], skillBonuses: [{ skillId: 'critical-boost', level: 2 }] },
      { id: 'g-reydau-arms', name: '護雷顎龍臂甲β', slot: 'arms', rarity: 8, defense: 80, slots: [2, 1], skillBonuses: [{ skillId: 'critical-eye', level: 2 }] },
      { id: 'arkveld-waist', name: '鎖刃龍腰甲β', slot: 'waist', rarity: 8, defense: 84, slots: [2, 1], skillBonuses: [{ skillId: 'weakness-exploit', level: 2 }] },
      { id: 'arkveld-legs', name: '鎖刃龍護腿β', slot: 'legs', rarity: 8, defense: 82, slots: [2], skillBonuses: [{ skillId: 'critical-eye', level: 2 }] },
      { id: 'attack-talisman', name: '看破護石I', slot: 'talisman', rarity: 7, defense: 0, slots: [2], skillBonuses: [{ skillId: 'critical-eye', level: 1 }] },
    ],
    decorations: [
      { id: 'a-dec-1', name: '痛擊珠【2】', slotSize: 2, skillId: 'weakness-exploit', skillLevel: 1, description: '弱點特效+1' },
      { id: 'a-dec-2', name: '超心珠【2】', slotSize: 2, skillId: 'critical-boost', skillLevel: 1, description: '超會心+1' },
      { id: 'a-dec-3', name: '攻擊珠II【2】', slotSize: 2, skillId: 'attack-boost', skillLevel: 1, description: '攻擊+1' },
    ],
    setBonuses: [
      {
        setName: '鎖刃龍',
        piecesRequired: 4,
        bonusName: '鎖刃龍混裝收益',
        description: '以高會心技能為主軸，提升對弱點命中時的爆發傷害。',
      },
    ],
    highlightedSkillIds: ['critical-eye', 'weakness-exploit', 'critical-boost', 'attack-boost'],
    defenseStats: {
      physical: 416,
      elemental: 20,
      resistances: { fire: 1, water: 0, thunder: 3, ice: -2, dragon: 5 },
    },
    notes: [
      '此配裝只使用目前資料庫內的荒野版本裝備。',
      '若習慣高風險輸出，可再補挑戰珠提高憤怒期傷害。',
    ],
  },
  {
    id: 'wilds-defense-guardian',
    playstyle: 'defense',
    title: '護鎖刃龍高生存防禦配裝',
    summary: '以護鎖刃龍＋水獸混裝堆疊精靈加護、體力增強與防禦，適合拓荒與多人連線。',
    weapon: {
      label: '護鎖刃龍衍生（長槍／銃槍）',
      weaponType: '長槍',
      reason: '格擋武器可完整吃到防禦技能收益，容錯率高。',
    },
    armor: [
      { id: 'g-arkveld-head', name: '護鎖刃龍頭盔β', slot: 'head', rarity: 8, defense: 86, slots: [2, 1], skillBonuses: [{ skillId: 'weakness-exploit', level: 2 }] },
      { id: 'duna-chest', name: '水獸鎧甲β', slot: 'chest', rarity: 6, defense: 72, slots: [2], skillBonuses: [{ skillId: 'health-boost', level: 2 }] },
      { id: 'g-arkveld-arms', name: '護鎖刃龍臂甲β', slot: 'arms', rarity: 8, defense: 84, slots: [2, 1], skillBonuses: [{ skillId: 'critical-boost', level: 2 }] },
      { id: 'gravios-waist', name: '鎧龍腰甲β', slot: 'waist', rarity: 6, defense: 86, slots: [1, 1], skillBonuses: [{ skillId: 'divine-blessing', level: 1 }, { skillId: 'health-boost', level: 1 }] },
      { id: 'duna-legs', name: '水獸護腿β', slot: 'legs', rarity: 6, defense: 68, slots: [2], skillBonuses: [{ skillId: 'divine-blessing', level: 1 }] },
      { id: 'defense-talisman', name: '防禦護石I', slot: 'talisman', rarity: 6, defense: 0, slots: [1], skillBonuses: [{ skillId: 'guard', level: 1 }] },
    ],
    decorations: [
      { id: 'd-dec-1', name: '鐵壁珠【1】', slotSize: 1, skillId: 'guard', skillLevel: 1, description: '防禦+1' },
      { id: 'd-dec-2', name: '體力珠【1】', slotSize: 1, skillId: 'health-boost', skillLevel: 1, description: '體力增強+1' },
      { id: 'd-dec-3', name: '加護珠【1】', slotSize: 1, skillId: 'divine-blessing', skillLevel: 1, description: '精靈加護+1' },
    ],
    setBonuses: [
      {
        setName: '護鎖刃龍',
        piecesRequired: 3,
        bonusName: '護鎖刃龍防禦收益',
        description: '偏向穩定作戰，適合需要高生存容錯的狩獵節奏。',
      },
    ],
    highlightedSkillIds: ['guard', 'health-boost', 'divine-blessing'],
    defenseStats: {
      physical: 396,
      elemental: 22,
      resistances: { fire: 0, water: 4, thunder: 1, ice: 1, dragon: 2 },
    },
    notes: [
      '此配裝以容錯優先，適合首次挑戰高風險任務。',
      '如需輸出可將腰部改為鎖刃龍腰甲β。',
    ],
  },
  {
    id: 'wilds-balanced-reydau',
    playstyle: 'balanced',
    title: '雷爪龍均衡泛用配裝',
    summary: '雷爪龍與怒獸混裝，兼顧會心、攻擊與機動技能，適合多武器與日常狩獵。',
    weapon: {
      label: '雷爪龍衍生（片手劍／雙劍）',
      weaponType: '片手劍',
      reason: '泛用近戰武器可同時享受攻擊與迴避性能帶來的穩定收益。',
    },
    armor: [
      { id: 'reydau-head', name: '雷爪龍頭盔β', slot: 'head', rarity: 7, defense: 76, slots: [2], skillBonuses: [{ skillId: 'critical-eye', level: 2 }] },
      { id: 'rompo-chest', name: '爆鱗龍鎧甲β', slot: 'chest', rarity: 6, defense: 72, slots: [1, 1], skillBonuses: [{ skillId: 'weakness-exploit', level: 1 }] },
      { id: 'dosha-arms', name: '怒獸臂甲β', slot: 'arms', rarity: 6, defense: 72, slots: [1], skillBonuses: [{ skillId: 'health-boost', level: 1 }] },
      { id: 'reydau-waist', name: '雷爪龍腰甲β', slot: 'waist', rarity: 7, defense: 76, slots: [1, 1], skillBonuses: [{ skillId: 'critical-eye', level: 1 }] },
      { id: 'reydau-legs', name: '雷爪龍護腿β', slot: 'legs', rarity: 7, defense: 74, slots: [2], skillBonuses: [{ skillId: 'evade-window', level: 2 }] },
      { id: 'balanced-talisman', name: '攻擊護石I', slot: 'talisman', rarity: 6, defense: 0, slots: [1], skillBonuses: [{ skillId: 'attack-boost', level: 1 }] },
    ],
    decorations: [
      { id: 'b-dec-1', name: '看破珠【1】', slotSize: 1, skillId: 'critical-eye', skillLevel: 1, description: '看破+1' },
      { id: 'b-dec-2', name: '攻擊珠【1】', slotSize: 1, skillId: 'attack-boost', skillLevel: 1, description: '攻擊+1' },
      { id: 'b-dec-3', name: '迴避珠【2】', slotSize: 2, skillId: 'evade-window', skillLevel: 1, description: '迴避性能+1' },
    ],
    setBonuses: [
      {
        setName: '雷爪龍',
        piecesRequired: 3,
        bonusName: '雷爪龍混裝收益',
        description: '提供穩定會心與靈活輸出節奏，對多數任務都友善。',
      },
    ],
    highlightedSkillIds: ['critical-eye', 'weakness-exploit', 'attack-boost', 'evade-window'],
    defenseStats: {
      physical: 370,
      elemental: 18,
      resistances: { fire: 1, water: -1, thunder: 4, ice: 0, dragon: 0 },
    },
    notes: [
      '均衡配裝適合不鎖定單一魔物的日常狩獵。',
      '若想更兇可把胸甲改鎖刃龍鎧甲β。',
    ],
  },
];
