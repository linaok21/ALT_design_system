import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import styles from './IconButton.module.css';

export type IconButtonVariant = 'secondary' | 'ghost';
export type IconButtonSize = 'l' | 'm' | 's';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** The icon, e.g. `<X />` or `<ChevronsLeftRight />` from lucide-react. */
  icon: ReactNode;
  /**
   * What the button does, read by screen readers: "Close", "Swap currencies".
   * Required — an icon alone has no accessible name.
   */
  label: string;
  /** secondary — round with a glass background, ghost — icon only. Figma: `role` */
  variant?: IconButtonVariant;
  /**
   * secondary: l 74px · m 42px · s 32px. ghost: l 40px · m 34px (ghost has no s in Figma). Figma: `Size`
   */
  size?: IconButtonSize;
}

/**
 * Button with only an icon: close, swap, expand.
 * Always pass `label` — it becomes the accessible name and the native tooltip.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, label, variant = 'secondary', size = 'm', className, type = 'button', title, ...rest },
  ref,
) {
  const cls = [styles.button, styles[variant], styles[`size-${size}`], className].filter(Boolean).join(' ');
  return (
    <button ref={ref} type={type} className={cls} aria-label={label} title={title ?? label} {...rest}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
    </button>
  );
});
