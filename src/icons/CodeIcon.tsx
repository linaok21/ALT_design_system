import { useEffect, useState, type CSSProperties } from 'react';
import { cachedIconUrl, findIcon, loadIconUrl, type IconGroup } from './loaders';
import styles from './CodeIcon.module.css';

export interface CodeIconBaseProps {
  /** Width and height in px. */
  size?: number;
  /**
   * Accessible name. By default the icon is decorative (hidden from screen readers),
   * because it usually sits next to the ticker or country name.
   * Pass a label when the icon is shown alone.
   */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

interface CodeIconProps extends CodeIconBaseProps {
  group: IconGroup;
  code: string;
  /** Round mask for the placeholder and fallback. Off for brands and illustrations. */
  round?: boolean;
}

/** Letters for the fallback: "BTC" → "BT", "GB-ENG" → "GB". */
const initials = (code: string) => code.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase();

/**
 * Shared logic for CryptoIcon, CurrencyIcon and Flag:
 * finds the icon by code, loads its file on demand, shows a neutral circle
 * with letters when the code is unknown — never an empty gap.
 */
export function CodeIcon({ group, code, size = 24, label, className, style, round = true }: CodeIconProps) {
  const entry = findIcon(group, code);
  const [url, setUrl] = useState<string | undefined>(() => (entry ? cachedIconUrl(group, entry.file) : undefined));

  useEffect(() => {
    if (!entry) return;
    let alive = true;
    setUrl(cachedIconUrl(group, entry.file));
    loadIconUrl(group, entry.file)?.then((u) => alive && setUrl(u));
    return () => {
      alive = false;
    };
  }, [group, entry]);

  const a11y = label ? { role: 'img' as const, 'aria-label': label } : { 'aria-hidden': true as const };
  const box: CSSProperties = { width: size, height: size, ...style };
  const cls = [styles.icon, round && styles.round, className].filter(Boolean).join(' ');

  if (entry && url) {
    return <img src={url} width={size} height={size} alt={label ?? ''} className={cls} style={style} draggable={false} />;
  }
  if (entry) {
    // loading: same-size placeholder, no layout shift
    return <span className={`${cls} ${styles.placeholder}`} style={box} {...a11y} />;
  }
  return (
    <span
      className={`${cls} ${styles.fallback}`}
      style={{ ...box, fontSize: Math.max(8, Math.round(size * 0.38)) }}
      title={`No ${group} icon for "${code}"`}
      data-missing={code}
      {...a11y}
    >
      {initials(code)}
    </span>
  );
}
