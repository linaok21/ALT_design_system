import { useMemo, useState, type ReactNode } from 'react';
import styles from './IconGallery.module.css';

export interface GalleryItem {
  /** Unique key */
  id: string;
  /** Main label under the icon (code or name) */
  title: string;
  /** Second line (name) */
  subtitle?: string;
  /** Extra words for search */
  keywords?: string[];
  /** Code copied on click */
  snippet: string;
  /** Warning shown on the card */
  deprecated?: string;
  render: (size: number) => ReactNode;
}

interface Props {
  items: GalleryItem[];
  sizes?: number[];
  defaultSize?: number;
  /** Hint shown above the grid */
  hint?: ReactNode;
  /** Shown when there are no items at all */
  emptyText?: ReactNode;
  placeholder?: string;
}

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Clipboard API can be blocked inside the Storybook iframe — fall back to a hidden textarea
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

/** Storybook helper: searchable icon grid with size switch and copy-on-click. */
export function IconGallery({ items, sizes = [16, 20, 24, 32], defaultSize = 24, hint, emptyText, placeholder }: Props) {
  const [query, setQuery] = useState('');
  const [size, setSize] = useState(defaultSize);
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) =>
      [it.title, it.subtitle, ...(it.keywords ?? [])].some((s) => s?.toLowerCase().includes(q)),
    );
  }, [items, query]);

  const onCopy = async (it: GalleryItem) => {
    if (await copy(it.snippet)) {
      setCopied(it.id);
      window.setTimeout(() => setCopied((c) => (c === it.id ? null : c)), 1400);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <input
          className={styles.search}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder ?? 'Search by name or code…'}
          aria-label="Search icons"
        />
        <div className={styles.sizes} role="radiogroup" aria-label="Icon size">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={size === s}
              className={size === s ? styles.sizeActive : styles.size}
              onClick={() => setSize(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <span className={styles.count}>
          {filtered.length} / {items.length}
        </span>
      </div>
      {hint && <p className={styles.hint}>{hint}</p>}

      {items.length === 0 ? (
        <div className={styles.empty}>{emptyText ?? 'No icons yet.'}</div>
      ) : filtered.length === 0 ? (
        <div className={styles.empty}>Nothing found for “{query}”.</div>
      ) : (
        <ul className={styles.grid}>
          {filtered.map((it) => (
            <li key={it.id}>
              <button type="button" className={styles.card} onClick={() => onCopy(it)} title={`Copy: ${it.snippet}`}>
                <span className={styles.preview} style={{ minHeight: Math.max(40, size + 16) }}>
                  {it.render(size)}
                </span>
                <span className={styles.title}>{copied === it.id ? 'Copied ✓' : it.title}</span>
                {it.subtitle && <span className={styles.subtitle}>{it.subtitle}</span>}
                {it.deprecated && (
                  <span className={styles.deprecated} title={it.deprecated}>
                    Deprecated
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
