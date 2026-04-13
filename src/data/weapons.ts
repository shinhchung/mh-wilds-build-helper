import { ElementType } from '../types';

export type WeaponRecommendation = {
  name: string;
  tip: string;
};

export type WeaponEntry = {
  id: string;
  name: string;
  badge: string;
  category: 'melee' | 'ranged';
  elements: Record<ElementType, WeaponRecommendation>;
};

export const weaponTypes: WeaponEntry[] = [
  {
    id: 'longsword',
    name: '太刀',
    badge: '太',
    category: 'melee',
    elements: {
      fire:    { name: '雄火龍太刀「炎翼刃」',   tip: '火屬性追打冰系弱點魔物，見切斬連段爆發力強。' },
      water:   { name: '水獸太刀「浪息斬」',     tip: '水屬性剋制火系及爆炎系魔物，橫斬節奏流暢。' },
      thunder: { name: '護雷顎龍太刀「雷裂刃」', tip: '雷屬性適用範圍廣，見切斬積累大量屬性傷害。' },
      ice:     { name: '桃毛獸王太刀「霜牙斬」', tip: '冰屬性針對龍系魔物弱點，速攻流首選。' },
      dragon:  { name: '黑蝕龍太刀「孽夜刃」',   tip: '龍屬性自帶高會心率，對古龍系魔物傷害顯著。' },
      none:    { name: '鎖刃太刀「蘭馬洛克」',   tip: '最高倍率配合弱點特效，純物理輸出無出其右。' },
    },
  },
  {
    id: 'greatsword',
    name: '大劍',
    badge: '大',
    category: 'melee',
    elements: {
      fire:    { name: '雄火龍大劍「炎翼重斬」',   tip: '火屬性蓄力斬威力驚人，追打冰系魔物傷害倍增。' },
      water:   { name: '水獸大劍「浪蝕重斬」',     tip: '水屬性蓄力可快速積累屬性傷害，對火系魔物有效。' },
      thunder: { name: '雷爪龍大劍「電牙重擊」',   tip: '雷屬性蓄力打頭部效果佳，觸電效果頻繁觸發。' },
      ice:     { name: '桃毛獸王大劍「氷刃重斬」', tip: '冰屬性特攻龍系，蓄力滿蓄一擊決勝。' },
      dragon:  { name: '黑蝕龍大劍「暗蝕重斬」',   tip: '龍屬性高會心大劍，蓄力命中弱點傷害極高。' },
      none:    { name: '鎖刃大劍「獸縛之爪」',     tip: '最高基礎倍率，集中+充能斬輸出爆炸性傷害。' },
    },
  },
  {
    id: 'swordshield',
    name: '片手劍',
    badge: '片',
    category: 'melee',
    elements: {
      fire:    { name: '雄火龍片手劍「炎翼刃」',   tip: '火屬性連段積累快，配合塗毒蟲討伐冰系魔物。' },
      water:   { name: '水獸片手劍「浪息短刃」',   tip: '水屬性連段快速積累，使用道具不收刀優勢顯著。' },
      thunder: { name: '雷爪龍片手劍「電牙短刃」', tip: '雷屬性高連打適合積累屬性值，配合弱點特效輸出佳。' },
      ice:     { name: '桃毛獸王片手劍「霜刃」',   tip: '冰屬性快速連段，龍系魔物近身輸出首選。' },
      dragon:  { name: '黑蝕龍片手劍「暗蝕刃」',   tip: '龍屬性高會心連段，古龍系魔物剋星。' },
      none:    { name: '鎧龍片手劍「鐵盾短刃」',   tip: '盾反+高倍率，純物理配合防禦技能容錯率最高。' },
    },
  },
  {
    id: 'dualblades',
    name: '雙劍',
    badge: '雙',
    category: 'melee',
    elements: {
      fire:    { name: '雄火龍雙劍「炎双刃」',   tip: '火屬性鬼人化連打輸出驚人，追打冰系弱點事半功倍。' },
      water:   { name: '水獸雙劍「浪蝕双刃」',   tip: '水屬性高連打積累快，火系魔物的剋星。' },
      thunder: { name: '雷爪龍雙劍「電双牙」',   tip: '雷屬性雙劍連打積累屬性快，觸電效果頻繁觸發。' },
      ice:     { name: '桃毛獸王雙劍「霜双刃」', tip: '冰屬性鬼人化打龍系弱點，速攻流最強雙劍。' },
      dragon:  { name: '黑蝕龍雙劍「暗蝕双牙」', tip: '龍屬性高會心率，古龍系魔物近身輸出極高。' },
      none:    { name: '怒獸雙劍「猛獸双牙」',   tip: '高倍率非屬性雙劍，弱點特效全發動時物理傷害無敵。' },
    },
  },
  {
    id: 'hammer',
    name: '大鎚',
    badge: '鎚',
    category: 'melee',
    elements: {
      fire:    { name: '雄火龍大鎚「炎擊重鎚」',   tip: '火屬性蓄力打頭積累屬性與暈眩，冰系魔物雙重剋制。' },
      water:   { name: '水獸大鎚「浪擊重鎚」',     tip: '水屬性蓄力頭部，火系魔物有效，暈眩後輸出機會多。' },
      thunder: { name: '護雷顎龍大鎚「雷擊重鎚」', tip: '雷屬性蓄力觸電效果顯著，配合暈眩形成雙重控制。' },
      ice:     { name: '桃毛獸王大鎚「霜擊重鎚」', tip: '冰屬性蓄力打龍系頭部，暈眩+屬性傷害雙收。' },
      dragon:  { name: '黑蝕龍大鎚「暗蝕重鎚」',   tip: '龍屬性高會心蓄力，古龍系魔物頭部攻擊傷害驚人。' },
      none:    { name: '鎖刃大鎚「鎖縛重擊」',     tip: '最高倍率蓄力配合集中，頭部暈眩後物理傷害爆發強。' },
    },
  },
  {
    id: 'huntinghorn',
    name: '狩獵笛',
    badge: '笛',
    category: 'melee',
    elements: {
      fire:    { name: '雄火龍狩獵笛「炎翼奏笛」',   tip: '火屬性打擊積累旋律快，【攻擊力大提升】音符傳遞全隊，冰弱場合自身傷害與隊伍buff雙豐收。' },
      water:   { name: '水獸狩獵笛「浪息奏笛」',     tip: '水屬性笛旋律效果穩定，【體力回復】音符配合廣域化隊友持久戰更安心。' },
      thunder: { name: '護雷顎龍狩獵笛「雷霆奏笛」', tip: '雷屬性音符豐富，觸電後有充裕演奏視窗，【防禦強化】旋律全隊受惠，通用性最高。' },
      ice:     { name: '桃毛獸王狩獵笛「霜牙奏笛」', tip: '冰屬性笛含【防禦提升】旋律，龍系魔物場合自身攻防兼備，隊伍生存率顯著提升。' },
      dragon:  { name: '黑蝕龍狩獵笛「暗蝕奏笛」',   tip: '龍屬性高會心笛，古龍系場合自身輸出與旋律buff兩全，四人隊隊長首選。' },
      none:    { name: '鎖刃狩獵笛「鎖縛奏笛」',     tip: '最高倍率非屬性笛，自身傷害最強，【攻擊力大提升】讓全隊火力顯著提升。' },
    },
  },
  {
    id: 'lance',
    name: '長槍',
    badge: '槍',
    category: 'melee',
    elements: {
      fire:    { name: '雄火龍長槍「炎壁突槍」',   tip: '火屬性格擋後反擊，冰系魔物正面攻擊傷害加成高。' },
      water:   { name: '水獸長槍「浪壁突槍」',     tip: '水屬性防禦反擊流，火系魔物正面格擋輸出穩定。' },
      thunder: { name: '護雷顎龍長槍「雷裂突槍」', tip: '雷屬性搭配守勢技能，防禦反擊觸電傷害極高。' },
      ice:     { name: '桃毛獸王長槍「霜壁突槍」', tip: '冰屬性精確格擋後突刺，龍系魔物正面剋制。' },
      dragon:  { name: '黑蝕龍長槍「孽夜突槍」',   tip: '龍屬性高會心反擊，古龍系魔物正面硬剛首選。' },
      none:    { name: '鎧龍長槍「鐵壁神槍」',     tip: '最強物理格擋長槍，純物理配合防禦技能容錯率最高。' },
    },
  },
  {
    id: 'gunlance',
    name: '銃槍',
    badge: '銃',
    category: 'melee',
    elements: {
      fire:    { name: '雄火龍銃槍「炎翼銃槍」',   tip: '火砲擊無視魔物防禦直接傷害，冰弱系場合額外火屬性多重輸出。' },
      water:   { name: '水獸銃槍「浪息銃槍」',     tip: '水屬性護盾+砲擊，水系場合格擋後砲擊反制，安全穩定輸出。' },
      thunder: { name: '護雷顎龍銃槍「雷霆銃槍」', tip: '雷屬性砲擊廣泛適用，砲擊+觸電雙重控制讓魔物動彈不得，輸出窗口大。' },
      ice:     { name: '桃毛獸王銃槍「霜裂銃槍」', tip: '冰屬性長砲型全力砲擊穿透龍系魔物厚甲，凍傷控制製造更多砲擊機會。' },
      dragon:  { name: '黑蝕龍銃槍「暗蝕銃槍」',   tip: '龍屬性高會心砲擊，古龍系場合砲擊暴擊率超高，全力砲擊傷害驚人。' },
      none:    { name: '鎧龍銃槍「鐵壁銃槍」',     tip: '非屬性最高倍率，砲擊傷害無視魔物防禦，配合防禦技能鐵壁輸出防禦雙全。' },
    },
  },
  {
    id: 'switchaxe',
    name: '斬擊斧',
    badge: '斬',
    category: 'melee',
    elements: {
      fire:    { name: '雄火龍斬擊斧「炎翼斬斧」',   tip: '火屬性液汁（屬性強化）爆發，零和放電+火屬性多重傷害，冰弱系魔物輸出極高。' },
      water:   { name: '水獸斬擊斧「浪蝕斬斧」',     tip: '水屬性斬斧劍模式積累快，爆放時機佳，火系魔物的高效剋星。' },
      thunder: { name: '護雷顎龍斬擊斧「雷裂斬斧」', tip: '雷屬性液汁零和放電+觸電連鎖，雙重控制效果中傷害爆炸，通用性最強。' },
      ice:     { name: '桃毛獸王斬擊斧「霜裂斬斧」', tip: '冰屬性劍模式特攻龍系弱點，零和放電+凍傷效果讓魔物完全失去行動能力。' },
      dragon:  { name: '黑蝕龍斬擊斧「暗蝕斬斧」',   tip: '龍屬性高會心斬擊斧，古龍系零和放電暴擊傷害極高。' },
      none:    { name: '鎖刃斬擊斧「鎖縛斬斧」',     tip: '力壯液汁物理傷害最高，超越放電物理爆發無出其右，弱點特效全開時一擊驚天。' },
    },
  },
  {
    id: 'chargeblade',
    name: '充能斧',
    badge: '充',
    category: 'melee',
    elements: {
      fire:    { name: '雄火龍充能斧「炎翼充斧」',   tip: '火屬性衝擊液汁超衝擊解放，盾強化+火屬性多重命中，冰弱系魔物SAED傷害爆炸。' },
      water:   { name: '水獸充能斧「浪蝕充斧」',     tip: '水屬性盾強化+衝擊液汁，超衝擊解放對火系魔物高效，防禦與輸出兼顧。' },
      thunder: { name: '護雷顎龍充能斧「雷霆充斧」', tip: '雷屬性衝擊液汁超衝擊解放，觸電+多段SAED輸出令魔物無法喘息。' },
      ice:     { name: '桃毛獸王充能斧「霜裂充斧」', tip: '冰屬性衝擊液汁龍系首選，超衝擊解放+凍傷雙重鎖定，蓄勢待發一擊決勝。' },
      dragon:  { name: '黑蝕龍充能斧「暗蝕充斧」',   tip: '龍屬性高會心衝擊液汁，古龍系SAED暴擊率爆表，滿蓄一瞬傷害驚人。' },
      none:    { name: '鎖刃充能斧「鎖縛充斧」',     tip: '力壯液汁物理超衝擊解放，全武器中單擊最高傷害，滿蓄後SAED一擊定勝負。' },
    },
  },
  {
    id: 'insectglaive',
    name: '操虫棍',
    badge: '蟲',
    category: 'melee',
    elements: {
      fire:    { name: '雄火龍操虫棍「炎翼棍」',   tip: '火屬性空中連斬，赤精華攻擊強化+火屬性，冰弱系魔物高空輸出效率高。' },
      water:   { name: '水獸操虫棍「浪蝕棍」',     tip: '水屬性棍，赤白精華組合提升攻速，火系魔物高空精準打擊弱點。' },
      thunder: { name: '護雷顎龍操虫棍「雷裂棍」', tip: '雷屬性棍赤精華強化+觸電積累，三色精華全取後空中輸出傷害最大化。' },
      ice:     { name: '桃毛獸王操虫棍「霜牙棍」', tip: '冰屬性高空連斬，龍系魔物弱冰部位精準打擊，跳躍攻擊積累效率高。' },
      dragon:  { name: '黑蝕龍操虫棍「暗蝕棍」',   tip: '龍屬性高會心棍，三色精華全取後空中暴擊率極高，古龍系魔物的剋星。' },
      none:    { name: '鎖刃操虫棍「鎖縛棍」',     tip: '最高倍率非屬性棍，赤精華物理強化後跳躍攻擊傷害爆炸，弱點特效全開無敵。' },
    },
  },
  {
    id: 'bow',
    name: '弓',
    badge: '弓',
    category: 'ranged',
    elements: {
      fire:    { name: '雄火龍弓「炎翼弦」',   tip: '火屬性連射打冰系弱點，配合塗層加成傷害顯著。' },
      water:   { name: '水獸弓「浪息弦」',     tip: '水屬性弓安全距離輸出，火系魔物有效，生存率高。' },
      thunder: { name: '雷爪龍弓「電牙弦」',   tip: '雷屬性弓連射頻率高，觸電積累快速，通用性強。' },
      ice:     { name: '桃毛獸王弓「霜牙弦」', tip: '冰屬性連射打龍系弱點部位，遠程安全輸出。' },
      dragon:  { name: '黑蝕龍弓「暗蝕弦」',   tip: '龍屬性高會心弓，遠程打古龍系弱點傷害驚人。' },
      none:    { name: '怒獸弓「猛獸強弓」',   tip: '最高倍率非屬性弓，配合弱點特效物理連射傷害最強。' },
    },
  },
  {
    id: 'heavybowgun',
    name: '重弩',
    badge: '重',
    category: 'ranged',
    elements: {
      fire:    { name: '雄火龍重弩「炎翼重炮」',   tip: '火屬性炮彈追打冰系魔物，站樁持續輸出傷害驚人。' },
      water:   { name: '水獸重弩「浪息重炮」',     tip: '水屬性炮彈剋制火系魔物，遠程安全輸出穩定。' },
      thunder: { name: '護雷顎龍重弩「雷霆炮」',   tip: '雷屬性彈藥通用性強，觸電後輸出窗口大。' },
      ice:     { name: '桃毛獸王重弩「霜裂重炮」', tip: '冰屬性炮彈打龍系，凍結效果製造安全輸出時機。' },
      dragon:  { name: '黑蝕龍重弩「暗蝕重炮」',   tip: '龍屬性高會心炮彈，對古龍系魔物遠程傷害極高。' },
      none:    { name: '鎖刃重弩「鎖縛炮」',       tip: '最高倍率非屬性重弩，配合彈藥強化站樁輸出無敵。' },
    },
  },
  {
    id: 'lightbowgun',
    name: '輕弩',
    badge: '輕',
    category: 'ranged',
    elements: {
      fire:    { name: '雄火龍輕弩「炎翼輕炮」',   tip: '火屬性速射（Rapid Fire）連續3發，冰系魔物弱點積累屬性傷害超快。配合雷顎龍2件套屬性暴擊爆發力驚人。' },
      water:   { name: '水獸輕弩「浪息輕炮」',     tip: '水屬性速射持續輸出，安全距離追打火系魔物弱點。機動性強，適合主動閃避流。' },
      thunder: { name: '護雷顎龍輕弩「雷霆輕炮」', tip: '雷屬性速射通用性最強，雷顎龍2件套觸發屬性暴擊，加上弱點特效3可輕鬆達成100%會心。' },
      ice:     { name: '桃毛獸王輕弩「霜裂輕炮」', tip: '冰屬性速射打龍系魔物，搭配屬性暴擊技能傷害顯著。龍系古龍弱冰，高輸出場合首選。' },
      dragon:  { name: '黑蝕龍輕弩「暗蝕輕炮」',   tip: '龍屬性速射古龍剋星，自帶高會心加成。配合弱點特效，傷口命中時屬性暴擊觸發率極高。' },
      none:    { name: '鎖刃輕弩「鎖縛輕炮」',     tip: '非屬性散彈／貫通彈流，配合彈藥強化和散彈強化技能，物理散彈輸出驚人。適合不想換彈藥的玩家。' },
    },
  },
];

export function getWeaponRecommendation(
  weaponId: string,
  element: ElementType,
): (WeaponRecommendation & { weaponType: string }) | null {
  const entry = weaponTypes.find((w) => w.id === weaponId);
  if (!entry) return null;
  return { ...entry.elements[element], weaponType: entry.name };
}
