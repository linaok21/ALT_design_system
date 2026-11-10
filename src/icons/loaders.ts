import type { IconEntry } from './types';
import { BRAND, CRYPTO, CURRENCY, FLAGS, ILLUSTRATIONS } from './generated/manifest';

export type IconGroup = 'crypto' | 'currency' | 'flags' | 'brand' | 'illustrations';

/*
 * Lazy loaders: every SVG becomes its own small file and is fetched only when
 * an icon with that code is rendered. 700 coin logos do not end up in the app bundle.
 */
type Loader = () => Promise<string>;
const LOADERS: Record<IconGroup, Record<string, Loader>> = {
  crypto: import.meta.glob<string>('../assets/icons/crypto/*.svg', { query: '?url', import: 'default' }),
  currency: import.meta.glob<string>('../assets/icons/currency/*.svg', { query: '?url', import: 'default' }),
  flags: import.meta.glob<string>('../assets/icons/flags/*.svg', { query: '?url', import: 'default' }),
  brand: import.meta.glob<string>('../assets/icons/brand/*.svg', { query: '?url', import: 'default' }),
  illustrations: import.meta.glob<string>('../assets/icons/illustrations/*.svg', { query: '?url', import: 'default' }),
};

export const MANIFEST: Record<IconGroup, IconEntry[]> = {
  crypto: CRYPTO,
  currency: CURRENCY,
  flags: FLAGS,
  brand: BRAND,
  illustrations: ILLUSTRATIONS,
};

/* code → entry, exact match first, then case-insensitive ("btc" works too) */
const exact = new Map<string, IconEntry>();
const loose = new Map<string, IconEntry>();
const byFile = new Map<string, IconEntry>();
for (const [group, rows] of Object.entries(MANIFEST)) {
  for (const row of rows) {
    byFile.set(`${group}:${row.file}`, row);
    const key = row.code ?? row.name;
    if (!exact.has(`${group}:${key}`)) exact.set(`${group}:${key}`, row);
    if (!loose.has(`${group}:${key.toLowerCase()}`)) loose.set(`${group}:${key.toLowerCase()}`, row);
  }
}

/**
 * Finds an icon by code ("BNB", "btc"). When several coins share a ticker, the plain code
 * returns the primary one; the others are reachable by file id, e.g. "bnb--bnb-smart-chain".
 */
export function findIcon(group: IconGroup, code: string): IconEntry | undefined {
  return (
    exact.get(`${group}:${code}`) ??
    loose.get(`${group}:${code.toLowerCase()}`) ??
    byFile.get(`${group}:${code.toLowerCase()}`)
  );
}

const cache = new Map<string, string>();
const pending = new Map<string, Promise<string>>();

/** Already loaded URL, so a re-render does not flash the placeholder. */
export function cachedIconUrl(group: IconGroup, file: string): string | undefined {
  return cache.get(`${group}/${file}`);
}

export function loadIconUrl(group: IconGroup, file: string): Promise<string> | undefined {
  const key = `${group}/${file}`;
  if (cache.has(key)) return Promise.resolve(cache.get(key)!);
  if (pending.has(key)) return pending.get(key);
  const loader = LOADERS[group][`../assets/icons/${group}/${file}.svg`];
  if (!loader) return undefined;
  const p = loader().then((url) => {
    cache.set(key, url);
    pending.delete(key);
    return url;
  });
  pending.set(key, p);
  return p;
}
