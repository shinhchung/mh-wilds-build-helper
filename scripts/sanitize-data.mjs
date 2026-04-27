import path from 'node:path';
import { RAW_DIR, readJson, writeJson } from './data-utils.mjs';

const locales = ['en', 'zh-Hant'];
const invalidWeaponNamePatterns = [/熊神/];

function hasInvalidWeaponName(weapon) {
  return invalidWeaponNamePatterns.some((pattern) => pattern.test(weapon.name ?? ''));
}

function pruneRemovedWeaponRefs(weapon, removedIds) {
  const crafting = weapon.crafting;
  if (!crafting) return weapon;

  if (Array.isArray(crafting.branches)) {
    crafting.branches = crafting.branches.filter((branch) => !removedIds.has(branch.id));
  }

  if (crafting.previous && removedIds.has(crafting.previous.id)) {
    crafting.previous = null;
  }

  return weapon;
}

const weaponByLocale = new Map();
const removedIds = new Set();

for (const locale of locales) {
  const filePath = path.join(RAW_DIR, 'mhdb', locale, 'weapons.json');
  const weapons = await readJson(filePath);
  weaponByLocale.set(locale, { filePath, weapons });

  for (const weapon of weapons) {
    if (hasInvalidWeaponName(weapon)) {
      removedIds.add(weapon.id);
    }
  }
}

const summary = {};

for (const [locale, { filePath, weapons }] of weaponByLocale.entries()) {
  const sanitizedWeapons = weapons
    .filter((weapon) => !removedIds.has(weapon.id))
    .map((weapon) => pruneRemovedWeaponRefs(weapon, removedIds));

  await writeJson(filePath, sanitizedWeapons);
  summary[locale] = {
    before: weapons.length,
    after: sanitizedWeapons.length,
    removed: weapons.length - sanitizedWeapons.length,
  };
}

console.log(JSON.stringify({ removedWeaponIds: [...removedIds].sort((a, b) => a - b), summary }, null, 2));
