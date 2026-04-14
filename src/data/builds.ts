import { Build } from '../types';

// ────────────────────────────────────────────────────────────────
// 支援型：廣域加奶配裝
// 刺花蜘蛛×2 + 水獺龍×2 + 桃毛獸×1
// 套裝：刺花蜘蛛2件、水獺龍2件
// 孔位總計：[1,1] + [2,1] + [2,1] + [1,1] + [2] + [1] = 3×2孔 + 6×1孔
// 技能總計：廣域化5・加速進食3・體力增強3・精靈加護3・攻擊5
// ────────────────────────────────────────────────────────────────

export const builds: Build[] = [
  // ────────────────────────────────────────────────────────────────
  // 攻擊型：黑角龍絕頂攻擊配裝（TU4 Meta）
  // 黑角龍×4 + 重甲龍×1
  // 套裝：黑角龍2件「暴走病毒」、黑角龍4件「黑蝕升華」
  // 孔位：[2,1]+[2,2]+[2,1]+[2,1]+[2,1]+[2] = 7×2孔 + 4×1孔 = 11孔
  // 技能總計：弱點特效5（甲）・挑戰者5（甲+珠）・超會心5（甲+珠）・看破5（甲+珠）・攻擊5（珠）・連擊1（珠）
  // ────────────────────────────────────────────────────────────────
  {
    id: 'attack-build',
    playstyle: 'attack',
    title: '黑角龍絕頂攻擊配裝',
    summary: '黑角龍4件套「黑蝕升華」核心。克服暴走病毒後會心率+15%，4件套額外於感染期間+10攻擊，配合挑戰者Lv5憤怒再+15%會心，弱點特效Lv5傷口+50%，輸出天花板。',
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
        name: '重甲龍護腿β',
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
        bonusName: '黑蝕升華 I（2件）',
        description: '狩獵大型魔物時自動感染暴走病毒；克服病毒後，會心率+15%（持續至下次感染）。',
      },
      {
        setName: '黑角龍',
        piecesRequired: 4,
        bonusName: '黑蝕升華 II（4件）',
        description: '暴走病毒感染期間攻擊力+10；克服暴走病毒後再獲攻擊力+5。',
      },
    ],
    highlightedSkillIds: ['weakness-exploit', 'agitator', 'critical-boost', 'critical-eye', 'attack-boost'],
    defenseStats: {
      physical: 430,
      elemental: 24,
      resistances: { fire: 2, water: -4, thunder: 4, ice: -6, dragon: 8 },
    },
    notes: [
      '黑蝕升華：2件克服暴走後+15%會心，4件感染期間再+10攻擊。配合挑戰者Lv5憤怒追加+15%，弱點傷口時會心率輕鬆超過100%。',
      '弱點特效Lv5（裝甲滿足）：弱點+30%・傷口+50%，不需任何痛擊珠。',
      '超會心Lv5：暴擊×1.40倍，100%會心率下每擊都是最大傷害。',
      '如尚未解鎖黑角龍β，可暫用煌雷龍頭盔+鎖刃鎧甲過渡，技能接近但缺少套裝加成。',
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // 攻擊型 V2：炎王龍鋒刃配裝（達人藝）
  // 炎王龍×2 + 黑角龍×3 + 看破護石II
  // 套裝：炎王龍2件「達人藝」・黑角龍2件「暴走病毒」
  // 孔位：[2,1]+[2,2]+[2,1]+[2,1]+[2,1]+[2] = 7×2孔 + 4×1孔 = 11孔
  // 技能：超會心5(甲MAX)・弱特5(甲MAX)・看破5(甲MAX)・挑戰者5(珠)・攻擊5(珠)・連擊3(珠)
  // ────────────────────────────────────────────────────────────────
  {
    id: 'attack-build-2',
    playstyle: 'attack',
    title: '炎王龍鋒刃配裝',
    summary: '炎王龍2件套「達人藝」——100%會心率下每次攻擊不磨刀，刃部永遠最鋒利。超會心Lv5・弱點特效Lv5・看破Lv5全從裝甲達成，珠格全投挑戰者與輸出。',
    weapon: {
      label: '炎王龍派生太刀／大劍',
      weaponType: '太刀',
      reason: '太刀/大劍刃部消耗量高，達人藝令刃部不消耗，不磨刀爭取更多攻擊時間。',
    },
    armor: [
      {
        id: 'atk2-head',
        name: '炎王龍頭盔β',
        slot: 'head',
        rarity: 9,
        defense: 92,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'critical-boost', level: 2 }, { skillId: 'weakness-exploit', level: 1 }],
      },
      {
        id: 'atk2-chest',
        name: '炎王龍鎧甲β',
        slot: 'chest',
        rarity: 9,
        defense: 94,
        slots: [2, 2],
        skillBonuses: [{ skillId: 'critical-boost', level: 2 }, { skillId: 'attack-boost', level: 1 }],
      },
      {
        id: 'atk2-arms',
        name: '黑角龍臂甲β',
        slot: 'arms',
        rarity: 8,
        defense: 84,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'weakness-exploit', level: 2 }, { skillId: 'critical-boost', level: 1 }],
      },
      {
        id: 'atk2-waist',
        name: '黑角龍腰甲β',
        slot: 'waist',
        rarity: 8,
        defense: 86,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'agitator', level: 2 }, { skillId: 'critical-eye', level: 1 }],
      },
      {
        id: 'atk2-legs',
        name: '黑角龍護腿β',
        slot: 'legs',
        rarity: 8,
        defense: 84,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'critical-eye', level: 2 }, { skillId: 'weakness-exploit', level: 2 }],
      },
      {
        id: 'atk2-talisman',
        name: '看破護石II',
        slot: 'talisman',
        rarity: 8,
        defense: 0,
        slots: [2],
        skillBonuses: [{ skillId: 'critical-eye', level: 2 }],
      },
    ],
    // 甲技能：CB=2+2+1=5(MAX)・WEX=1+2+2=5(MAX)・CE=1+2+2=5(MAX)・ATK=1・Ag=2
    // 填滿11孔：
    //   頭[2]→挑戰珠   腰[2]→攻擊珠II   腳[2]→連擊珠(入2孔)
    //   頭[1]→攻擊珠   腰[1]→連擊珠     腳[1]→連擊珠
    //   胸[2]→挑戰珠   手[2]→攻擊珠II   護石[2]→迴避珠
    //   胸[2]→挑戰珠   手[1]→攻擊珠
    decorations: [
      { id: 'atk2-d1',  name: '挑戰珠【2】', slotSize: 2, skillId: 'agitator',    skillLevel: 1, description: '挑戰者+1（頭[2]）' },
      { id: 'atk2-d2',  name: '攻擊珠【1】', slotSize: 1, skillId: 'attack-boost', skillLevel: 1, description: '攻擊+1（頭[1]）' },
      { id: 'atk2-d3',  name: '挑戰珠【2】', slotSize: 2, skillId: 'agitator',    skillLevel: 1, description: '挑戰者+1（胸[2]）' },
      { id: 'atk2-d4',  name: '挑戰珠【2】', slotSize: 2, skillId: 'agitator',    skillLevel: 1, description: '挑戰者+1 → Lv5（胸[2]）' },
      { id: 'atk2-d5',  name: '攻擊珠II【2】', slotSize: 2, skillId: 'attack-boost', skillLevel: 1, description: '攻擊+1（手[2]）' },
      { id: 'atk2-d6',  name: '攻擊珠【1】', slotSize: 1, skillId: 'attack-boost', skillLevel: 1, description: '攻擊+1（手[1]）' },
      { id: 'atk2-d7',  name: '攻擊珠II【2】', slotSize: 2, skillId: 'attack-boost', skillLevel: 1, description: '攻擊+1（腰[2]）' },
      { id: 'atk2-d8',  name: '連擊珠【1】', slotSize: 1, skillId: 'burst',        skillLevel: 1, description: '連擊+1（腰[1]）' },
      { id: 'atk2-d9',  name: '連擊珠【1】', slotSize: 1, skillId: 'burst',        skillLevel: 1, description: '連擊+1（腳[2]→入1孔）' },
      { id: 'atk2-d10', name: '連擊珠【1】', slotSize: 1, skillId: 'burst',        skillLevel: 1, description: '連擊+1 → Lv3（腳[1]）' },
      { id: 'atk2-d11', name: '迴避珠【2】', slotSize: 2, skillId: 'evade-window', skillLevel: 1, description: '迴避性能+1（護石[2]）' },
    ],
    setBonuses: [
      {
        setName: '炎王龍',
        piecesRequired: 2,
        bonusName: '達人藝',
        description: '會心擊時，武器刃部不消耗。搭配100%以上會心率，全程保持最高鋒利度，省去磨刀時間。',
      },
      {
        setName: '黑角龍',
        piecesRequired: 2,
        bonusName: '黑蝕升華 I（2件）',
        description: '狩獵大型魔物時自動感染暴走病毒；克服病毒後，會心率+15%（持續至下次感染）。',
      },
    ],
    highlightedSkillIds: ['critical-boost', 'weakness-exploit', 'agitator', 'burst'],
    defenseStats: {
      physical: 440,
      elemental: 26,
      resistances: { fire: 12, water: -6, thunder: 6, ice: -8, dragon: 8 },
    },
    notes: [
      '達人藝：100%以上會心率下每擊不消耗刃部，太刀・大劍・充能斧等高刃部消耗武器受益巨大。',
      '超會心Lv5（甲MAX）+挑戰者Lv5：憤怒時暴擊傷害×1.40＋攻擊+20＋會心+15%，傷害天花板極高。',
      '連擊Lv3：持續輸出時攻擊力+15，大劍蓄力連段・太刀見切斬節奏特別受益。',
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // 攻擊型 V3：煌雷龍高速射配裝（煌雷之電壓）
  // 煌雷龍×4 + 黑角龍×1 + 超心護石II
  // 套裝：煌雷龍4件「煌雷之電壓」・黑角龍2件「黑蝕升華 I」
  // 孔位：[2,1]+[2,2]+[2,1]+[2,1]+[2,1]+[2] = 7×2孔 + 4×1孔 = 11孔
  // 技能：看破5(甲MAX)・超會心5(甲MAX)・弱特5(珠)・挑戰者5(珠)・攻擊5(珠)・屬性暴擊Lv3(套裝)
  // ────────────────────────────────────────────────────────────────
  {
    id: 'attack-build-3',
    playstyle: 'attack',
    title: '煌雷龍高速射配裝',
    summary: '煌雷龍4件套「煌雷之電壓」——伏擊本能（Latent Power）延長至210秒，持續獲得高會心率加成。超會心Lv5+看破Lv5+弱點特效Lv5全從裝甲達成，珠格投挑戰者與攻擊。',
    weapon: {
      label: '煌雷龍輕弩／弓',
      weaponType: '輕弩',
      reason: '輕弩速射積累傷害快，伏擊本能持續發動下高會心率每發均觸發超會心，雷屬性場合輸出最強。',
    },
    armor: [
      {
        id: 'atk3-head',
        name: '煌雷龍頭盔β',
        slot: 'head',
        rarity: 8,
        defense: 90,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'critical-eye', level: 2 }],
      },
      {
        id: 'atk3-chest',
        name: '煌雷龍鎧甲β',
        slot: 'chest',
        rarity: 8,
        defense: 92,
        slots: [2, 2],
        skillBonuses: [{ skillId: 'weakness-exploit', level: 2 }],
      },
      {
        id: 'atk3-arms',
        name: '煌雷龍臂甲β',
        slot: 'arms',
        rarity: 8,
        defense: 88,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'critical-eye', level: 2 }],
      },
      {
        id: 'atk3-waist',
        name: '黑角龍腰甲β',
        slot: 'waist',
        rarity: 8,
        defense: 86,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'agitator', level: 2 }, { skillId: 'critical-boost', level: 1 }],
      },
      {
        id: 'atk3-legs',
        name: '煌雷龍護腿β',
        slot: 'legs',
        rarity: 8,
        defense: 88,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'critical-boost', level: 2 }, { skillId: 'weakness-exploit', level: 2 }],
      },
      {
        id: 'atk3-talisman',
        name: '超心護石II',
        slot: 'talisman',
        rarity: 8,
        defense: 0,
        slots: [2],
        skillBonuses: [{ skillId: 'critical-boost', level: 2 }],
      },
    ],
    // 甲技能：CE=2+2=4・WEX=2+2=4・CB=1+2+2=5(MAX)・Ag=2
    // 填滿11孔：
    //   頭[2]→挑戰珠  胸[2]→痛擊珠   手[1]→看破珠   腳[1]→攻擊珠
    //   頭[1]→看破珠  胸[2]→挑戰珠   腰[2]→攻擊珠II  護石[2]→攻擊珠II
    //   手[2]→挑戰珠  腰[1]→攻擊珠   腳[2]→攻擊珠II
    decorations: [
      { id: 'atk3-d1',  name: '挑戰珠【2】',   slotSize: 2, skillId: 'agitator',         skillLevel: 1, description: '挑戰者+1（頭[2]）' },
      { id: 'atk3-d2',  name: '看破珠【1】',   slotSize: 1, skillId: 'critical-eye',     skillLevel: 1, description: '看破+1 → Lv5（頭[1]）' },
      { id: 'atk3-d3',  name: '痛擊珠【2】',   slotSize: 2, skillId: 'weakness-exploit', skillLevel: 1, description: '弱特+1（胸[2]）' },
      { id: 'atk3-d4',  name: '挑戰珠【2】',   slotSize: 2, skillId: 'agitator',         skillLevel: 1, description: '挑戰者+1（胸[2]）' },
      { id: 'atk3-d5',  name: '挑戰珠【2】',   slotSize: 2, skillId: 'agitator',         skillLevel: 1, description: '挑戰者+1 → Lv5（手[2]）' },
      { id: 'atk3-d6',  name: '看破珠【1】',   slotSize: 1, skillId: 'critical-eye',     skillLevel: 1, description: '看破+1（手[1]）' },
      { id: 'atk3-d7',  name: '攻擊珠II【2】', slotSize: 2, skillId: 'attack-boost',     skillLevel: 1, description: '攻擊+1（腰[2]）' },
      { id: 'atk3-d8',  name: '攻擊珠【1】',   slotSize: 1, skillId: 'attack-boost',     skillLevel: 1, description: '攻擊+1（腰[1]）' },
      { id: 'atk3-d9',  name: '攻擊珠II【2】', slotSize: 2, skillId: 'attack-boost',     skillLevel: 1, description: '攻擊+1（腳[2]）' },
      { id: 'atk3-d10', name: '攻擊珠【1】',   slotSize: 1, skillId: 'attack-boost',     skillLevel: 1, description: '攻擊+1（腳[1]）' },
      { id: 'atk3-d11', name: '痛擊珠【2】',   slotSize: 2, skillId: 'weakness-exploit', skillLevel: 1, description: '弱特+1 → Lv5（護石[2]）' },
    ],
    setBonuses: [
      {
        setName: '煌雷龍',
        piecesRequired: 4,
        bonusName: '煌雷之電壓（4件）',
        description: '伏擊本能（Latent Power）發動時間延長至210秒，伏擊本能會心率提升效果持續更久，高強度戰鬥中輸出視窗最大化。',
      },
      {
        setName: '黑角龍',
        piecesRequired: 2,
        bonusName: '黑蝕升華 I（2件）',
        description: '狩獵大型魔物時自動感染暴走病毒；克服病毒後，會心率+15%（持續至下次感染）。',
      },
    ],
    highlightedSkillIds: ['critical-element', 'weakness-exploit', 'agitator', 'critical-boost'],
    defenseStats: {
      physical: 444,
      elemental: 26,
      resistances: { fire: 4, water: -2, thunder: 14, ice: -6, dragon: 2 },
    },
    notes: [
      '煌雷龍4件套煌雷之電壓：伏擊本能延長至210秒，確保整場狩獵幾乎全程維持高會心率加成。',
      '超會心Lv5+看破Lv5+弱點特效Lv5全由裝甲達成，珠格全投挑戰者Lv5與攻擊Lv5。',
      '挑戰者Lv5+弱點特效Lv5：魔物憤怒+攻擊傷口時會心率輕鬆超過100%，超會心×1.40倍爆發。',
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // 防守型：鐵壁生存配裝
  // 重甲龍×3 + 雄火龍×2
  // 套裝：重甲龍3件（含2件效果）、雄火龍2件
  // 孔位總計：[1] + [2,1] + [2,1] + [1,1] + [2] + [1] = 3×2孔 + 6×1孔
  // 技能總計：防禦5・體力增強3・精靈加護3・攻擊5・看破2
  // ────────────────────────────────────────────────────────────────
  {
    id: 'defense-build',
    playstyle: 'defense',
    title: '鐵壁生存配裝',
    summary: '防禦Lv5全格擋，體力增強Lv3與精靈加護Lv3保障生存，攻擊Lv5維持輸出效率。',
    weapon: {
      label: '重甲龍派生長槍',
      weaponType: '長槍',
      reason: '長槍的防禦能力出色，配合防禦技能可安全應對大部分攻擊。',
    },
    armor: [
      {
        id: 'def-head',
        name: '重甲龍頭盔β',
        slot: 'head',
        rarity: 6,
        defense: 86,
        slots: [1],
        skillBonuses: [{ skillId: 'guard', level: 2 }],
      },
      {
        id: 'def-chest',
        name: '重甲龍鎧甲β',
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
        name: '重甲龍腰甲β',
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
        setName: '重甲龍',
        piecesRequired: 2,
        bonusName: '岩盾之備（2件）',
        description: '格擋成功時，耐力消耗減少15%。配合防禦Lv5，長時間格擋更穩定。',
      },
      {
        setName: '重甲龍',
        piecesRequired: 3,
        bonusName: '岩盾之備（3件）',
        description: '防禦值+20，受到大型攻擊時有機率觸發無傷效果。3件全開額外加成。',
      },
      {
        setName: '雄火龍',
        piecesRequired: 2,
        bonusName: '雄火龍の力',
        description: '火屬性攻擊力+10。對飛龍種弱點部位攻擊時，傷害略為提升。',
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
  // 防守型 V2：精靈格擋配裝
  // 重甲龍×3 + 水獺龍×2 + 防禦護石
  // 套裝：重甲龍3件「岩盾之備」、水獺龍2件「浪息加護」
  // 孔位：[2,1]+[2,1]+[2,1]+[1,1]+[2]+[1] = 4×2孔 + 5×1孔 = 9孔
  // 技能總計：防禦5（甲）・精靈加護3（甲）・體力增強3（甲+珠）・攻擊5（珠）・看破4（珠）
  // ────────────────────────────────────────────────────────────────
  {
    id: 'defense-build-2',
    playstyle: 'defense',
    title: '精靈格擋配裝',
    summary: '防禦Lv5配合精靈加護Lv3，格擋穩定且高傷害技有35%機率減傷。重甲龍3件套強化格擋耐久，水獺龍2件套提升回復效果，適合正面格擋流玩家。',
    weapon: {
      label: '重甲龍派生片手劍／長槍',
      weaponType: '長槍',
      reason: '長槍配合防禦Lv5格擋幾乎無後退，片手劍同樣可格擋並不收刀使用道具。',
    },
    armor: [
      {
        id: 'def2-head',
        name: '重甲龍頭盔β',
        slot: 'head',
        rarity: 6,
        defense: 86,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'guard', level: 2 }],
      },
      {
        id: 'def2-chest',
        name: '水獺龍鎧甲β',
        slot: 'chest',
        rarity: 6,
        defense: 74,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'divine-blessing', level: 2 }],
      },
      {
        id: 'def2-arms',
        name: '重甲龍臂甲β',
        slot: 'arms',
        rarity: 6,
        defense: 82,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'guard', level: 1 }, { skillId: 'health-boost', level: 1 }],
      },
      {
        id: 'def2-waist',
        name: '水獺龍腰甲β',
        slot: 'waist',
        rarity: 6,
        defense: 70,
        slots: [1, 1],
        skillBonuses: [{ skillId: 'divine-blessing', level: 1 }, { skillId: 'health-boost', level: 1 }],
      },
      {
        id: 'def2-legs',
        name: '重甲龍護腿β',
        slot: 'legs',
        rarity: 6,
        defense: 84,
        slots: [2],
        skillBonuses: [{ skillId: 'guard', level: 2 }],
      },
      {
        id: 'def2-talisman',
        name: '防禦護石II',
        slot: 'talisman',
        rarity: 5,
        defense: 0,
        slots: [1],
        skillBonuses: [],
      },
    ],
    // 甲技能：防禦5(MAX)・精靈加護3(MAX)・體力增強2
    // 填滿全部9個孔位：
    //   頭[2]   → 攻擊珠II【2】        攻擊 0→1
    //   頭[1]   → 體力珠【1】          體力 2→3
    //   胸[2]   → 攻擊珠II【2】        攻擊 1→2
    //   胸[1]   → 看破珠【1】          看破 0→1
    //   手[2]   → 攻擊珠II【2】        攻擊 2→3
    //   手[1]   → 看破珠【1】          看破 1→2
    //   腰[1]   → 攻擊珠【1】          攻擊 3→4
    //   腰[1]   → 看破珠【1】          看破 2→3
    //   腳[2]   → 攻擊珠II【2】        攻擊 4→5
    //   護石[1] → 看破珠【1】          看破 3→4
    decorations: [
      { id: 'def2-d1',  name: '攻擊珠II【2】', slotSize: 2, skillId: 'attack-boost',   skillLevel: 1, description: '攻擊+1（頭[2]）' },
      { id: 'def2-d2',  name: '體力珠【1】',   slotSize: 1, skillId: 'health-boost',   skillLevel: 1, description: '體力增強+1 → Lv3（頭[1]）' },
      { id: 'def2-d3',  name: '攻擊珠II【2】', slotSize: 2, skillId: 'attack-boost',   skillLevel: 1, description: '攻擊+1（胸[2]）' },
      { id: 'def2-d4',  name: '看破珠【1】',   slotSize: 1, skillId: 'critical-eye',   skillLevel: 1, description: '看破+1（胸[1]）' },
      { id: 'def2-d5',  name: '攻擊珠II【2】', slotSize: 2, skillId: 'attack-boost',   skillLevel: 1, description: '攻擊+1（手[2]）' },
      { id: 'def2-d6',  name: '看破珠【1】',   slotSize: 1, skillId: 'critical-eye',   skillLevel: 1, description: '看破+1（手[1]）' },
      { id: 'def2-d7',  name: '攻擊珠【1】',   slotSize: 1, skillId: 'attack-boost',   skillLevel: 1, description: '攻擊+1（腰[1]）' },
      { id: 'def2-d8',  name: '看破珠【1】',   slotSize: 1, skillId: 'critical-eye',   skillLevel: 1, description: '看破+1（腰[1]）' },
      { id: 'def2-d9',  name: '攻擊珠II【2】', slotSize: 2, skillId: 'attack-boost',   skillLevel: 1, description: '攻擊+1 → Lv5（腳[2]）' },
      { id: 'def2-d10', name: '看破珠【1】',   slotSize: 1, skillId: 'critical-eye',   skillLevel: 1, description: '看破+1 → Lv4（護石[1]）' },
    ],
    setBonuses: [
      {
        setName: '重甲龍',
        piecesRequired: 3,
        bonusName: '岩盾之備（3件）',
        description: '格擋耐力消耗-15%，防禦值+20。長時間格擋更穩定，高傷攻擊觸發無傷機率提升。',
      },
      {
        setName: '水獺龍',
        piecesRequired: 2,
        bonusName: '水獺龍の恩澤',
        description: '水屬性抗性+10，泡沫異常狀態抵抗力提升。回復道具效果+5%。',
      },
    ],
    highlightedSkillIds: ['guard', 'divine-blessing', 'health-boost', 'attack-boost'],
    defenseStats: {
      physical: 396,
      elemental: 24,
      resistances: { fire: 4, water: 14, thunder: 2, ice: 4, dragon: -8 },
    },
    notes: [
      '防禦Lv5+精靈加護Lv3：格擋幾乎不後退，且35%機率額外減傷35%，應對高傷技更安心。',
      '重甲龍3件套：格擋耐力消耗最低，長時間格擋反擊節奏極穩，長槍玩家強烈推薦。',
      '比防守型v1多了精靈加護保障，熟悉後可改1~2顆看破珠II提升看破至Lv2。',
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // 防守型 V3：重甲龍守護配裝（5件套畢業防守）
  // 重甲龍×5 + 攻擊護石II
  // 套裝：重甲龍2件「重甲の守護」・重甲龍4件「重甲の意志」
  // 孔位：[2,1]+[2,2]+[2,1]+[1,1]+[2]+[2] = 6×2孔 + 4×1孔 = 10孔
  // 技能：防禦5(甲MAX)・體力增強3(甲MAX)・精靈加護3(甲MAX)・攻擊5(甲+珠)・看破5(珠)
  // ────────────────────────────────────────────────────────────────
  {
    id: 'defense-build-3',
    playstyle: 'defense',
    title: '重甲龍守護配裝',
    summary: '重甲龍（Gravios）5件套，防禦/體力增強/精靈加護全從裝甲達成Lv5/3/3，珠格全投攻擊與看破。雙重套裝加成保命，高難度狩獵生存率最高的終極防守配裝。',
    weapon: {
      label: '重甲龍派生長槍／片手劍',
      weaponType: '長槍',
      reason: '長槍格擋防禦性最高，配合防禦Lv5幾乎不後退，持續格擋反擊節奏穩定。',
    },
    armor: [
      {
        id: 'def3-head',
        name: '重甲龍頭盔β',
        slot: 'head',
        rarity: 9,
        defense: 96,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'guard', level: 2 }, { skillId: 'health-boost', level: 1 }],
      },
      {
        id: 'def3-chest',
        name: '重甲龍鎧甲β',
        slot: 'chest',
        rarity: 9,
        defense: 98,
        slots: [2, 2],
        skillBonuses: [{ skillId: 'guard', level: 2 }, { skillId: 'divine-blessing', level: 1 }],
      },
      {
        id: 'def3-arms',
        name: '重甲龍臂甲β',
        slot: 'arms',
        rarity: 9,
        defense: 92,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'guard', level: 1 }, { skillId: 'health-boost', level: 1 }],
      },
      {
        id: 'def3-waist',
        name: '重甲龍腰甲β',
        slot: 'waist',
        rarity: 9,
        defense: 90,
        slots: [1, 1],
        skillBonuses: [{ skillId: 'divine-blessing', level: 2 }],
      },
      {
        id: 'def3-legs',
        name: '重甲龍護腿β',
        slot: 'legs',
        rarity: 9,
        defense: 94,
        slots: [2],
        skillBonuses: [{ skillId: 'health-boost', level: 1 }, { skillId: 'attack-boost', level: 2 }],
      },
      {
        id: 'def3-talisman',
        name: '攻擊護石II',
        slot: 'talisman',
        rarity: 8,
        defense: 0,
        slots: [2],
        skillBonuses: [{ skillId: 'attack-boost', level: 2 }],
      },
    ],
    // 甲技能：guard=5(MAX)・health=3(MAX)・divine=3(MAX)・ATK=4
    // 填滿10孔：
    //   頭[2]→攻擊珠II  胸[2]→看破珠II  腰[1]→連擊珠   護石[2]→痛擊珠
    //   頭[1]→攻擊珠    胸[2]→看破珠II  腰[1]→連擊珠
    //   手[2]→看破珠II  手[1]→看破珠    腳[2]→痛擊珠
    decorations: [
      { id: 'def3-d1',  name: '攻擊珠II【2】', slotSize: 2, skillId: 'attack-boost',     skillLevel: 1, description: '攻擊+1 → Lv5（頭[2]）' },
      { id: 'def3-d2',  name: '攻擊珠【1】',   slotSize: 1, skillId: 'attack-boost',     skillLevel: 1, description: '攻擊確認滿（頭[1]）' },
      { id: 'def3-d3',  name: '看破珠II【2】', slotSize: 2, skillId: 'critical-eye',     skillLevel: 1, description: '看破+1（胸[2]）' },
      { id: 'def3-d4',  name: '看破珠II【2】', slotSize: 2, skillId: 'critical-eye',     skillLevel: 1, description: '看破+1（胸[2]）' },
      { id: 'def3-d5',  name: '看破珠II【2】', slotSize: 2, skillId: 'critical-eye',     skillLevel: 1, description: '看破+1（手[2]）' },
      { id: 'def3-d6',  name: '看破珠【1】',   slotSize: 1, skillId: 'critical-eye',     skillLevel: 1, description: '看破+1（手[1]）' },
      { id: 'def3-d7',  name: '連擊珠【1】',   slotSize: 1, skillId: 'burst',            skillLevel: 1, description: '連擊+1（腰[1]）' },
      { id: 'def3-d8',  name: '連擊珠【1】',   slotSize: 1, skillId: 'burst',            skillLevel: 1, description: '連擊+1（腰[1]）' },
      { id: 'def3-d9',  name: '痛擊珠【2】',   slotSize: 2, skillId: 'weakness-exploit', skillLevel: 1, description: '弱點特效+1（腳[2]）' },
      { id: 'def3-d10', name: '痛擊珠【2】',   slotSize: 2, skillId: 'weakness-exploit', skillLevel: 1, description: '弱點特效+1（護石[2]）' },
    ],
    setBonuses: [
      {
        setName: '重甲龍',
        piecesRequired: 2,
        bonusName: '重甲の守護（2件）',
        description: '受到攻擊時，防禦力提升效果持續時間延長，減少穿刺傷害。配合防禦Lv5格擋更穩定。',
      },
      {
        setName: '重甲龍',
        piecesRequired: 4,
        bonusName: '重甲の意志（4件）',
        description: '防禦強化效果進一步提升，火屬性抗性+10，面對高傷攻擊時額外觸發小幅減傷。',
      },
    ],
    highlightedSkillIds: ['guard', 'divine-blessing', 'health-boost', 'weakness-exploit'],
    defenseStats: {
      physical: 470,
      elemental: 30,
      resistances: { fire: -2, water: 6, thunder: 8, ice: 4, dragon: 10 },
    },
    notes: [
      '重甲龍（Gravios）5件套：防禦值最高（物理470），防禦/體力/精靈加護三項生存技能均從裝甲達成最大值。',
      '重甲の守護+重甲の意志：雙重套裝加成提升格擋耐久與抗打能力，高難度副主必備。',
      '珠格全投看破Lv5+攻擊Lv5，弱點特效Lv2作為輸出補充，防守不犧牲傷害。',
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // 全能型：泛用攻守配裝
  // 雄火龍×2 + 鎖刃龍×2 + 重甲龍×1
  // 套裝：雄火龍2件、鎖刃龍2件（重甲龍1件無效果）
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
        name: '鎖刃龍鎧甲β',
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
        name: '重甲龍腰甲β',
        slot: 'waist',
        rarity: 6,
        defense: 74,
        slots: [1, 1],
        skillBonuses: [{ skillId: 'health-boost', level: 2 }],
      },
      {
        id: 'bal-legs',
        name: '鎖刃龍護腿β',
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
        bonusName: '雄火龍の力',
        description: '火屬性攻擊力+10。對飛龍種弱點部位攻擊時，傷害略為提升。',
      },
      {
        setName: '鎖刃龍',
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
  // 全能型 V2：迴避速攻配裝
  // 大族長獸×1 + 鎖刃龍×2 + 刺花蜘蛛×1 + 雄火龍×1 + 煌雷龍×1
  // 套裝：鎖刃龍2件「腐蝕侵蝕」
  // 孔位：[2,1]+[2,1]+[2,1]+[2,1]+[2,1]+[2] = 6×2孔 + 5×1孔 = 11孔
  // 技能總計：迴避性能5（甲+珠）・挑戰者5（甲+珠）・弱點特效5（甲+珠）・攻擊5（甲+珠）・看破4（珠）
  // ────────────────────────────────────────────────────────────────
  {
    id: 'balanced-build-2',
    playstyle: 'balanced',
    title: '迴避速攻配裝',
    summary: '迴避性能Lv5大幅延長無敵時間，配合挑戰者Lv5和弱點特效Lv5。以閃避節奏攻擊的技術型打法，適合片手劍、雙劍、弓等機動性武器。',
    weapon: {
      label: '鎖刃龍派生雙劍／片手劍',
      weaponType: '雙劍',
      reason: '雙劍機動性最高，鬼人化閃避連段配合迴避性能Lv5的無敵時間，走位輸出雙全。',
    },
    armor: [
      {
        id: 'bal2-head',
        name: '大族長獸頭盔β',
        slot: 'head',
        rarity: 7,
        defense: 70,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'agitator', level: 2 }],
      },
      {
        id: 'bal2-chest',
        name: '鎖刃龍鎧甲β',
        slot: 'chest',
        rarity: 7,
        defense: 76,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'critical-eye', level: 2 }, { skillId: 'weakness-exploit', level: 1 }],
      },
      {
        id: 'bal2-arms',
        name: '刺花蜘蛛臂甲β',
        slot: 'arms',
        rarity: 7,
        defense: 64,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'evade-window', level: 2 }],
      },
      {
        id: 'bal2-waist',
        name: '雄火龍腰甲β',
        slot: 'waist',
        rarity: 6,
        defense: 70,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'agitator', level: 1 }, { skillId: 'attack-boost', level: 2 }],
      },
      {
        id: 'bal2-legs',
        name: '鎖刃龍護腿β',
        slot: 'legs',
        rarity: 7,
        defense: 76,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'weakness-exploit', level: 2 }],
      },
      {
        id: 'bal2-talisman',
        name: '敏捷護石II',
        slot: 'talisman',
        rarity: 6,
        defense: 0,
        slots: [2],
        skillBonuses: [{ skillId: 'evade-window', level: 1 }],
      },
    ],
    // 甲技能：挑戰者3・看破2・弱特3・迴避性能3・攻擊2
    // 填滿全部11個孔位：
    //   頭[2]   → 挑戰珠【2】   挑戰者 3→4
    //   頭[1]   → 看破珠【1】   看破 2→3
    //   胸[2]   → 挑戰珠【2】   挑戰者 4→5
    //   胸[1]   → 攻擊珠【1】   攻擊 2→3
    //   手[2]   → 迴避珠【2】   迴避 3→4
    //   手[1]   → 看破珠【1】   看破 3→4
    //   腰[2]   → 迴避珠【2】   迴避 4→5
    //   腰[1]   → 攻擊珠【1】   攻擊 3→4
    //   腳[2]   → 痛擊珠【2】   弱特 3→4
    //   腳[1]   → 攻擊珠【1】   攻擊 4→5
    //   護石[2] → 痛擊珠【2】   弱特 4→5
    decorations: [
      { id: 'bal2-d1',  name: '挑戰珠【2】', slotSize: 2, skillId: 'agitator',         skillLevel: 1, description: '挑戰者+1（頭[2]）' },
      { id: 'bal2-d2',  name: '看破珠【1】', slotSize: 1, skillId: 'critical-eye',     skillLevel: 1, description: '看破+1（頭[1]）' },
      { id: 'bal2-d3',  name: '挑戰珠【2】', slotSize: 2, skillId: 'agitator',         skillLevel: 1, description: '挑戰者+1 → Lv5（胸[2]）' },
      { id: 'bal2-d4',  name: '攻擊珠【1】', slotSize: 1, skillId: 'attack-boost',     skillLevel: 1, description: '攻擊+1（胸[1]）' },
      { id: 'bal2-d5',  name: '迴避珠【2】', slotSize: 2, skillId: 'evade-window',     skillLevel: 1, description: '迴避性能+1（手[2]）' },
      { id: 'bal2-d6',  name: '看破珠【1】', slotSize: 1, skillId: 'critical-eye',     skillLevel: 1, description: '看破+1（手[1]）' },
      { id: 'bal2-d7',  name: '迴避珠【2】', slotSize: 2, skillId: 'evade-window',     skillLevel: 1, description: '迴避性能+1 → Lv5（腰[2]）' },
      { id: 'bal2-d8',  name: '攻擊珠【1】', slotSize: 1, skillId: 'attack-boost',     skillLevel: 1, description: '攻擊+1（腰[1]）' },
      { id: 'bal2-d9',  name: '痛擊珠【2】', slotSize: 2, skillId: 'weakness-exploit', skillLevel: 1, description: '弱點特效+1（腳[2]）' },
      { id: 'bal2-d10', name: '攻擊珠【1】', slotSize: 1, skillId: 'attack-boost',     skillLevel: 1, description: '攻擊+1 → Lv5（腳[1]）' },
      { id: 'bal2-d11', name: '痛擊珠【2】', slotSize: 2, skillId: 'weakness-exploit', skillLevel: 1, description: '弱點特效+1 → Lv5（護石[2]）' },
    ],
    setBonuses: [
      {
        setName: '鎖刃龍',
        piecesRequired: 2,
        bonusName: '腐蝕侵蝕',
        description: '攻擊魔物傷口時，會心率額外+5%。配合弱點特效Lv5，傷口命中時最高可達+55%。',
      },
    ],
    highlightedSkillIds: ['evade-window', 'agitator', 'weakness-exploit', 'attack-boost'],
    defenseStats: {
      physical: 356,
      elemental: 20,
      resistances: { fire: 8, water: -4, thunder: 4, ice: -6, dragon: 6 },
    },
    notes: [
      '迴避性能Lv5：無敵時間最大延長，配合閃避節奏攻擊的武器（片手劍、雙劍、弓）超強。',
      '挑戰者Lv5：魔物憤怒時+20攻擊+15%會心，主動挑釁配合快速閃避更安全輸出。',
      '技術要求比全能v1高，但熟練後傷害超越全能型，適合追求走位樂趣的玩家。',
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // 均衡型：挑戰者均衡配裝（畢業裝）
  // ────────────────────────────────────────────────────────────────
  {
    id: 'balanced-build-3',
    playstyle: 'balanced',
    title: '挑戰者均衡配裝',
    summary: '黑角龍×3件觸發暴走病毒+煌雷龍×2件觸發震雷加護，弱點特效MAX、超會心MAX、挑戰者MAX，魔物憤怒後輸出爆發力與迴避均衡配裝持平，同時多出會心率緩衝。',
    weapon: {
      label: '通用',
      weaponType: '大劍',
      reason: '弱點特效5+超會心5+挑戰者5組合適合任何重擊型武器（大劍、大鎚、充能斧等）。',
    },
    armor: [
      {
        id: 'bal3-head',
        name: '黑角龍頭盔β',
        slot: 'head' as const,
        rarity: 8,
        defense: 82,
        skillBonuses: [
          { skillId: 'critical-eye', level: 2 },
          { skillId: 'agitator', level: 1 },
        ],
        slots: [2, 1],
      },
      {
        id: 'bal3-chest',
        name: '黑角龍鎧甲β',
        slot: 'chest' as const,
        rarity: 8,
        defense: 96,
        skillBonuses: [
          { skillId: 'weakness-exploit', level: 2 },
          { skillId: 'critical-boost', level: 1 },
        ],
        slots: [2, 2],
      },
      {
        id: 'bal3-arms',
        name: '黑角龍臂甲β',
        slot: 'arms' as const,
        rarity: 8,
        defense: 82,
        skillBonuses: [
          { skillId: 'critical-boost', level: 2 },
          { skillId: 'weakness-exploit', level: 1 },
        ],
        slots: [2, 1],
      },
      {
        id: 'bal3-waist',
        name: '煌雷龍腰甲β',
        slot: 'waist' as const,
        rarity: 9,
        defense: 90,
        skillBonuses: [
          { skillId: 'critical-eye', level: 2 },
          { skillId: 'agitator', level: 2 },
        ],
        slots: [2, 1],
      },
      {
        id: 'bal3-legs',
        name: '煌雷龍護腿β',
        slot: 'legs' as const,
        rarity: 9,
        defense: 90,
        skillBonuses: [
          { skillId: 'health-boost', level: 2 },
          { skillId: 'divine-blessing', level: 1 },
        ],
        slots: [2, 1],
      },
      {
        id: 'bal3-charm',
        name: '弱點護石II',
        slot: 'talisman' as const,
        rarity: 7,
        defense: 0,
        skillBonuses: [{ skillId: 'weakness-exploit', level: 2 }],
        slots: [2],
      },
    ],
    // 甲技能：WEX=5(MAX)・CE=4・CB=3・Ag=3・health=2・divine=1
    // 填滿11個孔位：
    //   頭[2]   → 超心珠【2】     CB 3→4
    //   頭[1]   → 體力珠【1】     health 2→3
    //   胸[2]   → 超心珠【2】     CB 4→5
    //   胸[2]   → 挑戰珠【2】     Ag 3→4
    //   手[2]   → 挑戰珠【2】     Ag 4→5
    //   手[1]   → 看破珠【1】     CE 4→5
    //   腰[2]   → 攻擊珠II【2】   ATK 0→1
    //   腰[1]   → 攻擊珠【1】     ATK 1→2
    //   腳[2]   → 攻擊珠II【2】   ATK 2→3
    //   腳[1]   → 攻擊珠【1】     ATK 3→4
    //   護石[2] → 攻擊珠II【2】   ATK 4→5
    decorations: [
      { id: 'bal3-d1',  name: '超心珠【2】',   slotSize: 2, skillId: 'critical-boost',   skillLevel: 1, description: '超會心+1（頭[2]）' },
      { id: 'bal3-d2',  name: '體力珠【1】',   slotSize: 1, skillId: 'health-boost',     skillLevel: 1, description: '體力增強+1→Lv3（頭[1]）' },
      { id: 'bal3-d3',  name: '超心珠【2】',   slotSize: 2, skillId: 'critical-boost',   skillLevel: 1, description: '超會心+1→Lv5（胸[2]）' },
      { id: 'bal3-d4',  name: '挑戰珠【2】',   slotSize: 2, skillId: 'agitator',         skillLevel: 1, description: '挑戰者+1（胸[2]）' },
      { id: 'bal3-d5',  name: '挑戰珠【2】',   slotSize: 2, skillId: 'agitator',         skillLevel: 1, description: '挑戰者+1→Lv5（手[2]）' },
      { id: 'bal3-d6',  name: '看破珠【1】',   slotSize: 1, skillId: 'critical-eye',     skillLevel: 1, description: '看破+1→Lv5（手[1]）' },
      { id: 'bal3-d7',  name: '攻擊珠II【2】', slotSize: 2, skillId: 'attack-boost',     skillLevel: 1, description: '攻擊+1（腰[2]）' },
      { id: 'bal3-d8',  name: '攻擊珠【1】',   slotSize: 1, skillId: 'attack-boost',     skillLevel: 1, description: '攻擊+1（腰[1]）' },
      { id: 'bal3-d9',  name: '攻擊珠II【2】', slotSize: 2, skillId: 'attack-boost',     skillLevel: 1, description: '攻擊+1（腳[2]）' },
      { id: 'bal3-d10', name: '攻擊珠【1】',   slotSize: 1, skillId: 'attack-boost',     skillLevel: 1, description: '攻擊+1（腳[1]）' },
      { id: 'bal3-d11', name: '攻擊珠II【2】', slotSize: 2, skillId: 'attack-boost',     skillLevel: 1, description: '攻擊+1→Lv5（護石[2]）' },
    ],
    setBonuses: [
      {
        setName: '黑角龍',
        piecesRequired: 3,
        bonusName: '黑蝕升華 I（2件）',
        description: '狩獵大型魔物時自動感染暴走病毒；克服病毒後，會心率+15%（持續至下次感染）。',
      },
      {
        setName: '煌雷龍',
        piecesRequired: 2,
        bonusName: '煌雷之電壓（2件）',
        description: '伏擊本能（Latent Power）發動時間延長至150秒，雷屬性場合持續輸出更穩定。',
      },
    ],
    highlightedSkillIds: ['weakness-exploit', 'critical-boost', 'agitator', 'attack-boost'],
    defenseStats: {
      physical: 440,
      elemental: 25,
      resistances: { fire: 6, water: -2, thunder: 12, ice: -4, dragon: 4 },
    },
    notes: [
      '弱點特效Lv5：弱點部位會心+30%，傷口部位再+50%，配合黑角龍套暴走病毒輕鬆達100%會心率。',
      '超會心Lv5：會心攻擊傷害倍率1.40倍（基礎1.25），高暴擊率下輸出顯著超越純攻擊流。',
      '挑戰者Lv5：魔物憤怒時攻擊+20、會心+15%，主動使用道具或誘導憤怒可持續觸發。',
      '煌雷龍2件震雷加護提供額外迴避與抗打，兼顧攻防比均衡型v1/v2更上一層。',
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
        name: '刺花蜘蛛頭盔β',
        slot: 'head',
        rarity: 7,
        defense: 68,
        slots: [1, 1],
        skillBonuses: [{ skillId: 'wide-range', level: 2 }],
      },
      {
        id: 'sup-chest',
        name: '刺花蜘蛛鎧甲β',
        slot: 'chest',
        rarity: 7,
        defense: 72,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'wide-range', level: 2 }],
      },
      {
        id: 'sup-arms',
        name: '水獺龍臂甲β',
        slot: 'arms',
        rarity: 6,
        defense: 64,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'speed-eating', level: 2 }],
      },
      {
        id: 'sup-waist',
        name: '水獺龍腰甲β',
        slot: 'waist',
        rarity: 6,
        defense: 62,
        slots: [1, 1],
        skillBonuses: [{ skillId: 'divine-blessing', level: 1 }],
      },
      {
        id: 'sup-legs',
        name: '桃毛獸護腿β',
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
        setName: '刺花蜘蛛',
        piecesRequired: 2,
        bonusName: '蛛絲牽引',
        description: '廣域化效果量+10%（等效Lv5效果量提升至110%），隊友回復量更多。',
      },
      {
        setName: '水獺龍',
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

  // ────────────────────────────────────────────────────────────────
  // 支援型 V2：食菇廣域配裝
  // 刺花蜘蛛×2 + 桃毛獸×2 + 水獺龍×1 + 廣域護石III
  // 套裝：刺花蜘蛛2件「蛛絲牽引」、桃毛獸2件「菌落庇佑」
  // 孔位：[1,1]+[2,1]+[2,1]+[1,1]+[2]+[1] = 3×2孔 + 7×1孔 = 10孔
  // 技能總計：廣域化5（甲）・菌類研究者3（甲）・加速進食3（甲+珠）・精靈加護3（甲+珠）・體力增強3（甲+珠）・攻擊5（珠）
  // ────────────────────────────────────────────────────────────────
  {
    id: 'support-build-2',
    playstyle: 'support',
    title: '食菇廣域配裝',
    summary: '菌類研究者Lv3搭配廣域化Lv5，硝石菇（攻擊提升）・勝利菇（防禦提升）等效果100%傳遞全隊。攻防增益一人食，全隊享，多人遊戲的終極支援配裝。',
    weapon: {
      label: '任何武器（推薦片手劍）',
      weaponType: '片手劍',
      reason: '片手劍不收刀食菇，廣域效果發動更流暢，邊補buff邊輸出無縫銜接。',
    },
    armor: [
      {
        id: 'sup2-head',
        name: '刺花蜘蛛頭盔β',
        slot: 'head',
        rarity: 7,
        defense: 68,
        slots: [1, 1],
        skillBonuses: [{ skillId: 'wide-range', level: 2 }],
      },
      {
        id: 'sup2-chest',
        name: '桃毛獸鎧甲β',
        slot: 'chest',
        rarity: 7,
        defense: 64,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'mushroomancer', level: 2 }],
      },
      {
        id: 'sup2-arms',
        name: '刺花蜘蛛臂甲β',
        slot: 'arms',
        rarity: 7,
        defense: 62,
        slots: [2, 1],
        skillBonuses: [{ skillId: 'wide-range', level: 2 }, { skillId: 'speed-eating', level: 1 }],
      },
      {
        id: 'sup2-waist',
        name: '桃毛獸腰甲β',
        slot: 'waist',
        rarity: 7,
        defense: 60,
        slots: [1, 1],
        skillBonuses: [{ skillId: 'mushroomancer', level: 1 }, { skillId: 'health-boost', level: 1 }],
      },
      {
        id: 'sup2-legs',
        name: '水獺龍護腿β',
        slot: 'legs',
        rarity: 6,
        defense: 62,
        slots: [2],
        skillBonuses: [{ skillId: 'divine-blessing', level: 1 }, { skillId: 'speed-eating', level: 1 }],
      },
      {
        id: 'sup2-talisman',
        name: '廣域護石III',
        slot: 'talisman',
        rarity: 7,
        defense: 0,
        slots: [1],
        skillBonuses: [{ skillId: 'wide-range', level: 1 }],
      },
    ],
    // 甲技能：廣域化5(MAX)・菌類研究者3(MAX)・加速進食2・精靈加護1・體力增強1
    // 填滿全部10個孔位：
    //   頭[1]   → 加速珠【1】   加速進食 2→3
    //   頭[1]   → 加護珠【1】   精靈加護 1→2
    //   胸[2]   → 攻擊珠II【2】 攻擊 0→1
    //   胸[1]   → 加護珠【1】   精靈加護 2→3
    //   手[2]   → 攻擊珠II【2】 攻擊 1→2
    //   手[1]   → 體力珠【1】   體力 1→2
    //   腰[1]   → 攻擊珠【1】   攻擊 2→3
    //   腰[1]   → 體力珠【1】   體力 2→3
    //   腳[2]   → 攻擊珠II【2】 攻擊 3→4
    //   護石[1] → 攻擊珠【1】   攻擊 4→5
    decorations: [
      { id: 'sup2-d1',  name: '加速珠【1】',   slotSize: 1, skillId: 'speed-eating',    skillLevel: 1, description: '加速進食+1 → Lv3（頭[1]）' },
      { id: 'sup2-d2',  name: '加護珠【1】',   slotSize: 1, skillId: 'divine-blessing', skillLevel: 1, description: '精靈加護+1（頭[1]）' },
      { id: 'sup2-d3',  name: '攻擊珠II【2】', slotSize: 2, skillId: 'attack-boost',    skillLevel: 1, description: '攻擊+1（胸[2]）' },
      { id: 'sup2-d4',  name: '加護珠【1】',   slotSize: 1, skillId: 'divine-blessing', skillLevel: 1, description: '精靈加護+1 → Lv3（胸[1]）' },
      { id: 'sup2-d5',  name: '攻擊珠II【2】', slotSize: 2, skillId: 'attack-boost',    skillLevel: 1, description: '攻擊+1（手[2]）' },
      { id: 'sup2-d6',  name: '體力珠【1】',   slotSize: 1, skillId: 'health-boost',    skillLevel: 1, description: '體力增強+1（手[1]）' },
      { id: 'sup2-d7',  name: '攻擊珠【1】',   slotSize: 1, skillId: 'attack-boost',    skillLevel: 1, description: '攻擊+1（腰[1]）' },
      { id: 'sup2-d8',  name: '體力珠【1】',   slotSize: 1, skillId: 'health-boost',    skillLevel: 1, description: '體力增強+1 → Lv3（腰[1]）' },
      { id: 'sup2-d9',  name: '攻擊珠II【2】', slotSize: 2, skillId: 'attack-boost',    skillLevel: 1, description: '攻擊+1（腳[2]）' },
      { id: 'sup2-d10', name: '攻擊珠【1】',   slotSize: 1, skillId: 'attack-boost',    skillLevel: 1, description: '攻擊+1 → Lv5（護石[1]）' },
    ],
    setBonuses: [
      {
        setName: '刺花蜘蛛',
        piecesRequired: 2,
        bonusName: '蛛絲牽引',
        description: '廣域化效果量+10%（Lv5效果量提升至110%），隊友所有回復量更多。',
      },
      {
        setName: '桃毛獸',
        piecesRequired: 2,
        bonusName: '菌落庇佑',
        description: '食菇後回復效果+20%，食菇進食速度提升。配合廣域化傳遞，隊友同享食菇加速效果。',
      },
    ],
    highlightedSkillIds: ['mushroomancer', 'wide-range', 'speed-eating', 'divine-blessing'],
    defenseStats: {
      physical: 316,
      elemental: 16,
      resistances: { fire: -4, water: 14, thunder: -2, ice: 4, dragon: -6 },
    },
    notes: [
      '菌類研究者Lv3：硝石菇（攻擊提升）＋勝利菇（防禦提升）＋龍香菇（增強藥效果），配合廣域化100%傳遞全隊。',
      '攻防BUFF同時分享：開戰前連食硝石菇+勝利菇，全隊攻防同步提升，比純回復型更全面。',
      '片手劍不收刀食菇令BUFF補給無縫銜接；狩獵笛玩家可換廣域護石II+笛旋律進一步強化隊伍。',
      '防禦較低，請留意走位，需要時可換部分攻擊珠為迴避珠II提升生存能力。',
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // 支援型 V3：竜歌廣域配裝（畢業裝）
  // 刺花蜘蛛γ×2 + 水獺龍γ×3 + 廣域護石IV
  // 套裝：刺花蜘蛛2件「蛛絲牽引」、水獺龍2件「浪息加護」
  // 甲技能全覆蓋：廣域5(MAX)・加速進食3(MAX)・體力增強3(MAX)・精靈加護3(MAX)
  // 孔位：[2,1]+[2,1]+[2,2]+[2,1]+[2,1]+[2] = 7×2孔 + 4×1孔 = 11孔
  // 珠填：3×看破珠II+4×攻擊珠II(7×2孔) + 2×攻擊珠+2×看破珠+連擊珠(4×1+護石2孔) → 攻擊5・看破5・連擊1
  // ────────────────────────────────────────────────────────────────
  {
    id: 'support-build-3',
    playstyle: 'support',
    title: '竜歌廣域配裝',
    summary: '刺花蜘蛛γ×水獺龍γ高稀有度畢業支援套裝，四大支援技能全由甲達MAX，所有珠孔釋放作輸出用途，自身攻擊力達Lv5會心率達Lv5，奶媽亦可輸出的終極支援配裝。',
    weapon: {
      label: '片手劍（推薦）或狩獵笛',
      weaponType: '片手劍',
      reason: '片手劍不收刀用藥、食菇，廣域效果無縫發動。狩獵笛可額外用笛旋律為隊伍增益。',
    },
    armor: [
      {
        id: 'sup3-head',
        name: '刺花蜘蛛γ頭盔',
        slot: 'head' as const,
        rarity: 9,
        defense: 92,
        skillBonuses: [
          { skillId: 'wide-range', level: 2 },
          { skillId: 'speed-eating', level: 1 },
        ],
        slots: [2, 1],
      },
      {
        id: 'sup3-chest',
        name: '刺花蜘蛛γ鎧甲',
        slot: 'chest' as const,
        rarity: 9,
        defense: 98,
        skillBonuses: [
          { skillId: 'wide-range', level: 2 },
          { skillId: 'speed-eating', level: 1 },
        ],
        slots: [2, 1],
      },
      {
        id: 'sup3-arms',
        name: '水獺龍γ臂甲',
        slot: 'arms' as const,
        rarity: 9,
        defense: 92,
        skillBonuses: [
          { skillId: 'wide-range', level: 1 },
          { skillId: 'health-boost', level: 2 },
        ],
        slots: [2, 2],
      },
      {
        id: 'sup3-waist',
        name: '水獺龍γ腰甲',
        slot: 'waist' as const,
        rarity: 9,
        defense: 88,
        skillBonuses: [
          { skillId: 'divine-blessing', level: 2 },
          { skillId: 'speed-eating', level: 1 },
        ],
        slots: [2, 1],
      },
      {
        id: 'sup3-legs',
        name: '水獺龍γ護腿',
        slot: 'legs' as const,
        rarity: 9,
        defense: 92,
        skillBonuses: [
          { skillId: 'divine-blessing', level: 1 },
          { skillId: 'health-boost', level: 1 },
        ],
        slots: [2, 1],
      },
      {
        id: 'sup3-charm',
        name: '廣域護石IV',
        slot: 'talisman' as const,
        rarity: 8,
        defense: 0,
        skillBonuses: [{ skillId: 'wide-range', level: 1 }],
        slots: [2],
      },
    ],
    // 甲技能：wide-range=6(→5MAX)・speed-eating=3(MAX)・health-boost=3(MAX)・divine-blessing=3(MAX)
    // 填滿10個孔位：
    //   頭[2]   → 看破珠II【2】   CE 0→1
    //   頭[1]   → 攻擊珠【1】     ATK 0→1
    //   胸[2]   → 看破珠II【2】   CE 1→2
    //   胸[1]   → 攻擊珠【1】     ATK 1→2
    //   手[2]   → 看破珠II【2】   CE 2→3
    //   手[2]   → 攻擊珠II【2】   ATK 2→3
    //   腰[2]   → 攻擊珠II【2】   ATK 3→4
    //   腰[1]   → 看破珠【1】     CE 3→4
    //   腳[2]   → 攻擊珠II【2】   ATK 4→5
    //   腳[1]   → 看破珠【1】     CE 4→5
    //   護石[2] → 攻擊珠II【2】   (已ATK 5，改連擊珠提升連擊輸出)
    // ※ 護石[2]改用連擊珠【2】，攻擊5由手[2]攻擊珠II提升至5
    decorations: [
      { id: 'sup3-d1',  name: '看破珠II【2】', slotSize: 2, skillId: 'critical-eye', skillLevel: 1, description: '看破+1（頭[2]）' },
      { id: 'sup3-d2',  name: '攻擊珠【1】',   slotSize: 1, skillId: 'attack-boost', skillLevel: 1, description: '攻擊+1（頭[1]）' },
      { id: 'sup3-d3',  name: '看破珠II【2】', slotSize: 2, skillId: 'critical-eye', skillLevel: 1, description: '看破+1（胸[2]）' },
      { id: 'sup3-d4',  name: '攻擊珠【1】',   slotSize: 1, skillId: 'attack-boost', skillLevel: 1, description: '攻擊+1（胸[1]）' },
      { id: 'sup3-d5',  name: '看破珠II【2】', slotSize: 2, skillId: 'critical-eye', skillLevel: 1, description: '看破+1→Lv3（手[2]）' },
      { id: 'sup3-d6',  name: '攻擊珠II【2】', slotSize: 2, skillId: 'attack-boost', skillLevel: 1, description: '攻擊+1（手[2]）' },
      { id: 'sup3-d7',  name: '攻擊珠II【2】', slotSize: 2, skillId: 'attack-boost', skillLevel: 1, description: '攻擊+1（腰[2]）' },
      { id: 'sup3-d8',  name: '看破珠【1】',   slotSize: 1, skillId: 'critical-eye', skillLevel: 1, description: '看破+1→Lv4（腰[1]）' },
      { id: 'sup3-d9',  name: '攻擊珠II【2】', slotSize: 2, skillId: 'attack-boost', skillLevel: 1, description: '攻擊+1→Lv5（腳[2]）' },
      { id: 'sup3-d10', name: '看破珠【1】',   slotSize: 1, skillId: 'critical-eye', skillLevel: 1, description: '看破+1→Lv5（腳[1]）' },
      { id: 'sup3-d11', name: '連擊珠【1】',   slotSize: 1, skillId: 'burst',        skillLevel: 1, description: '連擊+1（護石[2]借位）' },
    ],
    setBonuses: [
      {
        setName: '刺花蜘蛛',
        piecesRequired: 2,
        bonusName: '蛛絲牽引',
        description: '廣域化效果量+10%（Lv5效果量提升至110%），隊友所有回復量更多。',
      },
      {
        setName: '水獺龍',
        piecesRequired: 2,
        bonusName: '水獺龍の恩澤',
        description: '水屬性抗性+10，回復道具效果+5%。配合廣域化，隊友實際回復量進一步提升。',
      },
    ],
    highlightedSkillIds: ['wide-range', 'speed-eating', 'health-boost', 'divine-blessing'],
    defenseStats: {
      physical: 462,
      elemental: 28,
      resistances: { fire: -4, water: 18, thunder: -2, ice: 6, dragon: -6 },
    },
    notes: [
      '四大支援技能全由裝甲達MAX：廣域化Lv5・加速進食Lv3・體力增強Lv3・精靈加護Lv3，無需犧牲任何珠孔。',
      '全部10個珠孔釋放作攻擊力Lv5與看破Lv5輸出配置，支援玩家自身輸出能力媲美純攻擊配裝。',
      '刺花蜘蛛2件蛛絲牽引：廣域效果量110%，隊友回復量超越標準廣域配裝。',
      '水獺龍2件浪息加護：回復道具效果+5%疊加，水屬性抗性+10提供額外生存緩衝。',
      '防禦值462為支援型最高，同時完整保留奶媽能力，是多人遊戲的終極後盾選擇。',
    ],
  },
];
