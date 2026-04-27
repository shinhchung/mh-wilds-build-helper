import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NORMALIZED_DIR, RAW_DIR } from './data-utils.mjs';

const dataFiles = [
  'armor.json',
  'builds.json',
  'charms.json',
  'decorations.json',
  'monsters.json',
  'skills.json',
  'weapons.json',
];

const rawDataFiles = [
  path.join('mhdb', 'en', 'weapons.json'),
  path.join('mhdb', 'zh-Hant', 'weapons.json'),
];

const suspiciousPatterns = [
  { name: 'utf8-mojibake-cjk', pattern: /(?:\u00C3[\u0080-\u00BF]|\u00C2[\u0080-\u00BF]|\u00E7[\u0080-\u00BF\u201A-\u201E]|\u00E5[\u0080-\u00BF]|\u00E6[\u0080-\u00BF\u20AC-\u20BF]|\u00E8[\u0080-\u00BF\u20AC-\u20BF]|\u00E9[\u0080-\u00BF\u20AC-\u20BF])/u },
  { name: 'replacement-char', pattern: /\uFFFD/ },
];

const invalidWildsNamePatterns = [
  { name: 'non-wilds-weapon-name', pattern: /熊神/ },
];

function walkStrings(value, visitor, pathParts = []) {
  if (typeof value === 'string') {
    visitor(value, pathParts);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) => walkStrings(entry, visitor, [...pathParts, String(index)]));
    return;
  }
  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, entry]) => walkStrings(entry, visitor, [...pathParts, key]));
  }
}

const issues = [];
const counts = {};

for (const file of dataFiles) {
  const filePath = path.join(NORMALIZED_DIR, file);
  const raw = await readFile(filePath, 'utf8');
  const data = JSON.parse(raw);
  counts[file] = Array.isArray(data) ? data.length : Object.keys(data).length;

  walkStrings(data, (text, pathParts) => {
    for (const { name, pattern } of suspiciousPatterns) {
      if (pattern.test(text)) {
        issues.push({ file, path: pathParts.join('.'), rule: name, text });
      }
    }
    for (const { name, pattern } of invalidWildsNamePatterns) {
      if (pattern.test(text)) {
        issues.push({ file, path: pathParts.join('.'), rule: name, text });
      }
    }
  });
}

for (const file of rawDataFiles) {
  const filePath = path.join(RAW_DIR, file);
  const raw = await readFile(filePath, 'utf8');
  const data = JSON.parse(raw);
  const key = path.join('raw', file);
  counts[key] = Array.isArray(data) ? data.length : Object.keys(data).length;

  walkStrings(data, (text, pathParts) => {
    for (const { name, pattern } of invalidWildsNamePatterns) {
      if (pattern.test(text)) {
        issues.push({ file: key, path: pathParts.join('.'), rule: name, text });
      }
    }
  });
}

console.log(JSON.stringify({ ok: issues.length === 0, counts, issues }, null, 2));

if (issues.length > 0) {
  process.exitCode = 1;
}
