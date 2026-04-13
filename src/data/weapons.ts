import { Playstyle } from '../types';

export type WeaponRecommendation = {
  name: string;
  tip: string;
};

export type WeaponEntry = {
  id: string;
  name: string;
  badge: string;
  category: 'melee' | 'ranged';
  recommendations: Record<Playstyle, WeaponRecommendation>;
};

export const weaponTypes: WeaponEntry[] = [
  {
    id: 'longsword',
    name: '太刀',
    badge: '太',
    category: 'melee',
    recommendations: {
      attack: { name: '鎖刃太刀「蘭馬洛克」', tip: '高倍率配合見切斬，弱點特效全發動時傷害驚人。' },
      defense: { name: '雄火龍太刀「斬熾爪」', tip: '穩定倍率，磨刀後耐久充足，防禦反擊節奏感強。' },
      balanced: { name: '黑蝕龍太刀「孽夜刃」', tip: '自帶高會心，攻守切換靈活，容錯率高。' },
    },
  },
  {
    id: 'greatsword',
    name: '大劍',
    badge: '大',
    category: 'melee',
    recommendations: {
      attack: { name: '鎖刃大劍「獸縛之爪」', tip: '斬首攻擊倍率極高，配合集中技能充能更快。' },
      defense: { name: '鎧龍大劍「重甲斬」', tip: '高基礎配合強韌，蓄力時不易被打斷。' },
      balanced: { name: '雄火龍大劍「炎翼斬」', tip: '火屬性補充弱點傷害，中規中矩適合各種魔物。' },
    },
  },
  {
    id: 'swordshield',
    name: '片手劍',
    badge: '片',
    category: 'melee',
    recommendations: {
      attack: { name: '黑蝕龍片手劍「暗蝕刃」', tip: '自帶高會心，配合爆擊技能連段輸出穩定。' },
      defense: { name: '鎧龍片手劍「鐵盾短刃」', tip: '盾反機制配合防禦技能，使用道具不收刀容錯最高。' },
      balanced: { name: '雄火龍片手劍「炎翼刃」', tip: '攻守均衡，輸出防守自如切換，新手首選。' },
    },
  },
  {
    id: 'dualblades',
    name: '雙劍',
    badge: '雙',
    category: 'melee',
    recommendations: {
      attack: { name: '黑蝕龍雙劍「暗蝕双牙」', tip: '鬼人化連續輸出，高會心配合超會心傷害驚人。' },
      defense: { name: '水獸雙劍「浪蝕双刃」', tip: '靈活閃避為主，水屬性對應特定魔物時效果佳。' },
      balanced: { name: '雄火龍雙劍「炎双刃」', tip: '火屬性通用性強，兼顧輸出與走位的萬用雙劍。' },
    },
  },
  {
    id: 'hammer',
    name: '大鎚',
    badge: '鎚',
    category: 'melee',
    recommendations: {
      attack: { name: '鎖刃大鎚「鎖縛重擊」', tip: '頭部攻擊積累暈眩，高倍率蓄力傷害爆發強。' },
      defense: { name: '鎧龍大鎚「重甲巨鎚」', tip: '高防禦加強韌，站樁蓄力穩定，不易被怪打斷。' },
      balanced: { name: '怒獸大鎚「猛獸重擊」', tip: '攻守均衡，頭部攻擊兼顧暈眩與傷害輸出。' },
    },
  },
  {
    id: 'lance',
    name: '長槍',
    badge: '槍',
    category: 'melee',
    recommendations: {
      attack: { name: '護雷顎龍長槍「雷裂突槍」', tip: '精確防禦後輸出爆發，防禦守勢技能提升大量傷害。' },
      defense: { name: '鎧龍長槍「鐵壁神槍」', tip: '可格擋絕大多數攻擊，防禦加盾連刺，容錯率最高。' },
      balanced: { name: '雄火龍長槍「炎壁槍」', tip: '攻守均衡，邊格擋邊戳刺，節奏感強的穩健選擇。' },
    },
  },
  {
    id: 'bow',
    name: '弓',
    badge: '弓',
    category: 'ranged',
    recommendations: {
      attack: { name: '黑蝕龍弓「暗蝕弦」', tip: '高會心弓配合弱點特效，弱點射擊傷害極高。' },
      defense: { name: '水獸弓「浪息弦」', tip: '遠程安全輸出，高抗性應對水系魔物。' },
      balanced: { name: '雄火龍弓「炎翼弦」', tip: '火屬性通用性強，保持距離輸出適合各種場合。' },
    },
  },
  {
    id: 'heavybowgun',
    name: '重弩',
    badge: '重',
    category: 'ranged',
    recommendations: {
      attack: { name: '鎖刃重弩「鎖縛炮」', tip: '高倍率子彈配合彈藥強化，站樁輸出傷害驚人。' },
      defense: { name: '鎧龍重弩「鐵壁重炮」', tip: '強韌加盾牌模組，邊格擋邊維持遠程火力。' },
      balanced: { name: '護雷顎龍重弩「雷霆炮」', tip: '雷屬性彈藥適用範圍廣，攻守均衡的重弩。' },
    },
  },
];

export function getWeaponRecommendation(
  weaponId: string,
  playstyle: Playstyle,
): (WeaponRecommendation & { weaponType: string }) | null {
  const entry = weaponTypes.find((w) => w.id === weaponId);
  if (!entry) return null;
  return { ...entry.recommendations[playstyle], weaponType: entry.name };
}
