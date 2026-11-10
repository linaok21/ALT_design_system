#!/usr/bin/env node
/**
 * Imports icons exported from Figma into the project.
 *
 *   npm run icons                      # reads ./figma_export (or ./figma-export)
 *   npm run icons -- path/to/export    # or any folder / unzipped export
 *
 * Input: SVG files exported from the ALT Figma file (File → Export, the layers
 * already have SVG export settings). Figma turns "Icon / Crypto / Bitcoin (BTC)"
 * into the path "Icon/Crypto/Bitcoin (BTC).svg"; this script reads any nesting.
 *
 * Output (all generated, do not edit by hand):
 *   src/assets/icons/{crypto,currency,flags,brand,illustrations}/*.svg  — optimized files
 *   src/icons/generated/manifest.ts                                      — code → file tables
 *   src/icons/generated/CustomIcons.tsx                                  — own monochrome icons as React components
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { optimize } from 'svgo';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const INPUT = resolve(
  process.argv[2] ?? [join(ROOT, 'figma_export'), join(ROOT, 'figma-export')].find((p) => existsSync(p)) ?? join(ROOT, 'figma_export'),
);
const ASSETS = join(ROOT, 'src/assets/icons');
const GENERATED = join(ROOT, 'src/icons/generated');
const OVERRIDES = JSON.parse(readFileSync(join(ROOT, 'scripts/icons/overrides.json'), 'utf8'));

if (!existsSync(INPUT)) {
  console.error(`✖ Export folder not found: ${INPUT}\n  Export SVGs from Figma (File → Export) and unzip them there.`);
  process.exit(1);
}

/* ── 1. Collect files ─────────────────────────────────────────── */
const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.toLowerCase().endsWith('.svg') ? [p] : [];
  });

const files = walk(INPUT);
if (!files.length) {
  console.error(`✖ No .svg files in ${INPUT}`);
  process.exit(1);
}

