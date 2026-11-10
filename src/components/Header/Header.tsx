import { forwardRef, type HTMLAttributes, type ReactNode, type SVGProps } from 'react';
import styles from './Header.module.css';

/* ── Logo ───────────────────────────────────── */

/** ALT logo from Figma "Logo" (32:1003): yellow mark + white wordmark, 90×32. */
export function AltLogo({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="8 8 90.233 32"
      width="90.233"
      height="32"
      className={[styles.logoSvg, className].filter(Boolean).join(' ')}
      role="img"
      aria-label="ALT"
      {...rest}
    >
      <rect x="8" y="8" width="32" height="32" rx="8.2" className={styles.logoMark} />
      <path
        className={styles.logoMarkGlyph}
        d="M16.1279 31.8721V19.3643C16.1279 18.7666 16.2737 18.2273 16.5653 17.7462C16.8568 17.2505 17.2504 16.8569 17.7461 16.5654C18.2417 16.2738 18.7811 16.1281 19.3642 16.1281H28.6138C29.2115 16.1281 29.7509 16.2738 30.2319 16.5654C30.7276 16.8569 31.1212 17.2505 31.4127 17.7462C31.7189 18.2273 31.8719 18.7666 31.8719 19.3643V31.8721H28.4389V26.799H19.5173V31.8721H16.1279ZM19.5173 23.3878H28.4389V19.5393H19.5173V23.3878Z"
      />
      <g className={styles.logoWord}>
        <path d="M48 31.8829V19.2877C48 18.7046 48.1385 18.1798 48.4155 17.7133C48.707 17.2323 49.086 16.8532 49.5525 16.5763C50.0336 16.2847 50.5657 16.1389 51.1488 16.1389H60.5733C61.1564 16.1389 61.6812 16.2847 62.1477 16.5763C62.6288 16.8532 63.0151 17.2323 63.3067 17.7133C63.5982 18.1798 63.744 18.7046 63.744 19.2877V31.8829H60.5515V26.7005H51.1488V31.8829H48ZM51.1488 23.5517H60.5515V19.4408C60.5515 19.3971 60.5369 19.3679 60.5077 19.3533C60.4932 19.3242 60.464 19.3096 60.4203 19.3096H51.28C51.2363 19.3096 51.1998 19.3242 51.1707 19.3533C51.1561 19.3679 51.1488 19.3971 51.1488 19.4408V23.5517Z" />
        <path d="M66.2573 31.8829V16.1171H69.4061V28.7123H82.0013V31.8829H66.2573Z" />
        <path d="M88.7865 31.8829V19.3096H82.4889V16.1389H98.2329V19.3096H91.9571V31.8829H88.7865Z" />
      </g>
    </svg>
  );
}

/* ── Nav pill ───────────────────────────────── */

export interface HeaderNavProps extends HTMLAttributes<HTMLElement> {
  /** Menu items, usually `<MenuItem>`. */
  children: ReactNode;
}

/** Glass pill with the main menu. Figma: "Menu" inside Header/Client. */
export const HeaderNav = forwardRef<HTMLElement, HeaderNavProps>(function HeaderNav(
  { children, className, 'aria-label': ariaLabel = 'Main', ...rest },
  ref,
) {
  return (
    <nav ref={ref} aria-label={ariaLabel} className={[styles.nav, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </nav>
  );
});

/* ── Header ─────────────────────────────────── */

export type HeaderVariant = 'client' | 'admin';

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /** client — site header 64px. admin — back-office header 58px. Figma: `Header/Client`, `Header/Admin` */
  variant?: HeaderVariant;
  /** Main menu, usually `<HeaderNav>` with `<MenuItem>` inside. */
  nav?: ReactNode;
  /** Right side: links, Log in / Sign up, profile and language buttons. */
  actions?: ReactNode;
  /** Where the logo leads. Default: "/". */
  logoHref?: string;
  /** Replaces the ALT logo. */
  logo?: ReactNode;
}

/**
 * Top bar of the page: logo, main menu on the left, actions on the right.
 * The header only lays things out — fill it with MenuItem, LinkButton, Button, IconButton.
 */
export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  { variant = 'client', nav, actions, logoHref = '/', logo, className, ...rest },
  ref,
) {
  const cls = [styles.header, styles[variant], className].filter(Boolean).join(' ');
  return (
    <header ref={ref} className={cls} {...rest}>
      <div className={styles.left}>
        <a href={logoHref} className={styles.logo}>
          {logo ?? <AltLogo />}
        </a>
        {nav}
      </div>
      {actions && <div className={styles.right}>{actions}</div>}
    </header>
  );
});
