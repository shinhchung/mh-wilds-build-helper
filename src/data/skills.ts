import { Skill } from '../types';

export const skills: Skill[] = [
  {
    id: 'attack-boost',
    name: '攻擊',
    category: 'offense',
    description: '提升基礎攻擊力，高等級額外獲得攻擊力倍率加成。',
    levels: [
      { level: 1, description: '基礎攻擊力+3' },
      { level: 2, description: '基礎攻擊力+5' },
      { level: 3, description: '基礎攻擊力+7' },
      { level: 4, description: '攻擊力1.02倍，基礎攻擊力+8' },
      { level: 5, description: '攻擊力1.04倍，基礎攻擊力+9' },
    ],
  },
  {
    id: 'critical-eye',
    name: '看破',
    category: 'offense',
    description: '提升會心率，穩定增加暴擊機率。',
    levels: [
      { level: 1, description: '會心率+4%' },
      { level: 2, description: '會心率+8%' },
      { level: 3, description: '會心率+12%' },
      { level: 4, description: '會心率+16%' },
      { level: 5, description: '會心率+20%' },
    ],
  },
  {
    id: 'weakness-exploit',
    name: '弱點特效',
    category: 'offense',
    description: '攻擊魔物弱點部位或傷口時，提升會心率。',
    levels: [
      { level: 1, description: '攻擊弱點部位時，會心率+10%' },
      { level: 2, description: '攻擊弱點部位時，會心率+15%' },
      { level: 3, description: '攻擊弱點部位時，會心率+20%；攻擊傷口部位時，會心率+25%' },
      { level: 4, description: '攻擊弱點部位時，會心率+25%；攻擊傷口部位時，會心率+35%' },
      { level: 5, description: '攻擊弱點部位時，會心率+30%；攻擊傷口部位時，會心率+50%' },
    ],
  },
  {
    id: 'critical-boost',
    name: '超會心',
    category: 'offense',
    description: '提升會心攻擊的傷害倍率（基礎為1.25倍）。',
    levels: [
      { level: 1, description: '會心攻擊傷害倍率提升至1.28倍' },
      { level: 2, description: '會心攻擊傷害倍率提升至1.31倍' },
      { level: 3, description: '會心攻擊傷害倍率提升至1.34倍' },
      { level: 4, description: '會心攻擊傷害倍率提升至1.37倍' },
      { level: 5, description: '會心攻擊傷害倍率提升至1.40倍' },
    ],
  },
  {
    id: 'guard',
    name: '防禦',
    category: 'defense',
    description: '減少防禦時的後退距離和耐力消耗。',
    levels: [
      { level: 1, description: '後退和耐力消耗略為減少' },
      { level: 2, description: '後退和耐力消耗小幅減少' },
      { level: 3, description: '後退和耐力消耗中幅減少' },
      { level: 4, description: '後退和耐力消耗大幅減少' },
      { level: 5, description: '後退和耐力消耗顯著減少' },
    ],
  },
  {
    id: 'divine-blessing',
    name: '精靈加護',
    category: 'defense',
    description: '一定機率減少受到的傷害。',
    levels: [
      { level: 1, description: '有機會減少15%受到的傷害' },
      { level: 2, description: '有機會減少25%受到的傷害' },
      { level: 3, description: '有機會減少35%受到的傷害' },
    ],
  },
  {
    id: 'health-boost',
    name: '體力增強',
    category: 'defense',
    description: '提升最大體力值，增加生存能力。',
    levels: [
      { level: 1, description: '最大體力+15' },
      { level: 2, description: '最大體力+30' },
      { level: 3, description: '最大體力+50' },
    ],
  },
  {
    id: 'evade-window',
    name: '迴避性能',
    category: 'utility',
    description: '延長迴避動作的無敵時間，更容易迴避攻擊。',
    levels: [
      { level: 1, description: '無敵時間略為延長' },
      { level: 2, description: '無敵時間小幅延長' },
      { level: 3, description: '無敵時間中幅延長' },
      { level: 4, description: '無敵時間大幅延長' },
      { level: 5, description: '無敵時間顯著延長' },
    ],
  },
];
