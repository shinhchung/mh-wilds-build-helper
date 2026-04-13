import { Build } from '../types';

// ────────────────────────────────────────────────────────────────
// 支援型：廣域加奶配裝
// 影蜘蛛×2 + 水獸×2 + 桃毛獸王×1
// 套裝：影蜘蛛2件、水獸2件
// 孔位總計：[1,1] + [2,1] + [2,1] + [1,1] + [2] + [1] = 3×2孔 + 6×1孔
// 技能總計：廣域化5・加速進食3・體力增強3・精靈加護3・攻擊5
// ────────────────────────────────────────────────────────────────

export const builds: Build[] = [
  // ────────────────────────────────────────────────────────────────
  // 攻擊型：黑角龍絕頂攻擊配裝（TU4 Meta）
  // 黑角龍×4 + 倒鎧龍×1
  // 套裝：黑角龍2件「暴走病毒」、黑角龍4件「黑蝕升華」
  // 孔位：[2,1]+[2,2]+[2,1]+[2,1]+[2,1]+[2] = 7×2孔 + 4×1孔 = 11孔
  // 技能總計：弱點特效5（甲）・挑戰者5（甲+珠）・超會心5（甲+珠）・看破5（甲+珠）・攻擊5（珠）・連擊1（珠）
  // ────────────────────────────────────────────────────────────────
  {
    id: 'attack-build',
    playstyle: 'attack',
    title: '黑角龍絕頂攻擊配裝',
    summary: '黑角龍4件套「黑蝕升華」核心。暴走病毒克服後永久+10%會心+10攻擊，配合挑戰者Lv5憤怒時再+15%會心，弱點特效Lv5傷口+50%，輸出天花板。',
    weapon: {
      label: '黑角龍派生太刀／大劍',
      weaponType: '太刀',
      reason: '太刀見切斬居合可穩定打弱點傷口；大劍蓄力斬配合+25%會心率傷害爆炸。',
    },
    armor: [
      {
        id: 'attack-head',
        name: '黑角龍頭盔β',
        slot: 'head',
        rarity: 8,
        defense: 88,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'critical-eye', level: 2 }],
      },
      {
        id: 'attack-chest',
        name: '黑角龍鎧甲β',
        slot: 'chest',
        rarity: 8,
        defense: 92,
        slots: [2, 2],
        skillBonuses: [
          { skillId: 'weakness-exploit', level: 2 },
          { skillId: 'agitator', level: 1 },
        ],
      },
      {
        id: 'attack-arms',
        name: '黑角龍臂甲β',
        slot: 'arms',
        rarity: 8,
        defense: 84,
        slots: [2, 1],
        skillBonuses: [
          { skillId: 'weakness-exploit', level: 1 },
          { skillId: 'critical-boost', level: 2 },
        ],
      },
      {
        id: 'attack-waist',
        name: '黑角龍腰甲β',
        slot: 'waist',
        rarity: 8,
        defense: 86,
        slots: [2, 1],
        skillBonuses: [
          { skillId: 'agitator', level: 2 },
          { skillId: 'critical-eye', level: 1 },
        ],
      },
      {
        id: 'attack-legs',
        name: '倒鎧龍護腿β',
        slot: 'legs',
        rarity: 8,
        defense: 80,
        slots: [2, 1],
        skillBonuses: [
          { skillId: 'critical-boost', level: 2 },
          { skillId: 'weakness-exploit', level: 2 },
        ],
      },
      {
        id: 'attack-talisman',
        name: '看破護石I',
        slot: 'talisman',
        rarity: 7,
        defense: 0,
        slots: [2],
        skillBonuses: [{ skillId: 'critical-eye', level: 1 }],
      },
    ],
    // 甲技能：弱特5(MAX)・挑戰者3・超會心4・看破4（含護石）
    // 填滿全部11個孔位：
    //   頭[2]   → 挑戰珠【2】   挑戰者 3→4
    //   頭[1]   → 看破珠【1】   看破 4→5
    //   胸[2]   → 挑戰珠【2】   挑戰者 4→5
    //   胸[2]   → 超心珠【2】   超會心 4→5
    //   手[2]   → 攻擊珠II【2】 攻擊 0→1
    //   手[1]   → 攻擊珠【1】   攻擊 1→2
    //   腰[2]   → 攻擊珠II【2】 攻擊 2→3
    //   腰[1]   → 連擊珠【1】   連擊 0→1
    //   腳[2]   → 攻擊珠II【2】 攻擊 3→4
    //   腳[1]   → 攻擊珠【1】   攻擊 4→5
    //   護石[2] → 連擊珠【1】   連擊 1→2（1孔珠入2孔槽）
    decorations: [
      { id: 'atk-d1',  name: '挑戰珠【2】',   slotSize: 2, skillId: 'agitator',        skillLevel: 1, description: '挑戰者+1（頭[2]）' },
      { id: 'atk-d2',  name: '看破珠【1】',   slotSize: 1, skillId: 'critical-eye',    skillLevel: 1, description: '看破+1 → Lv5（頭[1]）' },
      { id: 'atk-d3',  name: '挑戰珠【2】',   slotSize: 2, skillId: 'agitator',        skillLevel: 1, description: '挑戰者+1 → Lv5（胸[2]）' },
      { id: 'atk-d4',  name: '超心珠【2】',   slotSize: 2, skillId: 'critical-boost',  skillLevel: 1, description: '超會心+1 → Lv5（胸[2]）' },
      { id: 'atk-d5',  name: '攻擊珠II【2】', slotSize: 2, skillId: 'attack-boost',    skillLevel: 1, description: '攻擊+1（手[2]）' },
      { id: 'atk-d6',  name: '攻擊珠【1】',   slotSize: 1, skillId: 'attack-boost',    skillLevel: 1, description: '攻擊+1（手[1]）' },
      { id: 'atk-d7',  name: '攻擊珠II【2】', slotSize: 2, skillId: 'attack-boost',    skillLevel: 1, description: '攻擊+1（腰[2]）' },
      { id: 'atk-d8',  name: '連擊珠【1】',   slotSize: 1, skillId: 'burst',           skillLevel: 1, description: '連擊+1（腰[1]）' },
      { id: 'atk-d9',  name: '攻擊珠II【2】', slotSize: 2, skillId: 'attack-boost',    skillLevel: 1, description: '攻擊+1（腳[2]）' },
      { id: 'atk-d10', name: '攻擊珠【1】',   slotSize: 1, skillId: 'attack-boost',    skillLevel: 1, description: '攻擊+1 → Lv5（腳[1]）' },
      { id: 'atk-d11', name: '連擊珠【1】',   slotSize: 1, skillId: 'burst',           skillLevel: 1, description: '連擊+1 → Lv2（護石[2]→入1孔）' },
    ],
    setBonuses: [
      {
        setName: '黑角龍',
        piecesRequired: 2,
        bonusName: '暴走病毒（2件）',
        description: '狩獵中感染暴走病毒。克服病毒後，會心率永久+10%，可再次感染累積效果。',
      },
      {
        setName: '黑角龍',
        piecesRequired: 4,
        bonusName: '黑蝕升華（4件）',
        description: '克服暴走病毒後，額外獲得攻擊力+10、會心率+10%（合計+20%）。並解鎖脫大者和抗暴走效果。',
      },
    ],
    highlightedSkillIds: ['weakness-exploit', 'agitator', 'critical-boost', 'critical-eye', 'attack-boost'],
    defenseStats: {
      physical: 430,
      elemental: 24,
      resistances: { fire: 2, water: -4, thunder: 4, ice: -6, dragon: 8 },
    },
    notes: [
      '黑蝕升華4件：克服暴走後全程+20%會心+10攻，配合挑戰者Lv5憤怒追加+15%，弱點傷口時會心率輕鬆超過100%。',
      '弱點特效Lv5（裝甲滿足）：弱點+30%・傷口+50%，不需任何痛擊珠。',
      '超會心Lv5：暴擊×1.40倍，100%會心率下每擊都是最大傷害。',
      '如尚未解鎖黑角龍β，可暫用護雷顎龍頭盔+鎖刃鎧甲過渡，技能接近但缺少套裝加成。',
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

  // ────────────────────────────────────────────────────────────────
  // 支援型：廣域加奶配裝
  // ────────────────────────────────────────────────────────────────
  {
    id: 'support-build',
    playstyle: 'support',
    title: '廣域加奶配裝',
    summary: '廣域化Lv5令所有回復道具效果100%傳遞給全隊，加速進食Lv3縮短用藥時間。自身亦達攻擊Lv5，不影響輸出節奏。',
    weapon: {
      label: '任何武器',
      weaponType: '片手劍',
      reason: '片手劍可不收刀使用道具，加奶效率最高。',
    },
    armor: [
      {
        id: 'sup-head',
        name: '影蜘蛛頭盔β',
        slot: 'head',
        rarity: 7,
        defense: 68,
        slots: [1, 1],
        skillBonuses: [{ skillId: 'wide-range', level: 2 }],
      },
      {
        id: 'sup-chest',
        name: '影蜘蛛鎧甲β',
        slot: 'chest',
        rarity: 7,
        defense: 72,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'wide-range', level: 2 }],
      },
      {
        id: 'sup-arms',
        name: '水獸臂甲β',
        slot: 'arms',
        rarity: 6,
        defense: 64,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'speed-eating', level: 2 }],
      },
      {
        id: 'sup-waist',
        name: '水獸腰甲β',
        slot: 'waist',
        rarity: 6,
        defense: 62,
        slots: [1, 1],
        skillBonuses: [{ skillId: 'divine-blessing', level: 1 }],
      },
      {
        id: 'sup-legs',
        name: '桃毛獸王護腿β',
        slot: 'legs',
        rarity: 6,
        defense: 66,
        slots: [2],
        skillBonuses: [{ skillId: 'health-boost', level: 2 }],
      },
      {
        id: 'sup-talisman',
        name: '廣域護石II',
        slot: 'talisman',
        rarity: 6,
        defense: 0,
        slots: [1],
        skillBonuses: [{ skillId: 'wide-range', level: 1 }],
      },
    ],
    // 填滿全部9個孔位：
    //   頭[1]        → 加速珠【1】           加速進食 2→3
    //   頭[1]        → 加護珠【1】           精靈加護 1→2
    //   胸[2]        → 攻擊珠II【2】          攻擊 0→1
    //   胸[1]        → 加護珠【1】           精靈加護 2→3
    //   手[2]        → 攻擊珠II【2】          攻擊 1→2
    //   手[1]        → 體力珠【1】           體力 2→3
    //   腰[1]        → 攻擊珠【1】           攻擊 2→3
    //   腰[1]        → 攻擊珠【1】           攻擊 3→4
    //   腳[2]        → 攻擊珠II【2】          攻擊 4→5
    //   護石[1]      → 攻擊珠【1】           攻擊補至Lv5... 但護石 1 slot
    //   （廣域化已由裝甲達Lv5，護石孔填攻擊）
    decorations: [
      { id: 'sup-d1', name: '加速珠【1】',    slotSize: 1, skillId: 'speed-eating',    skillLevel: 1, description: '加速進食+1 → Lv3（頭[1]）' },
      { id: 'sup-d2', name: '加護珠【1】',    slotSize: 1, skillId: 'divine-blessing', skillLevel: 1, description: '精靈加護+1（頭[1]）' },
      { id: 'sup-d3', name: '攻擊珠II【2】',  slotSize: 2, skillId: 'attack-boost',    skillLevel: 1, description: '攻擊+1（胸[2]）' },
      { id: 'sup-d4', name: '加護珠【1】',    slotSize: 1, skillId: 'divine-blessing', skillLevel: 1, description: '精靈加護+1 → Lv3（胸[1]）' },
      { id: 'sup-d5', name: '攻擊珠II【2】',  slotSize: 2, skillId: 'attack-boost',    skillLevel: 1, description: '攻擊+1（手[2]）' },
      { id: 'sup-d6', name: '體力珠【1】',    slotSize: 1, skillId: 'health-boost',    skillLevel: 1, description: '體力增強+1 → Lv3（手[1]）' },
      { id: 'sup-d7', name: '攻擊珠【1】',    slotSize: 1, skillId: 'attack-boost',    skillLevel: 1, description: '攻擊+1（腰[1]）' },
      { id: 'sup-d8', name: '攻擊珠【1】',    slotSize: 1, skillId: 'attack-boost',    skillLevel: 1, description: '攻擊+1（腰[1]）' },
      { id: 'sup-d9', name: '攻擊珠II【2】',  slotSize: 2, skillId: 'attack-boost',    skillLevel: 1, description: '攻擊+1 → Lv5（腳[2]）' },
    ],
    setBonuses: [
      {
        setName: '影蜘蛛',
        piecesRequired: 2,
        bonusName: '蛛絲牽引',
        description: '廣域化效果量+10%（等效Lv5效果量提升至110%），隊友回復量更多。',
      },
      {
        setName: '水獸',
        piecesRequired: 2,
        bonusName: '浪息加護',
        description: '水屬性抗性+10，回復道具效果+5%。對水系魔物場合額外提升生存力。',
      },
    ],
    highlightedSkillIds: ['wide-range', 'speed-eating', 'divine-blessing', 'health-boost'],
    defenseStats: {
      physical: 332,
      elemental: 18,
      resistances: { fire: -2, water: 12, thunder: 0, ice: 4, dragon: -4 },
    },
    notes: [
      '廣域化Lv5：大回復藥、強化藥、解毒藥均100%傳遞全隊，組隊必備。',
      '加速進食Lv3：用藥速度最快＋回復量+30，快速補血後立即回到輸出位置。',
      '片手劍不收刀用藥令廣域化發動更流暢；大鎚、長槍等同樣適合此配裝。',
      '如隊伍輸出已足夠，可將3顆攻擊珠換成廣域珠【2】，確保廣域加成更穩定。',
    ],
  },
];
