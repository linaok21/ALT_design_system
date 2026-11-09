import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react';
import styles from './MenuItem.module.css';

type CommonProps = {
  /** Item text. */
  children: ReactNode;
  /** Current page / active section: dark background and bold text. Figma: `State=Selected` */
  selected?: boolean;
  /** Shows the small caret: the item opens a submenu. Figma: `showIconDrop` */
  hasDropdown?: boolean;
  /** Submenu is open: caret points up. Figma: `Icon /Up` in `State=Selected` */
  open?: boolean;
  /** Figma: `State=disabled` */
  disabled?: boolean;
  className?: string;
};

export type MenuItemProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps | 'type'> & {
    /** When set, the item renders as a link (`<a>`) instead of a button. */
    href?: string;
    target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
    rel?: string;
  };

/** Small filled caret (Figma "Icon /drop" and "Icon /Up"), drawn with currentColor. */
function Caret({ up }: { up: boolean }) {
  return (
    <svg
      className={styles.caret}
      data-up={up || undefined}
      viewBox="0 0 20 20"
      width="20"
      height="20"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 8.25h8l-4 4.5z" fill="currentColor" />
    </svg>
  );
}

/**
 * Item of the top navigation menu.
 * Renders a link when `href` is set, otherwise a button.
 * Hover comes from CSS, so there is no `state` prop like in Figma.
 */
export const MenuItem = forwardRef<HTMLButtonElement | HTMLAnchorElement, MenuItemProps>(function MenuItem(
  { children, selected = false, hasDropdown = false, open = false, disabled = false, className, href, target, rel, ...rest },
  ref,
) {
  const cls = [styles.item, selected && styles.selected, disabled && styles.disabled, className]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {/* data-text reserves the bold width so the item does not jump when selected */}
      <span className={styles.label} data-text={typeof children === 'string' ? children : undefined}>
        {children}
      </span>
      {hasDropdown && <Caret up={open} />}
    </>
  );

  if (href != null) {
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        className={cls}
        href={disabled ? undefined : href}
        target={target}
        rel={rel}
        aria-current={selected ? 'page' : undefined}
        aria-disabled={disabled || undefined}
        aria-haspopup={hasDropdown ? 'menu' : undefined}
        aria-expanded={hasDropdown ? open : undefined}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      type="button"
      className={cls}
      disabled={disabled}
      aria-current={selected ? 'page' : undefined}
      aria-haspopup={hasDropdown ? 'menu' : undefined}
      aria-expanded={hasDropdown ? open : undefined}
      {...rest}
    >
      {content}
    </button>
  );
});
