import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { LoaderCircle } from 'lucide-react';
import styles from './Button.module.css';

export type ButtonRole = 'primary' | 'secondary' | 'buy' | 'sell';
export type ButtonSize = 'lg' | 'md' | 'sm';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'role'> {
  /** Visual role. Buy/Sell — only for trading operations. Figma: `role` */
  variant?: ButtonRole;
  /** lg — 52px (Buy/Sell 48px), md — 42px, sm — 32px. Figma: `size` */
  size?: ButtonSize;
  /** Shows the spinner and blocks clicks; keeps the button width. Figma: `state=loading` */
  loading?: boolean;
  /** Icon before the label. Figma: `showIconLeft` */
  iconLeft?: ReactNode;
  /** Icon after the label. Figma: `showIconRight` */
  iconRight?: ReactNode;
  children?: ReactNode;
}

/**
 * Base interactive element for key actions.
 * Hover/active come from CSS (:hover / :active), disabled from the native `disabled`
 * attribute — so there is no `state` prop like in Figma.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'lg',
    loading = false,
    disabled = false,
    iconLeft,
    iconRight,
    children,
    className,
    type = 'button',
    ...rest
  },
  ref,
) {
  const cls = [styles.button, styles[variant], styles[size], loading && styles.loading, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      type={type}
      className={cls}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
      {...rest}
    >
      <span className={styles.content} aria-hidden={loading || undefined}>
        {iconLeft && <span className={styles.icon}>{iconLeft}</span>}
        {children != null && <span className={styles.label}>{children}</span>}
        {iconRight && <span className={styles.icon}>{iconRight}</span>}
      </span>
      {loading && (
        <span className={styles.spinner} role="status" aria-label="Loading">
          <LoaderCircle />
        </span>
      )}
    </button>
  );
});
