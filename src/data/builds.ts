import { Build } from '../types';

export const builds: Build[] = [
  // ────────────────────────────────────────────────────────────────
  // 攻擊型：百暴弱特配裝
  // 護雷顎龍×2 + 鎖刃龍×1 + 黑蝕龍×2
  // 套裝：護雷顎龍2件、黑蝕龍2件
  // 孔位總計：[3,1] + [2] + [2,1] + [2] + [2,1] + [2] = 1×3孔 + 5×2孔 + 3×1孔
  // 技能總計：弱點特效5・超會心5・看破5・攻擊5
  // ────────────────────────────────────────────────────────────────
  {
    id: 'attack-build',
    playstyle: 'attack',
    title: '百暴弱特配裝',
    summary: '以高會心率為核心，配合弱點特效和超會心追求極限爆擊輸出。弱點特效Lv5・超會心Lv5・看破Lv5・攻擊Lv5全達成。',
    weapon: {
      label: '鎖刃龍派生太刀',
      weaponType: '太刀',
      reason: '高倍率配合太刀的見切斬和居合，能穩定打出弱點會心傷害。',
    },
    armor: [
      {
        id: 'attack-head',
        name: '護雷顎龍頭盔β',
        slot: 'head',
        rarity: 8,
        defense: 82,
        slots: [2],
        skillBonuses: [{ skillId: 'weakness-exploit', level: 2 }],
      },
      {
        id: 'attack-chest',
        name: '鎖刃龍鎧甲β',
        slot: 'chest',
        rarity: 8,
        defense: 84,
        slots: [3, 1],
        skillBonuses: [{ skillId: 'critical-boost', level: 2 }],
      },
      {
        id: 'attack-arms',
        name: '護雷顎龍臂甲β',
        slot: 'arms',
        rarity: 8,
        defense: 80,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'critical-eye', level: 2 }],
      },
      {
        id: 'attack-waist',
        name: '黑蝕龍腰甲β',
        slot: 'waist',
        rarity: 7,
        defense: 78,
        slots: [2],
        skillBonuses: [{ skillId: 'critical-boost', level: 2 }],
      },
      {
        id: 'attack-legs',
        name: '黑蝕龍護腿β',
        slot: 'legs',
        rarity: 7,
        defense: 76,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'weakness-exploit', level: 2 }],
      },
      {
        id: 'attack-talisman',
        name: '痛擊護石II',
        slot: 'talisman',
        rarity: 7,
        defense: 0,
        slots: [2],
        skillBonuses: [{ skillId: 'weakness-exploit', level: 1 }],
      },
    ],
    // 填滿全部9個孔位：
    //   頭[2]        → 超心珠【2】          超會心 4→5
    //   胸[3]        → 攻擊珠II【2】（入3孔） 攻擊 0→1
    //   胸[1]        → 看破珠【1】           看破 2→3
    //   手[2]        → 攻擊珠II【2】          攻擊 1→2
    //   手[1]        → 看破珠【1】           看破 3→4
    //   腰[2]        → 攻擊珠II【2】          攻擊 2→3
    //   腳[2]        → 攻擊珠II【2】          攻擊 3→4
    //   腳[1]        → 看破珠【1】           看破 4→5
    //   護石[2]      → 攻擊珠II【2】          攻擊 4→5
    decorations: [
      { id: 'atk-d1', name: '超心珠【2】',    slotSize: 2, skillId: 'critical-boost',   skillLevel: 1, description: '超會心+1 → Lv5（頭[2]）' },
      { id: 'atk-d2', name: '攻擊珠II【2】',  slotSize: 2, skillId: 'attack-boost',     skillLevel: 1, description: '攻擊+1（胸[3]→入2孔珠）' },
      { id: 'atk-d3', name: '看破珠【1】',    slotSize: 1, skillId: 'critical-eye',     skillLevel: 1, description: '看破+1（胸[1]）' },
      { id: 'atk-d4', name: '攻擊珠II【2】',  slotSize: 2, skillId: 'attack-boost',     skillLevel: 1, description: '攻擊+1（手[2]）' },
      { id: 'atk-d5', name: '看破珠【1】',    slotSize: 1, skillId: 'critical-eye',     skillLevel: 1, description: '看破+1（手[1]）' },
      { id: 'atk-d6', name: '攻擊珠II【2】',  slotSize: 2, skillId: 'attack-boost',     skillLevel: 1, description: '攻擊+1（腰[2]）' },
      { id: 'atk-d7', name: '攻擊珠II【2】',  slotSize: 2, skillId: 'attack-boost',     skillLevel: 1, description: '攻擊+1（腳[2]）' },
      { id: 'atk-d8', name: '看破珠【1】',    slotSize: 1, skillId: 'critical-eye',     skillLevel: 1, description: '看破+1 → Lv5（腳[1]）' },
      { id: 'atk-d9', name: '攻擊珠II【2】',  slotSize: 2, skillId: 'attack-boost',     skillLevel: 1, description: '攻擊+1 → Lv5（護石[2]）' },
    ],
    setBonuses: [
      {
        setName: '護雷顎龍',
        piecesRequired: 2,
        bonusName: '震雷加護',
        description: '雷屬性攻擊力+10，抗雷+5。對大量弱雷魔物進一步提升傷害。',
      },
      {
        setName: '黑蝕龍',
        piecesRequired: 2,
        bonusName: '腐蝕侵蝕',
        description: '攻擊魔物傷口時，會心率額外+5%。配合弱點特效，傷口命中時最高可達+55%。',
      },
    ],
    highlightedSkillIds: ['weakness-exploit', 'critical-boost', 'critical-eye', 'attack-boost'],
    defenseStats: {
      physical: 400,
      elemental: 22,
      resistances: { fire: 6, water: -2, thunder: 8, ice: -4, dragon: 2 },
    },
    notes: [
      '弱點特效Lv5：弱點+30%・傷口+50%，配合看破Lv5後會心率穩定超過100%。',
      '超會心Lv5：暴擊傷害×1.40，高會心率下輸出極限。',
      '如果不熟悉走位，可將一顆攻擊珠II換成體力珠【1】增加容錯。',
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // 防守型：鐵壁生存配裝
  // 鎧龍×3 + 雄火龍×2
  // 套裝：鎧龍3件（含2件效果）、雄火龍2件
  // 孔位總計：[1] + [2,1] + [2,1] + [1,1] + [2] + [1] = 3×2孔 + 6×1孔
  // 技能總計：防禦5・體力增強3・精靈加護3・攻擊5・看破2
  // ────────────────────────────────────────────────────────────────
  {
    id: 'defense-build',
    playstyle: 'defense',
    title: '鐵壁生存配裝',
    summary: '防禦Lv5全格擋，體力增強Lv3與精靈加護Lv3保障生存，攻擊Lv5維持輸出效率。',
    weapon: {
      label: '鎧龍派生長槍',
      weaponType: '長槍',
      reason: '長槍的防禦能力出色，配合防禦技能可安全應對大部分攻擊。',
    },
    armor: [
      {
        id: 'def-head',
        name: '鎧龍頭盔β',
        slot: 'head',
        rarity: 6,
        defense: 86,
        slots: [1],
        skillBonuses: [{ skillId: 'guard', level: 2 }],
      },
      {
        id: 'def-chest',
        name: '鎧龍鎧甲β',
        slot: 'chest',
        rarity: 6,
        defense: 88,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'guard', level: 2 }],
      },
      {
        id: 'def-arms',
        name: '雄火龍臂甲β',
        slot: 'arms',
        rarity: 6,
        defense: 80,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'attack-boost', level: 1 }],
      },
      {
        id: 'def-waist',
        name: '鎧龍腰甲β',
        slot: 'waist',
        rarity: 6,
        defense: 84,
        slots: [1, 1],
        skillBonuses: [{ skillId: 'divine-blessing', level: 1 }],
      },
      {
        id: 'def-legs',
        name: '雄火龍護腿β',
        slot: 'legs',
        rarity: 6,
        defense: 82,
        slots: [2],
        skillBonuses: [{ skillId: 'health-boost', level: 2 }],
      },
      {
        id: 'def-talisman',
        name: '鐵壁護石II',
        slot: 'talisman',
        rarity: 6,
        defense: 0,
        slots: [1],
        skillBonuses: [{ skillId: 'guard', level: 1 }],
      },
    ],
    // 填滿全部9個孔位：
    //   頭[1]        → 體力珠【1】           體力 2→3
    //   胸[2]        → 攻擊珠II【2】          攻擊 1→2
    //   胸[1]        → 加護珠【1】           精靈 1→2
    //   手[2]        → 看破珠II【2】          看破 0→1
    //   手[1]        → 攻擊珠【1】           攻擊 2→3
    //   腰[1]        → 加護珠【1】           精靈 2→3
    //   腰[1]        → 攻擊珠【1】           攻擊 3→4
    //   腳[2]        → 看破珠II【2】          看破 1→2
    //   護石[1]      → 攻擊珠【1】           攻擊 4→5
    decorations: [
      { id: 'def-d1', name: '體力珠【1】',    slotSize: 1, skillId: 'health-boost',     skillLevel: 1, description: '體力增強+1 → Lv3（頭[1]）' },
      { id: 'def-d2', name: '攻擊珠II【2】',  slotSize: 2, skillId: 'attack-boost',     skillLevel: 1, description: '攻擊+1（胸[2]）' },
      { id: 'def-d3', name: '加護珠【1】',    slotSize: 1, skillId: 'divine-blessing',  skillLevel: 1, description: '精靈加護+1（胸[1]）' },
      { id: 'def-d4', name: '看破珠II【2】',  slotSize: 2, skillId: 'critical-eye',     skillLevel: 1, description: '看破+1（手[2]）' },
      { id: 'def-d5', name: '攻擊珠【1】',    slotSize: 1, skillId: 'attack-boost',     skillLevel: 1, description: '攻擊+1（手[1]）' },
      { id: 'def-d6', name: '加護珠【1】',    slotSize: 1, skillId: 'divine-blessing',  skillLevel: 1, description: '精靈加護+1 → Lv3（腰[1]）' },
      { id: 'def-d7', name: '攻擊珠【1】',    slotSize: 1, skillId: 'attack-boost',     skillLevel: 1, description: '攻擊+1（腰[1]）' },
      { id: 'def-d8', name: '看破珠II【2】',  slotSize: 2, skillId: 'critical-eye',     skillLevel: 1, description: '看破+1 → Lv2（腳[2]）' },
      { id: 'def-d9', name: '攻擊珠【1】',    slotSize: 1, skillId: 'attack-boost',     skillLevel: 1, description: '攻擊+1 → Lv5（護石[1]）' },
    ],
    setBonuses: [
      {
        setName: '鎧龍',
        piecesRequired: 2,
        bonusName: '岩盾之備（2件）',
        description: '格擋成功時，耐力消耗減少15%。配合防禦Lv5，長時間格擋更穩定。',
      },
      {
        setName: '鎧龍',
        piecesRequired: 3,
        bonusName: '岩盾之備（3件）',
        description: '防禦值+20，受到大型攻擊時有機率觸發無傷效果。3件全開額外加成。',
      },
      {
        setName: '雄火龍',
        piecesRequired: 2,
        bonusName: '炎王之威',
        description: '火屬性攻擊力+10。對雙翼類及火屬性攻擊的傷害小幅提升。',
      },
    ],
    highlightedSkillIds: ['guard', 'divine-blessing', 'health-boost', 'attack-boost'],
    defenseStats: {
      physical: 420,
      elemental: 26,
      resistances: { fire: 10, water: 4, thunder: 2, ice: 2, dragon: -6 },
    },
    notes: [
      '防禦Lv5：格擋時幾乎不後退，耐力消耗最低，長槍守勢反擊節奏極穩。',
      '精靈加護Lv3：有35%機率減少受傷35%，遇到高傷害技有救。',
      '已熟悉魔物後可將2顆看破珠II換成痛擊珠【2】，補入弱點特效。',
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // 全能型：泛用攻守配裝
  // 雄火龍×2 + 黑蝕龍×2 + 鎧龍×1
  // 套裝：雄火龍2件、黑蝕龍2件（鎧龍1件無效果）
  // 孔位總計：[1,1] + [2,1] + [2] + [1,1] + [2,1] + [1] = 3×2孔 + 7×1孔
  // 技能總計：攻擊5・看破5・弱點特效3・體力增強3・迴避性能2・精靈加護2
  // ────────────────────────────────────────────────────────────────
  {
    id: 'balanced-build',
    playstyle: 'balanced',
    title: '泛用攻守配裝',
    summary: '攻擊Lv5、看破Lv5、弱點特效Lv3、體力增強Lv3均衡分配，適合各種武器和場合的萬用配裝。',
    weapon: {
      label: '雄火龍派生片手劍',
      weaponType: '片手劍',
      reason: '片手劍攻守兼備，可使用道具不收刀，靈活應對各種狀況。',
    },
    armor: [
      {
        id: 'bal-head',
        name: '雄火龍頭盔β',
        slot: 'head',
        rarity: 6,
        defense: 72,
        slots: [1, 1],
        skillBonuses: [{ skillId: 'attack-boost', level: 2 }],
      },
      {
        id: 'bal-chest',
        name: '黑蝕龍鎧甲β',
        slot: 'chest',
        rarity: 7,
        defense: 76,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'critical-eye', level: 2 }],
      },
      {
        id: 'bal-arms',
        name: '雄火龍臂甲β',
        slot: 'arms',
        rarity: 6,
        defense: 70,
        slots: [2],
        skillBonuses: [{ skillId: 'weakness-exploit', level: 1 }],
      },
      {
        id: 'bal-waist',
        name: '鎧龍腰甲β',
        slot: 'waist',
        rarity: 6,
        defense: 74,
        slots: [1, 1],
        skillBonuses: [{ skillId: 'health-boost', level: 2 }],
      },
      {
        id: 'bal-legs',
        name: '黑蝕龍護腿β',
        slot: 'legs',
        rarity: 7,
        defense: 73,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'evade-window', level: 2 }],
      },
      {
        id: 'bal-talisman',
        name: '攻擊護石II',
        slot: 'talisman',
        rarity: 5,
        defense: 0,
        slots: [1],
        skillBonuses: [{ skillId: 'attack-boost', level: 1 }],
      },
    ],
    // 填滿全部10個孔位：
    //   頭[1]        → 體力珠【1】           體力 2→3
    //   頭[1]        → 看破珠【1】           看破 2→3
    //   胸[2]        → 痛擊珠【2】           弱特 1→2
    //   胸[1]        → 看破珠【1】           看破 3→4
    //   手[2]        → 痛擊珠【2】           弱特 2→3
    //   腰[1]        → 攻擊珠【1】           攻擊 3→4
    //   腰[1]        → 看破珠【1】           看破 4→5
    //   腳[2]        → 攻擊珠II【2】          攻擊 4→5
    //   腳[1]        → 加護珠【1】           精靈 0→1
    //   護石[1]      → 加護珠【1】           精靈 1→2
    decorations: [
      { id: 'bal-d1',  name: '體力珠【1】',    slotSize: 1, skillId: 'health-boost',    skillLevel: 1, description: '體力增強+1 → Lv3（頭[1]）' },
      { id: 'bal-d2',  name: '看破珠【1】',    slotSize: 1, skillId: 'critical-eye',    skillLevel: 1, description: '看破+1（頭[1]）' },
      { id: 'bal-d3',  name: '痛擊珠【2】',    slotSize: 2, skillId: 'weakness-exploit',skillLevel: 1, description: '弱點特效+1（胸[2]）' },
      { id: 'bal-d4',  name: '看破珠【1】',    slotSize: 1, skillId: 'critical-eye',    skillLevel: 1, description: '看破+1（胸[1]）' },
      { id: 'bal-d5',  name: '痛擊珠【2】',    slotSize: 2, skillId: 'weakness-exploit',skillLevel: 1, description: '弱點特效+1 → Lv3（手[2]）' },
      { id: 'bal-d6',  name: '攻擊珠【1】',    slotSize: 1, skillId: 'attack-boost',    skillLevel: 1, description: '攻擊+1（腰[1]）' },
      { id: 'bal-d7',  name: '看破珠【1】',    slotSize: 1, skillId: 'critical-eye',    skillLevel: 1, description: '看破+1 → Lv5（腰[1]）' },
      { id: 'bal-d8',  name: '攻擊珠II【2】',  slotSize: 2, skillId: 'attack-boost',    skillLevel: 1, description: '攻擊+1 → Lv5（腳[2]）' },
      { id: 'bal-d9',  name: '加護珠【1】',    slotSize: 1, skillId: 'divine-blessing', skillLevel: 1, description: '精靈加護+1（腳[1]）' },
      { id: 'bal-d10', name: '加護珠【1】',    slotSize: 1, skillId: 'divine-blessing', skillLevel: 1, description: '精靈加護+1 → Lv2（護石[1]）' },
    ],
    setBonuses: [
      {
        setName: '雄火龍',
        piecesRequired: 2,
        bonusName: '炎王之威',
        description: '火屬性攻擊力+10。對飛龍種弱點部位有額外傷害加成。',
      },
      {
        setName: '黑蝕龍',
        piecesRequired: 2,
        bonusName: '腐蝕侵蝕',
        description: '攻擊魔物傷口時，會心率額外+5%。配合弱點特效Lv3效果更佳。',
      },
    ],
    highlightedSkillIds: ['attack-boost', 'critical-eye', 'weakness-exploit', 'health-boost'],
    defenseStats: {
      physical: 365,
      elemental: 20,
      resistances: { fire: 8, water: 0, thunder: 2, ice: -2, dragon: 0 },
    },
    notes: [
      '攻擊、看破均達Lv5，弱點特效Lv3，輸出效率接近攻擊型但容錯更高。',
      '若覺得生存壓力不大，可將2顆加護珠換成看破珠II升至看破Lv5後再加攻擊珠。',
      '迴避性能Lv2已具備一定的無敵幀延長，靈活閃避的武器（雙劍、弓）效果更佳。',
    ],
  },
];