/** "Icon/Crypto/Bitcoin (BTC).svg" → { group: 'crypto', name: 'Bitcoin', code: 'BTC' } */
function classify(file) {
  const parts = relative(INPUT, file)
    .replace(/\.svg$/i, '')
    .split(/[\\/]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const lower = parts.map((p) => p.toLowerCase());
  const leaf = parts[parts.length - 1];
  const m = leaf.match(/^(.*?)\s*\(([^()]+)\)\s*$/);
  const name = (m ? m[1] : leaf).trim();
  const code = m ? m[2].trim() : null;

  if (lower.includes('_review')) return null; // waiting for a decision in Figma
  if (lower.includes('crypto')) return { group: 'crypto', name, code };
  if (lower.includes('currency')) return { group: 'currency', name, code };
  if (lower.includes('flags')) return { group: 'flags', name, code };
  if (lower.includes('company') || lower.includes('colorated')) return { group: 'brand', name: leaf, code: null };
  if (lower[0] === 'icon') return { group: 'custom', name: leaf, code: null };
  return { group: 'illustrations', name: leaf, code: null };
}

const slug = (s) =>
  s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

// "UpDown" → UpDown, "rail-symbol" → RailSymbol (keeps the camel case from Figma)
const pascal = (s) => slug(s.replace(/([a-z0-9])([A-Z])/g, '$1-$2')).split('-').map((p) => p[0].toUpperCase() + p.slice(1)).join('');

/* ── 2. SVGO presets ──────────────────────────────────────────── */
const svgoColor = (prefix) => ({
  multipass: true,
  plugins: [
    { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
    { name: 'prefixIds', params: { prefix } }, // unique clip-path ids
    'removeDimensions',
  ],
});
// Own monochrome icons: any color → currentColor, so they follow text color like Lucide
const svgoMono = (prefix) => ({
  multipass: true,
  plugins: [
    { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
    { name: 'prefixIds', params: { prefix } },
    'removeDimensions',
    { name: 'convertColors', params: { currentColor: true } },
  ],
});

/* ── 3. Process ───────────────────────────────────────────────── */
for (const g of ['crypto', 'currency', 'flags', 'brand', 'illustrations']) {
  rmSync(join(ASSETS, g), { recursive: true, force: true });
  mkdirSync(join(ASSETS, g), { recursive: true });
}
mkdirSync(GENERATED, { recursive: true });

const tables = { crypto: [], currency: [], flags: [], brand: [], illustrations: [] };
const custom = [];
const warnings = [];
const usedFiles = new Set();

// When several icons share a code, the one marked "primary" in overrides.json is processed first
// and gets the plain file name (btc.svg); the others get "code--name.svg".
const isPrimary = (info) => info?.code && OVERRIDES[info.group]?.[info.code]?.primary === info.name;
const ordered = files
  .sort()
  .map((file) => ({ file, info: classify(file) }))
  .sort((a, b) => Number(isPrimary(b.info)) - Number(isPrimary(a.info)));

for (const { file, info } of ordered) {
  if (!info) continue;
  const raw = readFileSync(file, 'utf8');

  if (info.group === 'custom') {
    const svg = optimize(raw, svgoMono(`icon-${slug(info.name)}`)).data;
    custom.push({ name: info.name, component: pascal(info.name), svg });
    continue;
  }
  if (['crypto', 'currency', 'flags'].includes(info.group) && !info.code) {
    warnings.push(`no code in brackets, skipped: ${relative(INPUT, file)}`);
    continue;
  }

  // File name: code for coded groups; on a clash (two coins share a ticker) add the name
  let base = info.code ? slug(info.code) : slug(info.name);
  if (usedFiles.has(`${info.group}/${base}`)) {
    const alt = `${base}--${slug(info.name)}`;
    warnings.push(`${info.group}: code ${info.code} is shared, "${info.name}" saved as ${alt}.svg`);
    base = alt;
  }
  usedFiles.add(`${info.group}/${base}`);

  const svg = optimize(raw, svgoColor(`${info.group}-${base}`)).data;
  writeFileSync(join(ASSETS, info.group, `${base}.svg`), svg);

  const { primary: _primary, ...override } = OVERRIDES[info.group]?.[info.code ?? info.name] ?? {};
  tables[info.group].push({ code: info.code, name: info.name, file: base, ...override });
}

/* ── 4. Generated code ────────────────────────────────────────── */
const header = '// AUTO-GENERATED by scripts/icons/build-icons.mjs — do not edit. Run `npm run icons`.\n';
const sortBy = (a, b) => (a.code ?? a.name).localeCompare(b.code ?? b.name);

writeFileSync(
  join(GENERATED, 'manifest.ts'),
  header +
    `import type { IconEntry } from '../types';\n\n` +
    Object.entries(tables)
      .map(([g, rows]) => `export const ${g.toUpperCase()}: IconEntry[] = ${JSON.stringify(rows.sort(sortBy), null, 2)};\n`)
      .join('\n'),
);

const toJsx = (svg) =>
  svg
    .replace(/^<svg[^>]*>/, '')
    .replace(/<\/svg>$/, '')
    .replace(/([a-z])-([a-z])(?=[a-z-]*=)/g, (_, a, b) => a + b.toUpperCase()) // fill-rule → fillRule
    .replace(/class=/g, 'className=');
const viewBox = (svg) => svg.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 24 24';

writeFileSync(
  join(GENERATED, 'CustomIcons.tsx'),
  header +
    `import { createCustomIcon } from '../createCustomIcon';\n\n` +
    custom
      .sort((a, b) => a.component.localeCompare(b.component))
      .map(
        (c) =>
          `/** Figma: "Icon / ${c.name}" */\nexport const ${c.component} = createCustomIcon('${c.component}', '${viewBox(c.svg)}', (\n  <>${toJsx(c.svg)}</>\n));\n`,
      )
      .join('\n') +
    `\nexport const CUSTOM_ICON_NAMES = ${JSON.stringify(custom.map((c) => c.component).sort())} as const;\n`,
);

/* ── 5. Report ────────────────────────────────────────────────── */
console.log(`✔ Icons imported from ${relative(ROOT, INPUT) || INPUT}`);
for (const [g, rows] of Object.entries(tables)) console.log(`  ${g.padEnd(14)} ${rows.length}`);
console.log(`  ${'custom'.padEnd(14)} ${custom.length}`);
if (warnings.length) {
  console.log(`\n⚠ ${warnings.length} warning(s):`);
  for (const w of warnings) console.log('  - ' + w);
}
