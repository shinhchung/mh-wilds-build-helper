import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { ensureDir, RAW_DIR, writeJson } from './data-utils.mjs';

const MHDB_BASE = 'https://wilds.mhdb.io';
const KIRANICO_BASE = 'https://mhwilds.kiranico.com';
const mhdbLocales = ['en', 'zh-Hant'];
const mhdbEndpoints = ['armor', 'armor/sets', 'skills', 'decorations', 'charms', 'weapons', 'items'];
const kiranicoPages = ['skills', 'armor-series', 'decorations', 'weapons', 'items'];

async function fetchWithRetry(url, asJson) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, { headers: { accept: asJson ? 'application/json' : 'text/html' } });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return asJson ? response.json() : response.text();
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 750));
    }
  }
  throw new Error(`Failed to fetch ${url}: ${lastError?.message ?? lastError}`);
}

const manifest = {
  fetchedAt: new Date().toISOString(),
  mhdb: [],
  kiranico: [],
};

for (const locale of mhdbLocales) {
  for (const endpoint of mhdbEndpoints) {
    const url = `${MHDB_BASE}/${locale}/${endpoint}`;
    const data = await fetchWithRetry(url, true);
    const filePath = path.join(RAW_DIR, 'mhdb', locale, `${endpoint.replace('/', '__')}.json`);
    await writeJson(filePath, data);
    manifest.mhdb.push({ locale, endpoint, url, count: Array.isArray(data) ? data.length : null });
    console.log(`mhdb ${locale}/${endpoint}: ${Array.isArray(data) ? data.length : 'ok'}`);
  }
}

for (const page of kiranicoPages) {
  const url = `${KIRANICO_BASE}/zh-Hant/data/${page}`;
  const html = await fetchWithRetry(url, false);
  const filePath = path.join(RAW_DIR, 'kiranico', 'zh-Hant', `${page}.html`);
  await ensureDir(path.dirname(filePath));
  await writeFile(filePath, html, 'utf8');
  const version = html.match(/Game Ver\.\s*([^<]+)/)?.[1]?.trim() ?? null;
  manifest.kiranico.push({ locale: 'zh-Hant', page, url, version, bytes: html.length });
  console.log(`kiranico zh-Hant/${page}: ${version ?? 'version unknown'}`);
}

await writeJson(path.join(RAW_DIR, 'manifest.json'), manifest);
console.log(`wrote ${path.relative(process.cwd(), path.join(RAW_DIR, 'manifest.json'))}`);
